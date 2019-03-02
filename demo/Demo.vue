<template>
  <div>
    <fieldset>
      <legend>Global state</legend>
      <input type="text" v-model="newGlobalAttr" />
      <button type="button" @click="setGlobalAttr(newGlobalAttr)">Update globalAttr</button>
      <pre>globalAttr: {{ globalAttr }}</pre>
    </fieldset>

    <hr />

    <fieldset>
      <legend>Unnamed module state</legend>
      <input type="text" v-model="newUnnamedModuleAttr" />
      <button type="button" @click="setUnnamedModuleAttr(newUnnamedModuleAttr)">Update unnamedModuleAttr</button>
      <pre>unnamedModuleAttr: {{ unnamedModuleAttr }}</pre>
    </fieldset>

    <hr />

    <fieldset>
      <legend>Named module state</legend>
      <input type="text" v-model="newNamedModuleAttr" />
      <button type="button" @click="setNamedModuleAttr(newNamedModuleAttr)">Update namedModuleAttr</button>
      <pre>namedModuleAttr: {{ namedModuleAttr }}</pre>
    </fieldset>
  </div>
</template>

<script>
  import { mapMutations, mapState } from 'vuex';

  export default {
    name: 'Demo',
    data,
    computed: {
      ...mapState(['globalAttr']),
      ...mapState({ unnamedModuleAttr: state => state.UnnamedModule.unnamedModuleAttr }),
      ...mapState('NamedModule', ['namedModuleAttr'])
    },
    methods:{
      ...mapMutations(['setGlobalAttr', 'setUnnamedModuleAttr']),
      ...mapMutations('NamedModule', ['setNamedModuleAttr'])
    }
  };

  function data() {
    return {
      newGlobalAttr: null,
      newUnnamedModuleAttr: null,
      newNamedModuleAttr: null
    }
  }
</script>
