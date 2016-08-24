/*global define, console, alert*/
define(['zepto', 'butterfly/view', 'util', 'bsl', '../../common'], function($, View, Util, bsl, common) {

    var me = null;

    var view = View.extend({
        id: "bslH5Demo-infinitus-network-checkNetworkChanging",
        events: {
            'tap .goBack' : common.goBack,
            "tap #try": "try"
        },
        render: function() {
            me = this;
        },
        onShow: function() {
            console.log("main:" + $(".content-block-title").html());
        },
        try: function() {
            console.log('- Start -');
            bsl.infinitus.network.checkNetworkChanging(function(value) {
                console.dir(value);

                console.log('- End -');

                var o = {
	                "0" : "没有网络" ,
	                "1" : "WIFI网络" ,
	                "2" : "移动网络数据"
                }
                $('#result').html(o[value]).closest('.resultWrap').show();
            });
        }


    });
    return view;
});
