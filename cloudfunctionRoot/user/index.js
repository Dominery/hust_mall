const getOpenId = require("./getOpenId/index")
const register = require("./register/index")
const getUserInfo = require("./getUserInfo/index")


// 云函数入口函数
exports.main = async (event, context) => {
  switch(event.type){
    case "getOpenId":
      return await getOpenId.main(event,context);
    case "register":
      return await register.main(event,context);
    case "getUserInfo":
      return await getUserInfo.main(event,context);
  }
}