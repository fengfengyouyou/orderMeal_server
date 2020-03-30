var mongoose = require("./connect.js");
mongoose.set('useFindAndModify', false)

var orderSchema = new mongoose.Schema({
    createTime:String,
    totalPrice:Number,
    goodsList:Array,
    totalNumer:Number,
    userId:String
});

var Order = mongoose.model("order",orderSchema);

module.exports = Order;