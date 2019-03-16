export default {
  namespaced: true,
  populate: [
    {
      attr: 'namedDynamicModuleAttr',
      mutation: 'setNamedDynamicModuleAttr'
    }
  ],
  state: {
    namedDynamicModuleAttr: null
  },
  mutations: {
    setNamedDynamicModuleAttr(state, value) {
      state.namedDynamicModuleAttr = value;
    }
  }
}