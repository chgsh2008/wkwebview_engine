/*global define,alert,console*/
define(['zepto', 'butterfly/view', 'util', 'bsl', './common'], function($, View, Util, bsl, common) {

    var me = null;

    var view = View.extend({
        id: "bslH5Demo-main",
        events: {
            'tap .bar-nav .goBack' : common.goBack,
            "tap .list-block li": "jumpPage"
        },
        render: function() {
            me = this;
        },
        onShow: function() {
            console.log("main:" + $(".content-block-title").html());
        },
        jumpPage: function(e) {
            var url = $(e.currentTarget).attr("data-url");
            common.navigate(url);
        }


    });
    return view;
});
