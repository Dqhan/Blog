let express = require('express');
let router = express.Router();
let LeaveMessage =require('../../models/leavemessage');
let util  = require('../util')

router.post('/getLeaveMessage',(req,res)=>{
    var searchCondition = {};
    var offset = (req.body.offset - 1) < 0 ? 0 : (req.body.offset - 1) * req.body.limit;
    var responseData = {
        total: 0,
        list: []
    };
    LeaveMessage.count(searchCondition)
    .then(count=>{
        responseData.total = count;
        LeaveMessage.find(searchCondition, '_id content author time', {
            skip: offset,
            limit: 5
        })
            .then(result => {
                responseData.list = result;
                util.responseClient(res, 200, 0, 'success', responseData);
            }).catch(err => {
                throw err;
            })
    })
    .catch(e=>{
        util.responseClient(res);
    })
});

router.post('/addLeaveMessage',function(req,res){
    var content = req.body.content;
    var time = req.body.time;
    var author = req.body.author || "游客";
    var leaveMessage = new LeaveMessage({
        content,
        time,
        author
    });
    leaveMessage.save().then(data=>{
        util.responseClient(res,200,0,'保存成功',data)
    }).catch(err=>{
        console.log(err);
        util.responseClient(res);
    });
})

module.exports = router;