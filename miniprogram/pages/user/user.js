
const { Product } = require('../../js/controller/index')
const appInstance = getApp()

// pages/user/user.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    registered: false,
    publish: [],
    saled: [],
    collect: 0,
    userInfo: {
      avatarUrl: "../../images/home.png",
      nickName: "游客"
    }
  },
  userPublishRoute(){
    wx.navigateTo({
      url: '../user_publish/user_publish',
    }).then(res=>{
      res.eventChannel.emit('productList',this.data.publish)
    })
  },
  userSaledRoute(){
    wx.navigateTo({
      url: '../user_saled/user_saled',
    }).then(res=>{
      res.eventChannel.emit('productList',this.data.saled)
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      registered: appInstance.globalData.registered
    })
    if(!this.data.registered){
      return
    }
    const {userInfo} = appInstance.globalData;
    this.setData({
      userInfo
    })

    Product.getUserProduct(userInfo._openid)
      .then(data=>{
        const group = groupBy(data,item=>item.saled)
        this.setData({
          saled: group.get(true),
          publish: group.get(false)
        })
      })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})


function groupBy(data,mapFunc) {
  const result = new Map()
  data.forEach(value=>{
    const key = mapFunc(value)
    if(result.has(key)){
      result.get(key).push(value)
    }else {
      result.set(key,[value])
    }
  })
  return result
}