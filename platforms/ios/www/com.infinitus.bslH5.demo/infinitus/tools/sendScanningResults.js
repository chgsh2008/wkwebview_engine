define(['zepto', 'butterfly/view', 'util', 'bsl', '../../common', '../../images/base64[300x300]x4', "underscore"], function($, View, Util, bsl, common, base64, _) {
    var me = null;

    var view = View.extend({
        id: "bslH5Demo-infinitus-tools-sendScanningResults",
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
            this.isFirstShow = false;
        },

        try: function() {
            console.log('- Start -');
            
            bsl.infinitus.tools.scanBarcode(false, function(str) {
                bsl.infinitus.tools.sendScanningResults();
            });
        }
    });
    return view;
});
