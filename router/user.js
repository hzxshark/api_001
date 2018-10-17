const fs =require("fs")
const help=require("../module/help")
const db=require("../module/db")
const jwt=require("../module/jwt")
//验证码
module.exports.sendCode=function(req,res){
    const valiCode=help.getRandom(1000,9999)
    db.insertOne("sendMessage",{
        phoneId:req.body.phoneId,
        valiCode,
        addTime:Date.now()+5*60*1000
    },function(err,results){
        res.json({
            ok:1,
            valiCode
        })
    })

}

module.exports.userLogin=function(req,res){
    console.log(req.body.phoneId)
    db.findOne("sendMessage",{
        phoneId:req.body.phoneId,
        sendCode:req.body.sendCode
    },function(err,info){
        if(info){
            db.findOne("userList",{
                phoneId:req.body.phoneId
            },function(err,userInfo){
                if(userInfo){//找到了该用户返回token
                    console.log(userInfo)
                    res.json({
                        ok:1,
                        phoneId:userInfo.phoneId,
                        token:jwt.getToken(userInfo.phoneId)

                    })
                }else{
                    db.insertOne("userList",{
                        phoneId:req.body.phoneId,
                        regTime:Date.now(),
                        goldNum:9999
                    },function(){
                        res.json({
                            ok:1,
                            phoneId:req.body.phoneId,
                            token:jwt.getToken(req.body.phoneId)

                        })
                    })
                }
            })
        }else{
            help.sendResults(res,-1,"验证码错误")
        }
    })
}