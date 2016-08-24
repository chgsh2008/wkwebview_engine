define(['zepto', 'butterfly/view', 'util', 'bsl', '../../common'], function($, View, Util, bsl, common) {

    var me = null;

    var view = View.extend({

        id: "bslH5Demo-infinitus-transfer-login",

        events: {
            'tap .goBack' : common.goBack,
            "tap #login": "login"
        },
        render: function() {

            me = this;

        },
        onShow: function() {


        },
        login:function() {
            bsl.infinitus.transfer.login(function sCallBack(bIsSuccess){})
        }


    });
    return view;
});
