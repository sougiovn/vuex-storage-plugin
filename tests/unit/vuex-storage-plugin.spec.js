import VuexStoragePlugin from './../../src/vuex-storage-plugin';
import { newStore, mockStorage } from './../utils';
import { AttrEqualsMutationStoreConfig, CustomStateAttrAndMutationStoreConfig } from './../store-config';


describe('VuexStoragePlugin', () => {
  describe('Plugin creation', () => {
    it('should throw error when no storage is provided', () => {
      expect(() => new VuexStoragePlugin()).toThrow();
    });

    it('should throw error when storage don\'t have setItem, getItem and removeItem methods', () => {
      expect(() => new VuexStoragePlugin({ storage: {} })).toThrow();
    });
  });

  describe('Plugin usage', () => {
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

    describe('Populate configuration as object', () => {
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

    describe('Static Modules', () => {
      const UnnamedModule = AttrEqualsMutationStoreConfig;

      const NamedModule = {
        namespaced: true,
        ...UnnamedModule
      };

      it('Should invoke afterPopulate passing the rootStore as unique parameter', () => {
        const afterPopulate = jest.fn();

        const store = newStore(AttrEqualsMutationStoreConfig, {
          populate: ['attr'],
          afterPopulate
        });

        expect(afterPopulate.mock.calls.length).toBe(1);
        expect(afterPopulate.mock.calls[0].length).toBe(1);
        expect(afterPopulate.mock.calls[0][0]).toBe(store);
      });

      describe('Unnamed module', () => {
        it('should persist module state attr', () => {
          const store = newStore({
            modules: {
              UnnamedModule
            }
          }, {
            populate: [{
              module: 'UnnamedModule',
              attr: 'attr',
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
              module: 'UnnamedModule',
              attr: 'attr',
              mutation: 'attr'
            }]
          });

          expect(store.state.UnnamedModule.attr).toBe('bacon');
        });
      });

      describe('Named module', () => {
        it('should persist module state attr', () => {
          const store = newStore({
            modules: {
              NamedModule
            }
          }, {
            populate: [{
              module: 'NamedModule',
              attr: 'attr',
              mutation: 'attr'
            }]
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
            populate: [{
              module: 'NamedModule',
              attr: 'attr',
              mutation: 'attr'
            }]
          });

          expect(store.state.NamedModule.attr).toBe('bacon');
        });
      });
    });

    describe('Dynamic Modules', () => {
      const UnnamedModule = {
        populate: ['attr'],
        ...AttrEqualsMutationStoreConfig,
      };

      const NamedModule = {
        namespaced: true,
        ...UnnamedModule
      };

      describe('Unnamed module', () => {
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

        it('Should invoke afterPopulate passing the rootStore as unique parameter', () => {
          const afterPopulate = jest.fn();

          const store = newStore();

          store.registerModule('UnnamedModule', {
            ...UnnamedModule,
            afterPopulate
          });

          expect(afterPopulate.mock.calls.length).toBe(1);
          expect(afterPopulate.mock.calls[0].length).toBe(1);
          expect(afterPopulate.mock.calls[0][0]).toBe(store);
        });
      });

      describe('Named module', () => {
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

        it('Should invoke afterPopulate passing the module as firts parameter and rootStore as second parameter', () => {
          const afterPopulate = jest.fn();

          const store = newStore();

          store.registerModule('NamedModule', {
            ...NamedModule,
            afterPopulate
          });

          expect(afterPopulate.mock.calls.length).toBe(1);
          expect(afterPopulate.mock.calls[0].length).toBe(2);
          expect(afterPopulate.mock.calls[0][0]).toHaveProperty('dispatch');
          expect(afterPopulate.mock.calls[0][0]).toHaveProperty('commit');
          expect(afterPopulate.mock.calls[0][0]).toHaveProperty('getters');
          expect(afterPopulate.mock.calls[0][0]).toHaveProperty('state');
          expect(afterPopulate.mock.calls[0][1]).toBe(store);
        });
      });

      describe('Nested Modules', () => {
        describe('Unnamed Module', () => {
          it('should persist module state attr', () => {
            const store = newStore();

            store.registerModule('bacon/UnnamedModule', UnnamedModule);

            expect(mockStorage.getItem('vuex/bacon/UnnamedModule/attr')).toBeUndefined();

            store.commit('attr', 'bacon');

            expect(mockStorage.getItem('vuex/bacon/UnnamedModule/attr')).toBe('bacon');
          });

          it('should populate state from storage', () => {
            mockStorage.setItem('vuex/bacon/UnnamedModule/attr', 'bacon');

            const store = newStore();

            store.registerModule('bacon/UnnamedModule', UnnamedModule);

            expect(store.state['bacon/UnnamedModule'].attr).toBe('bacon');
          });
        });

        describe('Named module', () => {
          it('should persist module state attr', () => {
            const store = newStore();

            store.registerModule('bacon/NamedModule', NamedModule);

            expect(mockStorage.getItem('vuex/NamedModule/attr')).toBeUndefined();

            store.commit('bacon/NamedModule/attr', 'bacon');

            expect(mockStorage.getItem('vuex/bacon/NamedModule/attr')).toBe('bacon');
          });

          it('should populate state from storage', () => {
            mockStorage.setItem('vuex/bacon/NamedModule/attr', 'bacon');

            const store = newStore();

            store.registerModule('bacon/NamedModule', NamedModule);

            expect(store.state['bacon/NamedModule'].attr).toBe('bacon');
          });
        });
      });
    });
  });
});
