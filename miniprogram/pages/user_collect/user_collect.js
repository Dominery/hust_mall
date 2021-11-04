const { Collection } = require('../../js/controller/index')
const { Storage, Api } = require('../../js/utils/index')
// pages/user_collect/user_collect.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    products: [],
  },
  delete(e){
    const { chooseIds } = e.detail
    const { _openid } = Storage.get('userInfo')
    Collection.unFollowProducts(_openid,chooseIds)
      .then(res=>{
        const products = this.data.products.filter(item=>!chooseIds.includes(item._id))
        this.setData({
          products
        })
        Api.successToast('取消关注成功')
      }).catch(res=>{
        Api.errorToast('操作失败')
      })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const eventChanel = this.getOpenerEventChannel()
    eventChanel.on('productList',products=>{
      this.setData({
        products
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