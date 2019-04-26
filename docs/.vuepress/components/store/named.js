export default {
  namespaced: true,
  populate: [
    {
      module: 'NamedModule',
      attr: 'namedModuleAttr',
      mutation: 'setNamedModuleAttr'
    }
  ],
  state: {
    namedModuleAttr: null
  },
  mutations: {
    setNamedModuleAttr(state, value) {
      state.namedModuleAttr = value;
    }
  }
}