const appInstance = getApp()

function get(name) {
  return appInstance?.globalData?.[name]
}

function set(name,value) {
  const global = appInstance.globalData
  if(typeof global !== "object"){
    return false
  }
  global[name] = value
  return true
}

module.exports = {
  get,set
}