var mongoose = require("./connect.js");
mongoose.set('useFindAndModify', false)

var goodsSchema = new mongoose.Schema({
    name:String,
    price:String,
    attribute:Array,
    image:String,
    createTime:String,
    type:String
});

var Goods = mongoose.model("goods",goodsSchema);

module.exports = Goods;