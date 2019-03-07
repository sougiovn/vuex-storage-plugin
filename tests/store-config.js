function state() {
  return {
    attr: null
  }
}

export const AttrEqualsMutationStoreConfig = {
  state,
  mutations: {
    attr(state, value) {
      state.attr = value;
    }
  }
};

export const CustomStateAttrAndMutationStoreConfig = {
  state,
  mutations: {
    setAttr(state, value) {
      state.attr = value;
    }
  }
};