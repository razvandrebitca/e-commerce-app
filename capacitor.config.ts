import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.commerce.app',
  appName: 'e-commerce-app',
  webDir: 'www',
  bundledWebRuntime: false,
  android: {
    allowMixedContent: true
  }
};

export default config;
