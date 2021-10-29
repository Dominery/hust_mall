

// components/operator/operator.js
Component({
  options: {
    styleIsolation: 'apply-shared',
    options: {
      pureDataPattern: /^_/
    }
  },
  /**
   * 组件的属性列表
   */
  properties: {
    dec: {
      type:Boolean,
      value:false
    },
    light: {
      type: Boolean,
      value: false
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
    },
    lifetimes: {
      ready(){
    }
  }
})
