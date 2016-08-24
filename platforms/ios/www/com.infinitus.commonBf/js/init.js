/* global define,Butterfly */
define(['bsl'], function(bsl) {

    var cCSS = function(selecter, attrName, attrVal) {
        var str = selecter + '{' + attrName + ':' + attrVal + '}';
        return str;
    };

    var init = {
        /**
         公共成员
         **/

        // 统一样式
        // ====================

        getStyle: function() {
            init.setThemeStyle();
            init.setBaseFont();
        },

        // 获取原生主题动态生成
        setThemeStyle: function() {
            /**
             * status_bar_style //状态栏字体颜色、黑或白
             * status_bar_bg // 状态栏背景颜色
             * navi_back // 导航栏返回按钮的字体颜色
             * navi_title // 导航栏标题颜色
             * alert_bg //弹窗背景颜色
             * alert_btn //弹窗按钮文本颜色
             * alert_btn_select //弹窗按钮被中时的文本颜色
             * alert_btn_bg_select //弹窗按钮被选中时的背景颜色
             * alert_title //弹窗标题颜色
             * alert_content //弹窗内容颜色
             * alert_checkbox_title
             * alert_split //弹窗分隔线颜色
             */

            var str = '', styleDom;
            bsl.infinitus.tools.themeColor([
                "status_bar_style",
                "status_bar_bg",
                "navi_back",
                "navi_title",
                "alert_bg",
                "alert_btn",
                "alert_btn_select",
                "alert_btn_bg_select",
                "alert_title",
                "alert_content",
                "alert_checkbox_title",
                "alert_split"
            ], function(objStr) {
                var obj = JSON.parse(objStr);
                for (var key in obj) {

                    var substr,
                        val;
                    val = obj[key] + "!important;";
                    switch (key) {
                        case "status_bar_style":
                            substr = cCSS("." + key, 'color', val);
                            break;
                        case "status_bar_bg":
                            //兼容大平台，背景为白色时修改大平台的红色
                            val = obj[key].indexOf("ffffff") !== -1 ? "#bc2826!important" : val;
                            substr = cCSS("." + key, 'background-color', val);
                            break;
                        case "navi_back":
                            substr = cCSS("." + key, 'color', val);
                            break;
                        case "navi_title":
                            substr = cCSS("." + key, 'color', val);
                            break;
                        case "alert_bg":
                            substr = cCSS("." + key, 'background-color', val);
                            break;
                        case "alert_btn":
                            substr = cCSS("." + key, 'color', val);
                            break;
                        case "alert_title":
                            substr = cCSS("." + key, 'color', val);
                            break;
                        case "alert_content":
                            substr = cCSS("." + key, 'color', val);
                            break;
                        case "alert_checkbox_title":
                            substr = cCSS("." + key, 'color', val);
                            break;
                        case "alert_split":
                            substr = cCSS("." + key, 'background-color', val);
                            break;
                    }
                    str += substr;
                }
                styleDom = document.createElement('style');
                styleDom.innerHTML = str;
                document.head.appendChild(styleDom);

                //生成UI3.0主题
                var bg = obj.status_bar_bg;
                //春 #008f55
                if (/008f55/.test(bg)) {
                    document.body.className = "ui3-theme-spring";

                //夏 #5baaa2
                } else if (/5baaa2/.test(bg)) {
                    document.body.className = "ui3-theme-summer";

                //秋 #e4bb91
                } else if (/e4bb91/.test(bg)) {
                    document.body.className = "ui3-theme-autumn";

                //冬 #b98867
                } else if (/b98867/.test(bg)) {
                    document.body.className = "ui3-theme-winter";

                //大平台
                } else {
                    document.body.className = "ui3-theme-bupm";
                }
            });
        },

        //动态设置基础字体大小
        setBaseFont: function() {
            /*bsl.infinitus.tools.getCommonParam(function(value) {
                var commonParam = Butterfly.parseJSON(value)[0];
                var deviceWidth, fontSize;
                if (String(commonParam.model) === "1") {
                    //pad端
                    // deviceWidth = window.innerHeight > window.innerWidth ? window.innerHeight : window.innerWidth;
                    // fontSize = deviceWidth / 2048 * 160;
                    // document.documentElement.style.fontSize = fontSize + "px";
                    document.documentElement.style.fontSize = "80px";
                } else {
                    //phone端
                    // deviceWidth = window.innerHeight > window.innerWidth ? window.innerWidth : window.innerHeight;
                    // fontSize = deviceWidth / 640 * 100;
                    // document.documentElement.style.fontSize = fontSize + "px";
                    document.documentElement.style.fontSize = "50px";
                }
            });*/
            document.documentElement.style.fontSize = "50px";
        },
        getGuidePageStatus: function(moduleName){
            var status = {
                'calendarBf':true,
                'eln':true,
                'apprecommend.eliteBf':true,
                'official.headline':true,
                'myAccount.bupm':true,
                'shopping':true,
                'basicInfo':true
            };
            return {isClose:false,status:status[moduleName]};
        }
    };

    return init;
});
