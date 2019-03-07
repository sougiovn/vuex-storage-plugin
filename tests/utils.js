import { createLocalVue } from '@vue/test-utils';
import Vuex from 'vuex';
import VuexStoragePlugin from './../src/vuex-storage-plugin';
import MockStorage from './mock-storage';
const Vue = createLocalVue();

Vue.use(Vuex);

export const mockStorage = new MockStorage();

export function newStore(storeConfig = {}, pluginConfig = {}) {
  return new Vuex.Store({
    plugins: [new VuexStoragePlugin({
      storage: mockStorage,
      ...pluginConfig
    })],
    ...storeConfig
  });
}