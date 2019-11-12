const conn = require('../conn');
const DeliverService = require('../service/deliverService');
const DeliverModel = require('../Infrastructure/deliverModel');
const Util = require('../util');
const uuid = require("uuid");

class DeliverController {
  static async adddeliver(ctx) {
    let { article_id, article_title, content, time, author } = ctx.request.body;
    let model = new DeliverModel({
      deliver_id: uuid.v4(),
      article_id,
      article_title,
      content,
      time,
      author
    })
    let result = await DeliverService.addDeliver(model);
    ctx.response.type = "json";
    ctx.response.body = Util.responseBody(Util.RESPONSETYPE.Success, "success", result);
    ctx.response.status = 200;
  }
  static async deldeliver() {
    ctx.response.type = "json";
    ctx.response.body = Util.responseBody(Util.RESPONSETYPE.Success, "success", result);
    ctx.response.status = 200;
  }
  static async putdeliver() {

  }
  static async getdelivers(ctx) {
    let { id } = ctx.request.query;
    let result = await DeliverService.getDelivers(id);
    result.sort((pre, next) => {
      return parseInt(next.time) - parseInt(pre.time);
    })
    ctx.response.type = "json";
    ctx.response.body = Util.responseBody(Util.RESPONSETYPE.Success, "success", result);
    ctx.response.status = 200;
  }
}

module.exports = DeliverController;
