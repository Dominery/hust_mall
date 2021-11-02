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
    _qq:'2333',
    collected:false,
    openid: '',
    ownerid: '1',
    saled: true,
    _lock: false
  },

  /**
   * 组件的方法列表
   */
  methods: {
    setQQtoClip(){
      wx.setClipboardData({
        data: this.data._qq,
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
      if(this.data._lock) return
      this.data._lock = true

      const collected = !this.data.collected
      this.setData({
        collected
      })
      this.data._lock = false
    },
    markSaled(){
      wx.showModal({
        cancelColor: '#aaa',
        confirmColor:"#1FA4FC",
        content: "如果确认售出，该商品将无法检索到"
      }).then(res=>{
        if(res.confirm){
          wx.showToast({
            title: '操作成功',
            icon:'success',
            duration: 1000
          })
        }
      })
    }
  }
})
