var express = require('express');
var router = express.Router();
var Goods = require("../bin/DAO/goods.js");
// import {formartDate} from '../public/javascripts/formTime'
var methods = require('../common/formTime')
router.post("/add", (req, res) => {
    // console.log(req.body)
    var s = new Goods({
        ...req.body,
        createTime: methods.formartDate()
    });
    s.save()
        .then(() => {
            res.json({ err: 0, msg: "添加成功" });
        })
        .catch(err => {
            res.json({ err: 2, msg: "添加失败" });
        });
});
router.post("/update", (req, res) => {
    // console.log(req.body)
    Goods.findByIdAndUpdate(req.body._id, req.body)
    .then(() => {
        res.json({ err: 0, msg: "修改成功" });
    })
    .catch(err => {
        res.json({ err: 2, msg: "修改失败" });
    });
});
router.post("/delete", (req, res) => {
    // 把_id中两端的双引号删除
    // req.body._id = req.body._id.replace(/"/g,"");
    console.log(req.body)
    Goods.remove(req.body)
    .then(() => {
        res.json({ err: 0, msg: "删除成功" });
    })
    .catch(err => {
        console.log(err)
        res.json({ err: 2, msg: "删除失败" });
    });
});
router.get("/getList", (req, res) => {
    // console.log(req.query)
    var condition = req.query.condition || {},
        //排序条件，如果参数中有排序条件则加入排序条件
        sortCondition = req.query.sortCondition || {
            createTime: 1
        },
        skip = req.query.skip || null,
        limit = req.query.limit || 0
    if (req.query.sortCondition) {
        sortCondition = sortCondition
    }
    Goods.find()
        .sort({ createTime: 1 })
        .skip(skip)
        .limit(limit)
        .then((data) => {
            // console.log(data)
            res.json({
                err: 0,
                data: data
            })
        })
});
module.exports = router;