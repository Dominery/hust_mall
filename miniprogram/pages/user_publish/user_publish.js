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
  chooseIds:[],
  atManage: false,
  allSelect: false
  },
  selectTap(e){
    const { id } = e.target
    const { chooseIds } = this.data
    const index = chooseIds.indexOf(id)
    if(index===-1){
      chooseIds.push(id)
    }else{
      chooseIds.splice(index,1)
    }
    this.setData({
      chooseIds
    })
  },
  manageTap(){
    const { atManage } = this.data
    this.setData({
      atManage: !atManage
    })
  },
  allSelectTap(){
    const { allSelect } = this.data
    if(allSelect){
      this.setData({
        chooseIds: [],
        allSelect: false
      })
    }else {
      const chooseIds = this.data.products.map(item=>item._id)
      this.setData({
        chooseIds,
        allSelect: true
      })
    }
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