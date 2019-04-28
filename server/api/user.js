var express = require('express');
const router = express.Router();
var User = require('../../models/user');

function responseClient(res,httpCode = 500, code = 3,message='服务端异常',data={}) {
    let responseData = {};
    responseData.code = code;
    responseData.message = message;
    responseData.data = data;
    res.status(httpCode).json(responseData)
}

router.get('/userInfo', (req, res) => {
    if (req.session.userInfo) {
        res.send({
            userInfo:req.session.userInfo,
            message: '登录成功'
        });
    } else {
        res.send({
            userInfo: null,
            message: '登录超时'
        });
    }
});

router.post('/login', (req, res) => {
    let { username, password } = req.body;
    // var data = {};
    // data['username'] = username;
    // req.session.useInfo = data;
    // res.send('success');
    User.findOne({
        username,
        password
    })
        .then(userInfo => {
            if (!userInfo) return;
            let data = {};
            data['username'] = userInfo.username;
            data['userId'] = userInfo.password;
            req.session.userInfo = data;
            responseClient(res, 200, 0, '登录成功', data);
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