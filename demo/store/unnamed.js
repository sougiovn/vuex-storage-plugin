export default {
  populate: [
    {
      module: 'UnnamedModule',
      attr: 'unnamedModuleAttr',
      mutation: 'setUnnamedModuleAttr'
    }
  ],
  state: {
    unnamedModuleAttr: null
  },
  mutations: {
    setUnnamedModuleAttr(state, value) {
      state.unnamedModuleAttr = value;
    }
  }
}