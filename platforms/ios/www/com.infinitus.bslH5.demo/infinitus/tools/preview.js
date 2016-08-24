define(['zepto', 'butterfly/view', 'util', 'bsl', '../../common', '../../images/base64[300x300]x4'], function($, View, Util, bsl, common, base64) {

    var me = null;

    var view = View.extend({
        id: "bslH5Demo-infinitus-tools-preview",
        events: {
            'tap .goBack': common.goBack,
            "tap #try": "try"
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

            var params = {
                url: this.getUrlByType(common.fnParams.urlType)
            }

            params = $.extend(true, {}, params, common.fnParams);

            console.log(params);

                        bsl.infinitus.tools.preview({
                            "url": params.url,
                            "urlType": params.urlType,
                            "zoom": params.zoom,
                            "position": params.position,
                            "showPositionTip": params.showPositionTip
                        });


            console.log('- End -');
        },
        getUrlByType: function(urlType) {
            var url = [];
            switch (urlType) {
                // 0：本地路径
                case 0:
                    {
                        var currentPath = Util.getCurrentModulePath();
                        url = [currentPath + "/images/photo_01.jpg", currentPath + "/images/photo_02.jpg", currentPath + "/images/photo_03.jpg", currentPath + "/images/photo_04.jpg"];
                        break;
                    }
                    // 1：网络地址
                case 1:
                    {
                        url = ["http://pic5.bbzhi.com/fengjingbizhi/gonglufengjingbizhi/gonglufengjingbizhi_441952_3.jpg", "http://pic4.bbzhi.com/fengjingbizhi/jingmeikuanpingziranfengjingbizhi/jingmeikuanpingziranfengjingbizhi_373339_10.jpg", "http://tse4.mm.bing.net/th?id=OIP.Mca2f26b8a457f483276efacec38602d0o0&pid=15.1", "http://tse4.mm.bing.net/th?id=OIP.M7e771ecdaa9ef0ee6cbf002edf83784fo0&pid=15.1"];
                        break;
                    }
                    // 2：base64图片
                case 2:
                    {
                        url = [base64[0], base64[1], base64[2], base64[3]];
                        break;
                    }
                    // 3：本地路径或网络地址，通过http来前缀判断
                case 3:
                    {
                        var currentPath = Util.getCurrentModulePath();
                        url = [currentPath + "/images/photo_01.jpg", currentPath + "/images/photo_02.jpg", "http://tse4.mm.bing.net/th?id=OIP.Mca2f26b8a457f483276efacec38602d0o0&pid=15.1", "http://tse4.mm.bing.net/th?id=OIP.M7e771ecdaa9ef0ee6cbf002edf83784fo0&pid=15.1"];
                        break;
                    }
                default:
                    break;
            }
            return url;
        }
    });
    return view;
});
