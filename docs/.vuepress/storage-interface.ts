interface Storage {
  getItem(key: string): string
  setItem(key: string, value: string)
  removeItem(key: string)
}