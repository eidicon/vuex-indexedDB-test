import { Module } from 'vuex';
import getters from './getters';
import mutations from './mutations';
import actions from './actions';
import IRootState from '@/store/store.vo';

// Default state
export const state: any = {
  object: {
    data: '',
  },
};

export const main: Module<any, IRootState> = {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};
