
/* global define,var,console,alert*/
define(['zepto', 'butterfly/view', 'util', 'bsl', '../../common'], function($, View, Util, bsl, common) {

    var me = null;

    var view = View.extend({
        id: "bslH5Demo-infinitus-network-checkNetState",
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
            /**
             * 返回当前网络状态
             * @return int 0没有网络，1gprs网络，2wifi网络
             */
            bsl.infinitus.network.checkNetState(function(data) {
                alert("success： " + data);
            }, function(error) {
                alert("fail: " + error);
            });
        }


    });
    return view;
});
