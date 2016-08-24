/**
 * Created by chenwenqing on 2016/3/28.
 */
/*global define, console, alert*/
define(['zepto', 'butterfly/view', 'util', 'bsl', '../../common', '../../images/base64[300x300]x4'], function($, View, Util, bsl, common, base64) {
    var me = null;

    var view = View.extend({
        id: "bslH5Demo-infinitus-picker-showDialog",
        events: {
            'tap .goBack': common.goBack,
            "tap #try": "try",
        },
        render: function () {
            me = this;
        },
        onShow: function () {
            // console.log("main:" + $(".content-block-title").html());
            common.initFnParams();

        },
        try: function () {
            document.activeElement.blur();
            console.log('- Start -');
            var params = {
                "title": "",//可选 Sting 显示的标题，支持html文本
                "content": "",//可选 String 显示的内容，支持html文本
                "buttomTitles": [],//可选 按钮的可选数组，最多三个
                "backgroundColor": ""//可选 String 十六进制颜色值
            };
            params = $.extend(true, {}, params, common.fnParams);
            console.log(params);
            bsl.infinitus.picker.showDialog(function(selectedIndex) {
                alert(typeof selectedIndex);
                alert(selectedIndex);
            },params);
            console.log('- End -');
        },
    });
    return view;
});
