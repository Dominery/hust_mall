const { Route } = require('../../js/utils/index')
// components/product-list/product-list.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    products: {
      type:Array,
      value: []
    },
    showManage: {
      type: Boolean,
      value: true
    },
    emptyInfo: {
      type: String,
      value: '不用找了，这里没有东西吶'
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    chooseIds:[],
    atManage: false,
    allSelect: false
  },
  observers: {
    chooseIds(ids){
      const { products } = this.data
      this.setData({
        allSelect: products.length === ids.length
      })
    }
  },

  /**
   * 组件的方法列表
   */
  methods: {
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
    allSelectTap(){
      const { allSelect } = this.data
      if(allSelect){
        this.setData({
          chooseIds: []
        })
      }else {
        const chooseIds = this.data.products.map(item=>item._id)
        this.setData({
          chooseIds
        })
      }
    },
    productTabHandler(e){
      const { id } = e.target
      const product = this.data.products.find(item=>item._id===id)
      Route.push('../../pages/product/product','productInfo',product)
    },
    deleteEventTrigger(){
      const { chooseIds } = this.data
      if(chooseIds.length===0) return
      this.triggerEvent('deleteevent',{ chooseIds })
      this.changeState()
    },
    changeState(){
      const { atManage } = this.data
      this.setData({
        atManage: !atManage,
        chooseIds: []
      })
    }
  }
})
