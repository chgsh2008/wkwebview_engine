/* global define,Butterfly,butterfly,__console,console */

define(['zepto', 'bsl', 'init', 'ui3', 'cat'], function($, bsl, init, ui3, cat) {

    /**
     *添加网络检测代码 add by chenjianlong 2016-05-13
     */
    (function() {
        //添加大平台主题css类
        document.body.classList.add("ui3-theme-bupm");

        //通过判断是否引入了ui3.css来判断是否使用了ui3
        var a = true,
            link;
        var sheets = document.styleSheets;
        for (var i = 0, l = sheets.length; i < l; i++) {
            if (sheets[i].href && sheets[i].href.indexOf("ui3.css") !== -1) {
                a = false;
                break;
            }
        }
        if (a) {
            link = document.createElement("link");
            link.rel = "stylesheet";
            link.href = "../com.infinitus.commonBf/css/ui3.css";
            document.head.appendChild(link);
        }

        //监听网络动态变化
        if (bsl.infinitus.network.checkNetworkChanging) {
            bsl.infinitus.network.checkNetworkChanging(function(status) {

                //网络连接失败
                if (parseInt(status, 10) === 0) {

                    //使用了ui3则使用新提示
                    ui3.showNetworkFail();

                } else {
                    //网络连接成功
                    ui3.hideNetworkFail();
                }

            });
        }
    }());

    var commonParam, isReady = false;
    var Util = {
        //请求的次数
        SENDCOUNT: 0,
        //默认参数值
        DefaultParams: {
            "timeout": 60 * 1000,
            "timeout_msg": "请求超时，稍后尝试！",
            "type": "GET",
            "dataType": "text",
            "getHeader": {
                "Accept": "application/json",
                "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
                "Accept-Language": "zh-CN,zh",
                "X-Requested-With": "XMLHttpRequest"
            },
            "postHeader": {
                "Accept": "application/json",
                "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
                "Accept-Language": "zh-CN,zh",
                "X-Requested-With": "XMLHttpRequest"
            }

        },
        /**
         *@params
         *    url:请求路径
         *    type:请求方式(GET或POST)
         *    data:请求的参数
         *    dataType:请求的数据格式(JOSN或JSONP或XML)
         *    success:成功回调函数
         *    error:失败回调函数
         *    complete:最终执行的函数
         *    dataException:success方法里data.success不为true时执行
         *    hostType:传给bsl.infinitus.tools.getHost获取接口地址，默认为gbss，可选root,uim,gbss,emcs
         *    hideLoading:隐藏loading，默认false，若需要自定义loading动画时设置为true
         * */
        Ajax: function(params) {
            var me = this;
            //扩展对象
            var paramsObj = $.extend({}, this.DefaultParams, params);

            var hostType = params.hostType || "gbss";

            var vHeader;
            //首先要判断网络是否正常，如果网络连接异常，将不做ajax请求
            bsl.infinitus.network.checkNetState(function(val) {

                //网络连接失败
                if (parseInt(val, 10) === 0) {

                    //使用了ui3则使用新提示
                    ui3.showNetworkFail();

                } else { //网络连接成功

                    ui3.hideNetworkFail();

                    //判断是是GET请求还是POST请求，如果是POST请求，那么将需要修改请求头

                    bsl.infinitus.tools.getHost(function(host) {

                        host = Butterfly.parseJSON(host);

                        //获取公共参数再执行ajax
                        bsl.infinitus.tools.getCommonParam(function(value) {

                            commonParam = Butterfly.parseJSON(value);

                            //删除dealerNo以免影响接口
                            delete commonParam[0].dealerNo;

                            //如果是摩托罗拉手机，禁止loading，该手机渲染能力很差，使用了css3的loading需要手动触发页面更新显示
                            if (commonParam[0].brand.toLowerCase().indexOf("motorola") !== -1) {
                                paramsObj.hideLoading = true;
                            }

                            //获取模块信息
                            me.getCubeModule(function(h5Param) {

                                commonParam[0] = $.extend(commonParam[0], h5Param);

                                if (paramsObj.type && paramsObj.type.toUpperCase() === "POST") {

                                    vHeader = me.DefaultParams.postHeader;
                                    paramsObj.data = $.extend(paramsObj.data || {}, commonParam[0]);

                                } else {

                                    vHeader = me.DefaultParams.getHeader;
                                    me.ajaxParam(paramsObj);

                                }

                                //为整合大平台，所有接口使用gbss 2016-03-29 4lines by chenjianlong
                                if (paramsObj.url.indexOf("/gbss-mobile/") !== -1) {
                                    paramsObj.url = paramsObj.url.replace("/gbss-mobile/", "/");
                                    console.warn("为同时兼容大平台和e帆网APP，接口地址中的项目名已整合到公共方法中，请手动删除业务模块url前面的 %c /gbss-mobile", "background:#000;color:green");
                                }
                                if (paramsObj.url.indexOf("/gbss-otms/") !== -1) {
                                    hostType = "gbss";
                                    paramsObj.url = paramsObj.url.replace("/gbss-otms/", "/front/gbss-mobile-restful/");
                                }

                                paramsObj.url = host[hostType] + paramsObj.url;

                                me.goAjax(paramsObj, vHeader);
                            });

                        });

                    });
                }
            });



        },
        goAjax: function(paramsObj, vHeader) {

            var loader, me = this;

            // 调试用参数
            var AJAXTAG = paramsObj.url.split('?')[0];
            AJAXTAG = AJAXTAG.substring(AJAXTAG.lastIndexOf('/') + 1);

            //拦截安卓url中的#字符
            paramsObj.url = paramsObj.url.replace("#", "");
            //chenjiongming 2016-07-05 
            if (typeof cat.catAnalyticStart !== 'undefined' && cat.catAnalyticsEnd !== 'undefined') {
                var cat_op = {
                    url: paramsObj.url,
                    data: paramsObj.data,
                    success: paramsObj.success
                };
                cat.catAnalyticStart(cat_op);
            }
            //ajax请求
            $.ajax({
                timeout: paramsObj.timeout,
                url: paramsObj.url,
                type: paramsObj.type,
                data: paramsObj.data,
                dataType: paramsObj.dataType,
                headers: vHeader ? vHeader : {},
                async: true,
                beforeSend: function(xhr, settings) {

                    // 输出调试用参数
                    __console.groupCollapsed('AJAX-Send: ' + AJAXTAG);
                    // console.count(AJAXTAG);
                    __console.time(AJAXTAG);
                    __console.log(settings);
                    __console.groupEnd('AJAX-Send: ' + AJAXTAG);

                    //在Ajax请求之前该做的一些事情
                    me.SENDCOUNT++;
                    if (!paramsObj.hideLoading) {
                        loader = new Butterfly.Loader({
                            ajax: xhr,
                            text: '加载中，请稍候...',
                            cancel: function() {
                                this.options.ajax.abort(); //终止ajax
                                this.destroy();
                            }
                        });
                    }
                },
                success: function(data, textStatus, jqXHR) {
                    var cat_returnOp = {
                        code: jqXHR.status,
                        data: data
                    };
                    /*这里可做一些公共的业务处理*/

                    //判断是否登录超时

                    //根据后台返回的result code判断系统的异常情况

                    //调用H5的方法
                    if (data && data !== "" && typeof data === "string") {
                        data = Butterfly.parseJSON(data);

                        // 输出调试用参数
                        __console.groupCollapsed('AJAX-Back: ' + AJAXTAG);
                        __console.timeEnd(AJAXTAG);
                        __console.log(data);
                        __console.log('status: ' + textStatus);
                        __console.groupEnd('AJAX-Back: ' + AJAXTAG);

                        //成功
                        if (data.success && (typeof paramsObj.success === "function")) {
                            //chenjiongming 2016-07-11
                            if (typeof cat.catAnalyticStart !== 'undefined' && cat.catAnalyticsEnd !== 'undefined') {
                                cat.catAnalyticsEnd(cat_op, cat_returnOp);
                            }
                            var returnObj = "returnObject" in data ? data.returnObject : data;
                            paramsObj.success(returnObj, textStatus, jqXHR);



                        } else {
                            if (typeof(paramsObj.dataException) === "function") {

                                //chenjiongming 2016-07-11
                                if (typeof cat.catAnalyticStart !== 'undefined' && cat.catAnalyticsEnd !== 'undefined') {
                                    cat.catAnalyticsEnd(cat_op, cat_returnOp, "数据格式错误");
                                }
                                paramsObj.dataException(data);
                            } else {
                                if (data.exceptionMessage) {
                                    Butterfly.Toast('<div style="font-size:12px">' + data.exceptionMessage + '</div>');
                                } else if (data.errorMessage) {
                                    Butterfly.Toast('<div style="font-size:12px">' + data.errorMessage + '</div>');
                                }
                                //chenjiongming 2016-07-11
                                if (typeof cat.catAnalyticStart !== 'undefined' && cat.catAnalyticsEnd !== 'undefined') {
                                    cat.catAnalyticsEnd(cat_op, cat_returnOp, data.exceptionMessage || data.exceptionMessage);
                                }
                            }
                        }

                    } else {
                        // 输出调试用参数
                        __console.groupCollapsed('AJAX-Back: ' + AJAXTAG);
                        __console.timeEnd(AJAXTAG);
                        __console.log(data);
                        __console.log('status: ' + textStatus);
                        __console.groupEnd('AJAX-Back: ' + AJAXTAG);


                        //chenjiongming 2016-07-11
                        if (typeof cat.catAnalyticStart !== 'undefined' && cat.catAnalyticsEnd !== 'undefined') {
                            cat.catAnalyticsEnd(cat_op, cat_returnOp, data);
                        }
                    }

                },
                dataException: function() {},
                error: function(e, xhr, type) {
                    var cat_returnOp = {
                        code: xhr.status,
                        data: e
                    };
                    // 输出参数
                    __console.groupCollapsed('AJAX-Back: ' + AJAXTAG + ' ERROR!');
                    __console.timeEnd(AJAXTAG);
                    __console.log(e);
                    __console.groupEnd('AJAX-Back: ' + AJAXTAG + ' ERROR!');

                    if (e && e !== "") {
                        if (e.response && e.response !== "" && typeof e.response === "string") {
                            var response = Butterfly.parseJSON(e.response);
                            if (response === null) {
                                console.error("json解释错误");
                                //chenjiongming 2016-07-11
                                if (typeof cat.catAnalyticStart !== 'undefined' && cat.catAnalyticsEnd !== 'undefined') {
                                    cat.catAnalyticsEnd(cat_op, cat_returnOp, "json解释错误");
                                }
                                return;
                            }
                            if (!response.success && response.exceptionCode.indexOf("302")) { //判定已登出
                                var tools = bsl.infinitus.tools;
                                if (tools && tools.debug) { //PC端登出处理
                                    //弹出提示
                                    var dialog = new Butterfly.Dialog({
                                        autoshow: false,
                                        target: 'body',
                                        title: 'PC端登出处理',
                                        content: '为了您的账号安全，请重新登录！'
                                    }, {
                                        configs: [{
                                            title: '确定',
                                            eventName: 'yes'
                                        }, {
                                            title: '取消',
                                            eventName: 'no'
                                        }],
                                        yes: function() {
                                            //跳转到登录页面
                                        },
                                        no: function() {

                                        }
                                    });
                                    dialog.show();
                                } else { //移动端登出处理
                                    bsl.infinitus.transfer.logoutByUserInvalid();
                                }

                            } else { //非已登出的情况，抛出异常信息
                                if (response.exceptionMessage) {
                                    Butterfly.Toast(response.exceptionMessage);
                                } else if (response.errorMessage) {
                                    Butterfly.Toast(response.errorMessage);
                                }
                                //chenjiongming 2016-07-11
                                if (typeof cat.catAnalyticStart !== 'undefined' && cat.catAnalyticsEnd !== 'undefined') {
                                    cat.catAnalyticsEnd(cat_op, cat_returnOp, response.exceptionMessage || response.errorMessage);
                                }
                            }
                        }
                    }
                    if (xhr === "timeout") {
                        Butterfly.Toast(me.DefaultParams.timeout_msg);
                        //chenjiongming 2016-07-11
                        if (typeof cat.catAnalyticStart !== 'undefined' && cat.catAnalyticsEnd !== 'undefined') {
                            cat.catAnalyticsEnd(cat_op, cat_returnOp, me.DefaultParams.timeout_msg);
                        }
                    }
                    if (paramsObj.error && paramsObj.error instanceof Function) {
                        paramsObj.error(e, xhr, type);
                    }
                },
                complete: function(xhr, status) {
                    //做一些成功之后的操作
                    if (!paramsObj.hideLoading) {
                        loader.destroy();
                    }
                    if (paramsObj.complete && paramsObj.complete instanceof Function) {
                        paramsObj.complete(xhr, status);
                    }

                    //大平台::保存持久化登录信息（只在大平台APP有效）
                    var headers = {};
                    var gbssCookie = xhr.getResponseHeader("GBSS-Cookie");
                    var uimTGC = xhr.getResponseHeader("UIM-TGC");
                    if (gbssCookie) {
                        headers['GBSS-Cookie'] = gbssCookie;
                    }
                    if (uimTGC) {
                        headers['UIM-TGC'] = uimTGC;
                    }

                    if (bsl.infinitus.tools.saveTGCCookie) {
                        bsl.infinitus.tools.saveTGCCookie(JSON.stringify(headers));
                    }
                }
            });
        },

        //模块内的模块跳转
        /**
         *参数(path)的形式：
         *      1、页面名称  : productList
         *      2、模块名称  : com.infinitus.shoppingBf/productList
         *      3、带参数    : productList?id=123 / com.infinitus.shoppingBf/productList?id=123
         */
        navigate: function(path, options) {
            //判断传进来的路径是不是只是页面文件名称
            if (path && path !== "") {
                var url = location.href;
                var module = url.substring(0, url.indexOf("/index.html"));
                module = module.substring(module.lastIndexOf("/") + 1);
                path = "#/" + module + "/" + path;
            }

            butterfly.navigate(path, options);
        },

        /**
         *补全图片的路径，在目标对象上添加带服务器地址的属性
         *  @param obj 对象，例 {id:1, img:'zxcvbnm.jpg'}
         *  @param property 该对象需要处理的属性，例 ['img'] 支持子对象为一级数组 ['img|pic']
         *  @param callback 最后执行的回调
         *
         *  示例1：formatImage({id:1, img:'/getProductPhoto?photoCode=S1386'}, ['img'], function(data){})
         *  结果1：{id:1, img:'http://cdn/getProductPhoto?photoCode=S1386', imgKey:'S1386'}
         *
         *  示例2：formatImage({
         *          id:1,
         *          img:[{
         *              pic:'/getProductPhoto?photoCode=S1386'
         *          }]
         *        }, ['img|pic'], function(data){
         *          //传入的data就是formatImage的第一个参数
         *          Util.loadImage(data, ['img|pic']);
         *        })
         *  结果2：{id:1, img:[{pic:'http://cdn/getProductPhoto?photoCode=S1386', picKey:'S1386'}]}
         */
        formatImage: function(obj, property, callback) {

            var data = obj instanceof Array ? obj : [obj];
            var pros = property instanceof Array ? property : [property];

            /** addKey
             * cdn 服务器地址
             * o 对象
             * k 键值
             */
            function addKey(cdn, o, k) {
                var url = o[k];
                if (url !== null) {
                    if (url.indexOf(cdn) === -1) {
                        o[k] = cdn + url;
                    }
                    o[k + 'Key'] = url.split("=")[1];
                } else {
                    o[k + 'Key'] = null;
                }
            }

            //获取图片服务器地址
            bsl.infinitus.tools.getHost(function(host) {

                var cdn, children, ary;

                if (typeof host === 'string') {
                    host = Butterfly.parseJSON(host);
                }

                cdn = host.cdn;

                for (var i = 0; i < data.length; i++) {
                    for (var j = 0; j < pros.length; j++) {
                        if (pros[j].indexOf("|") === -1) {

                            addKey(cdn, data[i], pros[j]);

                        } else {

                            //支持子对象是数组
                            children = pros[j].split("|");
                            ary = data[i][children[0]] instanceof Array ? data[i][children[0]] : [data[i][children[0]]];

                            for (var k = 0; k < ary.length; k++) {
                                addKey(cdn, ary[k], children[1]);
                            }

                        }
                    }
                }

                if (typeof callback === "function") {
                    callback(obj);
                }

            });
        },

        /**
         *把图片缓存到客户端
         *  @param obj 对象，例 {id:1, img:'zxcvbnm.jpg'}
         *  @param property 该对象需要处理的属性，例 ['img'] 支持子对象为一级数组 ['img|pic']
         *  @param callback 图片缓存后的回调，回调的 params 为数组[imgUrl,filePath,sUserInfo]
         *
         *  说明：该方法与formatImage一起使用，先用formatImage处理对象，然后用loadImage缓存图片
         */
        loadImage: function(obj, property, callback) {
            var data = obj instanceof Array ? obj : [obj];
            var pros = property instanceof Array ? property : [property];
            var children, ary;

            function cacheImage(key, url) {
                if (key !== null && key !== "") {
                    bsl.infinitus.cache.cacheImageWithUrl(url, key, function(param) {
                        callback(param);
                    });
                }
            }

            for (var i = 0; i < data.length; i++) {
                for (var j = 0; j < pros.length; j++) {
                    if (pros[j].indexOf("|") === -1) {

                        cacheImage(data[i][pros[j] + "Key"], data[i][pros[j]]);

                    } else {

                        children = pros[j].split("|");
                        ary = data[i][children[0]] instanceof Array ? data[i][children[0]] : [data[i][children[0]]];
                        for (var k = 0; k < ary.length; k++) {
                            cacheImage(ary[k][children[1] + "Key"], ary[k][children[1]]);
                        }

                    }
                }
            }
        },

        /*
         *获取路径传的参数值
         *参数：paras(key值)
         */
        getParameter: function(paras) {
            var url = location.href;
            var paraString = url.substring(url.indexOf("?") + 1, url.length).split("&");

            var returnValue;
            for (var i = 0; i < paraString.length; i++) {
                var tempParas = paraString[i].split('=')[0];
                var parasValue = paraString[i].split('=')[1];

                if (tempParas === paras)
                    returnValue = parasValue;
            }

            if (typeof(returnValue) === "undefined") {
                return "";
            } else {
                return returnValue;
            }
        },

        //生成ajax默认数据格式
        ajaxParam: function(options) {
            var urlParam = [];
            this.createParam(options.data, urlParam, "");
            for (var i = 0; i < urlParam.length; i++) {
                urlParam[i] = urlParam[i].substring(1);
            }

            for (var x in commonParam[0]) {
                urlParam.push(x + "=" + commonParam[0][x]);
            }

            options.data = null;
            options.url = options.url + "?" + urlParam.join("&");
        },
        /**
         *
         * @param data 传入的参数数据
         * @param urlParam 空数组
         * @param route
         * @param isArray
         */
        createParam: function(data, urlParam, route, isArray) {
            for (var x in data) {
                switch (typeof(data[x])) { //data[x] 递归的字段数据
                    case "function":
                        continue;
                    case "object":
                        if (isArray) {
                            //product[0].code=1 &...
                            this.createParam(data[x], urlParam, route + "[" + x + "]", $.isArray(data[x]));
                        } else {
                            // array["name"] => name="a"& name="b"
                            this.createParam(data[x], urlParam, route + "." + x, $.isArray(data[x]));
                        }
                        break;
                    default: //普通参数
                        if (isArray) {
                            urlParam.push(route + "=" + data[x]);
                        } else {
                            urlParam.push(route + "." + x + "=" + data[x]);
                        }
                        break;
                }
            }
        },

        //获取CubeModule.json，传送给后台用于日志输出排错
        getCubeModule: function(callback) {
            $.ajax({
                url: "./CubeModule.json",
                complete: function(xhr) {
                    var data = Butterfly.parseJSON(xhr.response);
                    var views = butterfly.rootView.views;
                    var obj = views[views.length - 1];
                    var h5Param = {
                        "pageId": obj.view.el.id ? obj.view.el.id : null,
                        "_r": new Date().getTime() //添加时间戳防止缓存
                    };
                    if (data) {
                        h5Param.build = data.build;
                    } else {
                        console.error("获取CubeModule.json失败！");
                    }
                    callback(h5Param);
                }
            });
        },
        isFunction: function(fn) {
            if (fn && (typeof fn).toLowerCase() === 'function') {
                return true;
            } else {
                console.error(fn + ' 不是函数');
                return false;
            }
        },
        // 获取当前模块绝对路径
        getCurrentModulePath: function() {
            return location.origin + location.pathname.substring(0, location.pathname.lastIndexOf('/'));
        },
        // 百度统计
        baiduTj: {
            // 记录一次事件
            recordEventNumber: function(eventName) {
                bsl.infinitus.tools.getCommonParam(function(value) {
                    var dealerNo = Butterfly.parseJSON(value)[0].dealerNo;
                    bsl.infinitus.baiduTools.recordEventNumber(eventName, dealerNo);
                });
            }
        },

        init: function() {

            if (!isReady) {

                //获取初始化字体大小
                init.getStyle();
                isReady = true;

                //监听安卓返回键，执行当前活动页面的goBack方法
                if (typeof bsl.infinitus.tools.setBackAction === "function") {
                    bsl.infinitus.tools.setBackAction(function() {

                        Util.goBack();

                    });
                }

            }

        },

        goBack: function() {

            var flag = false;
            var views = butterfly.rootView.views;
            var view = views[views.length - 1].view;
            var goback = view.goBack;

            //遍历查看是否有弹窗未关
            $(".overlay").each(function() {
                if (!$(this).hasClass("hidden")) {
                    flag = true;
                }
            });

            if (flag) {
                $(".overlay").addClass("hidden");
            } else {
                //安卓软键盘弹出时不执行返回操作
                if (/Android/.test(navigator.userAgent) && (document.activeElement.tagName === "INPUT" || document.activeElement.tagName === "TEXTAREA")) {
                    document.activeElement.blur();
                } else if (typeof goback === "function") { //自定义goBack方法
                    goback.call(view);
                } else if (views.length === 1) { //首页
                    bsl.infinitus.transfer.returnBack(true);
                } else {
                    window.history.back();
                }
            }
        },

        getLocalStorage: function(moduleName){
            var obj = window.localStorage.getItem(moduleName);
            return obj ? JSON.parse(obj) : {};
        },

        setLocalStorage: function(moduleName,obj){
            var oldObj = this.getLocalStorage(moduleName);
            $.extend(obj,oldObj);
            obj = JSON.stringify(obj);
            window.localStorage.setItem(moduleName,obj)
        }
    };

    return Util;
});