
/*global define ,console,alert*/

define(['zepto', 'butterfly/view', 'util', 'bsl', '../../common'], function($, View, Util, bsl, common) {

    var me = null;

    var view = View.extend({

        id: "bslH5Demo-infinitus-transfer-pickContact",

        events: {
            'tap .goBack' : common.goBack,
            "tap #pickContact": "pickContact"
        },
        render: function() {

            me = this;

        },
        onShow: function() {


        },
        pickContact:function() {
            function callback(value){
                alert(value);
            }
            bsl.infinitus.transfer.pickContact(callback);
        }


    });
    return view;
});
