var express = require('express');
var router = express.Router();
var Order = require("../bin/DAO/order");
var methods = require('../common/formTime')
router.post("/add", (req, res) => {
    // console.log(req.body)
    let newOrder = {
        ...req.body,
        createTime: methods.formartDate(),
        userId:req.api_user.openid
    }
    console.log(newOrder)
    var s = new Order(newOrder);
    s.save()
        .then(() => {
            res.json({ err: 0, msg: "添加成功" });
        })
        .catch(err => {
            res.json({ err: 2, msg: "添加失败" });
        });
});
router.get("/get", (req, res) => {
    let condition = JSON.parse(req.query.condition)
    let limit = condition.limit||10
    let skip = condition.pageNum*limit
    Order.count({userId:req.api_user.openid})
    .then((count)=>{
        Order.find({userId:req.api_user.openid})
            .sort({ createTime: -1 })
            .skip(skip)
            .limit(limit)
            .then((data) => {
                // console.log(data)
                res.json({
                    err: 0,
                    data: data,
                    totalNum:count
                })
            })
    })
    .catch(err=>{
        console.log(err)
        res.json({ err: 2, msg: "请求失败" });
    })
});
module.exports = router;