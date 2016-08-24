define(['zepto', 'butterfly/view', 'util', 'bsl', '../../common'], function($, View, Util, bsl, common) {

    var me = null;

    var view = View.extend({

        id: "bslH5Demo-infinitus-transfer-loadPageWithUrl",

        events: {
            'tap .goBack' : common.goBack,
            "tap #loadPageWithUrl": "loadPageWithUrl"
        },
        render: function() {

            me = this;

        },
        onShow: function() {


        },
        loadPageWithUrl:function() {
            bsl.infinitus.transfer.loadPageWithUrl("https://www.baidu.com/");
        }


    });
    return view;
});
