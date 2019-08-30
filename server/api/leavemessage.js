let express = require("express");
let router = express.Router();
let LeaveMessage = require("../../models/leavemessage");
let util = require("../util");

router.post("/getLeaveMessage", (req, res) => {
  var searchCondition = {};
  var offset = req.body.offset - 1 < 0 ? 0 : req.body.offset - 1;
  var limit = req.body.limit;
  var responseData = {
    total: 0,
    list: []
  };
  LeaveMessage.find(searchCondition, "_id content author time viewCount tags")
    .then(result => {
      responseData.total = result.length;
      result.sort((pre, next) => {
        return next.time - pre.time;
      });
      responseData.list = result.slice(offset * limit, (offset + 1) * limit);
      util.responseClient(res, 200, 0, "success", responseData);
    })
    .catch(err => {
      throw err;
    });
});

router.post("/addLeaveMessage", function(req, res) {
  var content = req.body.content;
  var time = req.body.time;
  var author = req.body.author || "游客";
  var leaveMessage = new LeaveMessage({
    content,
    time,
    author
  });
  leaveMessage
    .save()
    .then(data => {
      util.responseClient(res, 200, 0, "保存成功", data);
    })
    .catch(err => {
      console.log(err);
      util.responseClient(res);
    });
});

module.exports = router;
