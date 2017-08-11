function setItem (key, value) {
  window.sessionStorage.setItem(key, JSON.stringify(value))
}
function getItem (key) {
  return JSON.parse(window.sessionStorage.getItem(key))
}
function removeItem () {
  window.sessionStorage.removeItem('key')
}
export {
  setItem,
  getItem,
  removeItem
}
