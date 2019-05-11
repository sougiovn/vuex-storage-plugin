import VuexStoragePlugin from './../../../../src/vuex-storage-plugin';
import { singletonMockStorage } from '../../../mock-storage';

export const plugins = [
  VuexStoragePlugin({
    storage: MockStorage,
    populate: ['attr']
  })
];

export function state() {
  return {
    attr: null
  };
}

export const mutations = {
  attr(state, payload) {
    state.attr = payload;
  }
};
