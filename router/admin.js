const md5=require ("md5")
const help=require("../module/help")
const db=require("../module/db")

module.exports.login=function(req,res){
    db.findOne("adminInfoList",{
        adminName:req.body.adminName,
        passWord:md5(req.body.passWord+"ele@888")
    },function(err,adminInfo){
        if(adminInfo){
            db.insertOne("adminLoginLogList",{
                adminName:adminInfo.adminName,
                adminId:adminInfo._id,
                loginTime:new Date().getTime()
            },function(err){
                if(err) help.sendResults(res)
                else{
                    res.json({
                        ok:1,
                        adminName:adminInfo.adminName,
                        adminId:adminInfo._id
                    })
                }
            })
        }else{
            help.sendResults(res,-1,"用户名或账号密码错误")
        }
    })
}
module.exports.getAdminLogList=function(req,res) {
    // setTimeout(function(){
        help.getPage(req,res,"adminLoginLogList")
    // },2000)
}
module.exports.addAdminInfo=function(req,res){
    if(req.body.adminName && req.body.passWord){
        db.findOne("adminInfoList",{
            adminName:req.body.adminName
        },function(err,info){
            if(err) help.sendResults(res)
            else{
                if(info){//不为空，说明该用户已经存在
                    help.sendResults(res,-1,"该管理员账号已存在，请不要重复添加")
                }else{//没有，执行添加
                    db.insertOne("adminInfoList",{
                        adminName:req.body.adminName,
                        passWord:md5(req.body.passWord+"ele@888"),
                        addTime:Date.now()
                    },function(err){
                        if(err) help.sendResults(res)
                        else help.sendResults(res,1,"添加管理员成功")
                    })
                }
            }
        }) 
    }else{
        help.sendResults(res,-1,"用户名或密码不能为空")
    }
    
}
module.exports.getAdminInfoList=function(req,res){
    help.getPage(req,res,"adminInfoList","adminName")
}
module.exports.delAdminLoginInfo=function(req,res){
    db.deleteOneById("adminLoginLogList",req.query.id,function(err){
        if(err) help.sendResults(res)
        else help.sendResults(res,1,"删除成功")
    })
}
module.exports.delAdminInfo=function(req,res){
    db.deleteOneById("adminInfoList",req.query.id,function(err){
        if(err) help.sendResults(res)
        else help.sendResults(res,1,"删除成功")
    })
}