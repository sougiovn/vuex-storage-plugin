export default {
  populate: [
    {
      attr: 'UnnamedModule/unnamedModuleAttr',
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