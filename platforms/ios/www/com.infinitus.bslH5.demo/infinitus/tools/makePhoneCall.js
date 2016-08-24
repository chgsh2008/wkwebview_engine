define(['zepto', 'butterfly/view', 'util', 'bsl', '../../common'], function($, View, Util, bsl, common) {

    var me = null;

    var view = View.extend({
        id: "bslH5Demo-infinitus-tools-makePhoneCall",
        events: {
            'tap .goBack' : common.goBack,
            "tap #try": "try"
        },
        render: function() {
            me = this;
        },
        onShow: function() {
            common.initFnParams();
        },
        try: function() {
            console.log('- Start -');
            bsl.infinitus.tools.makePhoneCall(common.fnParams.phoneNo);
            console.log('- End -');
        }


    });
    return view;
});
