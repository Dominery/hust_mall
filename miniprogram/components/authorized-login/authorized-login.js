const {register} = require("../../js/controller/user.js")
const appInstance = getApp()
// components/login/login.js
Component({
  options: {
    styleIsolation: 'apply-shared',
    options: {
      pureDataPattern: /^_/
    }
  },
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    _tapAllowed:true
  },

  /**
   * 组件的方法列表
   */
  methods: {
    authorizedLogin:function (e) {
      if(!this.data._tapAllowed){
        return
      }
      this.data._tapAllowed = false
      wx.getUserProfile({
        desc: '获取你的昵称、头像、性别及地区'
      }).then(res => {
        return {...res.userInfo, _openid:appInstance.globalData.openid}
      }).then(register)
      .then(res => {
        appInstance.globalData.userid = res.result._id;
        appInstance.globalData.authorized = true;
        wx.setStorage({
          key:"userid",
          value:res.result._id
        })
        const pages = getCurrentPages();
        if(pages.length >0){
          pages[pages.length-1].onLoad()
        }
      }).catch(err => {
        console.log(err)
      }).finally(()=>{
        this.data._tapAllowed = true
      })
    }
  }
})
