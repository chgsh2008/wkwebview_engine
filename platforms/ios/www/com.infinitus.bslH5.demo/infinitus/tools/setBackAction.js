define(['zepto', 'butterfly/view', 'util', 'bsl', '../../common', '../../images/base64[300x300]x4', "underscore"], function($, View, Util, bsl, common, base64, _) {
    var me = null;

    var view = View.extend({
        id: "bslH5Demo-infinitus-tools-setBackAction",
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
            bsl.infinitus.tools.setBackAction(function(){
                bsl.infinitus.tools.showDialog("注意", "这是按了返回键之后的回调函数", ["确认"], null);
            });
        },

        try: function() {
            console.log('- Start -');
            
            
        }
    });
    return view;
});
