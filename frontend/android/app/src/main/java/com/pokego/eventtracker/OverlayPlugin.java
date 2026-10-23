package com.pokego.eventtracker;

import android.content.Context;
import android.content.Intent;
import android.content.SharedPreferences;
import android.net.Uri;
import android.os.Build;
import android.provider.Settings;

import com.getcapacitor.JSArray;
import com.getcapacitor.JSObject;
import com.getcapacitor.Plugin;
import com.getcapacitor.PluginCall;
import com.getcapacitor.PluginMethod;
import com.getcapacitor.annotation.CapacitorPlugin;

@CapacitorPlugin(name = "OverlayPlugin")
public class OverlayPlugin extends Plugin {
    private static final String PREFS_NAME = "pogo_overlay_data";
    private static final String KEY_RAIDS_JSON = "cached_raids_json";

    @PluginMethod
    public void isPermissionGranted(PluginCall call) {
        Context context = getContext();
        boolean granted = true;
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.M) {
            granted = Settings.canDrawOverlays(context);
        }
        JSObject ret = new JSObject();
        ret.put("granted", granted);
        call.resolve(ret);
    }

    @PluginMethod
    public void requestPermission(PluginCall call) {
        Context context = getContext();
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.M) {
            if (!Settings.canDrawOverlays(context)) {
                Intent intent = new Intent(Settings.ACTION_MANAGE_OVERLAY_PERMISSION,
                        Uri.parse("package:" + context.getPackageName()));
                intent.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
                context.startActivity(intent);
            }
        }
        JSObject ret = new JSObject();
        ret.put("success", true);
        call.resolve(ret);
    }

    @PluginMethod
    public void isOverlayRunning(PluginCall call) {
        JSObject ret = new JSObject();
        ret.put("running", OverlayService.isServiceRunning);
        call.resolve(ret);
    }

    @PluginMethod
    public void startOverlay(PluginCall call) {
        Context context = getContext();
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.M && !Settings.canDrawOverlays(context)) {
            call.reject("Permission not granted to draw over other apps");
            return;
        }

        String lang = call.getString("lang", "cs");
        Intent intent = new Intent(context, OverlayService.class);
        intent.putExtra("lang", lang);

        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
            context.startForegroundService(intent);
        } else {
            context.startService(intent);
        }

        RaidWidgetProvider.updateAllWidgets(context);

        JSObject ret = new JSObject();
        ret.put("started", true);
        call.resolve(ret);
    }

    @PluginMethod
    public void updateLanguage(PluginCall call) {
        Context context = getContext();
        String lang = call.getString("lang", "cs");
        Intent intent = new Intent(context, OverlayService.class);
        intent.putExtra("lang", lang);

        if (OverlayService.isServiceRunning) {
            if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
                context.startForegroundService(intent);
            } else {
                context.startService(intent);
            }
        }

        JSObject ret = new JSObject();
        ret.put("success", true);
        call.resolve(ret);
    }

    @PluginMethod
    public void stopOverlay(PluginCall call) {
        Context context = getContext();
        Intent intent = new Intent(context, OverlayService.class);
        context.stopService(intent);

        RaidWidgetProvider.updateAllWidgets(context);

        JSObject ret = new JSObject();
        ret.put("stopped", true);
        call.resolve(ret);
    }

    @PluginMethod
    public void syncRaidData(PluginCall call) {
        Context context = getContext();
        JSArray bosses = call.getArray("bosses");

        if (bosses != null) {
            SharedPreferences prefs = context.getSharedPreferences(PREFS_NAME, Context.MODE_PRIVATE);
            prefs.edit().putString(KEY_RAIDS_JSON, bosses.toString()).apply();

            // 1. Notify running overlay to reload data
            if (OverlayService.isServiceRunning) {
                Intent reloadIntent = new Intent(context, OverlayService.class);
                reloadIntent.setAction(OverlayService.ACTION_RELOAD_DATA);
                context.startService(reloadIntent);
            }

            // 2. Update home screen widgets with fresh raid counters
            RaidWidgetProvider.updateAllWidgets(context);
        }

        JSObject ret = new JSObject();
        ret.put("success", true);
        call.resolve(ret);
    }
}
