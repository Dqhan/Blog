import bodyParser from 'body-parser';
import axios from 'axios';
import crypto from 'crypto';
import { resolve } from 'path';

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
            'Accept': 'application/json'
        },
        // headers: {
        //     'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
        //     'Accept': 'application/json'
        // },
        cache: 'no-store',
        // body: assemble(options.data),
        // credentials: "include",
        // isParseJson: true,
        // download: false,
        // body: assemble(options.data)，
        body: assemble(options.data)
    };

    // if (userInfo) {
    //     request.headers["Authorization"] = "Bearer " + userProfileManager.getAccessToken();
    //     request.headers["IsSimulated"] = CommonUtil.isSimulated();
    //     if (window.localStorage.getItem("CurrentRoleType") !== null) {
    //         request.headers["CurrentRoleType"] = window.localStorage.getItem("CurrentRoleType");
    //     }
    // } else {
    //     if (userManager) {
    //         userManager.signinRedirect();
    //     }
    // }
    // if (options.import) {
    //     options.headers = {
    //         "Authorization": request.headers.Authorization,
    //         "IsSimulated": request.headers.IsSimulated,
    //         "CurrentRoleType": request.headers.CurrentRoleType
    //     }
    // }
    Object.assign(request, options);
    // if (options.targetComponent) {
    //     var defaultUrlPrefix = CommonUtil.getTargetUrlPrefix(options.targetComponent);
    //     if (options.url.indexOf("/") == 0) {
    //         options.url = defaultUrlPrefix + options.url;
    //     }
    //     else {
    //         options.url = defaultUrlPrefix + "/" + options.url;
    //     }
    // }
    if (request.method.toLowerCase() == "get") {
        request.body = null;
    }
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
                    window.location.href = "/error/" + response.status;
                } else if (response.status == 409) {
                    // for simulation
                    $$.alert(true, { type: "w", content: "Sorry, currently you are in simulation mode and limited to read only access." });
                    throw new Error("simulation");
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
                $$.error("An error happened while fetching information. Error:", ex);
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
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
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
    if (localStorage.getItem('currentUserInfo') && JSON.parse(localStorage.getItem('currentUserInfo')))
        return JSON.parse(localStorage.getItem('currentUserInfo')).userName;
    else
        return "";
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