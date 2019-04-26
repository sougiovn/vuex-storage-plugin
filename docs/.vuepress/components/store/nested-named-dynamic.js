export default {
  namespaced: true,
  populate: [
    {
      module: 'bacon/NestedNamedDynamicModule',
      attr: 'nestedNamedDynamicModuleAttr',
      mutation: 'setNestedNamedDynamicModuleAttr'
    }
  ],
  state: {
    nestedNamedDynamicModuleAttr: null
  },
  mutations: {
    setNestedNamedDynamicModuleAttr(state, value) {
      state.nestedNamedDynamicModuleAttr = value;
    }
  }
}