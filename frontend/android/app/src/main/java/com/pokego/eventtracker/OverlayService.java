package com.pokego.eventtracker;

import android.animation.ValueAnimator;
import android.app.Notification;
import android.app.NotificationChannel;
import android.app.NotificationManager;
import android.app.PendingIntent;
import android.app.Service;
import android.content.ClipData;
import android.content.ClipboardManager;
import android.content.Context;
import android.content.Intent;
import android.content.SharedPreferences;
import android.content.pm.ServiceInfo;
import android.graphics.Color;
import android.graphics.PixelFormat;
import android.graphics.Point;
import android.os.Build;
import android.os.Handler;
import android.os.IBinder;
import android.os.Looper;
import android.os.VibrationEffect;
import android.os.Vibrator;
import android.provider.Settings;
import android.text.Editable;
import android.text.TextWatcher;
import android.util.Log;
import android.view.ContextThemeWrapper;
import android.view.Gravity;
import android.view.LayoutInflater;
import android.view.MotionEvent;
import android.view.View;
import android.view.WindowManager;
import android.view.animation.DecelerateInterpolator;
import android.widget.EditText;
import android.widget.LinearLayout;
import android.widget.TextView;
import android.widget.Toast;

import androidx.annotation.Nullable;
import androidx.core.app.NotificationCompat;

import org.json.JSONArray;
import org.json.JSONObject;

import java.util.ArrayList;
import java.util.List;

public class OverlayService extends Service {
    private static final String TAG = "OverlayService";
    private static final String CHANNEL_ID = "OverlayServiceChannel";
    private static final int NOTIFICATION_ID = 1001;

    public static final String ACTION_STOP_OVERLAY = "com.pokego.eventtracker.ACTION_STOP_OVERLAY";
    public static final String ACTION_RELOAD_DATA = "com.pokego.eventtracker.ACTION_RELOAD_DATA";

    public static volatile boolean isServiceRunning = false;

    private static final String PREFS_NAME = "pogo_overlay_data";
    private static final String KEY_RAIDS_JSON = "cached_raids_json";

    private WindowManager windowManager;
    private View bubbleView;
    private View expandedView;
    private View dismissTargetView;

    private WindowManager.LayoutParams bubbleParams;
    private WindowManager.LayoutParams expandedParams;
    private WindowManager.LayoutParams dismissParams;

    private String currentLang = "cs";
    private boolean isExpanded = false;

    // Team Variant Mode: "universal", "budget", "hardcore"
    private String currentVariant = "universal";

    // Boss Data Model
    public static class RaidBossItem {
        public String name;
        public String tier;
        public List<String> weaknesses = new ArrayList<>();
        public String universalFilter = "";
        public String budgetFilter = "";
        public String hardcoreFilter = "";

        public String getFilterForVariant(String variant) {
            if ("budget".equals(variant) && !budgetFilter.isEmpty()) {
                return budgetFilter;
            } else if ("hardcore".equals(variant) && !hardcoreFilter.isEmpty()) {
                return hardcoreFilter;
            }
            return !universalFilter.isEmpty() ? universalFilter : budgetFilter;
        }
    }

    private final List<RaidBossItem> allBosses = new ArrayList<>();
    private final List<RaidBossItem> filteredBosses = new ArrayList<>();
    private RaidBossItem selectedBoss = null;

    // Views inside Expanded HUD
    private EditText searchInput;
    private LinearLayout bossChipsLayout;
    private TextView variantUniversalBtn;
    private TextView variantBudgetBtn;
    private TextView variantHardcoreBtn;
    private TextView selectedBossTitle;
    private TextView weaknessesTextView;
    private TextView filterPreviewTextView;
    private TextView copyFilterBtn;

    private final Handler mainHandler = new Handler(Looper.getMainLooper());

    @Override
    public void onCreate() {
        super.onCreate();
        isServiceRunning = true;

        createNotificationChannel();
        startForegroundWithNotification();

        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.M && !Settings.canDrawOverlays(this)) {
            Log.e(TAG, "Overlay permission not granted. Stopping OverlayService.");
            stopSelf();
            return;
        }

