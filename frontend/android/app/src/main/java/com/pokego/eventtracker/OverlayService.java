package com.pokego.eventtracker;

import android.app.Notification;
import android.app.NotificationChannel;
import android.app.NotificationManager;
import android.app.Service;
import android.content.Context;
import android.content.Intent;
import android.graphics.Color;
import android.graphics.PixelFormat;
import android.os.Build;
import android.os.Handler;
import android.os.IBinder;
import android.os.Looper;
import android.provider.Settings;
import android.util.Log;
import android.view.ContextThemeWrapper;
import android.view.Gravity;
import android.view.LayoutInflater;
import android.view.MotionEvent;
import android.view.View;
import android.view.WindowManager;
import android.widget.LinearLayout;
import android.widget.ProgressBar;
import android.widget.TextView;

import androidx.annotation.Nullable;
import androidx.core.app.NotificationCompat;

import org.json.JSONArray;
import org.json.JSONObject;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;

public class OverlayService extends Service {
    private static final String TAG = "OverlayService";
    private static final String CHANNEL_ID = "OverlayServiceChannel";
    private static final int NOTIFICATION_ID = 1001;

    private WindowManager windowManager;
    private View bubbleView;
    private View expandedView;
    private WindowManager.LayoutParams bubbleParams;
    private WindowManager.LayoutParams expandedParams;

    private boolean isExpanded = false;

    private TextView eventsTextView;
    private TextView raidsTextView;
    private TextView megaTextView;
    private LinearLayout bossChipsLayout;
    private ProgressBar progressBar;

    private final List<String> activeBossNames = new ArrayList<>();
    private String lastRaidCounterFilter = "@fighting,@rock,@steel,@dragon,@fairy";
    private String lastMegaFilter = "mega&dragon,ice";

    private final ExecutorService executor = Executors.newSingleThreadExecutor();
    private final Handler mainHandler = new Handler(Looper.getMainLooper());

    @Override
    public void onCreate() {
        super.onCreate();
        createNotificationChannel();
        try {
            Notification notification = new NotificationCompat.Builder(this, CHANNEL_ID)
                    .setContentTitle("PoGo Events Overlay")
                    .setContentText("Plovoucí overlay nad Pokémon GO je aktivní")
                    .setSmallIcon(R.mipmap.ic_launcher)
                    .setPriority(NotificationCompat.PRIORITY_LOW)
                    .build();
            startForeground(NOTIFICATION_ID, notification);
        } catch (Exception e) {
            Log.e(TAG, "Failed starting foreground notification", e);
        }

        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.M && !Settings.canDrawOverlays(this)) {
            Log.e(TAG, "Overlay permission not granted. Stopping OverlayService.");
            stopSelf();
            return;
        }

