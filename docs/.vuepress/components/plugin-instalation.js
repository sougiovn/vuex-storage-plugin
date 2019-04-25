import Vue from 'vue';
import Vuex from 'vuex';
import VuexStoragePlugin from 'vuex-storage-plugin';

Vue.use(Vuex);

const vuexStoragePluginConfig = {
  prefix: 'vuex',
  storage: {},
  removeIfNull: true,
  populate: [],
  afterPopulate: () => {}
};

const store = new Vuex.Store({
  plugins: [new VuexStoragePlugin(vuexStoragePluginConfig)]
});

...

store.registerModule('DynamicModule', {
  ...,
  populate: [],
  afterPopulate: () => {}
});
