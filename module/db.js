const mongodb=require("mongodb");
const mongoClient=mongodb.MongoClient;
function _connect(cb){
    mongoClient.connect("mongodb://127.0.0.1:27017",{ useNewUrlParser: true },function(err,client){
        if(err){
            console.log("连接失败");
        }else{
            //成功
            var db=client.db("eleme");
            cb(db);
        }
    })
}
/*
* 查找多条数据
* collection 指定集合名
* objWhere:查找的条件
* cb:回调函数*/
module.exports.find=(collection,obj,cb)=>{
    obj.where= obj.where || {};
    obj.sort= obj.sort || {};
    obj.limit=obj.limit  || 0;
    obj.skip=obj.skip || 0;
    _connect(function(db){
        db.collection(collection).find(obj.where).sort(obj.sort).limit(obj.limit).skip(obj.skip).toArray(cb);
    })
}
/*
* 根据ID搜索指定的文档
* collection 指定集合名
* id:条件 ID
* cb:回调函数*/
module.exports.findOneById=(collection,id,cb)=>{
    _connect(function(db){
        db.collection(collection).findOne({
            _id:mongodb.ObjectId(id)
        },cb);
    })
}
//根据条件进行查找，结果为一条记录
module.exports.findOne=(collection,whereObj,cb)=>{
    _connect(function(db){
        db.collection(collection).findOne(whereObj,cb);
    })
}
/*
* 添加一条数据
* collection 指定集合名
* insertObj:插入的对象
* cb:回调函数*/
module.exports.insertOne=(collection,insertObj,cb)=>{
    _connect(function(db){
        db.collection(collection).insertOne(insertObj,cb);
    })
}
/*
* 根据条件求记录条数
* collection 指定集合名
* whereObj:条件
* cb:回调函数*/
module.exports.count=(collection,whereObj,cb)=>{
    _connect(function(db){
        db.collection(collection).countDocuments(whereObj).then(cb);
    })
}
/*
* 根据ID删除集合的数据
* collection 指定集合名
* id:id
* cb:回调函数*/
module.exports.deleteOneById=(collection,id,cb)=>{
    _connect(function(db){
        db.collection(collection).deleteOne({
            _id:mongodb.ObjectId(id)
        },cb)
    })
}
/*
* 根据ID删除集合的数据
* collection 指定集合名
* id:id
* cb:回调函数*/
module.exports.updateOneById=(collection,id,upObj,cb)=>{
    _connect(function(db){
        db.collection(collection).updateOne({
            _id:mongodb.ObjectId(id)
        },upObj,cb)
    })
}
// 根据条件更新一条记录
module.exports.updateOne=(collection,whereObj,upObj,cb)=>{
    _connect(function(db){
        db.collection(collection).updateOne(whereObj,upObj,cb)
    })
}
//根据条件更改多条记录
module.exports.updateMany=(collection,whereObj,upObj,cb)=>{
    _connect(function(db){
        db.collection(collection).updateMany(whereObj,upObj,cb)
    })
}