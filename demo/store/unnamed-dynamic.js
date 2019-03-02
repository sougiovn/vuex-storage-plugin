export default {
  populate: [
    {
      attr: 'UnnamedDynamicModule/unnamedDynamicModuleAttr',
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