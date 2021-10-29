

// components/num-select/number-select.js
Component({
  behaviors: ["wx://form-field"],
  /**
   * 组件的属性列表
   */
  properties: {
    minValue:{
      type:Number,
      value:3
    },
    maxValue:{
      type: Number,
      value:10
    },
    value: {
      type: Number,
      value: 9
    }
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
    dec(e){
      const { value, minValue} = this.data
      if(value==minValue)return
      this.setData({
        value: value-1
      })
    },
    add(e){
      const { value, maxValue} = this.data
      if(value==maxValue)return
      this.setData({
        value: value+1
      })
    }
  },
  lifetimes:{
    ready(){
      const { value,minValue,maxValue } = this.properties
      if(value<minValue || value > maxValue){
        this.setData({
          value:minValue
        })
      }
    }
  }
})
