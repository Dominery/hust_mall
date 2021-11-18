function validate(failed,errMsg) {
  return failed?errMsg:undefined;
}
function notStr(value) {
  return typeof value !== 'string'
}

const validateStrategies = {
  isNonEmpty: (value,errMsg)=>validate(notStr(value)||value==='',errMsg),
  minLength: (value,errMsg,length)=>validate(value.length<length,errMsg),
  isNumStr: (value, errMsg) => validate(notStr(value)||/[^\d]/.test(value),errMsg)
}

function Validator() {
  this.validates = []
}

/**
 * 
 * @param {any} value 验证的数据
 * @param {function} strategy validateRule
 * @param {string} errMsg 错误提示
 * @param  {...any} params validateRule的其余参数
 * @returns {Validator}
 */
Validator.prototype.add = function(value,strategy,errMsg,...params) {
  this.validates.push(()=>{
    return strategy(value,errMsg,...params)
  })
  return this;
}

/**
 * 
 * @param {any} value 待验证数据
 * @param {Array} rules 如[{strategy:minLength,errMsg:'最少10',params:[10]}]
 * @returns {Validator}
 */
Validator.prototype.adds = function (value,rules) {
  rules.forEach(rule=>{
    const {strategy,errMsg,params=[]} = rule
    this.add(value,strategy,errMsg,...params)
  })
  return this;
}

/**
 * 
 * @returns 如果通过，返回undifined，否则返回字符串
 */
Validator.prototype.validate = function () {
  return this.validates.map(fn=>fn()).find(msg=>msg)
}


module.exports= {
  validateStrategies,Validator
}