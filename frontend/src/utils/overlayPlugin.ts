import { registerPlugin, WebPlugin } from '@capacitor/core';

export interface SyncedRaidBossItem {
  name: string;
  tier: string;
  types: string[];
  weaknesses: string[];
  filterString: string;
  universalFilter?: string;
  budgetFilter?: string;
  hardcoreFilter?: string;
}

export interface OverlayPluginInterface {
  isPermissionGranted(): Promise<{ granted: boolean }>;
  requestPermission(): Promise<{ success: boolean }>;
  isOverlayRunning(): Promise<{ running: boolean }>;
  startOverlay(options?: { lang?: string }): Promise<{ started: boolean }>;
  updateLanguage(options: { lang: string }): Promise<{ success: boolean }>;
  stopOverlay(): Promise<{ stopped: boolean }>;
  syncRaidData(options: { bosses: SyncedRaidBossItem[]; lang?: string }): Promise<{ success: boolean }>;
}

export class OverlayPluginWeb extends WebPlugin implements OverlayPluginInterface {
  async isPermissionGranted(): Promise<{ granted: boolean }> {
    return { granted: false };
  }
  async requestPermission(): Promise<{ success: boolean }> {
    return { success: false };
  }
  async isOverlayRunning(): Promise<{ running: boolean }> {
    return { running: false };
  }
  async startOverlay(_options?: { lang?: string }): Promise<{ started: boolean }> {
    return { started: false };
  }
  async updateLanguage(_options: { lang: string }): Promise<{ success: boolean }> {
    return { success: true };
  }
  async stopOverlay(): Promise<{ stopped: boolean }> {
    return { stopped: true };
  }
  async syncRaidData(_options: { bosses: SyncedRaidBossItem[]; lang?: string }): Promise<{ success: boolean }> {
    return { success: true };
  }
}

const OverlayPlugin = registerPlugin<OverlayPluginInterface>('OverlayPlugin', {
  web: () => new OverlayPluginWeb()
});

export default OverlayPlugin;
