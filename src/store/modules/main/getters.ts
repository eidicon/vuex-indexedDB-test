import { GetterTree } from 'vuex';
import IRootState from '@/store/store.vo';
import {IPayload} from './actions';

const getObject = (state: any): IPayload => {
  return state.item;
};

const getters: GetterTree<IPayload, IRootState> = {
  getObject,
};

export default getters;
