// chenjiongming 2016-06-29  
//给document添加click事件，捕捉页面中的埋点
//重写window.onerror，捕捉页面异常
define(["jquery"], function($) {
    function catAnalytics(a, b, c, d, e) {
        //检查 调用原生接口
        var p = {
            "category": a,
            "action": b,
            "label": c,
            "value": d
        };
        if (e) {
            p.extras = [e]
        }
        CatStatistical.analytics(p);
    }
    document.addEventListener("click", function() {
        //return;
        var e = window.event;
        var target = $(e.target);
        var titlec = target.data("click-title"),
            titlef = target.data("focus-title"),
            title = value = action = label = "";
        if (titlec) {
            action = "点击", title = titlec;
            value = target.data("click-value") || "";
            value = value.toString();
            /*if(/\'/g.test(value)) {
                value = value.replace("\'",'').replace("\'",'');
            }*/
            label = target.data("click-label") || "";
            if (value.indexOf("搜索内容=") > -1) {
                value = $("#" + value.split("=")[1]).val();
            }
        } else if (titlef) {
            action = "对焦", title = titlef;
            value = target.data("focus-value") || "";
            value = value.toString();
            label = target.data("focus-label") || "";
        } else {
            return;
        }
        //alert(title + ":" + action + label);
        catAnalytics(title, action, label, value);
    });

    //该方法在某些模块中被覆盖。
    window.onerror = function(msg, url, line, col, error) {
        //没有URL不上报！上报也不知道错误
        if (msg != "Script error." && !url) {
            return true;
        }
        //console.log("window.onerror");
        //采用异步的方式
        //我遇到过在window.onunload进行ajax的堵塞上报
        //由于客户端强制关闭webview导致这次堵塞上报有Network Error
        //我猜测这里window.onerror的执行流在关闭前是必然执行的
        //而离开文章之后的上报对于业务来说是可丢失的
        //所以我把这里的执行流放到异步事件去执行
        //脚本的异常数降低了10倍
        setTimeout(function() {
            var data = {};
            //不一定所有浏览器都支持col参数
            col = col || (window.event && window.event.errorCharacter) || 0;

            data.url = url;
            data.line = line;
            data.col = col;
            if (!!error && !!error.stack) {
                //如果浏览器有堆栈信息
                //直接使用
                data.msg = error.stack.toString();
            } else if (!!arguments.callee) {
                //尝试通过callee拿堆栈信息
                var ext = [];
                var f = arguments.callee.caller,
                    c = 3;
                //这里只拿三层堆栈信息
                while (f && (--c > 0)) {
                    ext.push(f.toString());
                    if (f === f.caller) {
                        break; //如果有环
                    }
                    f = f.caller;
                }
                ext = ext.join(",");
                data.msg = ext;
            }
            //把data上报到后台！
            /*bsl.infinitus.cat.analytics({
                "category": url,//String 分类，按主要页面即业务分，如index代表主页
                "action": "line:"+line,//String 动作，一般命名规则为category_actionName，如index_search
                "label": msg,//String 可阅读的标签，如名字等。一般是离散的值，用于统计出现频率
                "value": error//int 非离散值，用于统计平均值。如列表点击位置，消费价格等
                //"extras": ["",""]//Array 额外信息，如request_id。以key1, value1, key2, value2提供
            });*/
            CatStatistical.crashed(msg);
        }, 0);
        return true;
    };

    var ajaxAnalyticObject = [];
    return {
        catAnalyticsEnd: function(options, returnOptions, msg) {
            //return;
            //匹配ajax唯一标识:options
            var timeStart = timeEnd = 0,
                _time, category, requestLen, responseLen;
            for (var i = 0; i < ajaxAnalyticObject.length; i++) {
                if (ajaxAnalyticObject[i].id == options) {
                    var url = options.url;
                    var ajaxUrl = url.substring(33);
                    timeStart = ajaxAnalyticObject[i].timestamp;
                    //记录一个时间戳，ajax 结束
                    timeEnd = new Date().getTime();
                    _time = timeEnd - timeStart;
                    //删除数组中对应元素
                    ajaxAnalyticObject.splice(i, 1);
                    //请求传的参数data的大小
                    if (typeof options.data === 'string') {
                        requestLen = options.data.length
                    } else {
                        if (typeof options.data !== 'undefined') {
                            requestLen = JSON.stringify(options.data).length;
                        } else {
                            requestLen = 0;
                        }
                    }
                    //返回的data的大小
                    if (typeof returnOptions.data === 'string') {
                        responseLen = returnOptions.data.length
                    } else {
                        if (typeof returnOptions.data !== 'undefined') {
                            responseLen = JSON.stringify(returnOptions.data).length;
                        } else {
                            responseLen = 0;
                        }
                    }
                    category = $("[data-click-title]").attr("data-click-title") || $(".header ").find(".ellipsis").text() || ajaxUrl;
                    //catAnalytics(category, "耗时:" + _time + "ms", ajaxUrl, _time, msg);
                    //url为file开头的不上报
                    if (ajaxUrl.match(/^(?!file).*/)) {
                        setTimeout(function() {
                            CatStatistical.monitor({
                                "url": ajaxUrl, //String 请求的服务地址
                                "code": returnOptions.code, //int 服务返回码，200成功，302被踢出等
                                "requestBytes": requestLen, //int 请求传的参数data的大小
                                "responseBytes": responseLen, //int 返回的data的大小
                                "responseTime": _time, //int 请求所花费的时间，以毫秒计算
                            });
                        });
                    }

                    break;
                }
            }
        },
        catAnalyticStart: function(options) {
            //return;
            ajaxAnalyticObject.push({
                //记录ajax唯一标识：options
                id: options,
                //记录一个时间戳，ajax 开始
                timestamp: new Date().getTime()
            });
        }
    };
});