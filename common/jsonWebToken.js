
const jwt = require('jsonwebtoken');  //用来生成token
let secretOrPrivateKey = "jwt";// 这是加密的key（密钥）
exports.createToken = function(userInfo){
    let token = jwt.sign(userInfo, secretOrPrivateKey, { expiresIn: '1day' })
    return token
}
exports.checkToken = function(req, res, next){
    // req 参数可以接受一些请求的参数(req.query/req.body) 和 请求头信息

    // res 用于响应信息

    // 调用next()方法则进入下一个中间件
    // console.log(req.headers)
    var token = req.headers.authorization
    jwt.verify(token, secretOrPrivateKey, function (err, decode) {
        if (err) {  //  时间失效的时候/ 伪造的token
            console.log(err)
            res.json({err:99,msg:'token无效'}) 
        } else {
            req.api_user = decode
            console.log('user信息',decode)
            next()
        }
    })
}