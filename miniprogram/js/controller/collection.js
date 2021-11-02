const db = wx.cloud.database()
const Collection = db.collection('collection')


function follow(productid) {
  return Collection.add({
    productid
  })
}

function unfollow(_openid,productid) {
  return Collection.where({
    _openid,productid
  }).remove()
}

function isFollowed(_openid,productid) {
  return Collection.where({
    _openid,productid
  }).get().then(res=>res.data[0])
}

module.exports = {
  follow, unfollow, isFollowed
}