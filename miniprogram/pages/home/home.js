const {categories} = require('../../js/data')
const { Product } = require('../../js/controller/index')
// pages/home/home.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    categories:categories,
    currentTab:'recommend',
    products:[]
  },
  scrollNav(e){
    // console.log(e)
  },
  navTapHandler(e){
    const currentTab = e.target.id
    if(currentTab===this.data.currentTab) return
    this.setData({
      currentTab
    })
    this._setProductList(currentTab)
  },
  productTabHandler(e){
    const productId = e.target.id
    const product = this.data.products.find(item=>item._id===productId)
    wx.navigateTo({
      url: `../product/product?_id=${productId}`
    }).then(res=>{
      res.eventChannel.emit('productInfo',product)
    })
  },
  _setProductList(tab){
    Product.getList(tab)
    .then(products=>{
      this.setData({
        products
      })
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
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
    this._setProductList(this.data.currentTab)
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