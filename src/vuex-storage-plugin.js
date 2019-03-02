const IS_FROM_MODULE = /\//;

export default function VuexStoragePlugin(options) {
  const watcherMap = new Map();

  buildPopulate(options.populate);

  return store => {
    store._registerModule = store.registerModule;

    populateState(store._modules.root.state, watcherMap.keys());

    store.registerModule = registerModule;

    store.subscribe(mutationSubscription);

    function registerModule(path, module, options) {
      store._registerModule(path, module, options);
    }
  };

  function populateState(state, keysIterator) {
    let current = keysIterator.next();
    while (current.done === false) {
      const item = watcherMap.get(current.value);
      let value = sessionStorage.getItem(item.parsedKey);


      try {
        const a = JSON.parse(value);
        value = a;
      } catch (e) {}

      setValueToState(state, item.attr, value);
      current = keysIterator.next();
    }
  }

  function mutationSubscription({ type, payload }, state) {
    const watchKey = buildKey(type);

    if (watcherMap.has(watchKey)) {
      const item = watcherMap.get(watchKey);
      options.storage.setItem(item.parsedKey, JSON.stringify(payload));
    }
  }

  function buildPopulate(populate) {
    if (Array.isArray(populate)) {
      populate.forEach(obj => {
        obj.parsedKey = buildKey(obj.attr);
      watcherMap.set(buildKey(obj.mutation), obj);
    });
    }
  }

  function buildKey(...keys) {
    return `${options.prefix}/${keys.join("/")}`;
  }

  function setValueToState(state, key, value) {
    if (IS_FROM_MODULE.test(key)) {
      key = key.split(IS_FROM_MODULE);
      const attr = key.pop();
      let module = state;
      key.forEach(path => (module = module[path]));
      module[attr] = value;
    } else {
      state[key] = value;
    }
  }
}
