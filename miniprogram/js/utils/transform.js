function transformNumToStr(num) {
  if(num<0 || num>10) return ''
  const template = '零一二三四五六七八九十'
  return template[num]
}

module.exports = {
  transformNumToStr
}