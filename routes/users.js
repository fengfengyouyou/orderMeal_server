var express = require('express');
var router = express.Router();
var Users = require("../bin/DAO/users.js");
//微信小程序设置
const wx = require('../common/wxConfig.json'); //文件中存储了appid 和 secret
//处理node request请求
const request = require('request');
var jwt = require('../common/jsonWebToken')
// const jwt = require('jsonwebtoken');  //用来生成token
router.post('/login', (req, res) => {
    let code = req.body.code;
    // console.log("code:", req.body);
    request({//开发者服务器以code换取 用户唯一标识openid 和 会话密钥session_key。
        method: 'get',
        url: "https://api.weixin.qq.com/sns/jscode2session?appid=" + wx.appId + "&secret=" + wx.secret + "&js_code=" + code + "&grant_type=authorization_code"
    }, function (error, response, body) {
        if (error) { //请求异常时，返回错误信息
            res.json({
                "status": "error",
                "code": "获取微信用户信息失败！"
            })
        } else {
            //用户服务器返回的数值
            // console.log("微信返回的信息：", response.body);
            let _data = JSON.parse(body);
            Users.findOne({ openid: _data.openid })
                .then(data => {
                    let userInfo = {
                        code: req.body.code,
                        openid: _data.openid,
                        session_key: _data.session_key
                    }
                    // let secretOrPrivateKey = "jwt";// 这是加密的key（密钥）
                    // let token = jwt.sign(userInfo, secretOrPrivateKey, { expiresIn: '1day' })
                    let token = jwt.createToken(userInfo)
                    if (data) {
                        // let result = {
                        //     ...req.body,
                        //     ...token,
                        //     openid:_data.openid
                        // }
                        // console.log(JSON.stringify(result))
                        Users.findByIdAndUpdate({_id:data._id},{...token,openid:_data.openid,...req.body})
                        .then((data)=>{
                            res.json({status:1,mess:'ok',userInfo:data,token:token,user_name:req.body.name})
                        })
                        .catch(err=>{
                            throw '修改失败'
                        })
                        // console.log("session_key:", JSON.parse(response.body).session_key);
                    }else{
                        let userInfo = {
                            openid:_data.openid,
                            token,
                            ...req.body
                        }
                        // console.log('待存储信息',userInfo)
                        let newUser = new Users(userInfo)
                        newUser.save()
                        .then(data=>{
                            // console.log('存储后',data)
                            res.json({status:2,token:token,userInfo,msg:'成功创建用户'})
                        })
                        .catch(err=>{
                            res.json({status:'err',token:token,msg:JSON.stringify(err)})
                        })
                    }
                })
                .catch(err => {
                    console.log(err)
                    res.json({status:'err',msg:err})

                })
            // sessionkeyList.push(JSON.parse(res1.body).session_key);
            // let result = {
            //     result: "ok"
            // };
            // result.result = "ok";
            // result.msg = "sessionKey";
            // result.data = JSON.parse(response.body).session_key;//为了方便确认下次用户请求是哪个session_key直接传给客户端，建议不要直接传session_key
            // res.send(JSON.stringify(result));
        }
    });
})
router.get('/getToken', (req, res) => {
    // console.log(req.query)
    res.json({ err: 0, msg: "登录成功", data: '12312313131' });
})
module.exports = router;
