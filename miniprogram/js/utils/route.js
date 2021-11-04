function push(url,event,data) {
  wx.navigateTo({
    url,
  }).then(res=>{
    res.eventChannel.emit(event,data)
  })
}


module.exports = {
  push
}