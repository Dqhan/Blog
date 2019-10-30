var express = require("express");
const router = express.Router();
var Article = require("./models/article");
var Comment = require("./models/comment");
var util = require("../util");

router.post("/addArticle", function(req, res) {
  let { title, content, time, viewCount, author, tags } = req.body;
  if (tags instanceof Array === false)
    tags = tags.split(",").map(t => {
      return parseInt(t);
    });
  var tempArticle = new Article({
    title,
    content,
    viewCount,
    time,
    author,
    tags
  });
  tempArticle
    .save()
    .then(data => {
      util.responseClient(res, 200, 0, "保存成功", data);
    })
    .catch(err => {
      console.log(err);
      util.responseClient(res);
    });
});

router.post("/updateArticle", (req, res) => {
  const { title, content, article, time, tags, isPublish, id } = req.body;
  Article.update(
    { _id: id },
    { title, content, time, tags: tags.split(","), isPublish }
  )
    .then(result => {
      console.log(result);
      util.responseClient(res, 200, 0, "更新成功", result);
    })
    .catch(err => {
      console.log(err);
      util.responseClient(res);
    });
});

router.get("/delArticle", (req, res) => {
  let id = req.query.id;
  Article.remove({ _id: id })
    .then(result => {
      if (result.result.n === 1) {
        util.responseClient(res, 200, 0, "删除成功!");
      } else {
        util.responseClient(res, 200, 1, "文章不存在");
      }
    })
    .catch(err => {
      util.responseClient(res);
    });
});

router.get("/getArticleDetail", (req, res) => {
  let _id = req.query.id;
  Article.findOne({ _id })
    .then(result => {
      util.responseClient(res, 200, 0, "success", result);
    })
    .catch(err => {
      util.responseClient(err);
    });
});

router.get("/getArticles", function(req, res) {
  let searchCondition = {},
    responseData = {
      total: 0,
      list: []
    };
  Article.count(searchCondition)
    .then(count => {
      responseData.total = count;
      Article.find(
        searchCondition,
        "_id title content author viewCount time tags"
      )
        .then(result => {
          result = result.sort(function(pre, next) {
            return next.time - pre.time;
          });
          responseData.list = result;
          util.responseClient(res, 200, 0, "success", responseData);
        })
        .catch(err => {
          throw err;
        });
    })
    .catch(err => {
      util.responseClient(res);
    });
});

router.post("/retrieveoverview", function(req, res) {
  let searchCondition = {},
    limit = req.body.limit,
    offset = req.body.offset - 1 < 0 ? 0 : req.body.offset - 1;
  var responseData = {
    total: 0,
    list: []
  };
  Article.count(searchCondition)
    .then(count => {
      responseData.total = count;
      Article.find(
        searchCondition,
        "_id title content author viewCount time tags"
      )
        .then(result => {
          result = result.sort(function(pre, next) {
            return next.time - pre.time;
          });
          responseData.list = result.slice(
            offset * limit,
            (offset + 1) * limit
          );
          util.responseClient(res, 200, 0, "success", responseData);
        })
        .catch(err => {
          throw err;
        });
    })
    .catch(err => {
      util.responseClient(res);
    });
});

router.post("/getArticlesByTag", function(req, res) {
  let tag = parseInt(req.body.tag),
    searchCondition = {};
  var responseData = {
    total: 0,
    list: []
  };
  Article.count(searchCondition)
    .then(count => {
      responseData.total = count;
      Article.find(
        searchCondition,
        "_id title content author viewCount time tags"
      )
        .then(result => {
          let arr = [];
          result = result.sort(function(pre, next) {
            return next.time - pre.time;
          });
          result.map(r => {
            if (r.tags.includes(tag)) {
              arr.push(r);
            }
            return arr;
          });
          responseData.list = arr;
          responseData.total = arr.length;
          util.responseClient(res, 200, 0, "success", responseData);
        })
        .catch(err => {
          throw err;
        });
    })
    .catch(err => {
      util.responseClient(res);
    });
});

router.post("/getCommentsbyArticleId", function(req, res) {
  let articleId = req.body.articleId;
  let searchCondition = {
    articleId
  };
  let responseData = {
    total: 0,
    list: []
  };
  Comment.count(searchCondition)
    .then(count => {
      responseData.total = count;
      Comment.find(
        searchCondition,
        "_id articleTitle articleId content author time"
      )
        .then(result => {
          result.sort(function(pre, next) {
            return next.time - pre.time;
          });
          responseData.list = result;
          util.responseClient(res, 200, 0, "success", responseData);
        })
        .catch(err => {
          throw err;
        });
    })
    .catch(e => {
      util.responseClient(res);
    });
});

router.post("/getComments", function(req, res) {
  let offset = req.body.offset - 1 < 0 ? 0 : req.body.offset - 1;
  let limit = req.body.limit;
  let responseData = {
    total: 0,
    list: []
  };
  let searchCondition = {};
  Comment.find(
    searchCondition,
    "_id articleTitle articleId content author time"
  )
    .then(result => {
      responseData.total = result.length;
      result.sort((pre, next) => {
        return next.time - pre.time;
      });
      responseData.list = result.slice(offset * limit, (offset + 1) * limit);
      util.responseClient(res, 200, 0, "success", responseData);
    })
    .catch(err => {
      util.responseClient(err);
    });
});

router.post("/addComment", function(req, res) {
  let content = req.body.content,
    time = req.body.time,
    author = req.body.author || "游客",
    articleId = req.body.articleId,
    articleTitle = req.body.articleTitle;
  let comment = new Comment({
    content,
    time,
    author,
    articleId,
    articleTitle
  });
  comment
    .save()
    .then(data => {
      util.responseClient(res, 200, 0, "success", data);
    })
    .catch(e => {
      util.responseClient(res);
    });
});

module.exports = router;
