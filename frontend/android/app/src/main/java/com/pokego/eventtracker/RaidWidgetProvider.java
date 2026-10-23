package com.pokego.eventtracker;

import android.app.PendingIntent;
import android.appwidget.AppWidgetManager;
import android.appwidget.AppWidgetProvider;
import android.content.ClipData;
import android.content.ClipboardManager;
import android.content.ComponentName;
import android.content.Context;
import android.content.Intent;
import android.content.SharedPreferences;
import android.os.Build;
import android.os.VibrationEffect;
import android.os.Vibrator;
import android.provider.Settings;
import android.util.Log;
import android.view.View;
import android.widget.RemoteViews;
import android.widget.Toast;

import org.json.JSONArray;
import org.json.JSONObject;

public class RaidWidgetProvider extends AppWidgetProvider {
    private static final String TAG = "RaidWidgetProvider";
    public static final String ACTION_REFRESH_RAIDS = "com.pokego.eventtracker.ACTION_REFRESH_RAIDS";
    public static final String ACTION_COPY_FILTER = "com.pokego.eventtracker.ACTION_COPY_FILTER";
    public static final String ACTION_TOGGLE_OVERLAY = "com.pokego.eventtracker.ACTION_TOGGLE_OVERLAY";
    public static final String EXTRA_FILTER_STRING = "extra_filter_string";
    public static final String EXTRA_BOSS_NAME = "extra_boss_name";

    private static final String PREFS_NAME = "pogo_overlay_data";
    private static final String KEY_RAIDS_JSON = "cached_raids_json";

    @Override
    public void onUpdate(Context context, AppWidgetManager appWidgetManager, int[] appWidgetIds) {
        for (int appWidgetId : appWidgetIds) {
            updateRaidWidget(context, appWidgetManager, appWidgetId);
        }
    }

    @Override
    public void onReceive(Context context, Intent intent) {
        super.onReceive(context, intent);
        String action = intent != null ? intent.getAction() : null;
        if (action == null) return;

        if (ACTION_COPY_FILTER.equals(action)) {
            String filterString = intent.getStringExtra(EXTRA_FILTER_STRING);
            String bossName = intent.getStringExtra(EXTRA_BOSS_NAME);
            if (filterString != null && !filterString.isEmpty()) {
                ClipboardManager clipboard = (ClipboardManager) context.getSystemService(Context.CLIPBOARD_SERVICE);
                if (clipboard != null) {
                    ClipData clip = ClipData.newPlainText("PoGo Filter", filterString);
                    clipboard.setPrimaryClip(clip);

                    // Haptic feedback
                    try {
                        Vibrator v = (Vibrator) context.getSystemService(Context.VIBRATOR_SERVICE);
                        if (v != null) {
                            if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
                                v.vibrate(VibrationEffect.createOneShot(40, VibrationEffect.DEFAULT_AMPLITUDE));
                            } else {
                                v.vibrate(40);
                            }
                        }
                    } catch (Exception ignored) {}

                    String msg = bossName != null ? ("Filtr pro " + bossName + " zkopírován!") : "Raid filtr zkopírován!";
                    Toast.makeText(context, msg, Toast.LENGTH_SHORT).show();
                }
            }
        } else if (ACTION_TOGGLE_OVERLAY.equals(action)) {
            if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.M && !Settings.canDrawOverlays(context)) {
                Intent appIntent = new Intent(context, MainActivity.class);
                appIntent.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
                context.startActivity(appIntent);
                Toast.makeText(context, "Povolte vykreslování přes aplikace v nastavení.", Toast.LENGTH_LONG).show();
                return;
            }

