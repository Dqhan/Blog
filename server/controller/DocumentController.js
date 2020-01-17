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
    static async  peoplepickermetadata(ctx) {
        ctx.response.type = "json";
        ctx.response.body = Util.responseBody(Util.RESPONSETYPE.Success, "retrieve success.", {
            userInfo: [
                { "id": 0, "name": "dqhan0", "age": 18, "sex": "female" },
                { "id": 1, "name": "dqhan1", "age": 19, "sex": "male" },
                { "id": 2, "name": "dqhan2", "age": 20, "sex": "male" },
                { "id": 3, "name": "dqhan3", "age": 21, "sex": "female" },
                { "id": 4, "name": "dqhan4", "age": 21, "sex": "female" },
                { "id": 5, "name": "dqhan5", "age": 21, "sex": "female" }
            ]
        });
        ctx.response.status = 200;
    }
}

module.exports = DocumentController;
