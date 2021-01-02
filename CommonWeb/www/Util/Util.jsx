import axios from 'axios';

function assemble(data) {
    let ret = '';
    for (let it in data) {
        ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
    }
    return ret
}

window.fetchUtility = function (options, errorFun) {
    var request = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            // 'R.Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        cache: 'no-store',
        body: assemble(options.body)
        // body: JSON.stringify(options.body)
    };
    var accessToken = localStorage.getItem('access_token');
    if (accessToken) {
        request.headers["Authorization"] = "Bearer " + accessToken;
    }
    // Object.assign(request, options);
    request.method = options.method;
    request.url = options.url;
    if (request.method.toLowerCase() == "get") {
        request.body = null;
    }
    console.log(request);
    return fetch(options.url, request)
        .then(function (response) {
            if (response.ok) {
                if (request.download) {
                    return response;
                }
                else {
                    return response.text().then(function (dataString) {
                        return {
                            responseStatus: response.status,
                            responseString: JSON.parse(dataString),
                            isParseJson: request.isParseJson,
                            isPassStatus: request.isPassStatus
                        };
                    });
                }
            } else {
                if (response.status == 403) {
                    window.location.href = "/#/403"
                } else if (response.status == 409) {
                    console.log('http error 409')
                }
                else {
                    if (errorFun) {
                        errorFun(response);
                    }
                    else {
                        throw new Error(response.statusText);
                    }
                }
            }
        }).then(function (fetchResult) {

            if (request.download) { return fetchResult };

            var queryResult = null;

            try {
                if (!fetchResult.responseString) {
                    return null;
                }
                if (fetchResult.isParseJson && fetchResult.responseString) {
                    if ($.isEmptyObject(fetchResult.responseString)) {
                        queryResult = "";
                    } else {
                        queryResult = JSON.parse(fetchResult.responseString);
                        if (fetchResult.isPassStatus) {
                            queryResult[FetchResponsePropName.status] = fetchResult.responseStatus;
                        }
                    }
                } else {
                    queryResult = fetchResult.responseString;
                }
            }
            catch (ex) {
                throw new Error(ex);
            }
            return queryResult;
        });
};

let config = {

    transformRequest: [
        function (data) {
            let ret = '';
            for (let it in data) {
                ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
            }
            return ret
        }
    ],
    transformResponse: [
        function (data) {
            return data
        }
    ],
    headers: {
        'R.Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
    },
    timeout: 10000,
    responseType: 'json'
};

axios.interceptors.response.use(function (res) {
    //相应拦截器
    return res.data;
});


window.axiosGet = function get(url) {
    return axios.get(url, config)
}

window.axiosPost = function post(url, data) {
    return axios.post(url, data, config)
}

window.getUrlParamster = function () {
    var url = window.location.href;
    var urlParamster = new Object();
    if (url.indexOf("?") > 1) {
        var str = window.location.hash.split("?")[1];
        str = str.split('&');
        for (var i = 0; i < str.length; i++) {
            urlParamster[str[i].split('=')[0]] = unescape(str[i].split('=')[1]);
        }
    }
    return urlParamster;
}
window.CommonUtil = {};
window.CommonUtil.formatDateTime = function (date, hasTime, format, hasSecond) {
    if (hasTime == null) {
        hasTime = true;
    }
    if (typeof date === "string") {
        if (CommonUtil.isEmptyCSharpDate(date)) {
            return "";
        }
        date = new Date(date);//new Date(date.replace("T", " ").replace(/-/g, "/"));
    }
    /* format 等于true时,返回Date类型的数据*/
    if (format === true) {
        return new Date(date);
    }
    if (hasSecond) {
        format = SADefaultFormat.DATE + (hasTime ? ' ' + SADefaultFormat.TIME + ':ss' : '');
    }
    /*可以设置默认的format*/
    if (!format) {
        format = SADefaultFormat.DATE + (hasTime ? ' ' + SADefaultFormat.TIME : '');
    }
    var dateStr = gcalendar('toFormatString', { date: date, format: format.replace(/[y]{2}/g, 'y') });
    return dateStr;
};

var SADefaultFormat = {
    DATE: "dd MMM yyyy (DDD)",
    DATETIME: "dd MMM yyyy (DDD) hh:mm",
    LANGUAGE: "",
    TIME: "hh:mm"
}

var gcalendar = function (type, param) {
    var value = null;
    type = type.toLowerCase();
    switch (type) {
        case "dayofweek":
            value = $.extend(value, _dayOfWeek);
            break;
        case "view":
            value = $.extend(value, _view);
            break;
        case "constant":
            value = $.extend(value, _constant);
            break;
        case "formatdate":
            value = formatDate(param);
            break;
        case "toformatstring":
            value = toFormatString(param);
            break;
        default:
            value = {};
            break;
    }

    return value;
};

