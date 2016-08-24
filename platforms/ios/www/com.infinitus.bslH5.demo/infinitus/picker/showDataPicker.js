/**
 * Created by chenwenqing on 2016/3/24.
 */
/*global define, console, alert*/
define(['zepto', 'butterfly/view', 'util', 'bsl', '../../common', '../../images/base64[300x300]x4'], function($, View, Util, bsl, common, base64) {
    var me = null;

    var view = View.extend({
        id: "bslH5Demo-infinitus-transfer-showDataPicker",
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
        try: function() {
            document.activeElement.blur();
            console.log('- Start -');
            var params = {
                "dataSource": [],//必选 数组 dataSourcePath和dataSource为二选一，两者都有首选dataSource
                "dataSourcePath": "",//可选 String 数据源文件的相对路径
                "depth": 1,//必选 int 深度，标识选取器的横向滚轮有几列,必须和数据源相匹配
                "defaultSelected": []// 可选 Array ,默认已选格式，和sCallback返回的数据格式一致
            };
            params = $.extend(true, {}, params, common.fnParams);
            console.log(params);
            bsl.infinitus.picker.showDataPicker(function(select) {
                alert(typeof select);
                alert(select);
            },params);
            console.log('- End -');

        }
    });
    return view;
});
