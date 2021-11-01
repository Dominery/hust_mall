const db = wx.cloud.database()
const User = db.collection('user')


async function register(data) {
  return User.add({
    data
  })
}
async function getInfo(_openid) {
  return User.where({
    _openid
  }).get().then(res => {
    return res.data[0]
  })
}
module.exports = {
  register, getInfo
}