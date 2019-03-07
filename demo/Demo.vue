<template>
  <div>
    <fieldset>
      <legend>Global state</legend>
      <input
        type="text"
        v-model="newGlobalAttr" />
      <button
        type="button"
        @click="setGlobalAttr(newGlobalAttr)">Update globalAttr
      </button>
      <pre>globalAttr: {{ globalAttr }}</pre>
    </fieldset>

    <hr />

    <fieldset>
      <legend>Unnamed module state</legend>
      <input
        type="text"
        v-model="newUnnamedModuleAttr" />
      <button
        type="button"
        @click="setUnnamedModuleAttr(newUnnamedModuleAttr)">Update unnamedModuleAttr
      </button>
      <pre>unnamedModuleAttr: {{ unnamedModuleAttr }}</pre>
    </fieldset>

    <hr />

    <fieldset>
      <legend>Named module state</legend>
      <input
        type="text"
        v-model="newNamedModuleAttr" />
      <button
        type="button"
        @click="setNamedModuleAttr(newNamedModuleAttr)">Update namedModuleAttr
      </button>
      <pre>namedModuleAttr: {{ namedModuleAttr }}</pre>
    </fieldset>

    <hr />

    <h5>Dynamic modules</h5>
    <button
      type="button"
      @click="toggleUnnamedDynamicModule">
      Unnamed Dynamic Module
    </button>

    <button
      type="button"
      @click="toggleNamedDynamicModule">
      Named Dynamic Module
    </button>

    <fieldset v-if="unnamedDynamic">
      <legend>Unnamed dynamic module</legend>
      <input
        type="text"
        v-model="newUnnamedDynamicModuleAttr" />
      <button
        type="button"
        @click="$store.commit('setUnnamedDynamicModuleAttr', newUnnamedDynamicModuleAttr)">Update
                                                                                           unnamedDynamicModuleAttr
      </button>
      <pre>unnamedDynamicModuleAttr: {{ $store.state.UnnamedDynamicModule.unnamedDynamicModuleAttr }}</pre>
    </fieldset>

    <fieldset v-if="namedDynamic">
      <legend>Named dynamic module</legend>
      <input
        type="text"
        v-model="newNamedDynamicModuleAttr" />
      <button
        type="button"
        @click="$store.commit('NamedDynamicModule/setNamedDynamicModuleAttr', newNamedDynamicModuleAttr)">Update
                                                                                                          namedDynamicModuleAttr
      </button>
      <pre>namedDynamicModuleAttr: {{ $store.state.NamedDynamicModule.namedDynamicModuleAttr }}</pre>
    </fieldset>
  </div>
</template>

<script>
  import { mapMutations, mapState } from 'vuex';
  import unnamedDynamicModule from './store/unnamed-dynamic';
  import namedDynamicModule from './store/named-dynamic';

  export default {
    name: 'Demo',
    data,
    computed: {
      ...mapState(['globalAttr']),
      ...mapState({ unnamedModuleAttr: state => state.UnnamedModule.unnamedModuleAttr }),
      ...mapState('NamedModule', ['namedModuleAttr'])
    },
    methods: {
      ...mapMutations(['setGlobalAttr', 'setUnnamedModuleAttr']),
      ...mapMutations('NamedModule', ['setNamedModuleAttr']),
      toggleUnnamedDynamicModule,
      toggleNamedDynamicModule
    }
  };

  function data() {
    return {
      newGlobalAttr: null,
      newUnnamedModuleAttr: null,
      newNamedModuleAttr: null,
      unnamedDynamic: false,
      newUnnamedDynamicModuleAttr: null,
      namedDynamic: false,
      newNamedDynamicModuleAttr: null
    };
  }

  function toggleUnnamedDynamicModule() {
    if (this.unnamedDynamic) {
      this.$store.unregisterModule('UnnamedDynamicModule');
    } else {
      this.$store.registerModule('UnnamedDynamicModule', unnamedDynamicModule);
    }
    this.unnamedDynamic = !this.unnamedDynamic;
  }

  function toggleNamedDynamicModule() {
    if (this.namedDynamic) {
      this.$store.unregisterModule('NamedDynamicModule');
    } else {
      this.$store.registerModule('NamedDynamicModule', namedDynamicModule);
    }
    this.namedDynamic = !this.namedDynamic;
  }
</script>
