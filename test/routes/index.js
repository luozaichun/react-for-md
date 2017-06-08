var express = require('express');
var router = express.Router();
const Busboy = require('busboy');
var path = require('path'),
    fs = require('fs');
/*var reactMarkdown=require('../../upload/index');*/
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
router.post('/add',function (req,res,next) {
    if (req.method === 'POST') {
        console.log(1111);
        if (!/multipart\/form-data/i.test(req.headers['content-type'])) {
            return res.end('wrong');
        }

        var busboy = new Busboy({headers: req.headers});
        busboy.on('file', function (fieldname, file, filename, encoding, mimetype) {
            var saveTo = path.join(__dirname, '../public/uploads', path.basename(filename));
            photo = saveTo;
            file.pipe(fs.createWriteStream(saveTo));
        });
        busboy.on('finish', function () {
            // 业务逻辑代码
            res.json('msg',222);
        });
    };
        return req.pipe(busboy);

   /* reactMarkdown(path.join(__dirname, 'public'), function (req, res, next) {
        var file_url = '/upload/images/';//默认上传地址为图片
        res._up(file_url);
    });
    res.setHeader('Content-Type', 'text/html');*/
});
module.exports = router;
