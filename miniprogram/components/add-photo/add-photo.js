const compressBehavior = require('../../behavior/compress')
// components/add-photo/add-photo.js
Component({
  options: {
    styleIsolation: 'apply-shared',
    options: {
      pureDataPattern: /^_/
    }
  },
  behaviors: ["wx://form-field",compressBehavior],
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    photos: [],
    limit: 4,
    cHeight: 400,
    cWidth: 400,
    value: {
      type: Array,
      value:[]
    }
  },
  observers:{
    photos(imgObjs){
      const value = imgObjs.map(imgObj=>imgObj.path)
      this.setData({
        value
      })
    }
  },

  /**
   * 组件的方法列表
   */
  methods: {
    addPhoto:function (e) {
      wx.chooseImage({
        count: this.data.limit-this.data.photos.length,
        sizeType:["compressed"]
      }).then(res => {
        wx.showLoading({
          title: '压缩中',
        })
        console.log(res.tempFiles.map(f=>f.size))
        return Promise.all(res.tempFiles.map(async imgObj=>{
          return this.compressImg(imgObj)
        }))
      }).then(photoPath => {
        const newPhoto = photoPath.map(path => ({path,touch:false}))
        let photos = this.data.photos.concat(newPhoto)
        this.setData({
          photos
        })
        getFilesSize(photoPath)
        .then(res=>{console.log(res)})
      }).catch(err=>{
        console.log(err)
      }).finally(()=>{
        wx.hideLoading()
          .then(()=>{
            if(this.data.photos.length<2){
              wx.showToast({
                title: '最少两张图片',
                icon:'none',
                duration: 1000
              })
            }
          })
      })
    },
    deletePhoto: function (e) {
      const index = getIndex(e)
      if(index==-1)return;
      wx.showModal({
        cancelColor: '#E93B3B',
        title:"Note",
        content: "删除这张图片？"
      }).then(res=>{
        if(res.confirm){
          const photos = this.data.photos
          photos.splice(index,1)
          this.setData({
            photos
          })
        }
      })
    },
    touchPhoto: function (e) {
      const index = getIndex(e)
      if(index==-1)return;
      const photos = this.data.photos
      photos[index].touch = ! photos[index].touch
      this.setData({
        photos
      })
    },
    clear(e){
      this.setData({
        photos:[]
      })
    }
  },
  lifetimes:{
    ready(){
      this.setData({
        value:[]
      })
    }

  }
})

function getIndex(e) {
  const {index} = e.mark;
  if(Number.isInteger(index)){
    return index
  }
  return -1
}

async function getFilesSize(paths) {
  return Promise.all(paths.map(async path=>await wx.getFileInfo({
    filePath: path,
  }).then(res=>res.size)))
}
