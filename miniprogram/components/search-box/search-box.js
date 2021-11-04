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
    middle: {
      type: Boolean,
      value: true
    },
    inputValue: ''
  },

  /**
   * 组件的初始数据
   */
  data: {
    showCancel: false
  },

  /**
   * 组件的方法列表
   */
  methods: {
    inputFocus(e){
      this.setData({
        middle: false
      })
    },
    inputBlur(e){
      if(!e.detail.value){
        this.setData({
          middle: true
        })
      }
    },
    inputHandler(e){
      const {value} = e.detail
      const { showCancel } = this.data
      if(!value) {
        this.setData({
          showCancel: false
        })
        return
      }
      if(!showCancel){
        this.setData({
          showCancel:true
        })
      }
    },
    clearInput(e){
      this.setData({
        inputValue: '',
        showCancel: false,
        middle: true
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
