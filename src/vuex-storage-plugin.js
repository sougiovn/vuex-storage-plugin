const IS_FROM_MODULE = /\//;
const DEFAULT_REDUCER = value => value;
const DEFAULT_VALUE = null;

export default function VuexStoragePlugin(options = {}) {
  const prefix = options.prefix || 'vuex';
  const storage = options.storage;
  const removeIfNull = options.removeIfNull != null ? options.removeIfNull : true;

  if (storage == null || storage.setItem == null || storage.getItem == null || storage.removeItem == null) {
    throw new Error('You must provide a storage containing the methods: setItem, getItem and removeItem.');
  }

  const watcherMap = new Map();

  buildPopulate(options.populate);

  return store => {
    store._registerModule = store.registerModule;

    populateState(store._modules.root.state, watcherMap.keys());

    store.registerModule = registerModule;

    store.subscribe(mutationSubscription);

    function registerModule(path, module, options) {
      store._registerModule(path, module, options);

      buildPopulate(module.populate);

      const modulePopulateItems = buildPopulate(module.populate);

      populateState(store._modules.root.state, modulePopulateItems.keys());

      if (typeof module.afterPopulate === 'function') {
        module.afterPopulate(module.namespaced ? store._modulesNamespaceMap[path].context : store);
      }
    }
  };

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
      payload = item.reduce(payload);
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
            attr: item,
            mutation: item,
            reduce: DEFAULT_REDUCER,
            default: DEFAULT_VALUE
          };
        } else {
          if (item.reduce == null) {
            item.reduce = DEFAULT_REDUCER;
          }

          if (item.default == null) {
            item.default = DEFAULT_VALUE;
          }
        }
        item.parsedKey = buildKey(item.attr);
        builded.set(buildKey(item.mutation), item);
        watcherMap.set(buildKey(item.mutation), item);
      });
    }
    return builded;
  }

  function buildKey(...keys) {
    keys.unshift(prefix);
    return keys.join('/');
  }

  function setValueToState(state, item, value) {
    let key = item.attr;
    if (IS_FROM_MODULE.test(item.attr)) {
      const itemAttr = key.split(IS_FROM_MODULE);
      const attr = itemAttr.pop();
      let module = state;
      itemAttr.forEach(path => (module = module[path]));
      state = module;
      key = attr;
    }
    if (value == null) {
      value = item.default;
    }
    state[key] = value;
  }
}
