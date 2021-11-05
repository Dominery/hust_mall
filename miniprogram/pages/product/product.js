// pages/product/product.js
const { transformNumToStr } = require('../../js/utils/transform')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    product:{},
    abrase:''
  },
  previewImg(){
    const { imgUrls } = this.data.product
    wx.previewImage({
      urls: imgUrls,
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    console.log(options.query)
    const eventChanel = this.getOpenerEventChannel()
    eventChanel.on('productInfo',product=>{
      this.setData({
        product,
        abrase: transformNumToStr(product.abrase)
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