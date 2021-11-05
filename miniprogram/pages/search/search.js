const { Product } = require('../../js/controller/index')
// pages/search/search.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    keyword: "hello",
    searchProducts: []
  },
  search(e){
    const { keyword } = e.detail
    this.setData({
      keyword
    })
    wx.showLoading({
      title: '搜索中',
    })
    this._addMoreProducts([])
      .finally(()=>{
        wx.hideLoading()
      })
  },
  _addMoreProducts(products){
    const { keyword } = this.data
    return Product.search(keyword,products.length)
      .then(searchResults=>{
        this.setData({
          searchProducts: products.concat(searchResults)
        })
      })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const eventChanel = this.getOpenerEventChannel()
    eventChanel.on('search',keyword=>{
      this.setData({
        keyword
      })
      this._addMoreProducts([])
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