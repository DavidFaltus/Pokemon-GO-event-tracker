import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.pokego.eventtracker',
  appName: 'PokeGO Event Tracker',
  webDir: 'dist',
  /*
  // Pro lokální vývoj s live-reloadem odkomentujte tento blok:
  server: {
    url: 'http://192.168.0.102:5173',
    cleartext: true
  }
  */
};

export default config;
