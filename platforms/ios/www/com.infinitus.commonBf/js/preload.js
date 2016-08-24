(function() {
    var config = {
        showDebbugLog: false
        , activeTingyunInProd: false //是否在生产环境加载听云
        , activeTingyunInTest: false
        , activeTingyunInPretest: false
        , activeTingyunInDev: false
    }

    function debbugLog() {
        if (!!config.showDebbugLog) {
            console.group('[preload log]');
            for(var i = 0; i < arguments.length; i += 1) {
                console.log(arguments[i]);
            }
            console.groupEnd('[preload log]');
        }
    }

    window.global = {
        tingyunKey: '' // 用于 tingyun.js
    }

    window.preload = {

        device: '',
        rootHost: '',
        environment: '',

        initPreload: function(callback, callbackParams) {
            debbugLog('initPreload');
            var me = this;
            me.device = me.returnDevice();
            if (me.device === 'iphone' || me.device === 'ipad' || me.device === 'android') {
                me.setEvrmByDeviceAndDoSth(me.device, callback, callbackParams);
            } else {
                debbugLog('非原生环境，不加载 preload.js 配置内容（比如听云）');
            }
        },

        // 返回当前终端（不同终端的 Cordova 实现不一致）
        returnDevice: function() {
            var me = this;
            debbugLog('returnDevice');
            userAgent = navigator.userAgent.toLowerCase();
            if (userAgent.indexOf('iphone') > -1) {
                me.device = 'iphone';
            } else if (userAgent.indexOf('ipad') > -1) {
                me.device = 'ipad';
            } else if (userAgent.indexOf('android') > -1) {
                me.device = 'android';
            } else {
                me.device = 'other';
            }
            return me.device;
        },

        // 返回当前环境
        returnEnviromentByHost: function(host) {
            debbugLog('returnEnviromentByHost');
            if (host.indexOf('gbss.infinitus.com.cn') > -1) {
                environment = 'prod';
            } else if (host.indexOf('gbsstest.infinitus.com.cn') > -1) {
                environment = 'test';
            } else if (host.indexOf('gbsspre-test.infinitus.com.cn') > -1) {
                environment = 'pre-test';
            } else if (host.indexOf('gbssdev.infinitus.com.cn') > -1) {
                environment = 'dev';
            } else {
                environment = 'other';
            }
            return environment
        },

        // 设置当前APP环境（dev/pre-test/test/prod），并执行回调
        setEvrmByDeviceAndDoSth: function(device, callback, callbackParams) {
            var me = this;
            // 新模块的 webview 
            if (window.cordova) {
                // once Cordova has fully loaded 
                document.addEventListener("deviceready", function() {
                    debbugLog('deviceready')
                    if (device === 'iphone' || device === 'ipad') {
                        cordova.exec(function(data) {
                            preload.rootHost = JSON.parse(data).root;
                            preload.environment = me.returnEnviromentByHost(preload.rootHost);
                            callback(callbackParams);
                        }, null, "BSLTools", "getHost", []);
                    } else { // (device === 'android')
                        cordova.exec(function(data) {
                            preload.rootHost = JSON.parse(data).root;
                            preload.environment = me.returnEnviromentByHost(preload.rootHost);
                            callback(callbackParams);
                        }, null, "Plugin", "getHost", []);
                    }
                }, false);
            }
            // 旧模块的原生 webview 给 H5 的对象
            else if (window.ctsCmd) {
                preload.rootHost = JSON.parse(ctsCmd.execCmd("Tools", "getHost", JSON.stringify([]))).root;
                preload.environment = me.returnEnviromentByHost(preload.rootHost);
                callback(callbackParams);
            } else {
                debbugLog('H5 无法获取 cordova 或 ctsCmd 方法')
            }
        }
    }

    preload.initPreload(function() {
        debbugLog('initPreload callback');
        // 听云
        tingyunKey = '';
        switch (preload.environment) {
            case 'prod':
                if(config.activeTingyunInProd) {
                    tingyunKey = 'fOWzaYmmOV8';
                }
                break;
            case 'test':
                if(config.activeTingyunInPretest) {
                    tingyunKey = '3a93cKorkms';
                }
                break;
            case 'pre-test':
                if(config.activeTingyunInTest) {
                    tingyunKey = 'mc2swcGIlc0';
                }
                break;
            case 'dev':
                if(config.activeTingyunInDev) {
                    tingyunKey = 'KOCjRmjY82w';
                }
                break;
            default:
                break;
        }
        if (tingyunKey !== '') {
            debbugLog('tingyunkey');
            global.tingyunKey = tingyunKey;

            var preloadJsSrc = document.getElementById('preload-js').src;
            var modulePath = preloadJsSrc.slice(preloadJsSrc.indexOf('/com.infinitus.'), preloadJsSrc.indexOf('preload.js')); // ("/com.infinitus.commonBf/js/" || "/com.infinitus.common/")

            var tingyunScript = document.createElement('script');
            tingyunScript.type = 'text/javascript';
            tingyunScript.src = '..' + modulePath + 'tingyun.js';
            document.head.appendChild(tingyunScript);

            debbugLog('tingyunJS ready: environment = ' + environment + ' & key = ' + tingyunKey);
        }
    });
})()
