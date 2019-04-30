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
      <br />
      <code>globalAttr: {{ globalAttr }}</code>
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
      <br />
      <code>unnamedModuleAttr: {{ unnamedModuleAttr }}</code>
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
      <br />
      <code>namedModuleAttr: {{ namedModuleAttr }}</code>
    </fieldset>

    <hr />

    <h5>Toogle - Dynamic modules</h5>

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

    <button
      type="button"
      @click="toggleNestedUnnamedDynamicModule">
      Nested Unnamed Dynamic Module
    </button>

    <button
      type="button"
      @click="toggleNestedNamedDynamicModule">
      Nested Named Dynamic Module
    </button>

    <fieldset v-if="unnamedDynamic">
      <legend>Unnamed dynamic module</legend>
      <input
        type="text"
        v-model="newUnnamedDynamicModuleAttr" />
      <button
        type="button"
        @click="$store.commit('setUnnamedDynamicModuleAttr', newUnnamedDynamicModuleAttr)">Update unnamedDynamicModuleAttr
      </button>
      <br />
      <code>unnamedDynamicModuleAttr: {{ $store.state.UnnamedDynamicModule.unnamedDynamicModuleAttr }}</code>
    </fieldset>

    <fieldset v-if="namedDynamic">
      <legend>Named dynamic module</legend>
      <input
        type="text"
        v-model="newNamedDynamicModuleAttr" />
      <button
        type="button"
        @click="$store.commit('NamedDynamicModule/setNamedDynamicModuleAttr', newNamedDynamicModuleAttr)">
        Update namedDynamicModuleAttr
      </button>
      <br />
      <code>namedDynamicModuleAttr: {{ $store.state.NamedDynamicModule.namedDynamicModuleAttr }}</code>
    </fieldset>

    <fieldset v-if="nestedUnnamedDynamic">
      <legend>Nested Unnamed dynamic module</legend>
      <input
        type="text"
        v-model="newNestedUnnamedDynamicModuleAttr" />
      <button
        type="button"
        @click="$store.commit('setNestedUnnamedDynamicModuleAttr', newNestedUnnamedDynamicModuleAttr)">
        Update nestedUnnamedDynamicModuleAttr
      </button>
      <br />
      <code>nestedUnnamedDynamicModuleAttr: {{ $store.state['bacon/NestedUnnamedDynamicModule'].nestedUnnamedDynamicModuleAttr }}</code>
    </fieldset>

    <fieldset v-if="nestedNamedDynamic">
      <legend>Nested Named dynamic module</legend>
      <input
        type="text"
        v-model="newNestedNamedDynamicModuleAttr" />
      <button
        type="button"
        @click="$store.commit('bacon/NestedNamedDynamicModule/setNestedNamedDynamicModuleAttr', newNestedNamedDynamicModuleAttr)">
        Update nestedNamedDynamicModuleAttr
      </button>
      <br />
      <code>nestedNamedDynamicModuleAttr: {{ $store.state['bacon/NestedNamedDynamicModule'].nestedNamedDynamicModuleAttr }}</code>
    </fieldset>
  </div>
</template>

<script>
  import store from './store';
  import { mapMutations, mapState } from 'vuex';
  import unnamedDynamicModule from './store/unnamed-dynamic';
  import namedDynamicModule from './store/named-dynamic';
  import nestedNamedDynamicModule from './store/nested-named-dynamic';
  import nestedUnnamedDynamicModule from './store/nested-unnamed-dynamic';

  export default {
    name: 'Demo',
    store,
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
      toggleNamedDynamicModule,
      toggleNestedNamedDynamicModule,
      toggleNestedUnnamedDynamicModule
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
      newNamedDynamicModuleAttr: null,
      nestedNamedDynamic: false,
      newNestedNamedDynamicModuleAttr: null,
      nestedUnnamedDynamic: false,
      newNestedUnnamedDynamicModuleAttr: null
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

  function toggleNestedUnnamedDynamicModule() {
    if (this.nestedUnnamedDynamic) {
      this.$store.unregisterModule('bacon/NestedUnnamedDynamicModule');
    } else {
      this.$store.registerModule('bacon/NestedUnnamedDynamicModule', nestedUnnamedDynamicModule);
    }
    this.nestedUnnamedDynamic = !this.nestedUnnamedDynamic;
  }

  function toggleNestedNamedDynamicModule() {
    if (this.nestedNamedDynamic) {
      this.$store.unregisterModule('bacon/NestedNamedDynamicModule');
    } else {
      this.$store.registerModule('bacon/NestedNamedDynamicModule', nestedNamedDynamicModule);
    }
    this.nestedNamedDynamic = !this.nestedNamedDynamic;
  }
</script>
