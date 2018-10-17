const express=require("express")
const md5=require("md5")
const bodyParser=require("body-parser")
const help=require("./module/help")
const db=require("./module/db")
const admin=require("./router/admin")
const shop =require("./router/shop")
const goods= require("./router/goods")
const user=require("./router/user")

const app=express();
app.use(express.static("./upPic"))
app.use(bodyParser.json())
// app.use(bodyParser.urlencoded({
//     extended:false   //falese为不深度解析，true为深度解析
// }))
app.all("*",function(req,res,next){
    res.header("Access-Control-Allow-Origin","*")
    res.header("Access-Control-Allow-Methods","OPPTIONS,GET,POST,PUT,DELETE")
    res.header("Access-Control-Allow-Headers","content-type")
    next();
})

/*****************管理员相关接口*********************/

app.post("/login",admin.login)
app.get("/getAdminLogList",admin.getAdminLogList)
app.post("/addAdminInfo",admin.addAdminInfo)
app.get("/getAdminInfoList",admin.getAdminInfoList)
app.get("/delAdminLoginInfo",admin.delAdminLoginInfo)
app.get("/delAdminInfo",admin.delAdminInfo)

/*****************店铺管理接口*********************/

app.post("/addShopTypeInfo",shop.addShopTypeInfo)
app.get("/getShopTypeList",shop.getShopTypeList)
app.get("/delShopTypeInfo",shop.delShopTypeInfo)
app.post("/upShopTypeById",shop.upShopTypeById)
app.get("/getTypeNameById",shop.getTypeNameById)
app.post("/addShop",shop.addShop)
app.get("/getShopList",shop.getShopList)
// app.get("/getShopListAll",shop.getShopListAll)
app.get("/delShopInfo",shop.delShopInfo)
app.post("/upShopById",shop.upShopById)

/*****************商品管理相关接口*********************/
app.post("/addGoodsType",goods.addGoodsType)
app.get("/getGoodsTypeList",goods.getGoodsTypeList)
app.post("/delGoodsTypeInfo",goods.delGoodsTypeInfo)
app.post("/upGoodsTypeById",goods.upGoodsTypeById)
app.post("/addGoods",goods.addGoods)
app.get("/getGoodsList",goods.getGoodsList)
app.get("/getGoodsTypeByShop",goods.getGoodsTypeByShop)
app.post("/delGoodsInfo",goods.delGoodsInfo)
app.get("/getGoodsListByShop",goods.getGoodsListByShop)
app.post("/upGoodsById",goods.upGoodsById)

/*****************用户登录相关接口*********************/
app.post("/sendCode",user.sendCode)
app.post("/userLogin",user.userLogin)

/*****************前端调取数据接口*********************/
app.get("/getShopListByTypeId",shop.getShopListByTypeId)
app.listen(80,function(){
    console.log("you did it")
})