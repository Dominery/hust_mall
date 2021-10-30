
// components/categories/category.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    categories:{
      type: Array,
      value: []
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    defaultPos:{
      type:Number,
      value:0
    },
    pickedCategory:""
  },
  observers:{
  },

  /**
   * 组件的方法列表
   */
  methods: {
    pickHandler(e){
      const pick = e.detail?.value
      if(Array.isArray(pick)){
        const category = this.properties.categories[pick[0]]
        this.setData({
          pickedCategory:category
        })
      }
    },
    confirm(){
      const eventDetail = {}
      eventDetail.category = this.properties.pickedCategory
      this.triggerEvent('categoryevent',eventDetail)
    }
  },
  lifetimes: {
    ready(){
      const {categories }= this.properties
      const pos = Math.trunc(categories.length/2)
      const category = categories[pos]
      this.setData({
        defaultPos: pos,
        pickedCategory: category
      })
    }
  }
})
