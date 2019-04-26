import Vue from 'vue';
import Vuex from 'vuex';
import VuexStoragePlugin from './../../../../src/vuex-storage-plugin';
import UnnamedModule from './unnamed';
import NamedModule from './named';

Vue.use(Vuex);

export default new Vuex.Store({
  plugins: [
    new VuexStoragePlugin({
      prefix: 'Demo',
      storage: sessionStorage,
      populate: [
        {
          attr: 'globalAttr',
          mutation: 'setGlobalAttr'
        },
        ...UnnamedModule.populate,
        ...NamedModule.populate
      ]
    })
  ],
  modules: {
    UnnamedModule,
    NamedModule
  },
  state: {
    globalAttr: null
  },
  mutations: {
    setGlobalAttr(state, attr) {
      state.globalAttr = attr;
    }
  }
});
