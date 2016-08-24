define(['zepto', 'butterfly/view', 'util', 'bsl', '../../common'], function($, View, Util, bsl, common) {

    var me = null;

    var view = View.extend({

        id: "bslH5Demo-infinitus-transfer-returnBack",

        events: {
            'tap .goBack' : common.goBack,
            "tap #button1": "button1",
            "tap #button2":"button2"
        },
        render: function() {

            me = this;

        },
        onShow: function() {


        },
        //返回到上一级
        button1:function() {
            bsl.infinitus.transfer.returnBack(false);
        },
        //返回到原生页面
        button2:function() {
            bsl.infinitus.transfer.returnBack(true);
        }


    });
    return view;
});
