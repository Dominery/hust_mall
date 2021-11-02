const db = wx.cloud.database()
const collection = db.collection('product')


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
    return await collection.add({
      data:{...data,imgUrls,createdTime:time}
    })
  }catch(err){
    console.log(err)
    return Promise.reject('上传失败')
  }
}

function getRecommendList() {
  return collection.get().then(res=>res.data)
}

function getList(tab) {
  if(tab==="recommend"){
    return getRecommendList()
  }
  return collection.where({
    category: tab
  }).get().then(res=>res.data)
}

module.exports = {
  create,getList
}