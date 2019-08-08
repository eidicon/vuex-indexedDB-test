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
        const itemStore = db.createObjectStore('demoItem', { keyPath: 'id', autoIncrement: true });
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
    const db = await this.db;
    return db.getAll(storeName);
  }

  public async saveToStorage(storeName: any, payload: any): Promise<void> {
    const db = await this.db;
    await db.put(storeName, payload);
  }

  public async deleteFromStorage(storeName: any, payload: number): Promise<void> {
    const db = await this.db;
    await db.delete(storeName, payload);
  }
}

const IndexedDBInstance = IndexedDBService.getInstance();
export default IndexedDBInstance;