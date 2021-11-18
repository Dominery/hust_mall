// pages/publish/publish.js


const { Product } = require('../../js/controller/index')

const { categories } = require('../../js/data')

const { Route, AuthorizeLogin, DataValidator, Storage } = require('../../js/utils/index')

const {  Validator, validateStrategies } = DataValidator

Page({

  /**
   * 页面的初始数据
   */
  data: {
    registered:true,
    categories:categories.map(category=>category.value),
    showCategorySelect:false,
    category:"",
    clearValue:"",
    inputItems:{
      title:{
        info: "标题",
        placeholder: "宝贝标题，至少5字"
      },
      desc: {
        info: "宝贝描述",
        placeholder: "详细描述一下你的宝贝吧，至少10字，最多100字"
      },
      category:{
        info:"分类",
        placeholder:"选择分类"
      },
      price: {
        info: "售价",
        placeholder: "意向价格"
      },
      oldPrice: {
        info: "原价",
        placeholder: "选填"
      },
      pos: {
        info: "位置",
        placeholder: "具体到宿舍楼"
      },
      qq: {
        info: "QQ",
        placeholder: "请输入qq号"
      }
    }
  },
  publishSumbmit(e){
    const formData = e.detail.value

    this.processBeforeValidate(formData)
    .then(this.dataValidate)
    .then(this.processAfterValidate)
    .then(data =>{
      wx.showLoading({
        title: '上传中',
      })
      return Product.create(data)
    })
    .then(successSubmit)
    .catch(message => {
      wx.showToast({
        title: message,
        icon:"error",
        duration:2000
      })
    })
    const that = this;
    function successSubmit(data) {
      that.clearInput()
      return wx.hideLoading().then(()=>{
          wx.showToast({
            title: '成功上传',
            icon: "success",
            duration: 2000
          })
        }).then(()=>{
          Route.push('../product/product','productInfo',{...data,_openid:Storage.get('_openid')})
        })
    }

  },
  async processBeforeValidate(formData){
    if (!Storage.get('registered')) return Promise.reject('请登录')
    const category = categories.find(item => item.value === formData.category)
    const oldPrice = formData.oldPrice || '0'
    const transformData = {...formData,oldPrice, category: category?.id }
    const { check, ...result } = transformData
    if (!check) {
      return Promise.reject('请勾选条款')
    }
    return result
  },
  dataValidate(data){
    const dataValidator = new Validator()
    dataValidator.adds(data.title,[
      {
        strategy: validateStrategies.isNonEmpty,
        errMsg: '请输入标题'
      },{
        strategy: validateStrategies.minLength,
        errMsg: '标题过短',
        params: [5]
      }
    ]).adds(data.desc,[
      {
        strategy: validateStrategies.isNonEmpty,
        errMsg: '请输入描述'
      },{
        strategy: validateStrategies.minLength,
        errMsg: '描述过短',
        params: [10]
      }
    ]).add(data.imgUrls,validateStrategies.minLength,'图片至少两张',2)
      .add(data.category,validateStrategies.isNonEmpty,'请选择类别')
      .adds(data.price,[
        {
          strategy: validateStrategies.isNonEmpty,
          errMsg: '请输入价格'
        }, {
          strategy: validateStrategies.isNumStr,
          errMsg: '价格非法'
        }
      ])
      .add(data.oldPrice,validateStrategies.isNumStr,'原价非法')
      .adds(data.pos, [
        {
          strategy: validateStrategies.isNonEmpty,
          errMsg: '请输入位置'
        }, {
          strategy: validateStrategies.minLength,
          errMsg: '位置信息过少',
          params: [3]
        }
    ]).adds(data.qq,[
      {
        strategy: validateStrategies.isNonEmpty,
        errMsg: '请输入qq'
      }, {
        strategy: validateStrategies.minLength,
        errMsg: 'qq非法',
        params: [5]
      }, {
        strategy: validateStrategies.isNumStr,
        errMsg: 'qq非法'
      }
    ])
    
    return new Promise((resolve,reject)=>{
      const result = dataValidator.validate()
      if(typeof result === 'string') reject(result)
      else resolve(data)
    })
  },
  async processAfterValidate(data){
    const { price,oldPrice } = data
    return {data,price:Number(price),oldPrice:Number(oldPrice)}
  },
  clearInput(){
    this.setData({
      clearValue:""
    })
    this.selectComponent("#add-photo").clear()
  },
  onCategorySelected(e){
    const {category} = e.detail
    this.setData({
      category,
      showCategorySelect:false
    })
  },
  selectCategory(){
    this.setData({
      showCategorySelect:true
    })
  },
  registerHandler(e){
    new AuthorizeLogin()
        .run(userInfo=>{
          Storage.set('registered',true)
          Storage.set('userInfo',userInfo)
          this.setData({
            registered: true
          })
          this.onShow()
        })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
   this.setData({
     showPage: Storage.get('isExamined')
   })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    const  registered  = Storage.get('registered')
    if(registered) return
    this.setData({
      registered
    })

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})