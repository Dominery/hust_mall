// components/login/login.js
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
  },

  /**
   * 组件的初始数据
   */
  data: {
    show: true
  },

  /**
   * 组件的方法列表
   */
  methods: {
    authorizedLogin:function (e) {
      this.triggerEvent('register')
      this.cancel()
    },
    cancel(){
      this.setData({
        show:false
      })
    }
  },
  pageLifetimes: {
    show(){
      this.setData({
        show: true
      })
    }
  }
})
