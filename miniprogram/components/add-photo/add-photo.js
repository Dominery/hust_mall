const compressBehavior = require('../../behavior/compress')
// components/add-photo/add-photo.js
Component({
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
    cWidth: 400
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
        console.log(res.tempFiles.map(f=>f.size))
        return Promise.all(res.tempFiles.map(async imgObj=>{
          return await this.compressImg(imgObj)
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
    }
  },
  lifetimes:{
    ready(){
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
  return await Promise.all(paths.map(async path=>await wx.getFileInfo({
    filePath: path,
  }).then(res=>res.size)))
}


async function wxCompress(paths) {
  return Promise.all(paths.map(async path=> await wx.compressImage({
    src: path,
    quality: 0
  }).then(res=>{
    return res.tempFilePath
  })))
}

async function canvasCompress(paths,component) {
  return Promise.all(paths.map(async path=>{
    const info = await getImgInfo(path)
    const size =await getCompressSize(info)
    const canvas =await getCanvas(component)
    return await compress({...size,path,info},canvas)
  }))
}

