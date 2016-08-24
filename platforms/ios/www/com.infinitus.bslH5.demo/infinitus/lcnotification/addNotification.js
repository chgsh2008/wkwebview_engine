/**
 * Created by chenwenqing on 2016/3/24.
 */
/*global define, console, alert*/
define(['zepto', 'butterfly/view', 'util', 'bsl', '../../common', '../../images/base64[300x300]x4'], function($, View, Util, bsl, common, base64) {
    var me = null;

    var view = View.extend({
        id: "bslH5Demo-infinitus-lcnotification-addNotification",
        events: {
            'tap .goBack': common.goBack,
            "tap #try": "try",
            "tap #time": "showPicker",
        },
        render: function() {
            me = this;
        },
        onShow: function() {
            // console.log("main:" + $(".content-block-title").html());
            common.initFnParams();

        },
        try: function() {
            $("input").blur();
            console.log('- Start -');
            var params = {
                "firstTime": $("#time").val(), //起始时间yyyy-MM-dd HH:mm:ss
                "ID": $("#id").val(), //通知的ID
                "repeatInterval": $("dd .active").text(), //循环时间0 不循环 , 1 一天 ， 2 一周，  3 一月， 4 一年
                "repeatNumber": $("#repeat").val(), //循环次数，当用户不处理的时候，再次处理的次数，默认0次
                "content": $("#content").val(), //内容
                "title": $("#title").val() //标题
            };
            //window.alert(params.ID);
            var paramsArr = [params];
            console.log(paramsArr);
            bsl.infinitus.lcnotifiction.addNotification(paramsArr, function(success) {
                alert(success);
            }, function(error) {
                alert(error);
            });
        },
        showPicker: function(e) {
            bsl.infinitus.tools.showDatePicker(1, "", me.datePickerCallback);
        },
        datePickerCallback: function(p) {
            $("#time").val(p);
            $("#time").trigger("change");
        }
    });
    return view;
});
