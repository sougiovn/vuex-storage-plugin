import Vue from 'vue';
import Vuex from 'vuex';
import VuexStoragePlugin from 'vuex-storage-plugin';

Vue.use(Vuex);

// rootState and static modules configuration
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

// dynamic modules configuration
store.registerModule('DynamicModule', {
  ...,
  populate: [],
  afterPopulate: () => {}
});
