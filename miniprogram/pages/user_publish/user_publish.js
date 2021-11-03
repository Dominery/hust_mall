const { Product } = require('../../js/controller/index')
// pages/user_publish/user_publish.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    products: [{
      "_id":"fa24ce1a617f4b6f037812fb769970dc",
      "bargain":false,
      "category":"learn",
      "desc":"有几百年历史的笑傲江湖曲谱，附赠乐器",
      "getMethod":"0",
      "oldPrice":0.0,
      "qq":"55555555",
      "_openid":"ozrGs5BLsLrwR75GDr5MOZqZ8sGo",
      "abrase":9.0,
      "createdTime":{"$date":"2021-11-01T02:05:35.934Z"},
      "imgUrls":["cloud://cloud1-3gla61fw54a10b17.636c-cloud1-3gla61fw54a10b17-1307983764/1635732335742.png","cloud://cloud1-3gla61fw54a10b17.636c-cloud1-3gla61fw54a10b17-1307983764/1635732335745.png"],
      "pos":"魔岩山魔焰洞",
      "price":3333.0,
      "title":"笑傲江湖风波曲",
      "saled":false}
  ],
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