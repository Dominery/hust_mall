
const { Product,Collection } = require('../../js/controller/index')
const { Route, AuthorizeLogin, groupBy, Storage } = require('../../js/utils/index')

// pages/user/user.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    registered: false,
    publish: [],
    saled: [],
    collect: [],
    userInfo: {
      avatarUrl: "../../images/home.png",
      nickName: "游客"
    }
  },
  userPublishRoute(){
    Route.push('../user_publish/user_publish','productList',this.data.publish)
  },
  userSaledRoute(){
    Route.push('../user_saled/user_saled','productList',this.data.saled)
  },
  userCollectRoute(){
    Route.push('../user_collect/user_collect','productList',this.data.collect)
  },
  registerHandler(e){
    new AuthorizeLogin()
        .run(userInfo=>{
          Storage.set('registered',true)
          Storage.set('userInfo',userInfo)
          this.onShow()
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
    this.setData({
      registered: Storage.get('registered')
    })
    if(!this.data.registered){
      return
    }
    const userInfo = Storage.get('userInfo')
    this.setData({
      userInfo
    })

    Product.getUserProduct(userInfo._openid)
      .then(data=>{
        const group = groupBy(data,item=>item.saled)
        this.setData({
          saled: group.get(true) || [],
          publish: group.get(false) || []
        })
      })

    Collection.getFollowed(userInfo._openid)
      .then(collect=>{
        const productIds = collect.map(item=>item.productid)
        return Product.getProducts(productIds)
      }).then(products=>{
        this.setData({
          collect: products
        })
      })
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


