define(['zepto', 'butterfly/view', 'util', 'bsl', '../../common', '../../images/base64[300x300]x4', "underscore"], function($, View, Util, bsl, common, base64, _) {
    var me = null;

    var view = View.extend({
        id: "bslH5Demo-infinitus-transfer-shareContent",
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
            if (this.isFirstShow) {

            }
            this.isFirstShow = false;
        },

        try: function() {
            console.log('- Start -');
            var checkboxes_a=$("#platform input");
            var platform_s=[];
            for(var i=0;i<checkboxes_a.length;i++){
                var item=checkboxes_a[i];
                if(item.checked){
                    platform_s.push($(item).data("index"));
                }
            }
            var type_s=$(".buttons-row .active").data("type");
            bsl.infinitus.tools.shareContent(platform_s,"分享一个大新闻","大新闻的内容就是百度",
                "https://www.baidu.com/","http://www.sxdaily.com.cn/NMediaFile/2015/0316/SXRB201503161058000498758459584.jpg",
                "",+type_s, function(s){
                    window.alert(s);
                });
        }
    });
    return view;
});
