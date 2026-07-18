package com.pokego.eventtracker;

import android.app.PendingIntent;
import android.appwidget.AppWidgetManager;
import android.appwidget.AppWidgetProvider;
import android.content.ComponentName;
import android.content.Context;
import android.content.Intent;
import android.os.Build;
import android.os.Handler;
import android.os.Looper;
import android.util.Log;
import android.view.View;
import android.widget.RemoteViews;

import org.json.JSONArray;
import org.json.JSONObject;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.Locale;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;

public class EventWidgetProvider extends AppWidgetProvider {
    private static final String TAG = "EventWidgetProvider";
    private static final String ACTION_REFRESH = "com.pokego.eventtracker.ACTION_REFRESH";
    private static final String API_URL = "https://pogo-tracker-backend-1084389140873.europe-west3.run.app/api/events";
    
    private final ExecutorService executorService = Executors.newSingleThreadExecutor();
    private final Handler mainHandler = new Handler(Looper.getMainLooper());

    @Override
    public void onUpdate(Context context, AppWidgetManager appWidgetManager, int[] appWidgetIds) {
        for (int appWidgetId : appWidgetIds) {
            updateAppWidget(context, appWidgetManager, appWidgetId);
        }
    }

    @Override
    public void onReceive(Context context, Intent intent) {
        super.onReceive(context, intent);
        if (ACTION_REFRESH.equals(intent.getAction())) {
            AppWidgetManager appWidgetManager = AppWidgetManager.getInstance(context);
            int[] appWidgetIds = appWidgetManager.getAppWidgetIds(new ComponentName(context, EventWidgetProvider.class));
            
            // Show loading state (progressbar)
            for (int appWidgetId : appWidgetIds) {
                RemoteViews views = new RemoteViews(context.getPackageName(), R.layout.event_widget_layout);
                views.setViewVisibility(R.id.widget_progress_bar, View.VISIBLE);
                appWidgetManager.partiallyUpdateAppWidget(appWidgetId, views);
            }
            
            // Trigger update
            onUpdate(context, appWidgetManager, appWidgetIds);
        }
    }

    private void updateAppWidget(Context context, AppWidgetManager appWidgetManager, int appWidgetId) {
        RemoteViews views = new RemoteViews(context.getPackageName(), R.layout.event_widget_layout);

        // Setup Refresh button pending intent
        Intent refreshIntent = new Intent(context, EventWidgetProvider.class);
        refreshIntent.setAction(ACTION_REFRESH);
        
        int pendingFlags = PendingIntent.FLAG_UPDATE_CURRENT;
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.M) {
            pendingFlags |= PendingIntent.FLAG_IMMUTABLE;
        }
        PendingIntent pendingIntent = PendingIntent.getBroadcast(context, 0, refreshIntent, pendingFlags);
        views.setOnClickPendingIntent(R.id.widget_refresh_btn, pendingIntent);
        
        // Setup App Launcher pending intent (clicking on title launches app)
        Intent appIntent = new Intent(context, MainActivity.class);
        PendingIntent appPendingIntent = PendingIntent.getActivity(context, 1, appIntent, pendingFlags);
        views.setOnClickPendingIntent(R.id.widget_title, appPendingIntent);

