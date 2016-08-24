
/*global define ,console,alert*/

define(['zepto', 'butterfly/view', 'util', 'bsl', '../../common'], function($, View, Util, bsl, common) {

    var me = null;

    var view = View.extend({

        id: "bslH5Demo-infinitus-transfer-gotoBusinessQuery",

        events: {
            'tap .goBack' : common.goBack,
            "tap #gotoBusinessQuery": "gotoBusinessQuery"
        },
        render: function() {

            me = this;

        },
        onShow: function() {


        },
        gotoBusinessQuery:function() {
            alert("qqq");
            bsl.infinitus.transfer.gotoBusinessQuery("EMCS-PHONE-1-27");
        }


    });
    return view;
});
