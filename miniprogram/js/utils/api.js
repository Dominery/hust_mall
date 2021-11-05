function showModal(content,title='Note',showCancel=true,cancelMsg='取消') {
  return wx.showModal({
    cancelColor: '#aaa',
      comfirmColor: '#1FA4FC',
      content,
      title,
      showCancel
  }).then(res=>{
    if(res.cancel){
      return Promise.reject(cancelMsg)
    }
    return res
  })
}

function successToast(title) {
  wx.showToast({
    title,
    icon: 'success',
    duration: 1000
  })
}

function errorToast(title) {
  wx.showToast({
    title,
    icon: 'error',
    duration: 1000
  })
}

module.exports = {
  showModal, successToast, errorToast
}