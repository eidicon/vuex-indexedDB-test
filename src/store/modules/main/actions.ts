import { ActionTree } from 'vuex';
import IRootState from '@/store/store.vo';
import IndexedDBInstance from '../../../service/storage/indexedDBService';

export interface IPayload {
  key: string,
  value: string,
}

export interface IMainActions {
  checkStorage: () => Promise<void>;
  saveItem: (payload: object) => Promise<void>;
  removeItem: (payload: number) => Promise<void>;
}

const actions: ActionTree<any, IRootState> = {
  /**
   * @description fetch customer and populate it in store
   * @param context any
   */
  async checkStorage(context): Promise<void> {
    try {
      const response = await IndexedDBInstance.checkStorage('demoItem');
      context.commit('setState', response);
    } catch (err) {
      console.error('API Error Response:', err);
      context.commit('setState', []);
    }
  },

  /**
   * @description Saves new item and return full list of items (just for demo)
   * @param context any
   * @param payload IPayload
   */
  async saveItem(context, payload:IPayload): Promise<void> {
    context.commit('setState', await IndexedDBInstance.saveToStorage('demoItem', payload));
  },

  /**
   * @description Saves new item and return full list of items (just for demo)
   * @param context any
   * @param payload number
   */
  async removeItem(context, payload:number): Promise<void> {
    context.commit('setState', await IndexedDBInstance.deleteFromStorage('demoItem', payload));
  } 
};

export default actions;