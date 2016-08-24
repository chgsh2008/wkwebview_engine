define(['zepto', 'butterfly/view', 'util', 'bsl', '../../common', '../../images/base64[300x300]x4', "underscore"], function($, View, Util, bsl, common, base64, _) {
    var me = null;
    var delaySnd_e;
    var view = View.extend({
        id: "bslH5Demo-infinitus-transfer-closeBarcode",
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
            //common.initFnParams();
            delaySnd_e = $("#delaySnd");
            if (this.isFirstShow) {

            }
            this.isFirstShow = false;
        },

        try: function() {
            console.log('- Start -');
            var text = +delaySnd_e.val();
            bsl.infinitus.tools.scanBarcode(false, function() {

            });
            window.setTimeout(function() {
                bsl.infinitus.tools.closeBarcode(text * 1000);
            }, text * 1000);
        }
    });
    return view;
});
