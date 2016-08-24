/* global require */

/* bsl.js for old module
 * 本文件用于给avalon旧模块添加bsl功能
 */

require.config({
    baseUrl: '../',
    paths: {
        bsl : 'bsl'
    }
});
/**
 *添加网络检测代码 add by chenjianlong 2016-05-13
 */
require(['bsl'], function(bsl){
    var a, sheets, link;

    //添加大平台主题css类
    document.body.classList.add("ui3-theme-bupm");

    function observeNetwork() {
        //监听网络
        if ((typeof bsl === "object") && bsl.infinitus.network.checkNetworkChanging) {
            bsl.infinitus.network.checkNetworkChanging(function(status) {

                if (parseInt(status, 10) === 0) {
                    //网络连接失败
                    window.UI3.showNetworkFail();
                } else {
                    //网络连接成功
                    window.UI3.hideNetworkFail();
                }

            });
        }
            
        //判断是否有网
        if ((typeof bsl === "object") && bsl.infinitus.network.checkNetState) {
            bsl.infinitus.network.checkNetState(function(net) {
                if (parseInt(net, 10) === 0) {
                    //网络连接失败
                    window.UI3.showNetworkFail();
                } else {
                    //网络连接成功
                    window.UI3.hideNetworkFail();
                }
            });
        }
    }

    //判断是否引入ui3.css
    //通过判断是否引入了ui3.css来判断是否使用了ui3
    a = true;
    sheets = document.styleSheets;
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

    //判断是否引入了ui3.js
    if (!window.UI3) {
        require(['./com.infinitus.commonBf/js/ui3'], function() {
            observeNetwork();
        });
    } else {
        observeNetwork();
    }

});
