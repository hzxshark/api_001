const fs =require("fs")
const {upPic}= require("../module/upPic")
const help=require("../module/help")
const db=require("../module/db")

module.exports.addGoodsType=function(req,res){
// 添加商品类别，判断店铺和商品类别是否已经存在，如果存在，不允许重复添加
    db.findOne("goodsTypeList",{
        shopId:req.body.shopId,
        goodsTypeName:req.body.goodsTypeName
    },function(err,goodsTypeInfo){
        if(err) help.sendResults(res)
        else{
            if(goodsTypeInfo){
                help.sendResults(res,-1,"商品类别已存在")
            }else{
                db.insertOne("goodsTypeList",{
                    shopName:req.body.shopName,
                    shopId:req.body.shopId,
                    goodsTypeName:req.body.goodsTypeName,
                    addTime:Date.now(),
                    upTime:Date.now()
                },function(err){
                    if(err) help.sendResults(res)
                    else help.sendResults(res,1,"添加商品类别成功")
                })
            }

        }
    })
}
module.exports.getGoodsTypeList=function(req,res){
    help.getPage(req,res,"goodsTypeList","goodsTypeName")
}
module.exports.delGoodsTypeInfo=function(req,res){
    db.deleteOneById("goodsTypeList",req.body.id,function(err){
        if(err) help.sendResults(res)
        else help.sendResults(res,1,"删除成功")
    })
}
module.exports.upGoodsTypeById=function(req,res){
    db.updateOneById("goodsTypeList",req.body.id,{
        $set:{
            shopId:req.body.shopId,
            goodsTypeName:req.body.goodsTypeName,
            shopName:req.body.shopName,
            upTime:Date.now()
        }
    },function(err){
        if(err) help.sendResults(res)
        else help.sendResults(res,1,"修改商品类别成功")
    })
}
module.exports.addGoods=function(req,res){
    upPic(req,"goodsPic",function(obj){
        if(obj.ok==3){
            db.insertOne("goodsList",{
                shopName:obj.params.shopName,
                shopId:obj.params.shopId,
                goodsTypeId:obj.params.goodsTypeId,
                goodsTypeName:obj.params.goodsTypeName,
                goodsName:obj.params.goodsName,
                goodsPrice:obj.params.goodsPrice,
                isHot:obj.params.isHot,
                isCheap:obj.params.isCheap,
                goodsPic:obj.newPicName,
                goodsTxt:obj.params.goodsTxt,
                addTime:Date.now()
            },function(err){
                if(err) help.sendResults(res)
                else help.sendResults(res,1,"添加商品信息成功")
            })
        }else{
            help.sendResults(res,-1,obj.msg)
        }
    })
}
module.exports.getGoodsList=function(req,res){
    help.getPage(req,res,"goodsList","goodsName")
}
module.exports.getGoodsTypeByShop=function(req,res){
    db.find("goodsTypeList",{
        where:{
            shopId:req.query.shopId
        }
    },function(err,goodsTypeList){
        res.json({
            ok:1,
            goodsTypeList
        })
    })
}
module.exports.getGoodsListByShop=function(req,res){
    help.getPage(req,res,"goodsList","shopId")
}
module.exports.delGoodsInfo=function(req,res){
    db.deleteOneById("goodsList",req.body.id,function(err){
        if(err) help.sendResults(res)
        else help.sendResults(res,1,"删除成功")
    })
}
module.exports.upGoodsById=function(req,res){
    upPic(req,"goodsPic",function(obj){
        if(obj.ok==1 ||obj.ok==3){
            var $set={
                shopName:obj.params.shopName,
                shopId:obj.params.shopId,
                goodsTypeId:obj.params.goodsTypeId,
                goodsTypeName:obj.params.goodsTypeName,
                goodsName:obj.params.goodsName,
                goodsPrice:obj.params.goodsPrice,
                isHot:obj.params.isHot,
                isCheap:obj.params.isCheap,
                goodsPic:obj.newPicName,
                goodsTxt:obj.params.goodsTxt,
                upTime:Date.now()
            }
            if(obj.ok==3){
                $set.goodsPic=obj.newPicName
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