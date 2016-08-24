/**
 * Created by chenwenqing on 2016/5/11.
 */
/*global define, console, alert*/
define(['zepto', 'butterfly/view', 'util', 'bsl', '../../common', '../../images/base64[300x300]x4'], function($, View, Util, bsl, common, base64) {
    var me = null;

    var view = View.extend({
        id: "bslH5Demo-infinitus-transfer-selectedTabItem",
        events: {
            'tap .goBack': common.goBack,
            "tap #new": "new",
            "tap #old": "old"
        },
        render: function () {
            me = this;
        },
        onShow: function () {
            // console.log("main:" + $(".content-block-title").html());
            common.initFnParams();

        },
        new: function () {
            document.activeElement.blur();
            console.log('- Start -');
            var params = {
                "selectedItem":[],//Array，数组第一位表示首页下的四个Tab页，第二位菜单Code,注意每个端的菜单Code都是不一致的。
                "sFunction":"",//String ,打开指定Tab后向相应的WebView主动发出该函数。
                "sParam":"" // String  为sfunction的参数值
            };
            params = $.extend(true, {}, params, common.fnParams);
            console.log(params);
            bsl.infinitus.transfer.selectedTabItem(params);
            console.log('- End -');
        },
        old: function () {
            document.activeElement.blur();
            console.log('- Start -');
            var params = {
                "selectedItem":[],//Array，数组第一位表示首页下的四个Tab页，第二位菜单Code,注意每个端的菜单Code都是不一致的。
                "sFunction":"",//String ,打开指定Tab后向相应的WebView主动发出该函数。
                "sParam":"" // String  为sfunction的参数值
            };
            params = $.extend(true, {}, params, common.fnParams);
            console.log(params);
            transfer.selectedTabItem(params);
            console.log('- End -');
        }
    });
    return view;
});
