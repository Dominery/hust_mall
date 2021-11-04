const { User } = require('../controller/index')
const { successToast, errorToast} = require('./api')

class AuthorizeLogin{
  
  constructor(){
  }

  run(successHandler){
      this._getUserInfo()
      .then(this._register)
      .then(userInfo=>{
        successToast('登录成功')
        if(successHandler instanceof Function)
        successHandler(userInfo)
      }).catch(err=>{
        errorToast('登录失败')
      })
  }

  _getUserInfo(){
    wx.showToast({
      title: '加载中',
      icon:'loading',
      duration: 1000
    })
    return wx.getUserProfile({
          desc: '获取你的昵称、头像等相关信息'
        }).then((res)=>{
          const { userInfo } = res;
          return userInfo
        })
  }
  async _register(userInfo){
    await User.register(userInfo)
    return userInfo
  }
}


module.exports = AuthorizeLogin