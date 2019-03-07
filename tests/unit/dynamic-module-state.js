import { newStore, mockStorage } from './../utils';
import { AttrEqualsMutationStoreConfig } from './../store-config';

const UnnamedModule = {
  populate: [{
    attr: 'UnnamedModule/attr',
    mutation: 'attr'
  }],
  ...AttrEqualsMutationStoreConfig,
};

const NamedModule = {
  namespaced: true,
  ...UnnamedModule,
  populate: ['NamedModule/attr'],
};

describe('Dynamic Modules', () => {
  describe.only('Unnamed module', () => {
    beforeEach(() => {
      mockStorage.clear();
    });

    it('should persist module state attr', () => {
      const store = newStore();

      store.registerModule('UnnamedModule', UnnamedModule);

      expect(mockStorage.getItem('vuex/UnnamedModule/attr')).toBeUndefined();

      store.commit('attr', 'bacon');

      expect(mockStorage.getItem('vuex/UnnamedModule/attr')).toBe('bacon');
    });

    it('should populate state from storage', () => {
      mockStorage.setItem('vuex/UnnamedModule/attr', 'bacon');

      const store = newStore();

      store.registerModule('UnnamedModule', UnnamedModule);

      expect(store.state.UnnamedModule.attr).toBe('bacon');
    });
  });

  describe('Named module', () => {
    beforeEach(() => {
      mockStorage.clear();
    });

    it('should persist module state attr', () => {
      const store = newStore();

      store.registerModule('NamedModule', NamedModule);

      expect(mockStorage.getItem('vuex/NamedModule/attr')).toBeUndefined();

      store.commit('NamedModule/attr', 'bacon');

      expect(mockStorage.getItem('vuex/NamedModule/attr')).toBe('bacon');
    });

    it('should populate state from storage', () => {
      mockStorage.setItem('vuex/NamedModule/attr', 'bacon');

      const store = newStore();

      store.registerModule('NamedModule', NamedModule);

      expect(store.state.NamedModule.attr).toBe('bacon');
    });
  });
});