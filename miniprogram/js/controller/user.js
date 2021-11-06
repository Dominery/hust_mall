const db = wx.cloud.database()
const User = db.collection('user')


async function register(data) {
  const createdTime = db.serverDate()
  const {nickName,avatarUrl } = data
  return User.add({
    data:{
      avatarUrl,nickName,createdTime
    }
  }).then(res=>data)
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