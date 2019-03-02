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
      console.log(state);
      state.unnamedModuleAttr = value;
    }
  }
}