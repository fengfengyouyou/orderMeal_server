var express = require('express');
var router = express.Router();
var multer = require('multer');
var fs = require('fs');
var createFolder = function(folder){
    try{
        fs.accessSync(folder); 
    }catch(e){
        fs.mkdirSync('../public');
        fs.mkdirSync(folder);
    }  
};
// 呵呵呵
var uploadFolder = './public/images';
createFolder(uploadFolder);
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, uploadFolder);    // 保存的路径，备注：需要自己创建
    },
    filename: function (req, file, cb) {
        var type = file.originalname.substr(file.originalname.lastIndexOf("."));
        // 将保存文件名设置为 字段名 + 时间戳，比如 logo-1478521468943
        cb(null, file.fieldname + '-' + Date.now()+type);  
    }
})
var upload = multer({storage})

//上传单个文件
//上传单个文件
router.post("/upload",upload.single("file"),(req,res)=>{
    console.log(req.file)
    var filename = req.file.filename
    res.json({err:0,msg:"文件处理完毕",filePath:'/images/'+filename,filename:filename});
});
//上传多个文件
router.post("/upload-many",upload.array("file"),(req,res)=>{
    // console.log(req.body)
    res.json({err:0,msg:"上传成功"});
});
module.exports = router;