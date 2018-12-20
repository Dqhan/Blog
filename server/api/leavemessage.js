var express = require('express');
const router = express.Router();

router.post('/getLeaveMessage',(req,res)=>{
    res.send('success!');
});

module.exports = router;