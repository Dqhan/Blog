var express = require('express');
const router = express.Router();
var User = require('../../models/user');

router.post('/login', (req, res) => {
    let { userName, password } = req.body;
    User.findOne({
        username,
        password
    })
        .then(res => {
            if (!res) return;
            let data = {};
            data['username'] = res.userName;
            data['userId'] = res._id;
            req.session.userInfo = data;
        })
        .catch(e => {
            console.log(e);
        })
});

router.post('/register', (req, res) => {
    let { userName, password } = req.body;
    User.findOne({
        username: userName
    })
        .then(res => {
            if (res) {
                console.log('user存在');
                return;
            } else {
                let user = new User({
                    username: userName,
                    password: password,
                    type: 'normal'
                })
                user.save()
                    .then(res => {
                        User.findOne({
                            username: userName
                        })
                            .then(res => {
                                var data = res;
                                console.log('注册成功');
                            })
                            .catch(e => {
                                console.log(e);
                            })
                    })
                    .catch(e => {
                        console.log(e);
                    })
            };
        })
        .catch(e => {
            console.log(e);
        });
});


module.exports = router;