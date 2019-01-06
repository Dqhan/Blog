import bodyParser from 'body-parser';
import axios from 'axios';
import crypto from 'crypto';

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
            'Content-Type': 'application/x-www-form-urlencoded'
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
    // Object.assign(request, options);
    // if (options.targetComponent) {
    //     var defaultUrlPrefix = CommonUtil.getTargetUrlPrefix(options.targetComponent);
    //     if (options.url.indexOf("/") == 0) {
    //         options.url = defaultUrlPrefix + options.url;
    //     }
    //     else {
    //         options.url = defaultUrlPrefix + "/" + options.url;
    //     }
    // }
    if (request.method.toLowerCase() === "get") {
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
                            responseString: dataString,
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

// module.exports = {
//     MD5_SUFFIX: 'eiowafnajkdlfjsdkfj大姐夫文姐到了困难额我积分那看到你@#￥%……&）（*&……）',
//     md5: function (pwd) {
//         let md5 = crypto.createHash('md5');
//         return md5.update(pwd).digest('hex')
//     }
// }

window.responseClient = function (res, httpCode = 500, code = 3, message = '服务端异常', data = {}) {
    let responseData = {};
    responseData.code = code;
    responseData.message = message;
    responseData.data = data;
    res.status(httpCode).json(responseData)
}