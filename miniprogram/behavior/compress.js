module.exports = Behavior({
  data: {
    id: "canvas",
    _canvas:null,
    _ctx: null,
    _dpr:null,
    _quality: 0.1,
    maxSize:300
  },
  methods: {
    async compressImg(pathObj){
      const {size,path} = pathObj
      console.log("original:"+size)
      const wxCompressPathObj = await getFileObj(await this._wxCompress(path))
      console.log("wxCompress:"+wxCompressPathObj.size)
      if(size<1024*1024){
        return getLessSizePath(wxCompressPathObj,pathObj)
      }
      const canvasCompressPathObj = await getFileObj(await this._canvasCompress(wxCompressPathObj.path))
      console.log("canvasCompress:"+canvasCompressPathObj.size)
      return getLessSizePath(canvasCompressPathObj,wxCompressPathObj,pathObj)
    },
    _wxCompress(path){
      return wx.compressImage({
        src: path,
        quality:this.data._quality
      }).then(res=>res.tempFilePath)
    },
    _canvasCompress: async function (path) {
      const info = await getImgInfo(path)
      const compressSize =await this._getCompressSize(info)
      
      return await this._createImage(path)
              .then(image=>this._getTempFilePath(info,compressSize,image))
    },
    _getCanvas(component) {
      return new Promise((resolve,reject)=>{
        component.createSelectorQuery().select(`#${this.data.id}`)
         .fields({node:true,size:true})
         .exec(res=>{
           try {
             const canvas = res[0].node
             resolve(canvas)
           } catch (err) {
             reject("getCanvas failed")
           }
         })
      })
    },
    async _getTempFilePath(imgSize,compressSize,image) {
      const {width,height} = imgSize
      const {_ctx,_quality,_canvas } = this.data

      _ctx.clearRect(0,0,width,height)
      _ctx.drawImage(image,0,0,width,height,0,0,compressSize.width,compressSize.height)
      return wx.canvasToTempFilePath({
        canvas:_canvas,
        fileType:"png",
        quality:_quality,
        destHeight:compressSize.height,
        destWidth:compressSize.width
      }).then(res=>res.tempFilePath)
    },
    _createImage(path){
      return new Promise(resolve=>{
        const image = this.data._canvas.createImage()
        image.src = path
        image.onload = ()=>{
          resolve(image)
        }
      })
    },
    _getCompressSize(imgSize){
      let { width, height } = imgSize
      const {maxSize,_canvas} = this.data
      let ratio = width/height
      if(width>maxSize && width>height){
          width = maxSize
          height = width/ratio
      }else if(height>maxSize && height >= width){
        height = maxSize
        width = height * ratio
      }
      _canvas.width = width
      _canvas.height = height
      return {
        width,
        height
      }
    }
  },
  lifetimes:{
    ready(){
      this._getCanvas(this)
        .then(_canvas=>{
          const _ctx = _canvas.getContext("2d")
          const _dpr = wx.getSystemInfoSync().pixelRatio
          this.setData({
            _canvas,
            _ctx,
            _dpr
          })
        })
    }
  }
})

function getImgInfo(path) {
  return wx.getImageInfo({
    src: path,
  })
}

function getFileObj(path) {
  return wx.getFileInfo({
    filePath: path,
  }).then(res=>({
    size:res.size,
    path
  }))
}

function getLessSizePath(...pathObjs) {
  return pathObjs.reduce((pre,cur)=>{
    return pre.size > cur.size ? cur: pre
  }).path
}