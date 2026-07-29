import { registerPlugin } from '@capacitor/core';

export interface OverlayPluginInterface {
  isPermissionGranted(): Promise<{ granted: boolean }>;
  requestPermission(): Promise<{ success: boolean }>;
  startOverlay(): Promise<{ started: boolean }>;
  stopOverlay(): Promise<{ stopped: boolean }>;
}

const OverlayPlugin = registerPlugin<OverlayPluginInterface>('OverlayPlugin');

export default OverlayPlugin;
