var express = require('express');
const router = express.Router();

router.post('/getAbout',(req,res)=>{
    res.send('success!');
});

module.exports = router;