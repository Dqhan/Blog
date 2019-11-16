const Util = require('../util');
const fs = require('fs');
const path = require('path');

class DocumentController {
    static async upload(ctx) {
        var file = ctx.request.files[0];
        const reader = fs.createReadStream(file.path);
        var saveTo = path.join(__dirname, "../../", "picSrc/" + file.filename);
        const upStream = fs.createWriteStream(saveTo);
        reader.pipe(upStream);
        ctx.response.type = "json";
        ctx.response.body = Util.responseBody(Util.RESPONSETYPE.Success, "upload success.", {});
        ctx.response.status = 200;
    }
}

module.exports = DocumentController;
