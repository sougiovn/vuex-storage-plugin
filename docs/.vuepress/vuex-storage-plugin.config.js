// ~/plugins/vuex-storage-plugin.config.js

import VuexStoragePlugin from 'vuex-storage-plugin';

export default ({store}) => {
  window.onNuxtReady(() => {
    VuexStoragePlugin({...})(store);
  });
}