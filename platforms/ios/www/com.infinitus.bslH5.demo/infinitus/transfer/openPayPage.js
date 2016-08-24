
/*global define ,console*/

define(['zepto', 'butterfly/view', 'util', 'bsl', '../../common'], function($, View, Util, bsl, common) {

    var me = null;

    var view = View.extend({

        id: "bslH5Demo-infinitus-transfer-openPayPage",

        events: {
            'tap .goBack' : common.goBack,
            "tap #openPayPage": "openPayPage"
        },
        render: function() {

            me = this;

        },
        onShow: function() {


        },
        openPayPage:function() {
            bsl.infinitus.transfer.openPayPage("com.infinitus.bslH5.demo/tools/index.html","10");
        }


    });
    return view;
});
