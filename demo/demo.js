import Vue from 'vue';
import store from './store';
import Demo from './Demo.vue';

new Vue({
  store,
  render: h => h(Demo)
}).$mount('#app');