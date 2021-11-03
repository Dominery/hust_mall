const {User} = require("../../js/controller/index.js")
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
      wx.showLoading({
        title: '加载中',
      })
      wx.getUserProfile({
        desc: '获取你的昵称、头像、性别及地区'
      }).then(res => {
        wx.hideLoading()
        const { userInfo } = res
        this.triggerEvent('register',{ userInfo })
      }).catch(err => {
        console.log(err)
      }).finally(()=>{
        this.data._tapAllowed = true
      })
    }
  }
})
