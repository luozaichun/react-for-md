let fs = require('fs');
let path = require('path');
let express = require('express');
let multer  = require('multer');
let config=require('./upload.json');
let app = express();

app.use(express.static(path.join(__dirname, '/')));

let createFolder = function(folder){
    try{
        fs.accessSync(folder);
    }catch(e){
        fs.mkdirSync(folder);
    }
};


createFolder(config.upload_path);

// 通过 filename 属性定制
let storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, config.upload_path);    // 保存的路径，备注：需要自己创建
    },
    filename: function (req, file, cb) {
        // 将保存文件名设置为 字段名 + 时间戳+后缀，
        let fileformat = (file.originalname).split('.');
        cb(null, file.fieldname + Date.now()+'.' + fileformat[fileformat.length - 1]);
    }
});

// 通过 storage 选项来对 上传行为 进行定制化
let upload = multer({ storage: storage });

// 单图上传
app.post(config.route, upload.single(config.input_name), function(req, res, next){
    let file = req.file;
    res.send({
        code: '1',
        fileUrl:file.destination+file.filename
    });
});

app.get('/', function(req, res, next){
    let index = fs.readFileSync('./views/index.html', {encoding: 'utf8'});
    res.send(index);
});

module.exports = app;
