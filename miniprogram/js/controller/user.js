async function register(userInfo) {
  return await wx.cloud.callFunction({
    name: "user",
    data: {
      type: "register",
      data:{
        _openid: userInfo._openid,
        avatarUrl: userInfo.avatarUrl,
        nickName: userInfo.nickName,
        sex: userInfo.gender
      }
    }
  })
}

async function getUserInfo(userid) {
  return await wx.cloud.callFunction({
    name: "user",
    data: {
      type: "getUserInfo",
      _id: userid
    }
  }).then(res => {
    return res.result.data
  })
}
async function getUserInfoByOpenId(openid) {
  return await wx.cloud.callFunction({
    name: "user",
    data: {
      type: "getUserInfoByOpenId",
      openid: openid
    }
  }).then(res => {
    return res.result.data[0]
  })
}
module.exports = {
  register, getUserInfo, getUserInfoByOpenId
}