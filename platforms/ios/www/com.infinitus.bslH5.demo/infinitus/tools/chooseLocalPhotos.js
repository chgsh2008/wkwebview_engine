define(['zepto', 'butterfly/view', 'util', 'bsl', '../../common'], function($, View, Util, bsl, common) {

    var me = null,
        defaultSelectList = "";

    var view = View.extend({
        id: "bslH5Demo-infinitus-tools-chooseLocalPhotos",
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

            document.activeElement.blur(); //防止input未失焦输入参数无效

            var params;
            var temp = {
                defaultSelectList: null
            };

            if (common.fnParams.defaultSelectList && !!defaultSelectList) {
                temp.defaultSelectList = defaultSelectList;
            } else {
                temp.defaultSelectList = "";
            }

            params = $.extend({}, common.fnParams, temp);

            bsl.infinitus.tools.showDialog("参数：", JSON.stringify(params), ["确定"], function() {
                //选择本地图片
                bsl.infinitus.tools.chooseLocalPhotos(function(photos) {
                    defaultSelectList = photos;
                    window.alert(photos);
                }, params);
            });

        }


    });
    return view;
});
