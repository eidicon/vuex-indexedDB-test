import { DBSchema } from 'idb';

export default interface TestDB extends DBSchema {
  'demoItem': {
    value: string,
    key: string,
    indexes: { 'by-value': string },
  }
}
