import { registerPlugin } from '@capacitor/core';

export interface OverlayPluginInterface {
  isPermissionGranted(): Promise<{ granted: boolean }>;
  requestPermission(): Promise<{ success: boolean }>;
  startOverlay(options?: { lang?: string }): Promise<{ started: boolean }>;
  updateLanguage(options: { lang: string }): Promise<{ success: boolean }>;
  stopOverlay(): Promise<{ stopped: boolean }>;
}

const OverlayPlugin = registerPlugin<OverlayPluginInterface>('OverlayPlugin');

export default OverlayPlugin;
