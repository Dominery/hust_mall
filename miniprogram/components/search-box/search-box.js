// components/search-box/search-box.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    placeholder:{
      type: String,
      value:''
    },
    inputValue: ''
  },

  /**
   * 组件的初始数据
   */
  data: {
  },

  /**
   * 组件的方法列表
   */
  methods: {
    inputHandler(e){
    },
    clearInput(e){
      this.setData({
        inputValue: ''
      })
    },
    submit(e){
      const { inputValue } = this.data
      if(!inputValue) return
      this.triggerEvent('searchevent',{
        keyword: this.data.inputValue
      })
    }
  }
})
