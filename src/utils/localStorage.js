function setItem (key, value) {
  window.localStorage.setItem(key, JSON.stringify(value))
}
function getItem (key) {
  return JSON.parse(window.localStorage.getItem(key))
}
function removeItem () {
  window.localStorage.removeItem('key')
}
export {
  setItem,
  getItem,
  removeItem
}
