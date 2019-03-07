import VuexStoragePlugin from './../../src/vuex-storage-plugin';
import { newStore, mockStorage } from './../utils';
import { AttrEqualsMutationStoreConfig, CustomStateAttrAndMutationStoreConfig } from './../store-config';


describe('VuexStoragePlugin - creation and configuration', () => {
  describe('Plugin creation', () => {
    it('should throw error when no storage is provided', () => {
      expect(() => new VuexStoragePlugin()).toThrow();
    });

    it('should throw error when storage don\'t have setItem, getItem and removeItem methods', () => {
      expect(() => new VuexStoragePlugin({ storage: {} })).toThrow();
    });
  });

  describe('Using in store', () => {
    beforeEach(() => {
      mockStorage.clear();
    });

    describe('Basic configuration', () => {
      it('should use same string to lookup for storage and mutation', () => {
        const store = newStore(AttrEqualsMutationStoreConfig, {
          populate: ['attr']
        });

        expect(mockStorage.getItem('vuex/attr')).toBeUndefined();

        store.commit('attr', 'bacon');

        expect(mockStorage.getItem('vuex/attr')).toBe('bacon');
      });

      it('should populate state with storage value', () => {
        mockStorage.setItem('vuex/attr', 'bacon');

        const store = newStore(AttrEqualsMutationStoreConfig, {
          populate: ['attr']
        });

        expect(store.state.attr).toBe('bacon');
      });

      it('should populate state with null if storage value is undefined or null', () => {
        const store = newStore(AttrEqualsMutationStoreConfig, {
          populate: ['attr']
        });

        expect(store.state.attr).toBeNull();
      });
    });

    describe('Prefix configuration', () => {
      it('should use vuex prefix when no prefix is set', () => {
        const store = newStore(AttrEqualsMutationStoreConfig, {
          populate: ['attr']
        });

        expect(mockStorage.getItem('vuex/attr')).toBeUndefined();

        store.commit('attr', 'bacon');

        expect(mockStorage.getItem('vuex/attr')).toBe('bacon');
      });

      it('should use BaconApp as prefix to persist', () => {
        const store = newStore(AttrEqualsMutationStoreConfig, {
          prefix: 'BaconApp',
          populate: ['attr']
        });

        expect(mockStorage.getItem('BaconApp/attr')).toBeUndefined();

        store.commit('attr', 'bacon');

        expect(mockStorage.getItem('BaconApp/attr')).toBe('bacon');
      });
    });

    describe('Populate configuration', () => {
      describe('Configuration as object', () => {
        it('should use object to set value attr and mutation names', () => {
          const store = newStore(CustomStateAttrAndMutationStoreConfig, {
            populate: [{
              attr: 'attr',
              mutation: 'setAttr'
            }]
          });

          expect(mockStorage.getItem('vuex/attr')).toBeUndefined();

          store.commit('setAttr', 'bacon');

          expect(mockStorage.getItem('vuex/attr')).toBe('bacon');
        });

        it('should populate state with default value if value is null or undefined when loading plugin', () => {
          const store = newStore(CustomStateAttrAndMutationStoreConfig, {
            populate: [{
              attr: 'attr',
              mutation: 'setAttr',
              default: 'bacon'
            }]
          });

          expect(store.state.attr).toBe('bacon');
        });

        it('should use reduce function before persist value into storage', () => {
          const store = newStore(CustomStateAttrAndMutationStoreConfig, {
            populate: [{
              attr: 'attr',
              mutation: 'setAttr',
              reduce(value) {
                return `${value} is love`;
              }
            }]
          });

          expect(mockStorage.getItem('vuex/attr')).toBeUndefined();

          store.commit('setAttr', 'bacon');

          expect(mockStorage.getItem('vuex/attr')).toBe('bacon is love');
        });
      });
    });

    describe('RemoveIfNull configuration', () => {
      it('should call removeItem when mutation payload value after reduce is null', () => {
        const store = newStore(AttrEqualsMutationStoreConfig, {
          populate: ['attr']
        });

        expect(mockStorage.getItem('vuex/attr')).toBeUndefined();

        store.commit('attr', 'bacon');

        expect(mockStorage.getItem('vuex/attr')).toBe('bacon');

        store.commit('attr', null);

        expect(mockStorage.getItem('vuex/attr')).toBeUndefined();
      });

      it('should persist null value', () => {
        const store = newStore(AttrEqualsMutationStoreConfig, {
          populate: ['attr'],
          removeIfNull: false
        });

        expect(mockStorage.getItem('vuex/attr')).toBeUndefined();

        store.commit('attr', 'bacon');

        expect(mockStorage.getItem('vuex/attr')).toBe('bacon');

        store.commit('attr', null);

        expect(mockStorage.getItem('vuex/attr')).toBeNull();
      });
    });
  });
});
