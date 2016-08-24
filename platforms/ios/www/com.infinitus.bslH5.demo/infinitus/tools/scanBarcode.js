define(['zepto', 'butterfly/view', 'util', 'bsl', '../../common', '../../images/base64[300x300]x4', "underscore"], function($, View, Util, bsl, common, base64, _) {
    var me = null;
    var btnYes;
    var btnNo;
    var wrapper;
    var view = View.extend({
        id: "bslH5Demo-infinitus-tools-scanBarcode",
        isFirstShow: true,
        events: {
            'tap .goBack': common.goBack,
            "tap #try": "try",
        },
        render: function() {
            me = this;
        },
        onShow: function() {
            console.log("main:" + $(".content-block-title").html());
            common.initFnParams();
            btnYes = $("#yes");
            btnNo = $("#no");
            wrapper = $("#wrapper");
            if (this.isFirstShow) {}


            this.isFirstShow = false;
        },

        try: function() {
            console.log('- Start -');
            var autoClose_b = btnYes.hasClass("active") ? true : false;
            bsl.infinitus.tools.scanBarcode(autoClose_b, function(str) {
                window.alert(str);
            });
        }
    });
    return view;
});
