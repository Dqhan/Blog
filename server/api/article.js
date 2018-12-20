var express = require('express');
const router = express.Router();

router.post('/getArticle',(req,res)=>{
    res.send('success!');
});

module.exports = router;