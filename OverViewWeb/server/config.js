module.exports = {
    host: process.env.HOST || '127.0.0.1',
    port: process.env.PORT || (process.env.NODE_ENV === 'production' ? 8080 : 3000),
    apiHost: process.env.APIHOST || '127.0.0.1',
    apiPort: process.env.APIPORT || '3030',
    dbHost: "localhost",
    dbPort: "27017",

    HOST: {
        PROXY_HOST: {
            IP: '127.0.0.1',
            Port: 1000
        },
        COMMON_HOST: {
            IP: '127.0.0.1',
            Port: 3000
        },
        DOCUMENT_HOST: {
            IP: '127.0.0.1',
            Port: 3031
        },
        BLOG_HOST: {
            IP: '127.0.0.1',
            Port: 3032
        },
        USER_HOST: {
            IP: '127.0.0.1',
            Port: 3033
        },
        DELIVER_HOST: {
            IP: '127.0.0.1',
            Port: 3034
        },
        LEAVEMSG_HOST: {
            IP: '127.0.0.1',
            Port: 3035
        }
    }
};