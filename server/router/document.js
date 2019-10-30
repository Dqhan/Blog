var express = require('express');
const router = express.Router();
var fs = require('fs');
var path = require('path');

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