import Vue from 'vue';

export default {
  setState(state: any, payload: any) {
    Vue.set(state, 'item', payload);
  }
};