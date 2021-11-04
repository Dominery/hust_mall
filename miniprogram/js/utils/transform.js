function transformNumToStr(num) {
  if(num<0 || num>10) return ''
  const template = '零一二三四五六七八九十'
  return template[num]
}

function groupBy(data,mapFunc) {
  const result = new Map()
  data.forEach(value=>{
    const key = mapFunc(value)
    if(result.has(key)){
      result.get(key).push(value)
    }else {
      result.set(key,[value])
    }
  })
  return result
}

module.exports = {
  transformNumToStr, groupBy
}