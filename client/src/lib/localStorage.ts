export enum LocalStorageKeys {
  ACCESS_TOKEN = "token",
}

export function getItemFromLocalStorage(key: LocalStorageKeys) {
  return localStorage.getItem(key);
}

export function setItemToLocalStorage(key: LocalStorageKeys, value: string) {
  localStorage.setItem(key, value);
}

export function removeItemFromLocalStorage(key: LocalStorageKeys) {
  localStorage.removeItem(key);
}
