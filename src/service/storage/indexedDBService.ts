import { openDB, IDBPDatabase } from 'idb';
import TestDB from './schema.vo';

class IndexedDBService {

  private static _instance: IndexedDBService;
  private db: Promise<IDBPDatabase<TestDB>>

  private constructor() {
    if (!('indexedDB' in window)) {
      throw new Error('Browser does not support IndexedDB')
    }
    this.db = this.init();
  }

  private async init(): Promise<IDBPDatabase<TestDB>> {
    return await openDB<TestDB>('testIndex', 1, {
      upgrade(db) {
        const itemStore = db.createObjectStore('demoItem', {keyPath: 'id', autoIncrement: true});
        itemStore.createIndex('by-value', 'value');
      }
    });
  }

  public static getInstance(): IndexedDBService {
    if (!this._instance) {
      this._instance = new this();
    }
    return this._instance;
  }

  public async checkStorage(storeName: any): Promise<TestDB[] | undefined> {
    try {
      const db = await this.db;
      const tx = await db.transaction(storeName, 'readonly');
      const store = tx.objectStore(storeName);
      return store.getAll();
    } catch (err) {
      throw new Error(err);
    }
  }


  public async saveToStorage(storeName: any, payload: any): Promise<TestDB[] | undefined> {
    try {
      const db = await this.db;
      const tx = await db.transaction(storeName, 'readwrite');
      const store = tx.objectStore(storeName);
      store.put(payload);
      tx.done;
      return store.getAll();
    } catch (err) {
      throw new Error(err);
    }
  }

  public async deleteFromStorage(storeName: any, payload: number): Promise<TestDB[] | undefined>  {
    try {
      const db = await this.db;
      const tx = await db.transaction(storeName, 'readwrite');
      const store = tx.objectStore(storeName);
      store.delete(payload);
      return store.getAll();
    } catch (err) {
      throw new Error(err);
    }
  }
}

const IndexedDBInstance = IndexedDBService.getInstance();
export default IndexedDBInstance;