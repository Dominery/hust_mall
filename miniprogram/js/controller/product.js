const db = wx.cloud.database()
const Product = db.collection('product')
const _ = db.command


function uploadImg(imgLocalPaths) {
  return Promise.all(imgLocalPaths
  .map(path=>wx.cloud.uploadFile({
    cloudPath:new Date().getTime()+'.png',
    filePath: path
  }).then(res=>res.fileID)))
}

async function create(data){
  const time = db.serverDate()
  try{
    const imgUrls = await uploadImg(data.imgUrls)
    const submitData = {...data,imgUrls,createdTime:time,saled:false}
    return await Product.add({
      data:submitData
    }).then(()=>submitData)
  }catch(err){
    console.log(err)
    return Promise.reject('上传失败')
  }
}



function getRecommendList() {
  return Product.where({
    saled: false
  })
}

function getCategoryList(tab) {
  return Product.where({
    category: tab,
    saled: false
  })
}

function getList(getLogic,skipNum) {
  return getLogic
  .skip(skipNum)
  .get().then(res=>res.data)
  .then(data=>data.sort((pre,next)=>{
    return Date.parse(next.createdTime)-Date.parse(pre.createdTime)
  }))
}

function getByTab(tab,skipNum=0) {
  const getLogic = tab === "recommend" ? getRecommendList(): getCategoryList(tab)
  return getList(getLogic,skipNum)
}

function markSaled(_id) {
  return Product.doc(_id).update({
    data: {
      saled: true
    }
  })
}

function getByOpenid(_openid,skipNum=0) {
  const getLogic = Product.where({
    _openid
  })
  return getList(getLogic,skipNum)
}

function deleteById(ids,imgUrls) {
  return wx.cloud.deleteFile({
    fileList: imgUrls
  }).then(res=>{
    return wx.cloud.callFunction({
      name: 'deleteProducts',
      data: {
        ids
      }
    })
  })
}

function getById(ids,skipNum = 0) {
  const getLogic = Product.where({
    _id:_.in(ids)
  })
  return getList(getLogic,skipNum)
}

function search(value,skipNum = 0) {
  const getLogic = Product.where({
    title: {
      $regex:'.*' + value,
      $options: 'i'
    },
    saled: false
  })
  return getList(getLogic,skipNum)
}

module.exports = {
  create,getByTab, markSaled, getByOpenid,deleteById, 
  getById, search
}