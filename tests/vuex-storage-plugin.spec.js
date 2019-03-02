import MockStorage from './mock-storage';
import VuexStoragePlugin from '@/vuex-storage-plugin';
import { createLocalVue } from '@vue/test-utils';
import Vuex from 'vuex';

const Vue = createLocalVue();

Vue.use(Vuex);

let globalStorage;

function newStore() {
  return new Vuex.Store({
    plugins: [new VuexStoragePlugin({
      prefix: 'Test',
      storage: globalStorage
    })]
  });
}

function clearGlobalStorage() {
  globalStorage = new MockStorage();
}