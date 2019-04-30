import Vue from 'vue';
import Vuex from 'vuex';
import VuexStoragePlugin from 'vuex-storage-plugin';

Vue.use(Vuex);

const vuexStoragePluginConfig = {
  populate: [{
    attr: 'attr',
    mutation: 'setAttr'
  }]
};

const store = new Vuex.Store({
  plugins: [new VuexStoragePlugin(vuexStoragePluginConfig)],
  state() {
    return {
      attr: null
    }
  },
  mutations: {
    setAttr(state, payload) {
      state.attr = `bacon is ${payload}`;
    }
  }
});

store.commit('setAttr', 'love');