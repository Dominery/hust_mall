const db = wx.cloud.database()
const Collection = db.collection('collection')


function follow(productid) {
  return Collection.add({
    data:{
      productid
    }
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

function getFollowed(_openid) {
  return Collection.where({
    _openid
  }).get().then(res=>res.data)
}

function unFollowProducts(_openid,productIds) {
  return wx.cloud.callFunction({
    name: 'deleteCollections',
    data: {
      _openid,
      productIds
    }
  }).then(res=>res.result.data)
}

module.exports = {
  follow, unfollow, isFollowed, getFollowed, unFollowProducts
}