// pages/publish/publish.js

const { validator,strEmptyCheck, strMoreThan, numStr, strToNum } = require('../../js/utils/validator')

const { create } = require('../../js/controller/product')

const { categories } = require('../../js/data')

Page({

  /**
   * 页面的初始数据
   */
  data: {
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
    const formData = e.detail.valut
    const category = categories.find(item=>item.value===formData.category)
    this.dataValidate({...formData,category})
    .then(data =>{
      wx.showLoading({
        title: '上传中',
      })
      return create(data)
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
    function successSubmit() {
      // that.clearInput()
      wx.hideLoading()
        .then(()=>{
          wx.showToast({
            title: '成功上传',
            icon: "success",
            duration: 2000
          })
        })
    }

  },
  async dataValidate(rawData){
    let data;
    try{
      data = await clauseChecked(rawData,"请勾选条款")
    }catch(message){
      return Promise.reject(message)
    }
    
    return strEmptyCheck(encodeOldPrice(data))
      .catch(key=>{
        const info = this.data.inputItems[key]?.info
        return Promise.reject(`请输入${info}`)
      })
      .then(validator(strMoreThan("title",5),"标题过短"))
      .then(validator(strMoreThan("desc",10),"内容过短"))
      .then(validator(checkImgNum,"图片至少2张"))
      .then(validator(strMoreThan("pos",3),"位置信息过少"))
      .then(validator(strMoreThan("qq",5),"qq非法"))
      .then(validator(numStr("qq"),"qq非法"))
      .then(validator(strToNum("price"),"价格非法"))
      .then(validator(strToNum("oldPrice"),"原价非法"))
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

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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

function encodeOldPrice(data) {
  const {oldPrice } = data
  if(!oldPrice){
    return {...data,oldPrice:"0"}
  }
  return data
}

function checkImgNum(data) {
  return data.imgUrls?.length > 1
}

/**
 * 返回一个Promise，如果data的check属性false，拒绝，否则返回一个新对象包含data除check外的其余属性
 * @param {Object} data 
 * @param {String} message 
 * @returns {Promise}
 */
function clauseChecked(data,message) {
  return new Promise((resolve,reject)=>{
    const{ check,...result }= data
    if(!check) {
      reject(message)
    }
    resolve(result)
  })
}