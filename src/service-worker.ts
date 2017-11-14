import * as OfflinePluginRuntime from 'offline-plugin/runtime';

if ('serviceWorker' in window.navigator) {
  OfflinePluginRuntime.install({
    onUpdateReady() {
      console.log('SW Event:', 'onUpdateReady');
      OfflinePluginRuntime.applyUpdate();
    },
    onUpdated() {
      window.location.reload();
    },
  });
}
