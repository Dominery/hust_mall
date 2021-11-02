// pages/product/product.js
function transformNumToStr(num) {
  if(num<0 || num>9) return ''
  const template = '零一二三四五六七八九'
  return template[num]
}
Page({

  /**
   * 页面的初始数据
   */
  data: {
    product:{},
    abrase:''
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