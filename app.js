let fs = require('fs');
let path = require('path');
let express = require('express');
let formidable = require('formidable');
let config = require('./upload.json');
let app = express();
app.use(express.static(path.join(__dirname, '/')));

let uploadFile = (req, success, error) => {
    let form = new formidable.IncomingForm(); // 创建上传表单
    form.uploadDir = config.upload_path; // 设置上传目录
    form.keepExtensions = true; // 保留后缀
    form.maxFieldsSize = 3 * 1024 * 1024; // 文件大小

    // 如果temp目录不存在则创建
    if (!fs.existsSync(form.uploadDir)) {
        fs.mkdirSync(form.uploadDir);
    }
    form
        .on('error', function (err) {
            error(err);
        })
        .on('file', function (name, file) {
            let extName = ''; //后缀名
            switch (file.type) {
                case 'image/pjpeg':
                    extName = 'jpg';
                    break;
                case 'image/jpeg':
                    extName = 'jpg';
                    break;
                case 'image/png':
                    extName = 'png';
                    break;
                case 'image/x-png':
                    extName = 'png';
                    break;
                default:
                    this.emit('error', "不允许的类型");
            }
            file[name] = file;
            fs.renameSync(file.path, file.path);//重命名
            success(file.path)
        });
    form.parse(req); //解析request对象
};

app.get('/', (req, res, next) => {
    let index = fs.readFileSync('./views/index.html', {encoding: 'utf8'});
    res.send(index);
});
// 上传
app.post(config.route, (req, res, next) => {
    uploadFile(req, (path) => {
            res.json({
                fileUrl: path
            });
        },
        (err) => {
            res.json(err);
        });
});


module.exports = app;