var middleweeks = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
var shortMonths = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
function formatDate(param) {
    var
        date = param.date,
        format = param.iFormat.f,
        c = format.length,
        value = '';

    param.iFormat.i = 0;

    if (date) {
        if (param.useBrowserFormat) {
            if (param.hasTimePicker) {
                value = date.toLocaleString();
            } else {
                value = date.toLocaleDateString();
            }
        } else {
            for (; param.iFormat.i < c; param.iFormat.i++) {
                var data = {
                    match: 'default',
                    value: 0,
                    len: 2,
                    iFormat: param.iFormat
                };
                switch (format.charAt(param.iFormat.i)) {
                    case 'd':
                        data.match = 'd';
                        data.value = date.getDate();
                        value += formatNumber(data);
                        break;
                    case 'D':
                        if (format.indexOf('DDD') != -1) {
                            value += middleweeks[date.getDay()];
                            param.iFormat.i += 2;
                        }
                        break;
                    case 'M':
                        if (format.indexOf('MMM') != -1) {
                            value += shortMonths[date.getMonth()];
                            param.iFormat.i += 2;
                        } else {
                            data.match = 'M';
                            data.value = date.getMonth() + 1;
                            value += formatNumber(data);
                        }
                        break;
                    case 'y':
                        data.match = 'y';
                        data.value = date.getMonth() + 1;
                        value += (lookAhead(data) ? date.getFullYear() : (date.getYear() % 100 < 10 ? '0' : '') + date.getYear() % 100);
                        break;
                    case 'h':
                        data.match = 'h';

                        if (format.indexOf('tt') == -1) {
                            data.value = date.getHours();
                            value += formatNumber(data);
                        } else {
                            data.value = date.getHours() > 12 ? date.getHours() - 12 : date.getHours();
                            value += formatNumber(data);
                        }
                        break;
                    case 'm':
                        data.match = 'm';
                        data.value = date.getMinutes();
                        value += formatNumber(data);
                        break;
                    case 's':
                        data.match = 's';
                        data.value = date.getSeconds();
                        value += formatNumber(data);
                        break;
                    case 't':
                        if (date.getHours() > 12) {
                            value += 'PM';
                        } else {
                            value += 'AM';
                        }
                        param.iFormat.i++;
                        break;
                    default:
                        value += format.charAt(param.iFormat.i);
                        break;
                }
            }
        }
    }
    else {
        value = '';
    }

    return value;
}

function toFormatString(param) {
    var
        f,
        value = '';
    if (param && isDate(param.date)) {
        if (typeof param.hasTime != "boolean") {
            param.hasTime = true;
        }
        if (param.hasTime) {
            f = param.format || "dd/MM/yy hh:mm";
        } else {
            f = param.format || "dd/MM/yy";
        }

        param.iFormat = {
            f: f
        }

        value = formatDate(param);
    }

    return value;
}
function formatNumber(param) {
    var
        match = param.match,
        value = param.value,
        len = param.len,
        num = '' + value;
    if (lookAhead({ match: match, iFormat: param.iFormat }))
        while (num.length < len)
            num = '0' + num;
    return num;
}
function isDate(date) {
    return getClassBuiltIn(date) == "Date";
}

function getClassBuiltIn(object) {
    return Object.prototype.toString.call(object).match(/^\[object\s(.*)\]$/)[1];
}

//Check whether a format character is doubled
function lookAhead(param) {
    var
        match = param.match,
        format = param.iFormat.f,
        i = param.iFormat.i,
        matches = (i + 1 < format.length && format.charAt(i + 1) == match);

    if (matches) {
        param.iFormat.i++;
    }
    return matches;
}

window.CommonUtil.isEmptyCSharpDate = function (date) {
    if (date.match('0001-01-01T')) {
        return true;
    } else {
        return false;
    }
}

window.CommonUtil.getCurrentUser = function () {
    if (localStorage.getItem('profile_info') && JSON.parse(localStorage.getItem('profile_info')))
        return JSON.parse(localStorage.getItem('profile_info')).name;
    else
        return "游客";
}

window.CommonUtil.promiseAll = function (array) {
    if (!array instanceof Array || array.length == 0)
        throw new Error('paramseter is error.');
    // let promiseArray = [];
    // for (var fn of array) {
    //     promiseArray.push(new Promise((resolve, reject) => {
    //         fn(resolve, reject);
    //     }));
    // };
    return Promise.all(array);
}

