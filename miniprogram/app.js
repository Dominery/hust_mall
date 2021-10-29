const { getUserInfoByOpenId} = require("./js/controller/user")

//app.js
async function getOpenid() {
  // 获取openid
  return await wx.cloud.callFunction({
    name: "user",
    data: {
      type: "getOpenId"
    }
  }).then(resp => {
    return resp.result.openid;
  })
}

async function judgeAuthorize() {
  return await wx.getSetting({
    withSubscriptions: true
  }).then(res => {
    return Boolean(res.authSetting['scope.address.userinfo']);
  })
}

async function getGloablData(){
  const globalData = {}
  globalData.authorized = await judgeAuthorize();
  const userid =await wx.getStorage({key:"userid"})
                        .then(res=>res.data)
                        .catch(()=>"");
  if(userid){
    globalData.userid = userid;
    return globalData;
  }
  globalData.openid = await getOpenid(); // 没有userid 需要获取openid
  if(globalData.authorized){ // 如果用户已注册
    const userInfo = await getUserInfoByOpenId(globalData.openid)
    globalData.userid = userInfo._id;
    wx.setStorage({key:"userid",value:userInfo._id})
  }
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
    getGloablData()
      .then(data => {
        this.globalData = data;
      })
      .catch(err => {
        console.log(err)
      })


  }
})
