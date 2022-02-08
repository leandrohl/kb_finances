export default class LocalStorage {
  getLocalStorage <T> (key:string): T | null {
    const getItem = localStorage.getItem(key)
    if (!getItem) return null
    try {
      return JSON.parse(getItem)
    } catch (e) {
      return getItem as unknown as T
    }
  }

  setLocalStorage <T> (key:string, value: T) {
    try {
      localStorage.setItem(key, JSON.stringify(value))
      return true
    } catch (e) {
      return false
    }
  }

  cleanLocalStorage () {
    try {
      localStorage.clear()
      return true
    } catch (e) {
      return false
    }
  }

  removeLocalStorage (key:string) {
    try {
      localStorage.removeItem(key)
      return true
    } catch (e) {
      return false
    }
  }
}
