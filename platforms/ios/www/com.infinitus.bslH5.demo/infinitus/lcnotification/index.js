/**
 * Created by chenwenqing on 2016/3/24.
 */
/*global define, console*/
define(['zepto', 'butterfly/view', 'util', 'bsl', '../../common'], function($, View, Util, bsl, common) {

    var me = null;

    var view = View.extend({
        id: "bslH5Demo-infinitus-Icnotification-index",
        events: {
            'tap .goBack' : common.goBack,
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