            Intent overlayIntent = new Intent(context, OverlayService.class);
            if (OverlayService.isServiceRunning) {
                context.stopService(overlayIntent);
                Toast.makeText(context, "Plovoucí asistent vypnut", Toast.LENGTH_SHORT).show();
            } else {
                if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
                    context.startForegroundService(overlayIntent);
                } else {
                    context.startService(overlayIntent);
                }
                Toast.makeText(context, "Plovoucí asistent spuštěn nad hrou!", Toast.LENGTH_SHORT).show();
            }

            // Refresh widgets to update toggle status
            updateAllWidgets(context);
        } else if (ACTION_REFRESH_RAIDS.equals(action)) {
            updateAllWidgets(context);
        }
    }

    public static void updateAllWidgets(Context context) {
        AppWidgetManager appWidgetManager = AppWidgetManager.getInstance(context);
        int[] appWidgetIds = appWidgetManager.getAppWidgetIds(new ComponentName(context, RaidWidgetProvider.class));
        for (int id : appWidgetIds) {
            updateRaidWidget(context, appWidgetManager, id);
        }
    }

    private static void updateRaidWidget(Context context, AppWidgetManager appWidgetManager, int appWidgetId) {
        RemoteViews views = new RemoteViews(context.getPackageName(), R.layout.raid_widget_layout);

        int pendingFlags = PendingIntent.FLAG_UPDATE_CURRENT;
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.M) {
            pendingFlags |= PendingIntent.FLAG_IMMUTABLE;
        }

        // 1. App Launcher (Title click)
        Intent appIntent = new Intent(context, MainActivity.class);
        PendingIntent appPendingIntent = PendingIntent.getActivity(context, 10, appIntent, pendingFlags);
        views.setOnClickPendingIntent(R.id.widget_raid_title, appPendingIntent);

        // 2. Refresh Button
        Intent refreshIntent = new Intent(context, RaidWidgetProvider.class);
        refreshIntent.setAction(ACTION_REFRESH_RAIDS);
        PendingIntent refreshPending = PendingIntent.getBroadcast(context, 11, refreshIntent, pendingFlags);
        views.setOnClickPendingIntent(R.id.widget_refresh_raids_btn, refreshPending);

        // 3. Toggle Overlay Button
        Intent toggleIntent = new Intent(context, RaidWidgetProvider.class);
        toggleIntent.setAction(ACTION_TOGGLE_OVERLAY);
        PendingIntent togglePending = PendingIntent.getBroadcast(context, 12, toggleIntent, pendingFlags);
        views.setOnClickPendingIntent(R.id.widget_toggle_overlay_btn, togglePending);

        boolean isRunning = OverlayService.isServiceRunning;
        views.setTextViewText(R.id.widget_toggle_overlay_btn, isRunning ? "✕ Vypnout" : "⚡ Bublina");

        // 4. Load cached raid data from SharedPreferences
        SharedPreferences prefs = context.getSharedPreferences(PREFS_NAME, Context.MODE_PRIVATE);
        String raidsJsonStr = prefs.getString(KEY_RAIDS_JSON, null);

        String boss1Name = "⭐ 5★ Kyurem";
        String boss1Weaknesses = "Slabosti: Fighting, Rock, Steel, Dragon, Fairy";
        String boss1Filter = "3*,4*&@1fighting,@1rock,@1steel,@1dragon,@1fairy&448,639,376,384,643&!@frustration";

        String boss2Name = "🧬 Mega Aggron";
        String boss2Weaknesses = "Slabosti: Fighting, Ground, Fire";
        String boss2Filter = "3*,4*&@1fighting,@1ground,@1fire&257,639,383,448,530&!@frustration";

        if (raidsJsonStr != null && !raidsJsonStr.isEmpty()) {
            try {
                JSONArray array = new JSONArray(raidsJsonStr);
                boolean found5Star = false;
                boolean foundMega = false;

                for (int i = 0; i < array.length(); i++) {
                    JSONObject obj = array.getJSONObject(i);
                    String name = obj.optString("name", "");
                    String tier = obj.optString("tier", "").toLowerCase();
                    String filter = obj.optString("filterString", "");
                    JSONArray wArr = obj.optJSONArray("weaknesses");
                    StringBuilder wSb = new StringBuilder();
                    if (wArr != null) {
                        for (int j = 0; j < wArr.length(); j++) {
                            if (j > 0) wSb.append(", ");
                            wSb.append(wArr.getString(j));
                        }
                    }

                    boolean isMega = tier.contains("mega") || tier.contains("primal") || name.toLowerCase().startsWith("mega ");
                    if (isMega && !foundMega) {
                        boss2Name = "🧬 " + name;
                        if (wSb.length() > 0) boss2Weaknesses = "Slabosti: " + wSb.toString();
                        if (!filter.isEmpty()) boss2Filter = filter;
                        foundMega = true;
                    } else if (!isMega && !found5Star) {
                        boss1Name = "⭐ 5★ " + name;
                        if (wSb.length() > 0) boss1Weaknesses = "Slabosti: " + wSb.toString();
                        if (!filter.isEmpty()) boss1Filter = filter;
                        found5Star = true;
                    }
                }
            } catch (Exception e) {
                Log.e(TAG, "Error parsing cached raids for widget", e);
            }
        }

        views.setTextViewText(R.id.widget_boss_name_1, boss1Name);
        views.setTextViewText(R.id.widget_boss_weaknesses_1, boss1Weaknesses);

        Intent copy1Intent = new Intent(context, RaidWidgetProvider.class);
        copy1Intent.setAction(ACTION_COPY_FILTER);
        copy1Intent.putExtra(EXTRA_BOSS_NAME, boss1Name);
        copy1Intent.putExtra(EXTRA_FILTER_STRING, boss1Filter);
        PendingIntent copy1Pending = PendingIntent.getBroadcast(context, 101, copy1Intent, pendingFlags);
        views.setOnClickPendingIntent(R.id.widget_copy_btn_1, copy1Pending);

        views.setTextViewText(R.id.widget_boss_name_2, boss2Name);
        views.setTextViewText(R.id.widget_boss_weaknesses_2, boss2Weaknesses);

        Intent copy2Intent = new Intent(context, RaidWidgetProvider.class);
        copy2Intent.setAction(ACTION_COPY_FILTER);
        copy2Intent.putExtra(EXTRA_BOSS_NAME, boss2Name);
        copy2Intent.putExtra(EXTRA_FILTER_STRING, boss2Filter);
        PendingIntent copy2Pending = PendingIntent.getBroadcast(context, 102, copy2Intent, pendingFlags);
        views.setOnClickPendingIntent(R.id.widget_copy_btn_2, copy2Pending);

        appWidgetManager.updateAppWidget(appWidgetId, views);
    }
}
