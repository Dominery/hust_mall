const { Product } = require('../../js/controller/index')
// pages/user_publish/user_publish.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    products: [],
    atManage: false,
    _product_list:{}
  },
  manageTap(){
    const { atManage } = this.data
    this.setData({
      atManage: !atManage
    })
    const { _product_list } = this.data
    _product_list.changeState()
  },
  delete(e){
    const { chooseIds } = e.detail
    wx.showModal({
      cancelColor: '#aaa',
      confirmColor:"#1FA4FC",
      content: "真的要删除吗？如果删除，商品信息将丢失。"
    }).then(res=>{
      if(res.confirm){
        return Product.deleteProduts(chooseIds)
      }
    }).catch(err=>{
      console.log(err)
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
    const _product_list = this.selectComponent('#product-list');
    this.setData({
      _product_list
    })
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