// components/clause-check/clause-check.js
Component({
  behaviors: ["wx://form-field"],
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    value: false
  },

  /**
   * 组件的方法列表
   */
  methods: {
    clickCheck(){
      const {value } = this.data
      this.setData({
        value:!value
      })
    },
    tapViewClause(e){
      console.log(e)
    }
  }
})
