import Vue from 'vue';
import Vuex from 'vuex';
import VuexStoragePlugin from 'vuex-storage-plugin';

Vue.use(Vuex);

const vuexStoragePluginConfig = {
  storage: localStorage,
  populate: ['attr']
};

const store = new Vuex.Store({
  plugins: [new VuexStoragePlugin(vuexStoragePluginConfig)],
  modules: {
    UnnamedModule,
    NamedModule,
  },
  state() {
    return {
      attr: null
    }
  },
  mutations: {
    attr(state, value) {
      state.attr = value;
    }
  }
});

...

store.commit('attr', 'attrs new value');
