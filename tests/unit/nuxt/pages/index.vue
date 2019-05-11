<template>
  <h1>Bacon {{ attr }}</h1>
</template>

<script>
  import { mapState } from 'vuex';
  export default {
    name: 'index',
    getters: mapState('attr')
  }
</script>