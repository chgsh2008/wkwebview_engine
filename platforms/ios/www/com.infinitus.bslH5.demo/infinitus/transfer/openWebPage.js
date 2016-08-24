define(['zepto', 'butterfly/view', 'util', 'bsl', '../../common'], function($, View, Util, bsl, common) {

    var me = null;

    var view = View.extend({
        id: "bslH5Demo-infinitus-transfer-openWebPage",
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
	        document.activeElement.blur(); //防止input未失焦输入参数无效
	        params = common.fnParams;

console.log(params);
	        bsl.infinitus.transfer.openWebPage({
		        "url":params.url,
		        "sInitFun":params.sInitFun,
		        "oInitParam":params.oInitParam,
		        "sTitle":params.sTitle,
		        "sFlag":params.sFlag,
		        "jNavInfo":params.jNavInfo
	        });

	        console.log('- End -');
        }


    });
    return view;
});
