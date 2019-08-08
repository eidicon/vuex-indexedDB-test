import Vue from 'vue';
import Vuex, { StoreOptions } from 'vuex';
import IRootState from '@/store/store.vo';
import { main } from './modules/main';

Vue.use(Vuex);

const store: StoreOptions<IRootState> = {
  state: {
    version: '1.0.0',
  },
  modules: {
    main
  },
};

export default new Vuex.Store<IRootState>(store);