const jwt=require("jwt-simple")
const sign="eleSign"

module.exports.getToken=function(phoneId){
    return jwt.encode({
        phoneId,
        exp:Date.now()+10*60*1000
    },sign);
}
