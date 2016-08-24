
/* global define,var,console,alert*/
define(['zepto', 'butterfly/view', 'util', 'bsl', '../../common'], function($, View, Util, bsl, common) {

    var me = null;

    var view = View.extend({
        id: "bslH5Demo-infinitus-baiduTools-recordEventEnd",
        events: {
            'tap .goBack' : common.goBack,
            "tap #try": "try"
        },
        render: function() {
            me = this;
        },
        onShow: function() {

        },
        try: function() {
            console.log("111");
            bsl.infinitus.baiduTools.recordEventEnd("eventId","9899");
        }

    });
    return view;
});
