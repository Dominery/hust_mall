
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
    pickedCategory:"",
    _picked:true
  },
  observers:{
  },

  /**
   * 组件的方法列表
   */
  methods: {
    pickStart(e){
      this.setData({
        _picked: false
      })
    },
    pickEnd(e){
      this.setData({
        _picked:true
      })
    },
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
      const { pickedCategory, _picked } = this.data
      if(_picked){
        this.triggerEvent('categoryevent',{ category: pickedCategory })
        return
      }
      wx.showToast({
        title: '选择过快',
        icon: 'error',
        duration: 500
      })
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
