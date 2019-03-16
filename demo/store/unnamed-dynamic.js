export default {
  populate: [
    {
      attr: 'unnamedDynamicModuleAttr',
      mutation: 'setUnnamedDynamicModuleAttr'
    }
  ],
  state: {
    unnamedDynamicModuleAttr: null
  },
  mutations: {
    setUnnamedDynamicModuleAttr(state, value) {
      state.unnamedDynamicModuleAttr = value;
    }
  }
}