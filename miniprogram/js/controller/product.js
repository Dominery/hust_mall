const db = wx.cloud.database()
const Product = db.collection('product')


function uploadImg(imgLocalPaths) {
  return Promise.all(imgLocalPaths
  .map(path=>wx.cloud.uploadFile({
    cloudPath:new Date().getTime()+'.png',
    filePath: path
  }).then(res=>res.fileID)))
}

async function create(data){
  console.log(data)
  const time = db.serverDate()
  try{
    const imgUrls = await uploadImg(data.imgUrls)
    console.log(imgUrls)
    return await Product.add({
      data:{...data,imgUrls,createdTime:time}
    })
  }catch(err){
    console.log(err)
    return Promise.reject('上传失败')
  }
}

function getRecommendList() {
  return Product.where({
    saled: false
  }).get().then(res=>res.data)
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

function deleteProduts(ids) {
  return wx.cloud.callFunction({
    name: 'deleteProducts',
    data: {
      ids
    }
  }).then(res=>res.result.data)
}

module.exports = {
  create,getList, markSaled, getUserProduct,deleteProduts
}