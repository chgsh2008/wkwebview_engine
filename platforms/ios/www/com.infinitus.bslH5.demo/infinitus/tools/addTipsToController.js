define(['zepto', 'butterfly/view', 'util', 'bsl', '../../common', '../../images/base64[300x300]x4'], function($, View, Util, bsl, common, base64) {
    var me = null;

    var view = View.extend({
        id: "bslH5Demo-infinitus-transfer-addTipsToController",
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
            var image=$("#image");
            var module=$("#module");
            console.log('- Start -');
            
            bsl.infinitus.tools.showDatePicker(image.text(), module.text());
            
        },
    });
    return view;
});