window.CommonUtil.createCheckSessionTimer = function () {
    window.sessionTimer = setInterval(getCurrentUserInfo, 60 * 30 * 1000);
}

window.CommonUtil.destoryCheckSessionTimer = function () {
    clearInterval(window.sessionTimer)
}

function getCurrentUserInfo() {
    let option = {
        url: `./api/user/userInfo`,
        method: "GET"
    };
    fetchUtility(option)
        .then(res => {
            var statusClr = {
                0: function () {
                    localStorage.setItem('currentUserInfo', JSON.stringify({
                        userName: res.data.username
                    }));
                },
                1: function () {
                    $$.conform({
                        message: 'Session is timeout.',
                        status: "show",
                        footer: true,
                        handleClick: tipConformHandleClick
                    });
                    localStorage.setItem('currentUserInfo', null);
                    CommonUtil.destoryCheckSessionTimer();
                }
            }
            if (res.status !== 0 && status !== 1)
                throw new Error('get user info error.');
            statusClr[res.status]();
        })
        .catch(e => {

            $$.conform({
                message: e,
                status: "show"
            });
        });
}


function tipConformHandleClick() {
    location.href = location.href;
}

window.CommonUtil.getUrlParamseter = function () {
    var url = location.search;
    var urlParamseter = new Object();
    if (url.indexOf("?") != -1) {
        var str = url.substr(1);
        str = str.split("&");
        for (var i = 0; i < str.length; i++) {
            urlParamseter[str[i].split("=")[0]] = unescape(str[i].split("=")[1]);
        }
    }
    return urlParamseter;
}

window.CommonUtil.throttle = function (fn, context, delay, time) {
    let timer = null,
        start = new Date();
    return function () {
        let current = new Date(),
            args = arguments;
        clearTimeout(timer);
        if (current - start >= time) {
            fn.apply(context, args);
            start = current;
        } else {
            let timer = setTimeout(() => {
                fn.apply(context, args)
            }, delay);
        }
    }
}

window.CommonUtil.Config = {
    github: {
        client_id: "5f2b3eb585cd289ca088",
        redirect_uri: escape("https://www.dqhanblog.cn/#/oAuthPromisition"),
        client_secret: "281abd4850f451b536416ddede3e3a61ccce07fe"
    },
    HOST: "www.dqhanblog.cn/#/"
}

var Util = {};

window.Util = Util = {
    LOGIN_TYPE: {
        Account: 0,
        WeChat: 1,
        GitHub: 2,
        Default: 3,
        Login: 4,
        Register: 5,
        RegisterSuccessfully: 6
    },
    TAG_TYPE: {
        Javascript: 0,
        Typescript: 1,
        Es6: 2,
        SJModule: 3,
        Webpack: 4,
        Node: 5,
        React: 6,
        Web: 7
    },
    assembleTagItem: function (enumTag) {
        let clr = {
            [Util.TAG_TYPE.Javascript]: "Javascript",
            [Util.TAG_TYPE.Typescript]: "Typescript",
            [Util.TAG_TYPE.Es6]: "Es6",
            [Util.TAG_TYPE.SJModule]: "设计模式",
            [Util.TAG_TYPE.Webpack]: "Webpack",
            [Util.TAG_TYPE.Node]: "Node",
            [Util.TAG_TYPE.React]: "React",
            [Util.TAG_TYPE.Web]: "Web",
        };
        return clr[enumTag];
    }
}

window.MODULE_URL = {
    // Common: 'https://www.dqhanblog.cn:1000',
    // Blog: 'https://www.dqhanblog.cn:3032',
    // Document: 'https://www.dqhanblog.cn:3031',
    // LeaveMsg: 'https://www.dqhanblog.cn:3035',
    // OverView: 'https://www.dqhanblog.cn:3036',
    // Mark: 'https://www.dqhanblog.cn:3033',
    // Verse: 'https://www.dqhanblog.cn:3034',
    // Common: 'http://localhost:1000',
    // Blog: 'http://localhost:3032',
    // Document: 'http://localhost:3031',
    // LeaveMsg: 'http://localhost:3035',
    // OverView: 'http://localhost:3036',
    // Mark: 'http://localhost:3033',
    // Verse: 'http://localhost:3034',
    Common: '/common',
    Blog: '/blog',
    Document: '/document',
    LeaveMsg: '/leavemessage',
    OverView: '/overview',
    Mark: '/mark',
    Verse: '/verse',

    // Common: '/module_common',
    // Blog: '/module_blog',
    // Document: '/module_document',
    // LeaveMsg: '/module_leavemessage',
    // OverView: '/module_overview',
    // Mark: '/module_mark',
    // Verse: '/module_verse',

}