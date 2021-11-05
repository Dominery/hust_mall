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
  }).orderBy('createdTime','desc')
  .get().then(res=>res.data)
}

function getList(tab) {
  if(tab==="recommend"){
    return getRecommendList()
  }
  return Product.where({
    category: tab,
    saled: false
  }).get().then(res=>res.data)
}

function markSaled(_id) {
  return Product.doc(_id).update({
    data: {
      saled: true
    }
  })
}

function getUserProduct(_openid) {
  return Product.where({
    _openid
  }).get().then(res=>res.data)
}

function deleteProduts(ids,imgUrls) {
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

function getProducts(ids) {
  return Product.where({
    _id:_.in(ids)
  }).get().then(res=>res.data)
}

module.exports = {
  create,getList, markSaled, getUserProduct,deleteProduts, getProducts
}