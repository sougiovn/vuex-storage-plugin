import Vue from 'vue';
import Vuex from 'vuex';
import VuexStoragePlugin from 'vuex-storage-plugin';

Vue.use(Vuex);

const vuexStoragePluginConfig = {
  storage: localStorage
};

const store = new Vuex.Store({
  plugins: [new VuexStoragePlugin(vuexStoragePluginConfig)]
});

...

// unnamespaced module
store.registerModule('UnnamedModule', {
  state() {
    return {
      attr: null
    }
  },
  mutations: {
    attr(state, value) {
      state.attr = value;
    }
  },
  populate: ['attr']
});

store.commit('attr', 'unnamed attrs new value');

// namespaced module
store.registerModule('NamedModule', {
  namespaced: true,
  state() {
    return {
      attr: null
    }
  },
  mutations: {
    attr(state, value) {
      state.attr = value;
    }
  },
  populate: ['attr']
});

store.commit('NamedModule/attr', 'named attrs new value');
