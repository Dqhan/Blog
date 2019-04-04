var express = require('express');
const router = express.Router();
var fs = require('fs');
var path = require('path');
const multer = require("multer");

// var upload = multer({
//     storage: storage
// });

// var storage = multer.diskStorage({
//         destination: function (req, file, cb){
//             //文件上传成功后会放入public下的upload文件夹
//             cb(null, '../public/upload')
//         },
//         filename: function (req, file, cb){
//             //设置文件的名字为其原本的名字，也可以添加其他字符，来区别相同文件，例如file.originalname+new Date().getTime();利用时间来区分
//               cb(null, file.originalname)
//         }
//     });


router.post('/upload', function (req, res) {
    if (req.busboy) {
        req.busboy.on('file', function (fieldname, file, filename, encoding, mimetype) {
            var saveTo = path.join(__dirname, "../../", "build/src/" + filename);
            file.pipe(fs.createWriteStream(saveTo));
            file.on('end', function () {
                var a = res;
                res.json({
                    success: true
                });
            });
        });
        req.pipe(req.busboy);
    }
})

module.exports = router;