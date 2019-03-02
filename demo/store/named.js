export default {
  namespaced: true,
  populate: [
    {
      attr: 'NamedModule/namedModuleAttr',
      mutation: 'NamedModule/setNamedModuleAttr'
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