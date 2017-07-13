let express = require('express'),
    multer = require('multer');
let config=require('/upload.json');
let app = express();
let storge = multer.diskStorage({
    destination:(req, file, cb)=> {
        cb(null,config.upload_path)
    },
    filename: (req, file, cb)=> {
        let fileformat = (file.originalname).split('.');
        cb(null, file.fieldname+Date.now()+'.'+fileformat[fileformat.length-1]);
    }
});
let upload = multer({storage: storge});
app.post(config.route, upload.array(config.name,20), function (req, res, next) {
    console.log(req.files);
    req.flash('success', '文件上传成功!');
    res.json({"result":{message:"文件上传成功!"}});
});