        try {
            windowManager = (WindowManager) getSystemService(WINDOW_SERVICE);
            loadBossDataFromStorage();
            initViews();
            RaidWidgetProvider.updateAllWidgets(this);
        } catch (Exception e) {
            Log.e(TAG, "Error initializing OverlayService views", e);
            stopSelf();
        }
    }

    @Override
    public int onStartCommand(Intent intent, int flags, int startId) {
        if (intent != null) {
            String action = intent.getAction();
            if (ACTION_STOP_OVERLAY.equals(action)) {
                stopSelf();
                return START_NOT_STICKY;
            } else if (ACTION_RELOAD_DATA.equals(action)) {
                loadBossDataFromStorage();
                refreshUI();
            }

            if (intent.hasExtra("lang")) {
                String lang = intent.getStringExtra("lang");
                if (lang != null && !lang.isEmpty()) {
                    this.currentLang = lang;
                    startForegroundWithNotification();
                }
            }
        }
        return START_STICKY;
    }

    private void startForegroundWithNotification() {
        try {
            String text = "cs".equals(currentLang) ? "Plovoucí asistent pro Pokémon GO je aktivní" :
                         "ja".equals(currentLang) ? "Pokémon GO浮遊ヘルパーが有効です" :
                         "ru".equals(currentLang) ? "Плавающий помощник Pokémon GO активен" :
                         "Floating helper for Pokémon GO is active";

            Intent stopIntent = new Intent(this, OverlayService.class);
            stopIntent.setAction(ACTION_STOP_OVERLAY);
            int pendingFlags = PendingIntent.FLAG_UPDATE_CURRENT;
            if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.M) {
                pendingFlags |= PendingIntent.FLAG_IMMUTABLE;
            }
            PendingIntent stopPending = PendingIntent.getService(this, 99, stopIntent, pendingFlags);

            String stopText = "cs".equals(currentLang) ? "Zastavit" : "Stop";

            Notification notification = new NotificationCompat.Builder(this, CHANNEL_ID)
                    .setContentTitle("PokeGO Raid Helper")
                    .setContentText(text)
                    .setSmallIcon(R.mipmap.ic_launcher)
                    .setPriority(NotificationCompat.PRIORITY_LOW)
                    .setOngoing(true)
                    .addAction(android.R.drawable.ic_menu_close_clear_cancel, stopText, stopPending)
                    .build();

            if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.Q) {
                startForeground(NOTIFICATION_ID, notification, ServiceInfo.FOREGROUND_SERVICE_TYPE_SPECIAL_USE);
            } else {
                startForeground(NOTIFICATION_ID, notification);
            }
        } catch (Exception e) {
            Log.e(TAG, "Failed starting foreground notification", e);
        }
    }

    private void createNotificationChannel() {
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
            NotificationChannel channel = new NotificationChannel(
                    CHANNEL_ID,
                    "PoGo Raid Helper Channel",
                    NotificationManager.IMPORTANCE_LOW
            );
            channel.setDescription("Upozornění pro plovoucího raid asistenta nad Pokémon GO");
            NotificationManager manager = getSystemService(NotificationManager.class);
            if (manager != null) {
                manager.createNotificationChannel(channel);
            }
        }
    }

    private void loadBossDataFromStorage() {
        allBosses.clear();
        SharedPreferences prefs = getSharedPreferences(PREFS_NAME, Context.MODE_PRIVATE);
        String raidsJsonStr = prefs.getString(KEY_RAIDS_JSON, null);

        if (raidsJsonStr != null && !raidsJsonStr.isEmpty()) {
            try {
                JSONArray array = new JSONArray(raidsJsonStr);
                for (int i = 0; i < array.length(); i++) {
                    JSONObject obj = array.getJSONObject(i);
                    RaidBossItem item = new RaidBossItem();
                    item.name = obj.optString("name", "Unknown Boss");
                    item.tier = obj.optString("tier", "5");

                    item.universalFilter = obj.optString("universalFilter", obj.optString("filterString", ""));
                    item.budgetFilter = obj.optString("budgetFilter", "");
                    item.hardcoreFilter = obj.optString("hardcoreFilter", "");

                    JSONArray wArr = obj.optJSONArray("weaknesses");
                    if (wArr != null) {
                        for (int j = 0; j < wArr.length(); j++) {
                            item.weaknesses.add(wArr.getString(j));
                        }
                    }
                    allBosses.add(item);
                }
            } catch (Exception e) {
                Log.e(TAG, "Error loading boss data from SharedPreferences", e);
            }
        }

        // Fallbacks if empty
        if (allBosses.isEmpty()) {
            RaidBossItem kyurem = new RaidBossItem();
            kyurem.name = "Kyurem";
            kyurem.tier = "5";
            kyurem.weaknesses.add("Fighting");
            kyurem.weaknesses.add("Rock");
            kyurem.weaknesses.add("Steel");
            kyurem.weaknesses.add("Dragon");
            kyurem.weaknesses.add("Fairy");
            kyurem.universalFilter = "3*,4*&@1fighting,@1rock,@1steel,@1dragon,@1fairy&448,639,376,384,643&!@frustration";
            kyurem.budgetFilter = "cp1800-&@1fighting,@1rock,@1steel&68,257,530&!@frustration";
            kyurem.hardcoreFilter = "3*,4*&cp2500-&@1fighting,@1steel&448,639,376&!@frustration";
            allBosses.add(kyurem);

            RaidBossItem aggron = new RaidBossItem();
            aggron.name = "Mega Aggron";
            aggron.tier = "mega";
            aggron.weaknesses.add("Fighting");
            aggron.weaknesses.add("Ground");
            aggron.weaknesses.add("Fire");
            aggron.universalFilter = "3*,4*&@1fighting,@1ground,@1fire&257,639,383,448,530&!@frustration";
            aggron.budgetFilter = "cp1800-&@1fighting,@1ground&68,530,257&!@frustration";
            aggron.hardcoreFilter = "3*,4*&cp2500-&@1fighting,@1ground&257,639,383&!@frustration";
            allBosses.add(aggron);

            RaidBossItem palkia = new RaidBossItem();
            palkia.name = "Palkia (Origin)";
            palkia.tier = "5";
            palkia.weaknesses.add("Dragon");
            palkia.weaknesses.add("Fairy");
            palkia.universalFilter = "3*,4*&@1dragon,@1fairy&384,484,483,149,373&!@frustration";
            palkia.budgetFilter = "cp1800-&@1dragon&149,330,468&!@frustration";
            palkia.hardcoreFilter = "3*,4*&cp2500-&@1dragon&384,484,483&!@frustration";
            allBosses.add(palkia);
        }

        filterBosses("");
    }

    private void filterBosses(String query) {
        filteredBosses.clear();
        String q = query.trim().toLowerCase();
        for (RaidBossItem item : allBosses) {
            if (q.isEmpty() || item.name.toLowerCase().contains(q)) {
                filteredBosses.add(item);
            }
        }
        if (!filteredBosses.isEmpty()) {
            boolean keepCurrent = false;
            if (selectedBoss != null) {
                for (RaidBossItem item : filteredBosses) {
                    if (item.name.equalsIgnoreCase(selectedBoss.name)) {
                        keepCurrent = true;
                        break;
                    }
                }
            }
            if (!keepCurrent) {
                selectedBoss = filteredBosses.get(0);
            }
        }
    }

    private void initViews() {
        int windowType = Build.VERSION.SDK_INT >= Build.VERSION_CODES.O
                ? WindowManager.LayoutParams.TYPE_APPLICATION_OVERLAY
                : WindowManager.LayoutParams.TYPE_PHONE;

        ContextThemeWrapper themeContext = new ContextThemeWrapper(this, R.style.AppTheme);

        // 1. Dismiss Target (Koš na spodku obrazovky)
        dismissTargetView = LayoutInflater.from(themeContext).inflate(R.layout.overlay_dismiss_layout, null);
        dismissParams = new WindowManager.LayoutParams(
                WindowManager.LayoutParams.WRAP_CONTENT,
                WindowManager.LayoutParams.WRAP_CONTENT,
                windowType,
                WindowManager.LayoutParams.FLAG_NOT_FOCUSABLE | WindowManager.LayoutParams.FLAG_NOT_TOUCH_MODAL,
                PixelFormat.TRANSLUCENT
        );
        dismissParams.gravity = Gravity.BOTTOM | Gravity.CENTER_HORIZONTAL;
        dismissParams.y = 80;
        dismissTargetView.setVisibility(View.GONE);
        windowManager.addView(dismissTargetView, dismissParams);

        // 2. Bubble Layout & Touch Dragging
        bubbleView = LayoutInflater.from(themeContext).inflate(R.layout.overlay_bubble_layout, null);
        bubbleParams = new WindowManager.LayoutParams(
                WindowManager.LayoutParams.WRAP_CONTENT,
                WindowManager.LayoutParams.WRAP_CONTENT,
                windowType,
                WindowManager.LayoutParams.FLAG_NOT_FOCUSABLE | WindowManager.LayoutParams.FLAG_NOT_TOUCH_MODAL,
                PixelFormat.TRANSLUCENT
        );
        bubbleParams.gravity = Gravity.TOP | Gravity.START;
        bubbleParams.x = 24;
        bubbleParams.y = 260;

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
                        dismissTargetView.setVisibility(View.VISIBLE);
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

                            int[] targetLocation = new int[2];
                            dismissTargetView.getLocationOnScreen(targetLocation);
                            float dist = (float) Math.hypot(
                                    event.getRawX() - (targetLocation[0] + dismissTargetView.getWidth() / 2f),
                                    event.getRawY() - (targetLocation[1] + dismissTargetView.getHeight() / 2f)
                            );
                            if (dist < 160) {
                                dismissTargetView.setScaleX(1.2f);
                                dismissTargetView.setScaleY(1.2f);
                            } else {
                                dismissTargetView.setScaleX(1.0f);
                                dismissTargetView.setScaleY(1.0f);
                            }
                        }
                        return true;

                    case MotionEvent.ACTION_UP:
                        dismissTargetView.setVisibility(View.GONE);
                        dismissTargetView.setScaleX(1.0f);
                        dismissTargetView.setScaleY(1.0f);

                        if (isMoving) {
                            int[] targetLocation = new int[2];
                            dismissTargetView.getLocationOnScreen(targetLocation);
                            float dist = (float) Math.hypot(
                                    event.getRawX() - (targetLocation[0] + dismissTargetView.getWidth() / 2f),
                                    event.getRawY() - (targetLocation[1] + dismissTargetView.getHeight() / 2f)
                            );
                            if (dist < 160) {
                                triggerHapticClick();
                                stopSelf();
                                return true;
                            }
                            animateSnapToEdge();
                        } else {
                            toggleExpandedView();
                        }
                        return true;
                }
                return false;
            }
        });

        windowManager.addView(bubbleView, bubbleParams);

        // 3. Expanded Window Layout
        expandedView = LayoutInflater.from(themeContext).inflate(R.layout.overlay_expanded_layout, null);
        expandedParams = new WindowManager.LayoutParams(
                WindowManager.LayoutParams.WRAP_CONTENT,
                WindowManager.LayoutParams.WRAP_CONTENT,
                windowType,
                WindowManager.LayoutParams.FLAG_NOT_TOUCH_MODAL, // Allow keyboard input for EditText
                PixelFormat.TRANSLUCENT
        );
        expandedParams.gravity = Gravity.CENTER;

        searchInput = expandedView.findViewById(R.id.overlay_search_input);
        bossChipsLayout = expandedView.findViewById(R.id.overlay_boss_chips_layout);
        variantUniversalBtn = expandedView.findViewById(R.id.overlay_variant_universal);
        variantBudgetBtn = expandedView.findViewById(R.id.overlay_variant_budget);
        variantHardcoreBtn = expandedView.findViewById(R.id.overlay_variant_hardcore);
        selectedBossTitle = expandedView.findViewById(R.id.overlay_selected_boss_title);
        weaknessesTextView = expandedView.findViewById(R.id.overlay_weaknesses_text);
        filterPreviewTextView = expandedView.findViewById(R.id.overlay_filter_preview_text);
        copyFilterBtn = expandedView.findViewById(R.id.overlay_copy_filter_btn);

        View closeBtn = expandedView.findViewById(R.id.overlay_close_btn);
        if (closeBtn != null) {
            closeBtn.setOnClickListener(v -> toggleExpandedView());
        }

        // Variant selector clicks
        if (variantUniversalBtn != null) {
            variantUniversalBtn.setOnClickListener(v -> selectVariant("universal"));
        }
        if (variantBudgetBtn != null) {
            variantBudgetBtn.setOnClickListener(v -> selectVariant("budget"));
        }
        if (variantHardcoreBtn != null) {
            variantHardcoreBtn.setOnClickListener(v -> selectVariant("hardcore"));
        }

        // Primary Copy Button strictly named "Zkopírovat filtr"
        if (copyFilterBtn != null) {
            copyFilterBtn.setText("Zkopírovat filtr");
            copyFilterBtn.setOnClickListener(v -> executeCopyAndCollapse());
        }

        if (searchInput != null) {
            searchInput.addTextChangedListener(new TextWatcher() {
                @Override
                public void beforeTextChanged(CharSequence s, int start, int count, int after) {}

                @Override
                public void onTextChanged(CharSequence s, int start, int before, int count) {
                    filterBosses(s.toString());
                    buildBossChips();
                    updateSelectedBossUI();
                }

                @Override
                public void afterTextChanged(Editable s) {}
            });
        }

        buildBossChips();
        updateVariantButtonsUI();
        updateSelectedBossUI();
    }

    private void selectVariant(String variant) {
        this.currentVariant = variant;
        updateVariantButtonsUI();
        updateSelectedBossUI();
    }

    private void updateVariantButtonsUI() {
        if (variantUniversalBtn != null) {
            boolean isSel = "universal".equals(currentVariant);
            variantUniversalBtn.setBackgroundResource(isSel ? R.drawable.overlay_variant_pill_active : R.drawable.overlay_variant_pill_default);
            variantUniversalBtn.setTextColor(isSel ? Color.WHITE : Color.parseColor("#CBD5E1"));
        }
        if (variantBudgetBtn != null) {
            boolean isSel = "budget".equals(currentVariant);
            variantBudgetBtn.setBackgroundResource(isSel ? R.drawable.overlay_variant_pill_active : R.drawable.overlay_variant_pill_default);
            variantBudgetBtn.setTextColor(isSel ? Color.WHITE : Color.parseColor("#CBD5E1"));
        }
        if (variantHardcoreBtn != null) {
            boolean isSel = "hardcore".equals(currentVariant);
            variantHardcoreBtn.setBackgroundResource(isSel ? R.drawable.overlay_variant_pill_active : R.drawable.overlay_variant_pill_default);
            variantHardcoreBtn.setTextColor(isSel ? Color.WHITE : Color.parseColor("#CBD5E1"));
        }
    }

    private void animateSnapToEdge() {
        Point size = new Point();
        windowManager.getDefaultDisplay().getSize(size);
        int screenWidth = size.x;
        int margin = 20;

        int targetX = (bubbleParams.x + bubbleView.getWidth() / 2 < screenWidth / 2)
                ? margin
                : (screenWidth - bubbleView.getWidth() - margin);

        ValueAnimator animator = ValueAnimator.ofInt(bubbleParams.x, targetX);
        animator.setDuration(220);
        animator.setInterpolator(new DecelerateInterpolator());
        animator.addUpdateListener(animation -> {
            bubbleParams.x = (int) animation.getAnimatedValue();
            if (bubbleView.isAttachedToWindow()) {
                windowManager.updateViewLayout(bubbleView, bubbleParams);
            }
        });
        animator.start();
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
            refreshUI();
        }
    }

    private void refreshUI() {
        buildBossChips();
        updateVariantButtonsUI();
        updateSelectedBossUI();
    }

    private void buildBossChips() {
        if (bossChipsLayout == null) return;
        bossChipsLayout.removeAllViews();

        int maxChips = Math.min(filteredBosses.size(), 30);
        for (int i = 0; i < maxChips; i++) {
            final RaidBossItem item = filteredBosses.get(i);
            TextView chip = new TextView(this);

            boolean isMega = item.tier.contains("mega") || item.tier.contains("primal") || item.name.toLowerCase().startsWith("mega ");
            boolean isSelected = (selectedBoss != null && selectedBoss.name.equalsIgnoreCase(item.name));

            String prefix = isMega ? "🧬 " : "⭐ 5★ ";
            chip.setText(prefix + item.name);
            chip.setTextSize(11);
            chip.setTextColor(Color.WHITE);
            chip.setPadding(20, 10, 20, 10);
            chip.setClickable(true);
            chip.setFocusable(true);

            LinearLayout.LayoutParams params = new LinearLayout.LayoutParams(
                    LinearLayout.LayoutParams.WRAP_CONTENT,
                    LinearLayout.LayoutParams.WRAP_CONTENT
            );
            params.setMargins(0, 0, 10, 0);
            chip.setLayoutParams(params);

            if (isSelected) {
                chip.setBackgroundResource(R.drawable.overlay_chip_selected_background);
            } else if (isMega) {
                chip.setBackgroundResource(R.drawable.overlay_chip_mega_background);
            } else {
                chip.setBackgroundResource(R.drawable.overlay_chip_5star_background);
            }

            // CRITICAL FIX: Clicking a boss selects it and updates UI WITHOUT closing the HUD!
            chip.setOnClickListener(v -> {
                selectedBoss = item;
                buildBossChips();
                updateSelectedBossUI();
                triggerHapticClick();
            });

            bossChipsLayout.addView(chip);
        }
    }

    private void updateSelectedBossUI() {
        if (selectedBoss == null) {
            if (selectedBossTitle != null) selectedBossTitle.setText("Žádný boss nenalezen");
            if (weaknessesTextView != null) weaknessesTextView.setText("");
            if (filterPreviewTextView != null) filterPreviewTextView.setText("");
            return;
        }

        boolean isMega = selectedBoss.tier.contains("mega") || selectedBoss.tier.contains("primal") || selectedBoss.name.toLowerCase().startsWith("mega ");
        String tierBadge = isMega ? " (Mega Raid)" : " (5★ Raid)";

        if (selectedBossTitle != null) {
            selectedBossTitle.setText("⚔️ " + selectedBoss.name + tierBadge);
        }

        if (weaknessesTextView != null) {
            StringBuilder wSb = new StringBuilder();
            for (int i = 0; i < selectedBoss.weaknesses.size(); i++) {
                if (i > 0) wSb.append(", ");
                wSb.append(selectedBoss.weaknesses.get(i));
            }
            weaknessesTextView.setText(wSb.length() > 0 ? ("💥 Slabosti: " + wSb.toString()) : "💥 Slabosti: Neuvedeno");
        }

        if (filterPreviewTextView != null) {
            filterPreviewTextView.setText(selectedBoss.getFilterForVariant(currentVariant));
        }

        if (copyFilterBtn != null) {
            copyFilterBtn.setText("Zkopírovat filtr");
            copyFilterBtn.setBackgroundResource(R.drawable.overlay_copy_button_background);
        }
    }

    private void executeCopyAndCollapse() {
        if (selectedBoss == null) {
            Toast.makeText(this, "Není vybrán žádný boss", Toast.LENGTH_SHORT).show();
            return;
        }

        String filterToCopy = selectedBoss.getFilterForVariant(currentVariant);
        if (filterToCopy == null || filterToCopy.isEmpty()) {
            Toast.makeText(this, "Není k dispozici žádný filtr", Toast.LENGTH_SHORT).show();
            return;
        }

        // 1. Copy to Clipboard
        ClipboardManager clipboard = (ClipboardManager) getSystemService(Context.CLIPBOARD_SERVICE);
        if (clipboard != null) {
            ClipData clip = ClipData.newPlainText("PoGo Raid Filter", filterToCopy);
            clipboard.setPrimaryClip(clip);
        }

        // 2. Haptic Feedback
        triggerHapticClick();

        // 3. Briefly flash button to Copied state
        if (copyFilterBtn != null) {
            copyFilterBtn.setText("✓ Zkopírováno!");
            copyFilterBtn.setBackgroundColor(Color.parseColor("#22C55E"));
        }

        // 4. Automatically collapse back into floating bubble ONLY AFTER clicking Copy Filter!
        mainHandler.postDelayed(() -> {
            if (isExpanded) {
                toggleExpandedView();
            }
            if (copyFilterBtn != null) {
                copyFilterBtn.setText("Zkopírovat filtr");
                copyFilterBtn.setBackgroundResource(R.drawable.overlay_copy_button_background);
            }
        }, 250);
    }

    private void triggerHapticClick() {
        try {
            Vibrator v = (Vibrator) getSystemService(Context.VIBRATOR_SERVICE);
            if (v != null) {
                if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.Q) {
                    v.vibrate(VibrationEffect.createPredefined(VibrationEffect.EFFECT_CLICK));
                } else if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
                    v.vibrate(VibrationEffect.createOneShot(40, VibrationEffect.DEFAULT_AMPLITUDE));
                } else {
                    v.vibrate(40);
                }
            }
        } catch (Exception ignored) {}
    }

    @Override
    public void onDestroy() {
        super.onDestroy();
        isServiceRunning = false;
        if (bubbleView != null && bubbleView.isAttachedToWindow()) {
            windowManager.removeView(bubbleView);
        }
        if (expandedView != null && expandedView.isAttachedToWindow()) {
            windowManager.removeView(expandedView);
        }
        if (dismissTargetView != null && dismissTargetView.isAttachedToWindow()) {
            windowManager.removeView(dismissTargetView);
        }
        RaidWidgetProvider.updateAllWidgets(this);
    }

    @Nullable
    @Override
    public IBinder onBind(Intent intent) {
        return null;
    }
}
