const fs =require("fs")
const {upPic}= require("../module/upPic")
const help=require("../module/help")
const db=require("../module/db")

module.exports.addShopTypeInfo=function(req,res){
    upPic(req,"shopTypePic",function(obj){
        if(obj.ok==3){
            db.insertOne("shopTypeList",{
                shopTypeName:obj.params.shopTypeName,
                shopTypePic:obj.newPicName,
                addTime:new Date().getTime(),
                upTime:Date.now()
            },function(err,results){
                if(err) help.sendResults(res)
                else help.sendResults(res,1,"上传成功")
            })
        }else{
            help.sendResults(res,-1,obj.msg)
        }
    })
}
module.exports.getShopTypeList=function(req,res){
    help.getPage(req,res,"shopTypeList","shopTypeName")
}
// module.exports.delShopTypeInfo=function(req,res){
//     db.deleteOneById("shopTypeList",req.query.id,function(err){
//         if(err) help.sendResults(res)
//         else help.sendResults(res,1,"删除成功")
//     })
// }
module.exports.delShopTypeInfo=function(req,res){
    db.findOneById("shopTypeList",req.query.id,function(err,info){
        if(err) help.sendResults(res)
        else{
            db.deleteOneById("shopTypeList",req.query.id,function(err,results){
                if(err) help.sendResults(res)
                else {
                    //删除的时候，注意路径的拼接
                    fs.unlink("./upPic/"+info.shopTypePic,function(err){
                        if(err) help.sendResults(res)
                        else help.sendResults(res,1,"删除成功")
                    })
                }
            })
        }
    })
}
module.exports.upShopTypeById=function(req,res){
    upPic(req,"shopTypePic",function(obj){
        if(obj.ok==1 ||obj.ok==3){
            var $set={
                shopTypeName:obj.params.shopTypeName,
                upTime:Date.now()
            }
            if(obj.ok==3){
                $set.shopTypePic=obj.newPicName
            }
            db.updateOneById("shopTypeList",obj.params.id,{
                $set
            },function(err,results){
                if(err) help.sendResults(res)
                else help.sendResults(res,1,"修改成功")
            })
        }else{
            help.sendResults(res,-1,obj.msg)
        }
    })
}
module.exports.getTypeNameById=function(req,res){
    db.findOneById("shopTypeList",req.query.id,function(err,shopTypeList){
        if(err) help.sendResults(res)
        else{
            res.json({
                ok:1,
                shopTypeList:shopTypeList || []
            })
        }
    })
}

module.exports.addShop=function(req,res){
    upPic(req,"shopPic",function(obj){
        console.log(obj)
        if(obj.ok==3){
            db.insertOne("shopList",{
                shopName:obj.params.shopName,
                shopPic:obj.newPicName,
                shopTypeId:obj.params.shopTypeId,
                shopTypeName:obj.params.shopTypeName,
                addTime:new Date().getTime(),
                upTime:Date.now()
            },function(err,results){
                if(err) help.sendResults(res)
                else help.sendResults(res,1,"上传成功")
            })
        }else{
            help.sendResults(res,-1,obj.msg)
        }
    })
}
module.exports.getShopList=function(req,res){
    help.getPage(req,res,"shopList","shopName")
}
module.exports.delShopInfo=function(req,res){
    db.findOneById("shopList",req.query.id,function(err,info){
        if(err) help.sendResults(res)
        else{
            db.deleteOneById("shopList",req.query.id,function(err,results){
                if(err) help.sendResults(res)
                else {
                    //删除的时候，注意路径的拼接
                    fs.unlink("./upPic/"+info.shopPic,function(err){
                        if(err) help.sendResults(res)
                        else help.sendResults(res,1,"删除成功")
                    })
                }
            })
        }
    })
}
module.exports.upShopById=function(req,res){
    upPic(req,"shopPic",function(obj){
        if(obj.ok==1 ||obj.ok==3){
            var $set={
                shopName:obj.params.shopName,
                shopTypeId:obj.params.shopTypeId,
                shopTypeName:obj.params.shopTypeName,
                upTime:Date.now()
            }
            if(obj.ok==3){
                $set.shopPic=obj.newPicName
            }
            db.updateOneById("shopList",obj.params.id,{
                $set
            },function(err,results){
                if(err) help.sendResults(res)
                else help.sendResults(res,1,"修改成功")
            })
        }else{
            help.sendResults(res,-1,obj.msg)
        }
    })
}
//前端调取数据接口
module.exports.getShopListByTypeId=function(req,res){
    db.find("shopList",{
        where:{
            shopTypeId:req.query.shopTypeId
        }
    },function(err,shopList){
        if(err) help.sendResults(res)
        else{
            res.json({
                ok:1,
                shopList
            })
        }
    })
}
