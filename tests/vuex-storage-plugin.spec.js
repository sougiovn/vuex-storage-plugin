import MockStorage from './mock-storage';
import VuexStoragePlugin from '@/vuex-storage-plugin';
import { createLocalVue } from '@vue/test-utils';
import Vuex from 'vuex';

const Vue = createLocalVue();

Vue.use(Vuex);

function newStore() {
  return new Vuex.Store({
    plugins: [new VuexStoragePlugin({
      prefix: 'Test',
      storage: new MockStorage()
    })]
  });
}