
const db =require("./db")
module.exports.sendResults=(res,ok=-1,msg="网络连接错误")=>{
    res.json({
        ok,
        msg
    })
}

module.exports.getPage=function(req,res,collection,key) {
    console.log(key,req.query.keyWord)
    var where={};
    var keyWord=req.query.keyWord || "";
    if(keyWord.length>0){
        where[key]=new RegExp(keyWord);//shopTypeName
    }
    db.count(collection,where, function (count) {
        var pageIndex = req.query.pageIndex
        var pageNum = req.query.pageNum*1
        console.log(pageNum)
        var pageSum = Math.ceil(count / pageNum)
        if (pageSum < 1)
            pageSum = 1;
        if (pageIndex > pageSum)
            pageIndex = pageSum
        if (pageIndex < 1)
            pageIndex = 1;
        db.find(collection, {
            where,
            limit: pageNum,
            skip: pageNum * (pageIndex - 1),
            sort: {
                _id: -1
            }
        }, function (err, results) {
            if (err) help.sendResults(res)
            else {
                var pageObj={
                    ok: 1,
                    pageSum,
                    pageIndex,
                    pageNum,
                    count
                }
                pageObj[collection]=results;
                res.json(pageObj)
            }
        })
    })
}

module.exports.getRandom=function(min,max,){
    return Math.floor(Math.random()*(max-min+1)+min)
}