define(['zepto', 'butterfly/view', 'util', 'bsl', '../../common', '../../images/base64[300x300]x4', "underscore"], function($, View, Util, bsl, common, base64, _) {
    var me = null;

    var view = View.extend({
        id: "bslH5Demo-infinitus-transfer-showDatePicker",
        isFirstShow: true,
        events: {
            'tap .goBack': common.goBack,
            "tap #try": "try",
        },
        render: function() {
            me = this;
        },
        onShow: function() {
            // console.log("main:" + $(".content-block-title").html());
            common.initFnParams();
            var status_bar_style = $("#status_bar_style");
            var status_bar_bg = $("#status_bar_bg");
            var navi_back = $("#navi_back");
            var navi_title = $("#navi_title");
            var alert_bg = $("#alert_bg");
            var alert_btn = $("#alert_btn");
            var alert_btn_select = $("#alert_btn_select");
            var alert_btn_bg_select = $("#alert_btn_bg_select");
            var alert_title = $("#alert_title");
            var alert_content = $("#alert_content");
            var alert_checkbox_title = $("#alert_checkbox_title");
            var alert_split = $("#alert_split");
            if (this.isFirstShow) {
                $(".content-block.configWrap").on("click", ".button.button-big", function(e) {
                    $(this).toggleClass("active");
                });
            }
            this.isFirstShow = false;
        },

        try: function() {
            console.log('- Start -');
            var arr = $(".button.button-big").map(function() {
                return $(this).hasClass("active") ? this.innerHTML : null;
            });
            //arr = _.compact(arr);
            bsl.infinitus.tools.themeColor(arr,function(msg){
                msg && window.alert(msg);// alert导致页面卡死
            });
        }
    });
    return view;
});