        try {
            windowManager = (WindowManager) getSystemService(WINDOW_SERVICE);
            initViews();
            fetchDataAsync();
        } catch (Exception e) {
            Log.e(TAG, "Error initializing OverlayService views", e);
            stopSelf();
        }
    }

    @Override
    public int onStartCommand(Intent intent, int flags, int startId) {
        return START_STICKY;
    }

    private void createNotificationChannel() {
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
            NotificationChannel channel = new NotificationChannel(
                    CHANNEL_ID,
                    "PoGo Events Overlay Channel",
                    NotificationManager.IMPORTANCE_LOW
            );
            NotificationManager manager = getSystemService(NotificationManager.class);
            if (manager != null) {
                manager.createNotificationChannel(channel);
            }
        }
    }

    private void initViews() {
        int windowType = Build.VERSION.SDK_INT >= Build.VERSION_CODES.O
                ? WindowManager.LayoutParams.TYPE_APPLICATION_OVERLAY
                : WindowManager.LayoutParams.TYPE_PHONE;

        ContextThemeWrapper themeContext = new ContextThemeWrapper(this, R.style.AppTheme);

        // 1. Bubble Layout & Touch Dragging
        bubbleView = LayoutInflater.from(themeContext).inflate(R.layout.overlay_bubble_layout, null);
        bubbleParams = new WindowManager.LayoutParams(
                WindowManager.LayoutParams.WRAP_CONTENT,
                WindowManager.LayoutParams.WRAP_CONTENT,
                windowType,
                WindowManager.LayoutParams.FLAG_NOT_FOCUSABLE,
                PixelFormat.TRANSLUCENT
        );
        bubbleParams.gravity = Gravity.TOP | Gravity.START;
        bubbleParams.x = 20;
        bubbleParams.y = 200;

        bubbleView.setOnTouchListener(new View.OnTouchListener() {
            private int initialX, initialY;
            private float initialTouchX, initialTouchY;
            private boolean isMoving = false;

            @Override
            public boolean onTouch(View v, MotionEvent event) {
                switch (event.getAction()) {
                    case MotionEvent.ACTION_DOWN:
                        initialX = bubbleParams.x;
                        initialY = bubbleParams.y;
                        initialTouchX = event.getRawX();
                        initialTouchY = event.getRawY();
                        isMoving = false;
                        return true;

                    case MotionEvent.ACTION_MOVE:
                        int dx = (int) (event.getRawX() - initialTouchX);
                        int dy = (int) (event.getRawY() - initialTouchY);
                        if (Math.abs(dx) > 10 || Math.abs(dy) > 10) {
                            isMoving = true;
                            bubbleParams.x = initialX + dx;
                            bubbleParams.y = initialY + dy;
                            if (bubbleView.isAttachedToWindow()) {
                                windowManager.updateViewLayout(bubbleView, bubbleParams);
                            }
                        }
                        return true;

                    case MotionEvent.ACTION_UP:
                        if (!isMoving) {
                            toggleExpandedView();
                        }
                        return true;
                }
                return false;
            }
        });

        // 2. Expanded Window Layout
        expandedView = LayoutInflater.from(themeContext).inflate(R.layout.overlay_expanded_layout, null);
        expandedParams = new WindowManager.LayoutParams(
                WindowManager.LayoutParams.WRAP_CONTENT,
                WindowManager.LayoutParams.WRAP_CONTENT,
                windowType,
                WindowManager.LayoutParams.FLAG_NOT_FOCUSABLE,
                PixelFormat.TRANSLUCENT
        );
        expandedParams.gravity = Gravity.CENTER;

        eventsTextView = expandedView.findViewById(R.id.overlay_events_text);
        raidsTextView = expandedView.findViewById(R.id.overlay_raids_text);
        megaTextView = expandedView.findViewById(R.id.overlay_mega_text);
        bossChipsLayout = expandedView.findViewById(R.id.overlay_boss_chips_layout);
        progressBar = expandedView.findViewById(R.id.overlay_progress_bar);

        View closeBtn = expandedView.findViewById(R.id.overlay_close_btn);
        if (closeBtn != null) {
            closeBtn.setOnClickListener(v -> toggleExpandedView());
        }

        View copyRaidCountersBtn = expandedView.findViewById(R.id.overlay_copy_raid_counters_btn);
        if (copyRaidCountersBtn != null) {
            copyRaidCountersBtn.setOnClickListener(v -> copyToClipboard(lastRaidCounterFilter, "Filtr Raid Counterů zkopírován do schránky!"));
        }

        View copyMegaFilterBtn = expandedView.findViewById(R.id.overlay_copy_mega_filter_btn);
        if (copyMegaFilterBtn != null) {
            copyMegaFilterBtn.setOnClickListener(v -> copyToClipboard(lastMegaFilter, "Filtr Mega Evoluce zkopírován do schránky!"));
        }

        // Add bubble to window manager
        windowManager.addView(bubbleView, bubbleParams);
    }

    private void copyToClipboard(String text, String message) {
        android.content.ClipboardManager clipboard = (android.content.ClipboardManager) getSystemService(Context.CLIPBOARD_SERVICE);
        if (clipboard != null) {
            android.content.ClipData clip = android.content.ClipData.newPlainText("PoGo Filter", text);
            clipboard.setPrimaryClip(clip);
            android.widget.Toast.makeText(this, message, android.widget.Toast.LENGTH_SHORT).show();
        }
    }

    private void toggleExpandedView() {
        if (isExpanded) {
            if (expandedView.isAttachedToWindow()) {
                windowManager.removeView(expandedView);
            }
            isExpanded = false;
        } else {
            if (!expandedView.isAttachedToWindow()) {
                windowManager.addView(expandedView, expandedParams);
            }
            isExpanded = true;
        }
    }

    private void fetchDataAsync() {
        if (progressBar != null) progressBar.setVisibility(View.VISIBLE);
        executor.execute(() -> {
            String eventsJson = fetchUrlData("https://pogoevents.app/api/events");
            String raidsJson = fetchUrlData("https://pogoevents.app/api/raids");
            mainHandler.post(() -> updateOverlayUI(eventsJson, raidsJson));
        });
    }

    private String fetchUrlData(String urlStr) {
        HttpURLConnection conn = null;
        try {
            URL url = new URL(urlStr);
            conn = (HttpURLConnection) url.openConnection();
            conn.setConnectTimeout(8000);
            conn.setReadTimeout(8000);
            conn.setRequestMethod("GET");
            if (conn.getResponseCode() == 200) {
                BufferedReader reader = new BufferedReader(new InputStreamReader(conn.getInputStream()));
                StringBuilder sb = new StringBuilder();
                String line;
                while ((line = reader.readLine()) != null) {
                    sb.append(line);
                }
                reader.close();
                return sb.toString();
            }
        } catch (Exception e) {
            Log.e(TAG, "Error fetching " + urlStr, e);
        } finally {
            if (conn != null) conn.disconnect();
        }
        return null;
    }

    private void updateOverlayUI(String eventsJson, String raidsJson) {
        if (progressBar != null) progressBar.setVisibility(View.GONE);

        // 1. Update Active Events
        List<String> eventNames = new ArrayList<>();
        if (eventsJson != null && eventsTextView != null) {
            try {
                JSONArray events = new JSONArray(eventsJson);
                StringBuilder sb = new StringBuilder();
                int count = 0;

                for (int i = 0; i < events.length() && count < 3; i++) {
                    JSONObject ev = events.getJSONObject(i);
                    String name = ev.optString("name", "");
                    if (!name.isEmpty()) {
                        eventNames.add(name);
                        sb.append("• ").append(name).append("\n");
                        count++;
                    }
                }
                eventsTextView.setText(sb.length() > 0 ? sb.toString().trim() : "Žádné aktivní události.");
            } catch (Exception e) {
                eventsTextView.setText("Chyba při zpracování událostí.");
            }
        }

        // 2. Recommend Mega Evolution for Active Events
        if (megaTextView != null) {
            String combinedText = String.join(" ", eventNames).toLowerCase();
            if (combinedText.contains("dragon") || combinedText.contains("palkia") || combinedText.contains("kyurem")) {
                megaTextView.setText("💡 Doporučená Mega: Mega Rayquaza / Mega Garchomp / Mega Abomasnow\nPro bonus +1 Candy & XL Candy ze Dragon/Ice spawnů.");
            } else if (combinedText.contains("rocket") || combinedText.contains("shadow")) {
                megaTextView.setText("💡 Doporučená Mega: Mega Tyranitar / Mega Houndoom\nPro bonus +1 Candy ze Dark/Fighting Rocket spawnů.");
            } else {
                megaTextView.setText("💡 Doporučená Mega: Mega Rayquaza / Mega Lucario / Mega Aggron\nPro bonus +1 Candy & XL Candy z aktivních raidů.");
            }
        }

        // 3. Process Active Raid Bosses & Populate Selector Chips
        activeBossNames.clear();
        if (raidsJson != null) {
            try {
                JSONArray bosses = new JSONArray(raidsJson);
                for (int i = 0; i < bosses.length(); i++) {
                    JSONObject b = bosses.getJSONObject(i);
                    String name = b.optString("name", "");
                    if (!name.isEmpty() && !activeBossNames.contains(name)) {
                        activeBossNames.add(name);
                    }
                }
            } catch (Exception e) {
                Log.e(TAG, "Error parsing raid bosses", e);
            }
        }

        // Fallback popular bosses if network empty
        if (activeBossNames.isEmpty()) {
            activeBossNames.add("Kyurem");
            activeBossNames.add("Mega Aggron");
            activeBossNames.add("Shadow Palkia");
            activeBossNames.add("Hisuian Samurott");
            activeBossNames.add("Excadrill");
            activeBossNames.add("Drampa");
        }

        buildBossSelectorChips();
        renderBossCounters(activeBossNames.get(0));
    }

    private void buildBossSelectorChips() {
        if (bossChipsLayout == null) return;
        bossChipsLayout.removeAllViews();

        for (int i = 0; i < activeBossNames.size(); i++) {
            final String bossName = activeBossNames.get(i);
            TextView chip = new TextView(this);
            chip.setText(bossName);
            chip.setTextSize(10);
            chip.setTextColor(Color.WHITE);
            chip.setPadding(16, 10, 16, 10);
            chip.setClickable(true);
            chip.setFocusable(true);

            LinearLayout.LayoutParams params = new LinearLayout.LayoutParams(
                    LinearLayout.LayoutParams.WRAP_CONTENT,
                    LinearLayout.LayoutParams.WRAP_CONTENT
            );
            params.setMargins(0, 0, 12, 0);
            chip.setLayoutParams(params);
            chip.setBackgroundColor(Color.parseColor("#33A855F7"));

            chip.setOnClickListener(v -> renderBossCounters(bossName));
            bossChipsLayout.addView(chip);
        }
    }

    private void renderBossCounters(String bossName) {
        if (raidsTextView == null) return;

        String lower = bossName.toLowerCase();
        StringBuilder sb = new StringBuilder();
        sb.append("🎯 RAID BOSS: ").append(bossName.toUpperCase()).append("\n\n");

        if (lower.contains("kyurem")) {
            sb.append("💥 SLABOSTI: Fighting, Rock, Steel, Dragon, Fairy\n\n");
            sb.append("🏆 NEJLEPŠÍ COUNTERY NA LOBBY:\n");
            sb.append("1. Mega Lucario (Force Palm / Aura Sphere)\n");
            sb.append("2. Terrakion (Double Kick / Sacred Sword)\n");
            sb.append("3. Metagross (Bullet Punch / Meteor Mash)\n");
            sb.append("4. Mega Rayquaza (Dragon Tail / Dragon Ascent)\n");
            sb.append("5. Reshiram (Fire Fang / Fusion Flare)");
        } else if (lower.contains("aggron")) {
            sb.append("💥 SLABOSTI: Fighting, Ground, Fire\n\n");
            sb.append("🏆 NEJLEPŠÍ COUNTERY NA LOBBY:\n");
            sb.append("1. Mega Blaziken (Counter / Focus Blast)\n");
            sb.append("2. Terrakion (Double Kick / Sacred Sword)\n");
            sb.append("3. Groudon (Mud-Shot / Precipice Blades)\n");
            sb.append("4. Lucario (Force Palm / Aura Sphere)\n");
            sb.append("5. Excadrill (Mud-Slap / Scorching Sands)");
        } else if (lower.contains("palkia")) {
            sb.append("💥 SLABOSTI: Dragon, Fairy\n\n");
            sb.append("🏆 NEJLEPŠÍ COUNTERY NA LOBBY:\n");
            sb.append("1. Mega Rayquaza (Dragon Tail / Outrage)\n");
            sb.append("2. Palkia Origin (Dragon Tail / Spacial Rend)\n");
            sb.append("3. Dialga Origin (Dragon Breath / Roar of Time)\n");
            sb.append("4. Dragonite (Dragon Tail / Dragon Claw)\n");
            sb.append("5. Shadow Salamence (Dragon Tail / Outrage)");
        } else if (lower.contains("samurott")) {
            sb.append("💥 SLABOSTI: Grass, Electric, Fighting, Bug, Fairy\n\n");
            sb.append("🏆 NEJLEPŠÍ COUNTERY NA LOBBY:\n");
            sb.append("1. Mega Sceptile (Bullet Seed / Frenzy Plant)\n");
            sb.append("2. Kartana (Razor Leaf / Leaf Blade)\n");
            sb.append("3. Xurkitree (Spark / Discharge)\n");
            sb.append("4. Terrakion (Double Kick / Sacred Sword)\n");
            sb.append("5. Zekrom (Charge Beam / Fusion Bolt)");
        } else if (lower.contains("excadrill")) {
            sb.append("💥 SLABOSTI: Fire, Water, Fighting, Ground\n\n");
            sb.append("🏆 NEJLEPŠÍ COUNTERY NA LOBBY:\n");
            sb.append("1. Primal Kyogre (Waterfall / Origin Pulse)\n");
            sb.append("2. Primal Groudon (Mud-Shot / Precipice Blades)\n");
            sb.append("3. Reshiram (Fire Fang / Fusion Flare)\n");
            sb.append("4. Mega Blaziken (Counter / Blast Burn)\n");
            sb.append("5. Terrakion (Double Kick / Sacred Sword)");
        } else {
            sb.append("💥 SLABOSTI: Fighting, Ground, Fire, Water, Electric\n\n");
            sb.append("🏆 NEJLEPŠÍ COUNTERY NA LOBBY:\n");
            sb.append("1. Terrakion (Double Kick / Sacred Sword)\n");
            sb.append("2. Mega Rayquaza (Dragon Tail / Outrage)\n");
            sb.append("3. Groudon (Mud-Shot / Precipice Blades)\n");
            sb.append("4. Metagross (Bullet Punch / Meteor Mash)\n");
            sb.append("5. Lucario (Force Palm / Aura Sphere)");
        }

        raidsTextView.setText(sb.toString());
    }

    @Override
    public void onDestroy() {
        super.onDestroy();
        if (bubbleView != null && bubbleView.isAttachedToWindow()) {
            windowManager.removeView(bubbleView);
        }
        if (expandedView != null && expandedView.isAttachedToWindow()) {
            windowManager.removeView(expandedView);
        }
        executor.shutdown();
    }

    @Nullable
    @Override
    public IBinder onBind(Intent intent) {
        return null;
    }
}
