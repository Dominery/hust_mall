function validator(predicfn,message) {
  return data  => new Promise((resolve,reject)=>{
    if(predicfn(data)){
      resolve(data)
    }
    reject(message)
  })
}


/**
 * 校验data中属性值类型为String是否都有内容，返回
 * 一个Promise，如果通过校验，传递data，如果没通过，则错误消息
 * 为未通过的属性名
 * @param {Object} data 
 * @returns {Promise}
 */
function strEmptyCheck(data) {
  return new Promise((resolve,reject)=>{
    const result = Object.entries(data).find(([key,value])=>{
      return typeof value=== "string" && value ===""
    })
    if(result){
      reject(result[0])
    }
    resolve(data)
  })
}

/**
 * 输入属性值attr和长度num
 * 生成一个predict函数，该函数接收data，如果data的attr有length属性且大于num，返回true
 * @param {Number} num 
 * @returns {Function}
 */
function strMoreThan(attr,num) {
  return data => {
    return data[attr]?.length>=num
  }
}
const notNumPatter = /[^\d]/
/**
 * 生成一个predict函数，该函数接收data，如果data的attr属性不是整数字符串返回false
 * @param {String} attr 属性值
 */
function numStr(attr) {
  return data => {
    return isStr(data,attr) && !notNumPatter.test(data[attr])
  }
}

/**
 *  生成一个predict函数，该函数接收data，如果data的attr属性是数字字符串，将该属性修改成数字类型，并返回true
 * @param {String} attr 属性值
 */
function strToNum(attr) {
  return data => {
    const num = Number(data[attr])
    if(isStr(data,attr)&&!isNaN(num)){
      data[attr] = num
      return true
    }
    return false
  }
}


function isStr(obj,attr) {
  return typeof obj[attr] === "string"
}

module.exports= {
  validator,strEmptyCheck,strMoreThan,numStr,strToNum
}