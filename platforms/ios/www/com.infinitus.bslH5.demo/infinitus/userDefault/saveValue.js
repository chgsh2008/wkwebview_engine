define(['zepto', 'butterfly/view', 'util', 'bsl', '../../common', '../../images/base64[300x300]x4', "underscore"], function($, View, Util, bsl, common, base64, _) {
    var me = null;

    var view = View.extend({
        id: "bslH5Demo-infinitus-readValue-getLocation",
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
            var prop_s=$("#key").val();
            var value_s=$("#value").val();
            bsl.infinitus.userDefault.saveValue (prop_s, value_s);
            bsl.infinitus.userDefault.readValue(prop_s, function(str){
                window.alert(str);
            });
        }
    });
    return view;
});