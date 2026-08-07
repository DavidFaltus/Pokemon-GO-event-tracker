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

    private String currentLang = "en";
    private String selectedBossName = "";

    private TextView eventsHeaderView;
    private TextView bossHeaderView;
    private TextView megaHeaderView;
    private TextView copyRaidCountersBtn;
    private TextView copyMegaFilterBtn;


    private TextView eventsTextView;
    private TextView raidsTextView;
    private TextView megaTextView;
    private LinearLayout bossChipsLayout;
    private ProgressBar progressBar;

    private boolean isExpanded = false;

    private final List<String> activeBossNames = new ArrayList<>();
    private String lastRaidCounterFilter = "@fighting,@rock,@steel,@dragon,@fairy";
    private String lastMegaFilter = "mega&dragon,ice";

    private final ExecutorService executor = Executors.newSingleThreadExecutor();
    private final Handler mainHandler = new Handler(Looper.getMainLooper());

    @Override
    public void onCreate() {
        super.onCreate();
        createNotificationChannel();
        startForegroundNotification();

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
        if (intent != null && intent.hasExtra("lang")) {
            String lang = intent.getStringExtra("lang");
            if (lang != null && !lang.isEmpty()) {
                this.currentLang = lang;
                updateLanguageUI();
                startForegroundNotification();
            }
        }
        return START_STICKY;
    }

    private void startForegroundNotification() {
        try {
            String text = "cs".equals(currentLang) ? "Plovoucí overlay nad Pokémon GO je aktivní" :
                         "ja".equals(currentLang) ? "Pokémon GO浮遊ヘルパーが有効です" :
                         "ru".equals(currentLang) ? "Плавающий помощник Pokémon GO активен" :
                         "Floating helper for Pokémon GO is active";

            Notification notification = new NotificationCompat.Builder(this, CHANNEL_ID)
                    .setContentTitle("PoGo Events Overlay")
                    .setContentText(text)
                    .setSmallIcon(R.mipmap.ic_launcher)
                    .setPriority(NotificationCompat.PRIORITY_LOW)
                    .build();
            startForeground(NOTIFICATION_ID, notification);
        } catch (Exception e) {
            Log.e(TAG, "Failed starting foreground notification", e);
        }
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

        View copyRaidBtn = expandedView.findViewById(R.id.overlay_copy_raid_counters_btn);
        if (copyRaidBtn != null) {
            copyRaidBtn.setOnClickListener(v -> copyToClipboard(lastRaidCounterFilter, false));
        }

        View copyMegaBtn = expandedView.findViewById(R.id.overlay_copy_mega_filter_btn);
        if (copyMegaBtn != null) {
            copyMegaBtn.setOnClickListener(v -> copyToClipboard(lastMegaFilter, true));
        }

        // Add bubble to window manager
        windowManager.addView(bubbleView, bubbleParams);
        updateLanguageUI();
    }

    private TextView scanScreenBtn;

    private void updateLanguageUI() {
        if (expandedView == null) return;

        scanScreenBtn = expandedView.findViewById(R.id.overlay_scan_screen_btn);
        if (scanScreenBtn != null) {
            scanScreenBtn.setText("cs".equals(currentLang) ? "📷 Skenovat bosse na obrazovce (1-Tap OCR)" :
                                 "ja".equals(currentLang) ? "📷 画面のレイドボスをスキャン (1-Tap OCR)" :
                                 "ru".equals(currentLang) ? "📷 Сканировать босса на экране (1-Tap OCR)" :
                                 "📷 Scan boss on screen (1-Tap OCR)");
            scanScreenBtn.setOnClickListener(v -> scanScreenForRaidBoss());
        }

        bossHeaderView = expandedView.findViewById(R.id.overlay_boss_header);
        if (bossHeaderView != null) {
            bossHeaderView.setText("cs".equals(currentLang) ? "⚔️ 5★ & MEGA RAID BOSSOVÉ" :
                                 "ja".equals(currentLang) ? "⚔️ 5★ & メガレイドボス" :
                                 "ru".equals(currentLang) ? "⚔️ 5★ И МЕГА РЕЙД-БОССЫ" :
                                 "⚔️ 5★ & MEGA RAID BOSSES");
        }

        megaHeaderView = expandedView.findViewById(R.id.overlay_mega_header);
        if (megaHeaderView != null) {
            megaHeaderView.setText("cs".equals(currentLang) ? "🧬 DOPORUČENÁ MEGA EVOLUCE (BONUS CANDY)" :
                                 "ja".equals(currentLang) ? "🧬 おすすめのメガシンカ (アメボーナス)" :
                                 "ru".equals(currentLang) ? "🧬 РЕКОМЕНДУЕМАЯ МЕГА-ЭВОЛЮЦИЯ" :
                                 "🧬 RECOMMENDED MEGA EVOLUTION (CANDY BONUS)");
        }

        eventsHeaderView = expandedView.findViewById(R.id.overlay_events_header);
        if (eventsHeaderView != null) {
            eventsHeaderView.setText("cs".equals(currentLang) ? "🔥 AKTIVNÍ UDÁLOSTI" :
                                    "ja".equals(currentLang) ? "🔥 開催中イベント" :
                                    "ru".equals(currentLang) ? "🔥 ТЕКУЩИЕ СОБЫТИЯ" :
                                    "🔥 ACTIVE EVENTS");
        }

        copyRaidCountersBtn = expandedView.findViewById(R.id.overlay_copy_raid_counters_btn);
        if (copyRaidCountersBtn != null) {
            copyRaidCountersBtn.setText("cs".equals(currentLang) ? "📋 Kopírovat filtr Raid Counterů" :
                                      "ja".equals(currentLang) ? "📋 レイド対策フィルターをコピー" :
                                      "ru".equals(currentLang) ? "📋 Копировать фильтр контр-покемонов" :
                                      "📋 Copy Raid Counter Filter");
        }

        copyMegaFilterBtn = expandedView.findViewById(R.id.overlay_copy_mega_filter_btn);
        if (copyMegaFilterBtn != null) {
            copyMegaFilterBtn.setText("cs".equals(currentLang) ? "📋 Kopírovat Mega filtr do Pokémon GO" :
                                     "ja".equals(currentLang) ? "📋 メガフィルターをコピー" :
                                     "ru".equals(currentLang) ? "📋 Копировать Мега-фильтр" :
                                     "📋 Copy Mega Filter to Pokémon GO");
        }

        if (!selectedBossName.isEmpty()) {
            renderBossCounters(selectedBossName);
        }
    }

    private void scanScreenForRaidBoss() {
        if (scanScreenBtn != null) {
            scanScreenBtn.setText("cs".equals(currentLang) ? "⏳ Skenuji obrazovku..." : "⏳ Scanning screen...");
        }

        try {
            com.google.mlkit.vision.text.TextRecognizer recognizer = 
                com.google.mlkit.vision.text.TextRecognition.getClient(com.google.mlkit.vision.text.latin.TextRecognizerOptions.DEFAULT_OPTIONS);

            View root = expandedView.getRootView();
            root.setDrawingCacheEnabled(true);
            android.graphics.Bitmap bitmap = android.graphics.Bitmap.createBitmap(root.getDrawingCache());
            root.setDrawingCacheEnabled(false);

            com.google.mlkit.vision.common.InputImage image = com.google.mlkit.vision.common.InputImage.fromBitmap(bitmap, 0);

            recognizer.process(image)
                .addOnSuccessListener(visionText -> {
                    String recognizedText = visionText.getText().toLowerCase();
                    Log.d(TAG, "OCR Recognized text: " + recognizedText);
                    
                    String detectedBoss = null;
                    for (String boss : activeBossNames) {
                        String cleanBoss = boss.replaceAll("(?i)(mega|super|shadow|hisuian|primal|origin|form|forme)", "").trim().toLowerCase();
                        if (!cleanBoss.isEmpty() && recognizedText.contains(cleanBoss)) {
                            detectedBoss = boss;
                            break;
                        }
                    }

                    if (detectedBoss == null) {
                        String[] known5Star = {"starmie", "kyurem", "palkia", "dialga", "rayquaza", "aggron", "groudon", "kyogre", "lucario", "charizard", "tyranitar", "metagross"};
                        for (String k : known5Star) {
                            if (recognizedText.contains(k)) {
                                detectedBoss = k.substring(0, 1).toUpperCase() + k.substring(1);
                                break;
                            }
                        }
                    }

                    if (detectedBoss != null) {
                        renderBossCounters(detectedBoss);
                        copyToClipboard(lastRaidCounterFilter, false);
                        String msg = "cs".equals(currentLang) ? "🎯 Detekován boss: " + detectedBoss + "! Countery zkopírovány." :
                                     "🎯 Detected boss: " + detectedBoss + "! Counters copied.";
                        android.widget.Toast.makeText(OverlayService.this, msg, android.widget.Toast.LENGTH_LONG).show();
                    } else {
                        String msg = "cs".equals(currentLang) ? "Nenalezen žádný známý 5★/Mega boss na obrazovce. Vyberte ručně ze seznamu." :
                                     "No 5★/Mega boss detected on screen. Please select manually.";
                        android.widget.Toast.makeText(OverlayService.this, msg, android.widget.Toast.LENGTH_SHORT).show();
                    }

                    updateLanguageUI();
                })
                .addOnFailureListener(e -> {
                    Log.e(TAG, "OCR recognition failed", e);
                    updateLanguageUI();
                });

        } catch (Exception e) {
            Log.e(TAG, "Screen scan error", e);
            updateLanguageUI();
        }
    }

    private void copyToClipboard(String text, boolean isMega) {
        android.content.ClipboardManager clipboard = (android.content.ClipboardManager) getSystemService(Context.CLIPBOARD_SERVICE);
        if (clipboard != null) {
            android.content.ClipData clip = android.content.ClipData.newPlainText("PoGo Filter", text);
            clipboard.setPrimaryClip(clip);
            String message = isMega
                ? ("cs".equals(currentLang) ? "Filtr Mega Evoluce zkopírován do schránky!" :
                   "ja".equals(currentLang) ? "メガフィルターをクリップボードにコピーしました！" :
                   "ru".equals(currentLang) ? "Мега-фильтр скопирован в буфер обмена!" :
                   "Mega Evolution filter copied to clipboard!")
                : ("cs".equals(currentLang) ? "Filtr Raid Counterů zkopírován do schránky!" :
                   "ja".equals(currentLang) ? "レイド対策フィルターをクリップボードにコピーしました！" :
                   "ru".equals(currentLang) ? "Фильтр контр-покемонов скопирован в буфер обмена!" :
                   "Raid Counter filter copied to clipboard!");
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
                lastMegaFilter = "megaevolve&dragon,ice";
            } else if (combinedText.contains("rocket") || combinedText.contains("shadow")) {
                megaTextView.setText("💡 Doporučená Mega: Mega Tyranitar / Mega Lucario / Mega Houndoom\nPro bonus +1 Candy z Dark/Fighting Rocket spawnů.");
                lastMegaFilter = "megaevolve&dark,fighting";
            } else if (combinedText.contains("community") || combinedText.contains("spotlight")) {
                megaTextView.setText("💡 Doporučená Mega: Mega Charizard Y / Mega Sceptile / Mega Blaziken\nPro bonus +1 Candy & XP z hlavních divokých spawnů.");
                lastMegaFilter = "megaevolve&fire,flying,grass";
            } else {
                megaTextView.setText("💡 Doporučená Mega: Mega Rayquaza / Mega Lucario / Mega Aggron\nPro bonus +1 Candy & XL Candy z aktivních raidů.");
                lastMegaFilter = "megaevolve&dragon,steel,fighting";
            }
        }

        // 3. Process Active 5★ & Mega Raid Bosses & Populate Selector Chips
        activeBossNames.clear();
        if (raidsJson != null) {
            try {
                JSONArray bosses = new JSONArray(raidsJson);
                for (int i = 0; i < bosses.length(); i++) {
                    JSONObject b = bosses.getJSONObject(i);
                    String name = b.optString("name", "");
                    String tier = b.optString("tier", "").toLowerCase();
                    String lowerName = name.toLowerCase();

                    boolean is5StarOrMega = tier.contains("5") || tier.contains("mega") || tier.contains("primal") || tier.contains("gigantamax") || tier.contains("ultra") ||
                                            lowerName.contains("mega") || lowerName.contains("primal") || lowerName.contains("super") ||
                                            lowerName.contains("starmie") || lowerName.contains("kyurem") || lowerName.contains("palkia") ||
                                            lowerName.contains("dialga") || lowerName.contains("rayquaza") || lowerName.contains("groudon") ||
                                            lowerName.contains("kyogre") || lowerName.contains("necrozma") || lowerName.contains("reshiram") ||
                                            lowerName.contains("zekrom") || lowerName.contains("giratina") || lowerName.contains("landorus") ||
                                            lowerName.contains("tornadus") || lowerName.contains("thundurus");

                    if (is5StarOrMega && !name.isEmpty() && !activeBossNames.contains(name)) {
                        activeBossNames.add(name);
                    }
                }
            } catch (Exception e) {
                Log.e(TAG, "Error parsing raid bosses", e);
            }
        }

        // Fallback popular 5★ & Mega bosses if empty
        if (activeBossNames.isEmpty()) {
            activeBossNames.add("Starmie (Super Mega)");
            activeBossNames.add("Kyurem");
            activeBossNames.add("Mega Aggron");
            activeBossNames.add("Shadow Palkia");
            activeBossNames.add("Hisuian Samurott");
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

            boolean isMega = bossName.toLowerCase().contains("mega") || bossName.toLowerCase().contains("super") || bossName.toLowerCase().contains("primal");
            String prefix = isMega ? "🧬 " : "⭐ 5★ ";

            chip.setText(prefix + bossName);
            chip.setTextSize(10);
            chip.setTextColor(Color.WHITE);
            chip.setPadding(18, 10, 18, 10);
            chip.setClickable(true);
            chip.setFocusable(true);

            LinearLayout.LayoutParams params = new LinearLayout.LayoutParams(
                    LinearLayout.LayoutParams.WRAP_CONTENT,
                    LinearLayout.LayoutParams.WRAP_CONTENT
            );
            params.setMargins(0, 0, 10, 0);
            chip.setLayoutParams(params);

            if (isMega) {
                chip.setBackgroundColor(Color.parseColor("#4410B981"));
            } else {
                chip.setBackgroundColor(Color.parseColor("#44A855F7"));
            }

            chip.setOnClickListener(v -> renderBossCounters(bossName));
            bossChipsLayout.addView(chip);
        }
    }

    private void renderBossCounters(String bossName) {
        if (raidsTextView == null) return;
        selectedBossName = bossName;

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
            lastRaidCounterFilter = "3*,4*&@fighting,@rock,@steel,@dragon,@fairy&448,639,376,384,643";
        } else if (lower.contains("aggron")) {
            sb.append("💥 SLABOSTI: Fighting, Ground, Fire\n\n");
            sb.append("🏆 NEJLEPŠÍ COUNTERY NA LOBBY:\n");
            sb.append("1. Mega Blaziken (Counter / Focus Blast)\n");
            sb.append("2. Terrakion (Double Kick / Sacred Sword)\n");
            sb.append("3. Groudon (Mud-Shot / Precipice Blades)\n");
            sb.append("4. Lucario (Force Palm / Aura Sphere)\n");
            sb.append("5. Excadrill (Mud-Slap / Scorching Sands)");
            lastRaidCounterFilter = "3*,4*&@fighting,@ground,@fire&257,639,383,448,530";
        } else if (lower.contains("palkia")) {
            sb.append("💥 SLABOSTI: Dragon, Fairy\n\n");
            sb.append("🏆 NEJLEPŠÍ COUNTERY NA LOBBY:\n");
            sb.append("1. Mega Rayquaza (Dragon Tail / Outrage)\n");
            sb.append("2. Palkia Origin (Dragon Tail / Spacial Rend)\n");
            sb.append("3. Dialga Origin (Dragon Breath / Roar of Time)\n");
            sb.append("4. Dragonite (Dragon Tail / Dragon Claw)\n");
            sb.append("5. Shadow Salamence (Dragon Tail / Outrage)");
            lastRaidCounterFilter = "3*,4*&@dragon,@fairy&384,484,483,149,373";
        } else if (lower.contains("samurott")) {
            sb.append("💥 SLABOSTI: Grass, Electric, Fighting, Bug, Fairy\n\n");
            sb.append("🏆 NEJLEPŠÍ COUNTERY NA LOBBY:\n");
            sb.append("1. Mega Sceptile (Bullet Seed / Frenzy Plant)\n");
            sb.append("2. Kartana (Razor Leaf / Leaf Blade)\n");
            sb.append("3. Xurkitree (Spark / Discharge)\n");
            sb.append("4. Terrakion (Double Kick / Sacred Sword)\n");
            sb.append("5. Zekrom (Charge Beam / Fusion Bolt)");
            lastRaidCounterFilter = "3*,4*&@grass,@electric,@fighting&254,798,796,639,644";
        } else if (lower.contains("excadrill")) {
            sb.append("💥 SLABOSTI: Fire, Water, Fighting, Ground\n\n");
            sb.append("🏆 NEJLEPŠÍ COUNTERY NA LOBBY:\n");
            sb.append("1. Primal Kyogre (Waterfall / Origin Pulse)\n");
            sb.append("2. Primal Groudon (Mud-Shot / Precipice Blades)\n");
            sb.append("3. Reshiram (Fire Fang / Fusion Flare)\n");
            sb.append("4. Mega Blaziken (Counter / Blast Burn)\n");
            sb.append("5. Terrakion (Double Kick / Sacred Sword)");
            lastRaidCounterFilter = "3*,4*&@fire,@water,@fighting,@ground&382,383,643,257,639";
        } else {
            sb.append("💥 SLABOSTI: Fighting, Ground, Fire, Water, Electric\n\n");
            sb.append("🏆 NEJLEPŠÍ COUNTERY NA LOBBY:\n");
            sb.append("1. Terrakion (Double Kick / Sacred Sword)\n");
            sb.append("2. Mega Rayquaza (Dragon Tail / Outrage)\n");
            sb.append("3. Groudon (Mud-Shot / Precipice Blades)\n");
            sb.append("4. Metagross (Bullet Punch / Meteor Mash)\n");
            sb.append("5. Lucario (Force Palm / Aura Sphere)");
            lastRaidCounterFilter = "3*,4*&@fighting,@ground,@fire,@water&639,384,383,376,448";
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
