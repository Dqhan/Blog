const express = require('express');
const path = require('path');
const { createProxyMiddleware } = require('http-proxy-middleware');


const port = process.env.PORT || 3001;
const app = express();


app.use(express.static(__dirname))


// app.get('*', function (request, response) {
//     response.sendFile(path.resolve(__dirname, 'index.html'))
// })

/**
 * 前台路由匹配
 */
app.get('/blog', function (request, response) {
    response.sendFile(path.resolve(__dirname, 'index.html'))
})

app.get('/leavemessage', function (request, response) {
    response.sendFile(path.resolve(__dirname, 'index.html'))
})

app.get('/overview', function (request, response) {
    response.sendFile(path.resolve(__dirname, 'index.html'))
})

app.get('/collaborator', function (request, response) {
    response.sendFile(path.resolve(__dirname, 'index.html'))
})

app.get('/login', function (request, response) {
    response.sendFile(path.resolve(__dirname, 'index.html'))
})

app.get('/vedio', function (request, response) {
    response.sendFile(path.resolve(__dirname, 'index.html'))
})

/**
 * 后台模块匹配
 */

var currentModule = '';

const getTargetServer = function (req) {
    var conf;
    switch (req.path) {
        case '/common_module':
            currentModule = 'common_module';
            conf = {
                protocol: 'http',
                host: 'localhost',
                port: 3002
            };
            break;
        case '/blog_module':
            currentModule = 'blog_module';
            conf = {
                protocol: 'http',
                host: 'localhost',
                port: 3003
            };
            break;
        case '/collaborator_module':
            currentModule = 'collaborator_module';
            conf = {
                protocol: 'http',
                host: 'localhost',
                port: 3004
            };
            break;
        case '/login_module':
            currentModule = 'login_module';
            conf = {
                protocol: 'http',
                host: 'localhost',
                port: 3005
            };
            break;
        case '/vedio_module':
            currentModule = 'vedio_module';
            conf = {
                protocol: 'http',
                host: 'localhost',
                port: 3006
            };
            break;
        case '/leavemessage_module':
            currentModule = 'leavemessage_module';
            conf = {
                protocol: 'http',
                host: 'localhost',
                port: 3007
            };
            break;
        case '/overview_module':
            currentModule = 'overview_module';
            conf = {
                protocol: 'http',
                host: 'localhost',
                port: 3008
            };
            break;
        default:
            switch (currentModule) {
                case 'common_module':
                    conf = {
                        protocol: 'http',
                        host: 'localhost',
                        port: 3002
                    };
                    break;
                case 'blog_module':
                    conf = {
                        protocol: 'http',
                        host: 'localhost',
                        port: 3003
                    };
                    break;
                case 'collaborator_module':
                    conf = {
                        protocol: 'http',
                        host: 'localhost',
                        port: 3004
                    };
                    break;
                case 'login_module':
                    conf = {
                        protocol: 'http',
                        host: 'localhost',
                        port: 3005
                    };
                    break;
                case 'vedio_module':
                    conf = {
                        protocol: 'http',
                        host: 'localhost',
                        port: 3006
                    };
                    break;
            }
            break;
    }
    return conf;
}

const options = {
    target: 'http://localhost:3002',
    changeOrigin: true,
    pathRewrite: {
        '/common_module': '/',
        '/blog_module': '/',
        '/collaborator_module': '/',
        '/login_module': '/',
        '/vedio_module': '/',
    },
    router: function (req) {
        return getTargetServer(req);
    }
}
const filter = function (pathname, req) {

    var result;
    result = (pathname.match('/common_module') ||
        pathname.match('/blog_module') ||
        pathname.match('/collaborator_module') ||
        pathname.match('/login_module') ||
        pathname.match('/vedio_module') ||
        pathname.match('/*.css') ||
        pathname.match('/*.js')) && req.method === 'GET';
    return result;
}
app.use(createProxyMiddleware(filter, options));


app.listen(port, function () {
    console.log("server started on port " + port)
})