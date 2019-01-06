var express = require('express');
const router = express.Router();
var Article = require('../../models/article');

router.post('/addArticle', function (req, res) {
    const {
        title,
        content,
        time
    } = req.body;
    // const author = req.session.userInfo.username;
    const author = "Dqhan";
    const viewCount = 0;
    const commentCount = 0;
    let tempArticle = new Article({
        title,
        content,
        viewCount,
        commentCount,
        time,
        author
    });
    tempArticle.save().then(data=>{
        responseClient(res,200,0,'保存成功',data)
    }).cancel(err=>{
        console.log(err);
        responseClient(res);
    });
});

router.post('/updateArticle',(req,res)=>{
    const {
        title,
        content,
        time,
        tags,
        isPublish,
        id
    } = req.body;
    Article.update({_id:id},{title,content,time,tags:tags.split(','),isPublish})
        .then(result=>{
            console.log(result);
            responseClient(res,200,0,'更新成功',result)
        }).cancel(err=>{
        console.log(err);
        responseClient(res);
    });
});

router.get('/delArticle',(req,res)=>{
    let id = req.query.id;
    Article.remove({_id:id})
        .then(result=>{
            if(result.result.n === 1){
                responseClient(res,200,0,'删除成功!')
            }else{
                responseClient(res,200,1,'文章不存在');
            }
        }).cancel(err=>{
            responseClient(res);
    })
});

router.get('/getArticleDetail', (req, res) => {
    let _id = req.query.id;
    Article.findOne({ _id })
        .then(data => {
            data.viewCount = data.viewCount + 1;
            Article.update({ _id }, { viewCount: data.viewCount })
                .then(result => {
                    responseClient(res, 200, 0, 'success', data);
                }).cancel(err => {
                    throw err;
                })

        }).cancel(err => {
            responseClient(res);
        });
});

router.get('/getAllArticles', function (req, res) {
    let searchCondition = {};
    let offset = (req.query.pageNum - 1) < 0 ? 0 : (req.query.pageNum - 1) * 5;
    let responseData = {
        total: 0,
        list: []
    };
    Article.count(searchCondition)
        .then(count => {
            responseData.total = count;
            Article.find(searchCondition, '_id title isPublish author viewCount commentCount time coverImg', {
                skip: offset,
                limit: 5
            })
                .then(result => {
                    responseData.list = result;
                    responseClient(res, 200, 0, 'success', responseData);
                }).cancel(err => {
                    throw err
                })
        }).cancel(err => {
            responseClient(res);
        });
});

module.exports = router;