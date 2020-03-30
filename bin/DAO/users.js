var mongoose = require("./connect.js");

var usersSchema = new mongoose.Schema({
    nickName:String,
    sex:String,
    tel:String,
    age:Number,
    openid:String,
    token:String,
    avatarUrl:String
});

var Users = mongoose.model("users",usersSchema);

module.exports = Users;