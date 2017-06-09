const path = require('path'),
      fs = require('fs');
const os = require('os');
const fse = require('fs-extra');
const snowflake = require('node-snowflake').Snowflake;
const Busboy = require('busboy');
const reactMarkdown = function (static_url, handel) {
    return function (req, res, next) {
        let _respond = respond(static_url, handel);
        _respond(req, res, next);
    };
};
const respond = function (static_url, callback) {
    return function (req, res, next) {
        if (req.method === 'POST') {
            //在这里做一个头部数据检查
            if(!/multipart\/form-data/i.test(req.headers['content-type'])){
                return res.end('wrong');
            }
            const busboy = new Busboy({ headers: req.headers });
            busboy.on('file', function (fieldname, file, filename, encoding, mimetype) {
                req.reactMarkdown = {};
                req.reactMarkdown.fieldname = fieldname;
                req.reactMarkdown.file = file;
                req.reactMarkdown.filename = filename;
                req.reactMarkdown.encoding = encoding;
                req.reactMarkdown.mimetype = mimetype;
                res._up = function (img_url) {
                    let tmpdir = path.join(os.tmpDir(), path.basename(filename));
                    let name = snowflake.nextId() + path.extname(tmpdir);
                    let dest = path.join(static_url, img_url, name);
                    let writeStream = fs.createWriteStream(tmpdir);
                    file.pipe(writeStream);
                    writeStream.on("close", function () {
                        fse.move(tmpdir, dest, function (err) {
                            if (err) throw err;
                            res.json({
                                'url': path.join(img_url, name).replace(/\\/g,'/'),
                                'state': 'SUCCESS'
                            });
                        });
                    })
                };
                callback(req, res, next);
            });
            busboy.on('finish', function() {
                res.writeHead(200);
                res.end('upload2 OK!');
            });
            return req.pipe(busboy);
        }
    };
};
module.exports = reactMarkdown;