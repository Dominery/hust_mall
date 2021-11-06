
const { Product,Collection } = require('../../js/controller/index')
const { Route, AuthorizeLogin, groupBy, Storage } = require('../../js/utils/index')

// pages/user/user.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    registered: true,
    publish: [],
    saled: [],
    collect: [],
    userInfo: {
      avatarUrl: "../../images/default-user.png",
      nickName: "-"
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
          this.setData({
            registered: true
          })
          this.onShow()
        })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
   this.setData({
     showPage: Storage.get('isExamined')
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
    const registered = Storage.get('registered')
    if(!registered){
      this.setData({
        registered
      })
      return
    }
    this.setData({
      userInfo: Storage.get('userInfo')
    })
    const _openid = Storage.get('_openid')
    Product.getByOpenid(_openid)
      .then(data=>{
        const group = groupBy(data,item=>item.saled)
        this.setData({
          saled: group.get(true) || [],
          publish: group.get(false) || []
        })
      })

    Collection.getFollowed(_openid)
      .then(collect=>{
        const productIds = collect.map(item=>item.productid)
        return Product.getById(productIds)
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


