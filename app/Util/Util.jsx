window.fetchUtility = function (options, errorFun) {
    var request = {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            "Content-Type": "application/json",
        },
        cache: 'no-store',
        body: options.data,
        // credentials: "include",
        // isParseJson: true,
        // download: false,
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
                    $$.alert(true, { type : "w",  content: "Sorry, currently you are in simulation mode and limited to read only access." });
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