        // Run network operation in background
        fetchEventsAsync(context, appWidgetManager, appWidgetId, views);
    }

    private void fetchEventsAsync(Context context, AppWidgetManager appWidgetManager, int appWidgetId, RemoteViews views) {
        executorService.execute(() -> {
            String jsonResponse = null;
            HttpURLConnection connection = null;
            try {
                URL url = new URL(API_URL);
                connection = (HttpURLConnection) url.openConnection();
                connection.setRequestMethod("GET");
                connection.setConnectTimeout(10000);
                connection.setReadTimeout(10000);
                connection.connect();

                int responseCode = connection.getResponseCode();
                if (responseCode == HttpURLConnection.HTTP_OK) {
                    BufferedReader reader = new BufferedReader(new InputStreamReader(connection.getInputStream()));
                    StringBuilder stringBuilder = new StringBuilder();
                    String line;
                    while ((line = reader.readLine()) != null) {
                        stringBuilder.append(line);
                    }
                    reader.close();
                    jsonResponse = stringBuilder.toString();
                }
            } catch (Exception e) {
                Log.e(TAG, "Failed fetching events", e);
            } finally {
                if (connection != null) {
                    connection.disconnect();
                }
            }

            final String result = jsonResponse;
            mainHandler.post(() -> updateWidgetUI(context, appWidgetManager, appWidgetId, views, result));
        });
    }

    private Date parseDate(String dateStr) {
        if (dateStr == null) return null;
        String cleaned = dateStr.replace("Z", "");
        if (cleaned.contains("+")) {
            cleaned = cleaned.substring(0, cleaned.indexOf("+"));
        }
        
        String[] formats = {
            "yyyy-MM-dd'T'HH:mm:ss.SSS",
            "yyyy-MM-dd'T'HH:mm:ss",
            "yyyy-MM-dd HH:mm:ss",
            "yyyy-MM-dd"
        };
        for (String format : formats) {
            try {
                SimpleDateFormat sdf = new SimpleDateFormat(format, Locale.US);
                return sdf.parse(cleaned);
            } catch (Exception ignored) {}
        }
        return null;
    }

    private void updateWidgetUI(Context context, AppWidgetManager appWidgetManager, int appWidgetId, RemoteViews views, String json) {
        // Hide progress bar
        views.setViewVisibility(R.id.widget_progress_bar, View.GONE);
        
        if (json == null) {
            views.setTextViewText(R.id.widget_event_title_1, "Chyba připojení");
            views.setTextViewText(R.id.widget_event_time_1, "Nepodařilo se načíst data z internetu.");
            views.setTextViewText(R.id.widget_event_title_2, "");
            views.setTextViewText(R.id.widget_event_time_2, "");
            views.setTextViewText(R.id.widget_event_title_3, "");
            views.setTextViewText(R.id.widget_event_time_3, "");
        } else {
            try {
                JSONArray eventsArray = new JSONArray(json);
                long now = System.currentTimeMillis();
                
                ArrayList<JSONObject> activeEvents = new ArrayList<>();
                ArrayList<JSONObject> upcomingEvents = new ArrayList<>();

                for (int i = 0; i < eventsArray.length(); i++) {
                    JSONObject event = eventsArray.getJSONObject(i);
                    String startStr = event.optString("start");
                    String endStr = event.optString("end");
                    
                    Date startDate = parseDate(startStr);
                    Date endDate = parseDate(endStr);

                    if (startDate != null && endDate != null) {
                        long startTime = startDate.getTime();
                        long endTime = endDate.getTime();
                        
                        if (now >= startTime && now <= endTime) {
                            activeEvents.add(event);
                        } else if (startTime > now) {
                            upcomingEvents.add(event);
                        }
                    }
                }

                // Show active first, then fill with upcoming
                ArrayList<JSONObject> displayEvents = new ArrayList<>(activeEvents);
                if (displayEvents.size() < 3) {
                    displayEvents.addAll(upcomingEvents);
                }

                int displayCount = Math.min(displayEvents.size(), 3);
                
                // Clear all slots first
                views.setTextViewText(R.id.widget_event_title_1, "");
                views.setTextViewText(R.id.widget_event_time_1, "");
                views.setTextViewText(R.id.widget_event_title_2, "");
                views.setTextViewText(R.id.widget_event_time_2, "");
                views.setTextViewText(R.id.widget_event_title_3, "");
                views.setTextViewText(R.id.widget_event_time_3, "");

                int[] titleIds = {R.id.widget_event_title_1, R.id.widget_event_title_2, R.id.widget_event_title_3};
                int[] timeIds = {R.id.widget_event_time_1, R.id.widget_event_time_2, R.id.widget_event_time_3};

                if (displayCount == 0) {
                    views.setTextViewText(titleIds[0], "Žádné aktivní eventy");
                    views.setTextViewText(timeIds[0], "Všechny eventy skončily.");
                } else {
                    SimpleDateFormat displayFormat = new SimpleDateFormat("d. M. H:mm", Locale.getDefault());
                    
                    for (int j = 0; j < displayCount; j++) {
                        JSONObject event = displayEvents.get(j);
                        String name = event.optString("name", "Neznámý event");
                        String startStr = event.optString("start");
                        String endStr = event.optString("end");

                        Date startDate = parseDate(startStr);
                        Date endDate = parseDate(endStr);

                        String timeText = "";
                        boolean isActive = false;
                        if (startDate != null && endDate != null) {
                            long startTime = startDate.getTime();
                            long endTime = endDate.getTime();
                            if (now >= startTime && now <= endTime) {
                                isActive = true;
                                timeText = "Končí: " + displayFormat.format(endDate);
                            } else {
                                timeText = "Začíná: " + displayFormat.format(startDate);
                            }
                        }

                        String displayName = (isActive ? "🟢 " : "🗓️ ") + name;
                        views.setTextViewText(titleIds[j], displayName);
                        views.setTextViewText(timeIds[j], timeText);
                    }
                }

            } catch (Exception e) {
                Log.e(TAG, "Error parsing events JSON", e);
                views.setTextViewText(R.id.widget_event_title_1, "Chyba dat");
                views.setTextViewText(R.id.widget_event_time_1, "Chyba při zpracování seznamu událostí.");
            }
        }

        // Set Last updated time in Czech/Default locale
        SimpleDateFormat localTimeFormat = new SimpleDateFormat("HH:mm:ss", Locale.getDefault());
        views.setTextViewText(R.id.widget_last_updated, "Aktualizováno: " + localTimeFormat.format(new Date()));

        // Push update to manager
        appWidgetManager.updateAppWidget(appWidgetId, views);
    }
}
