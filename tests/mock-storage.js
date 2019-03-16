export default class MockStorage {

  constructor() {
    this.storage = new Map();
  }

  setItem(key, value) {
    this.storage.set(key, value);
  }

  getItem(key) {
    return this.storage.get(key);
  }

  removeItem(key) {
    return this.storage.delete(key);
  }

  clear() {
    this.storage.clear();
  }

  keys() {
    return this.storage.keys();
  }

}