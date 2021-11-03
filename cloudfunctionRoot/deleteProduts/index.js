const cloud = require('wx-server-sdk')

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
})

const db = cloud.database()
const _ = db.command
const Product = db.collection('product')



exports.main = async (event,context)=>{
  const { ids } = event
  return Product.where({
    _id: _.in(ids)
  }).remove()
}

