// components/product-card/product-card.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    col: {
      type: Boolean,
      value: false
    },
    product: {
      type:Object,
      value: {}
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    imgUrl: '../../images/loading.gif'
  },

  /**
   * 组件的方法列表
   */
  methods: {

  },
  lifetimes: {
    ready(){
      this.setData({
        imgUrl: this.data.product.imgUrls[0]
      })
    }
  }
})
