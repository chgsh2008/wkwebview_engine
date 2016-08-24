define(['zepto', 'butterfly/view', 'util', 'bsl', '../../common'], function($, View, Util, bsl, common) {

    var me = null;

    var view = View.extend({

        id: "bslH5Demo-infinitus-transfer-logoutByUserInvalid",

        events: {
            'tap .goBack' : common.goBack,
            "tap #logoutByUserInvalid": "logoutByUserInvalid"
        },
        render: function() {

            me = this;

        },
        onShow: function() {


        },
        //返回到上一级
        logoutByUserInvalid:function() {
            bsl.infinitus.transfer.logoutByUserInvalid();
        }

    });
    return view;
});
