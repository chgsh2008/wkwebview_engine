/*global define, console*/
define(['zepto', 'butterfly/view', 'util', 'bsl', '../../common', '../../images/base64[300x300]x4'], function($, View, Util, bsl, common, base64) {
    var me = null;

    var view = View.extend({
        id: "bslH5Demo-infinitus-transfer-showDatePicker",
        events: {
            'tap .goBack': common.goBack,
            "tap #try": "try",
            'tap .paramType': "showMaxAndMinOrNot",
        },
        render: function() {
            me = this;
        },
        onShow: function() {
            // console.log("main:" + $(".content-block-title").html());
            common.initFnParams();

        },
        showMaxAndMinOrNot: function() {
            var paramTypeFlag = common.fnParams.paramType;
            console.log(paramTypeFlag);
            if(paramTypeFlag) {
                $(".paramTypeJson").show();
            } else {
                $(".paramTypeJson").hide();
            }
        },
        try: function() {
            console.log('- Start -');
            var params = {
                dateType: '',//选择的日期类型
                paramType: '',//参数类型：0|string 1|json
                selectDate: '',//默认选中日期
                MaxDate: '',//时间选取上限
                MinDate: '',//时间选取下限
            };
            params = $.extend(true, {}, params, common.fnParams);
            console.log(params);
            if(params.paramType == 0) {
                bsl.infinitus.tools.showDatePicker(params.dateType, params.selectDate, me.callbackFun);
            } else if(params.paramType == 1) {
                bsl.infinitus.tools.showDatePicker(params.dateType, {"selectDate":params.selectDate, "MaxDate":params.MaxDate, "MinDate":params.MinDate}, me.callbackFun);
            }
        },
        callbackFun: function(p) {

            alert("您选择的时间是 "+ p);
        },
    });
    return view;
});
