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

const actions: ActionTree<IPayload, IRootState> = {
  /**
   * @description fetch customer and populate it in store
   * @param context any
   */
  async checkStorage(context): Promise<void> {
    try {
      this.dispatch('main/updateState');
    } catch (err) {
      console.error('API Error Response:', err);
      context.commit('setState', []);
    }
  },

  /**
   * @description Saves new item 
   * @param context any
   * @param payload IPayload
   */
  async saveItem(context, payload:IPayload): Promise<void> {
    try {
      await IndexedDBInstance.saveToStorage('demoItem', payload);
      this.dispatch('main/updateState');
    } catch (err) {
      console.error('API Error Response:', err);
    }
    
  },

  /**
   * @description Deletes item by key:id
   * @param context any
   * @param payload number
   */
  async removeItem(context, payload:number): Promise<void> {
    try {
      await IndexedDBInstance.deleteFromStorage('demoItem', payload);;
      this.dispatch('main/updateState');
    } catch (err) {
      console.error('API Error Response:', err);
    }
  },

  async updateState (context) {
    const response = await IndexedDBInstance.checkStorage('demoItem');
    context.commit('setState', response);
  }
};

export default actions;