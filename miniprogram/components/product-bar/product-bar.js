const { Collection, Product } = require('../../js/controller/index')
const appInstance = getApp()
// components/product-bar/product-bar.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    product: {
      type: Object,
      value:{}
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    collected:false,
    openid: '',
    saled: true,
    _lock: false
  },

  /**
   * 组件的方法列表
   */
  methods: {
    setQQtoClip(){
      if(!this._hasAccess())return
      wx.setClipboardData({
        data: this.data.product.qq,
      }).then(res=>{
        wx.showModal({
          showCancel:false,
          confirmColor:"#1FA4FC",
          title: "复制成功",
          content: "本平台仅提供联系方式，钱货须当面交接"
        })
      })
    },
    collectTapHandler(){
      if(!this._hasAccess())return
      if(this.data._lock) return
      this.data._lock = true

      const collected = !this.data.collected

      this._collectionChange(collected)
        .then(res=>{
          this.setData({
            collected
          })
          return wx.showToast({
            title: collected?'关注成功':'取消关注成功',
            icon: 'success',
            duration: 1500
          })
        }).then(res=>{
          this.data._lock = false
        })

    },
    markSaled(){
      wx.showModal({
        cancelColor: '#aaa',
        confirmColor:"#1FA4FC",
        content: "如果确认售出，该商品将无法检索到"
      }).then(res=>{
        if(res.confirm){
          this._saleProduct(this.data.product._id)
        }
      })
    },
    _collectionChange(collected){
      if(collected){
        return Collection.follow(this.data.product._id)
      }else {
        return Collection.unfollow(this.data.openid,this.data.product._id)
      }
    },
    _hasAccess(){
      if(this.data.openid){
        return true
      }
      wx.showToast({
        title: '请登录',
        icon: 'error'
      })
      return false
    },
    _saleProduct(productid){
      Product.markSaled(productid)
      .then(res=>{
        return wx.showToast({
          title: '操作成功',
          icon:'success',
          duration: 1000
        })
      }).then(res => {
        this.setData({
          saled:true
        })
      })
    }
  },
  lifetimes: {
    ready(){
      const openid = appInstance?.globalData?.userInfo?._openid || ''
      this.setData({
        openid
      })
      this.setData({
        saled: Boolean(this.data.product.saled)
      })


      Collection.isFollowed(openid,this.data.product._id)
        .then(data=>{
          this.setData({
            collected: Boolean(data)
          })
        })
    }
  }
})
