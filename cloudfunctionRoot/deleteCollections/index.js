const cloud = require('wx-server-sdk')

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
})

const db = cloud.database()
const _ = db.command
const Collection = db.collection('collection')



exports.main = async (event,context)=>{
  const { productIds,_openid } = event
  return Collection.where({
    _openid,
    productid: _.in(productIds)
  }).remove()
}

