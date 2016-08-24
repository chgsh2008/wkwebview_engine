define(['zepto', 'butterfly/view', 'util', 'bsl', '../../common'], function($, View, Util, bsl, common) {

    var me = null;

    var view = View.extend({

        id: "bslH5Demo-infinitus-transfer-goHome",

        events: {
            'tap .goBack' : common.goBack,
            "tap #goHome": "goHome"
        },
        render: function() {

            me = this;

        },
        onShow: function() {


        },
        goHome:function() {
            bsl.infinitus.transfer.goHome();
        }

    });
    return view;
});
