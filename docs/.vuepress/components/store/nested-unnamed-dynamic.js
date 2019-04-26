export default {
  populate: [
    {
      module: 'bacon/NestedUnnamedDynamicModule',
      attr: 'nestedUnnamedDynamicModuleAttr',
      mutation: 'setNestedUnnamedDynamicModuleAttr'
    }
  ],
  state: {
    nestedUnnamedDynamicModuleAttr: null
  },
  mutations: {
    setNestedUnnamedDynamicModuleAttr(state, value) {
      state.nestedUnnamedDynamicModuleAttr = value;
    }
  }
}