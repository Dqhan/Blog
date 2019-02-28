var express = require('express');
const router = express.Router();
var Article = require('../../models/article');
var util  = require('../util')

router.post('/addArticle', function (req, res) {
    // var  {
    //     title,
    //     content,
    //     time
    // } = req.body;
    // const author = req.session.userInfo.username;
    var title  =req.body.title;
    var content = req.body.content;
    var article =req.body.article;
    var time = req.body.time;
    var author = "Dqhan";
    var viewCount = 0;
    var commentCount = 0;
    var test = 0;
    var tempArticle = new Article({
        title,
        content,
        article,
        viewCount,
        commentCount,
        time,
        author,
        test
    });
    tempArticle.save().then(data=>{
        util.responseClient(res,200,0,'保存成功',data)
    }).catch(err=>{
        console.log(err);
        util.responseClient(res);
    });
});

router.post('/updateArticle',(req,res)=>{
    const {
        title,
        content,
        article,
        time,
        tags,
        isPublish,
        id
    } = req.body;
    Article.update({_id:id},{title,content,time,tags:tags.split(','),isPublish})
        .then(result=>{
            console.log(result);
            util.responseClient(res,200,0,'更新成功',result)
        }).catch(err=>{
        console.log(err);
        util.responseClient(res);
    });
});

router.get('/delArticle',(req,res)=>{
    let id = req.query.id;
    Article.remove({_id:id})
        .then(result=>{
            if(result.result.n === 1){
                util.responseClient(res,200,0,'删除成功!')
            }else{
                util.responseClient(res,200,1,'文章不存在');
            }
        }).catch(err=>{
            util.responseClient(res);
    })
});

// router.get('/getArticleDetail', (req, res) => {
//     let _id = req.query.id;
//     Article.findOne({ _id })
//         .then(data => {
//             data.viewCount = data.viewCount + 1;
//             Article.update({ _id }, { viewCount: data.viewCount })
//                 .then(result => {
//                     util.responseClient(res, 200, 0, 'success', data);
//                 }).cancel(err => {
//                     throw err;
//                 })

//         }).catch(err => {
//             util.responseClient(res);
//         });
// });

router.get('/getArticleDetail', (req, res) => {
    let _id = req.query.id;
    Article.findOne({ _id })
    .then(result => {
        util.responseClient(res, 200, 0, 'success', result);
    }).catch(err => {
        util.responseClient(err);
    })
});

router.post('/getArticles', function (req, res) {
    var searchCondition = {};
    var offset = (req.body.offset - 1) < 0 ? 0 : (req.body.offset - 1) * req.body.limit;
    var responseData = {
        total: 0,
        list: []
    };
    Article.count(searchCondition)
        .then(count => {
            responseData.total = count;
            Article.find(searchCondition, '_id title content author viewCount commentCount time', {
                skip: offset,
                limit: 5
            })
                .then(result => {
                    responseData.list = result;
                    util.responseClient(res, 200, 0, 'success', responseData);
                }).catch(err => {
                    throw err
                })
        }).catch(err => {
            util.responseClient(res);
        });
});

module.exports = router;