define(['jquery', 'backbone',
    'com.infinitus.butterfly/components/listview/notification'
], function(zepto, Backbone, Notification) {

    if(!window.__console) {
        window.__console = window.console;
    }

    return {
        request: function(paras) {
            var url = location.href;
            var paraString = url.substring(url.indexOf("?") + 1, url.length).split("&");
            var returnValue;
            for (i = 0; i < paraString.length; i++) {
                var tempParas = paraString[i].split('=')[0];
                var parasValue = paraString[i].split('=')[1];
                if (tempParas === paras)
                    returnValue = parasValue;
            }

            if (typeof(returnValue) == "undefined") {
                return "";
            } else {	
                return returnValue;
            }
        },

        ajax: function(params) {

            // 调试用参数
            var AJAXTAG = params.url.split('?')[0];
            AJAXTAG = AJAXTAG.substring(AJAXTAG.lastIndexOf('/') + 1);

            // 输出调试用参数
            __console.groupCollapsed('AJAX-Send: ' + AJAXTAG);
            __console.count(AJAXTAG);
            __console.time(AJAXTAG);
            __console.log(params);
            __console.groupEnd('AJAX-Send: ' + AJAXTAG);

            function consoleAjaxBack(response) {
                __console.groupCollapsed('AJAX-Back: ' + AJAXTAG);
                __console.timeEnd(AJAXTAG);
                __console.log(response);
                __console.groupEnd('AJAX-Back: ' + AJAXTAG);
            }

            var me = this;

            var callbacks = _.pick(params, ['success', 'error']);

            var defaults = {
                dataType: "json",
                timeout: 15000,
                success: function() {},
                error: function() {
                    console.log('Call API error');
                    callbacks.error(arguments);
                }
            };
            //带有默认值
            params = _.extend(defaults, params);

            //代理回调
            var paramsWithProxy = _.extend(params, {
                success: function(response) {
                    // console.info('代理回调');
                    consoleAjaxBack(response);
                    callbacks.success(response);
                }
            });

            return zepto.ajax(paramsWithProxy);

        },
        //判断是否为空
        isNull: function(data) {
            var def = true;
            if (typeof data == "string") {
                data = data.trim();
            }
            if ((typeof data !== "undefined" && data && data.length !== 0) || typeof data === "function") {
                def = false;
            }
            return def;
        }

    } //return
});
