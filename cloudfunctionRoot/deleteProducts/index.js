const cloud = require('wx-server-sdk')

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
})

const db = cloud.database()
const _ = db.command
const Product = db.collection('product')



exports.main = async (event,context)=>{
  const { ids } = event
  return Promise.all(ids.map(id=>Product.doc(id).remove()))
}

