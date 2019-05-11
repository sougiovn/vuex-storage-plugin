const DEFAULT_VALUE = null;

export default function VuexStoragePlugin(options = {}) {
  const prefix = options.prefix || 'vuex';
  const storage = options.storage;
  const removeIfNull = options.removeIfNull != null ? options.removeIfNull : true;

  if (storage == null || storage.setItem == null || storage.getItem == null || storage.removeItem == null) {
    throw new Error('You must provide a storage containing the methods: setItem, getItem and removeItem.');
  }

  const watcherMap = new Map();

  return store => {
    console.log('Instantiaing vuex-storage-plugin');
    store._registerModule = store.registerModule;

    buildPopulate(options.populate);

    populateState(store._modules.root.state, watcherMap.keys());

    store.registerModule = registerModule;

    store.subscribe(mutationSubscription);

    function registerModule(path, module, options) {
      store._registerModule(path, module, options);

      const modulePopulateItems = buildPopulate(module.populate, path);

      populateState(store._modules.root.state, modulePopulateItems.keys());

      if (typeof module.afterPopulate === 'function') {
        if (module.namespaced) {
          module.afterPopulate(store._modulesNamespaceMap[`${path}/`].context, store);
        } else {
          module.afterPopulate(store);
        }
      }
    }

    if (typeof options.afterPopulate === 'function') {
      options.afterPopulate(store);
    }

    function populateState(state, keysIterator) {
      let current = keysIterator.next();
      while (current.done === false) {
        const item = watcherMap.get(current.value);
        let value = storage.getItem(item.parsedKey);


        try {
          const a = JSON.parse(value);
          value = a;
        } catch (e) {
        }

        setValueToState(state, item, value);
        current = keysIterator.next();
      }
    }

    function mutationSubscription({ type, payload }) {
      const watchKey = buildKey(type);

      if (watcherMap.has(watchKey)) {
        const item = watcherMap.get(watchKey);
        if (payload == null && removeIfNull) {
          storage.removeItem(item.parsedKey);
        } else {
          storage.setItem(item.parsedKey, stringify(payload));
        }
      }
    }

    function stringify(value) {
      if (value == null) {
        return null;
      }
      if (typeof value === 'string') {
        return value;
      }
      return JSON.stringify(value);
    }

    function buildPopulate(populate, moduleName) {
      const builded = new Map();
      if (Array.isArray(populate)) {
        populate.forEach(item => {
          if (typeof item === 'string') {
            item = {
              module: moduleName,
              attr: item,
              mutation: item,
              default: DEFAULT_VALUE
            };
          } else {
            if (moduleName) {
              item.module = moduleName;
            }

            if (item.default == null) {
              item.default = DEFAULT_VALUE;
            }
          }

          item.parsedKey = buildKey(item.attr, item.module || moduleName);
          const mutationKey = buildKey(item.mutation, store._modulesNamespaceMap[`${item.module}/`] != null ? item.module : null);
          builded.set(mutationKey, item);
          watcherMap.set(mutationKey, item);
        });
      }
      return builded;
    }

    function buildKey(key, moduleName) {
      const keys = [key];
      if (moduleName) {
        keys.unshift(moduleName);
      }
      keys.unshift(prefix);
      return keys.join('/');
    }

    function setValueToState(state, item, value) {
      if (item.module) {
        state = state[item.module];
      }
      if (value == null) {
        value = item.default;
      }

      state[item.attr] = value;
    }
  };
};
