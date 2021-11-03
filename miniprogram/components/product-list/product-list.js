const { route } = require('../../js/utils/route')
// components/product-list/product-list.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    products: {
      type:Array,
      value: []
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    chooseIds:[],
    atManage: false,
    allSelect: false,
    emptyInfo: '难以置信，这里空空如也'
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
    productTabHandler(e){
      const { id } = e.target
      const product = this.data.products.find(item=>item._id===id)
      route('../../pages/product/product','productInfo',product)
    },
    deleteEventTrigger(){
      const { chooseIds } = this.data
      this.triggerEvent('deleteevent',{ chooseIds })
    },
    changeState(){
      const { atManage } = this.data
      this.setData({
        atManage: !atManage
      })
    }
  }
})
