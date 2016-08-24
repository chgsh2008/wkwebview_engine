define(['zepto', 'butterfly/view', 'util', 'bsl', '../../common', '../../images/base64[300x300]x4', "underscore"], function($, View, Util, bsl, common, base64, _) {
    var me = null;

    var view = View.extend({
        id: "bslH5Demo-infinitus-transfer-share2WX",
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
            var shareTitle_s = $("#shareTitle").val();
            var shareContent_s = $("#shareContent").val();
            var type_s = $(".buttons-row .active").text();
            bsl.infinitus.tools.share2WX(shareTitle_s, shareContent_s,
                "https://www.baidu.com/", "http://www.sxdaily.com.cn/NMediaFile/2015/0316/SXRB201503161058000498758459584.jpg",
                "", +type_s,
                function(bb){
                    window.alert(bb);
                });

        }
    });
    return view;
});
