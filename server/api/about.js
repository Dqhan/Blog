var express = require('express');
const router = express.Router();

router.get('/getAbout',(req,res)=>{
    res.send('success!');
});

module.exports = router;