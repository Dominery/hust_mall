const { Product } = require('../../js/controller/index')
const { Api } = require('../../js/utils/index')
// pages/user_publish/user_publish.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    products: [],
  },
  delete(e){
    const { chooseIds } = e.detail
    Api.showModal('真的要删除吗？如果删除，商品信息将丢失。','警告')
      .then(res=>{
        wx.showLoading({
          title: '正在删除',
        })
        const imgUrls = this.data.products
          .filter(item=>chooseIds.includes(item._id))
          .flatMap(item=>item.imgUrls)
        return Product.deleteProduts(chooseIds,imgUrls)
      }).then(res=>{
        const products = this.data.products.filter(item=>!chooseIds.includes(item._id))
        this.setData({
          products
        })
        Api.successToast('删除成功')
      }).catch(err=>{
        console.log(err)
      }).finally(()=>{
        wx.hideLoading()
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