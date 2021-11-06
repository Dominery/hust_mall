

//app.js
async function getOpenid() {
  // 获取openid
  return wx.cloud.callFunction({
    name: "getOpenId",
  }).then(resp => {
    return resp.result.openid;
  })
}

// async function judgeAuthorize() {
//   return wx.getSetting({
//     withSubscriptions: true
//   }).then(res => {
//     return Boolean(res.authSetting['scope.address.userinfo']);
//   })
// }

const expctedTime = Date.parse(new Date(2021,10,6,20,30))

async function getGloablData(User){
  const globalData = {}
  globalData.isExamined = Date.now() > expctedTime
  const openid = await wx.getStorage({key:"_openid"})
                  .then(res=>res.data)
                  .catch(res=>'') || await getOpenid();
  const userInfo = await User.getInfo(openid);
  globalData._openid = openid
  globalData.registered = Boolean(userInfo);
  if(!userInfo){
    return globalData
  }
  globalData.userInfo = userInfo;
  wx.setStorage({
    key: "_openid",
    value:openid
  })
  return globalData;
}
App({
  onLaunch: function () {
    if (!wx.cloud) {
      console.error('请使用 2.2.3 或以上的基础库以使用云能力')
    } else {
      wx.cloud.init({
        // env 参数说明：
        //   env 参数决定接下来小程序发起的云开发调用（wx.cloud.xxx）会默认请求到哪个云环境的资源
        //   此处请填入环境 ID, 环境 ID 可打开云控制台查看
        //   如不填则使用默认环境（第一个创建的环境）
        env: 'cloud1-3gla61fw54a10b17',
        traceUser: true,
      })
    }
    this.globalData = {}
    const {User} = require('./js/controller/index')
    getGloablData(User)
      .then(data => {
        this.globalData = data;
      })
      .catch(err => {
        console.log(err)
      })


  }
})
