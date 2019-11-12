const conn = require('../conn');
const LeaveMsgService = require('../service/leaveMsgService');
const LeaveMsgModel = require('../Infrastructure/leaveMsgModel');
const Util = require('../util');
const uuid = require("uuid");
class LeaveMsgController {
  static async addmsg(ctx) {
    let { content, time, author } = ctx.request.body;
    let model = new LeaveMsgModel({
      leavemsg_id: uuid.v4(),
      content,
      time,
      author
    })
    let result = await LeaveMsgService.addMsg(model);
    ctx.response.type = "json";
    ctx.response.body = Util.responseBody(Util.RESPONSETYPE.Success, "add msg success", result);
    ctx.response.status = 200;
  }

  static async delmsg(ctx) {
    let { id } = ctx.request.query;
    let result = await LeaveMsgService.delMsg(id);
    ctx.response.type = "json";
    ctx.response.body = Util.responseBody(Util.RESPONSETYPE.Success, "success", result);
    ctx.response.status = 200;
  }

  static async putmsg(ctx) {

  }

  static async getmsgs(ctx) {
    let { limit, offset } = ctx.request.body;
    let result = await LeaveMsgService.getMsgs();
    let total = result.length,
      startIndex = (offset - 1) * limit,
      endIndex = offset * limit - 1;
    result = result.slice(startIndex, endIndex);
    ctx.response.type = "json";
    ctx.response.body = Util.responseBody(Util.RESPONSETYPE.Success, "get msgs success.", {
      source: result,
      total: total
    });
    ctx.response.status = 200;
  }
}

module.exports = LeaveMsgController;
