import { newStore, mockStorage } from './../utils';
import { AttrEqualsMutationStoreConfig } from './../store-config';

const UnnamedModule = AttrEqualsMutationStoreConfig;

const NamedModule = {
  namespaced: true,
  ...UnnamedModule
};

describe('Static Modules', () => {
  describe('Unnamed module', () => {
    beforeEach(() => {
      mockStorage.clear();
    });

    it('should persist module state attr', () => {
      const store = newStore({
        modules: {
          UnnamedModule
        }
      }, {
        populate: [{
          attr: 'UnnamedModule/attr',
          mutation: 'attr'
        }]
      });

      expect(mockStorage.getItem('vuex/UnnamedModule/attr')).toBeUndefined();

      store.commit('attr', 'bacon');

      expect(mockStorage.getItem('vuex/UnnamedModule/attr')).toBe('bacon');
    });

    it('should populate state from storage', () => {
      mockStorage.setItem('vuex/UnnamedModule/attr', 'bacon');

      const store = newStore({
        modules: {
          UnnamedModule
        }
      }, {
        populate: [{
          attr: 'UnnamedModule/attr',
          mutation: 'attr'
        }]
      });

      expect(store.state.UnnamedModule.attr).toBe('bacon');
    });
  });

  describe('Named module', () => {
    beforeEach(() => {
      mockStorage.clear();
    });

    it('should persist module state attr', () => {
      const store = newStore({
        modules: {
          NamedModule
        }
      }, {
        populate: ['NamedModule/attr']
      });

      expect(mockStorage.getItem('vuex/NamedModule/attr')).toBeUndefined();

      store.commit('NamedModule/attr', 'bacon');

      expect(mockStorage.getItem('vuex/NamedModule/attr')).toBe('bacon');
    });

    it('should populate state from storage', () => {
      mockStorage.setItem('vuex/NamedModule/attr', 'bacon');

      const store = newStore({
        modules: {
          NamedModule
        }
      }, {
        populate: ['NamedModule/attr']
      });

      expect(store.state.NamedModule.attr).toBe('bacon');
    });
  });
});