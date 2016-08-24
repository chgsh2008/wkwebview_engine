define(['zepto', 'butterfly/view', 'util', 'bsl', '../../common', '../../images/base64[300x300]x4', "underscore"], function($, View, Util, bsl, common, base64, _) {
    var me = null;

    var view = View.extend({
        id: "bslH5Demo-infinitus-transfer-loadSplitWebViewRequest",
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
        },

        try: function() {
            console.log('- Start -');
            var textToClipBoard_s=$("dd input").text();
            var type_s=$("dd .active").text();
            bsl.infinitus.tools.loadSplitWebViewRequest(textToClipBoard_s,+type_s);
        }
    });
    return view;
});
