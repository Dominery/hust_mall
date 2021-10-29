const cloud = require('wx-server-sdk')

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
})

const db = cloud.database()

exports.main = async (event, context) => {
  const time = db.serverDate();
  return await db.collection('user').add({
    data: {...event.data, createdTime:time,updatedTime:time}
  })
}