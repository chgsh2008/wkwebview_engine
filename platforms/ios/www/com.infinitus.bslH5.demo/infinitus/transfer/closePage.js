
/*global define ,console,alert*/

define(['zepto', 'butterfly/view', 'util', 'bsl', '../../common'], function($, View, Util, bsl, common) {

    var me = null;

    var view = View.extend({

        id: "bslH5Demo-infinitus-transfer-closePage",

        events: {
            'tap .goBack' : common.goBack,
            "tap #closePage": "closePage"
        },
        render: function() {

            me = this;

        },
        onShow: function() {


        },
        closePage:function() {
            alert("qqq");
            bsl.infinitus.transfer.closePage("com.infinitus.native.demo/index.html");
        }


    });
    return view;
});
