define(['zepto', 'butterfly/view', 'util', 'bsl', '../../common', '../../images/base64[300x300]x4', "underscore"], function($, View, Util, bsl, common, base64, _) {
    var me = null;

    var view = View.extend({
        id: "bslH5Demo-infinitus-tools-showDialog ",
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
            var title_s=$("#title").val();
            var content_s=$("#content").val();
            var buttons_a=$("#buttons input").map(function(i,item){
                return $(item).val();
            });
            bsl.infinitus.tools.showDialog(title_s, content_s, buttons_a, function(n){
                window.alert("刚才选择了："+n);
            });
        }
    });
    return view;
});
