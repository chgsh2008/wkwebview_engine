/**
 * Created by chenwenqing on 2016/3/29.
 */
/*global define, console, alert*/
define(['zepto', 'butterfly/view', 'util', 'bsl', '../../common', '../../images/base64[300x300]x4'], function($, View, Util, bsl, common, base64) {
    var me = null;

    var view = View.extend({
        id: "bslH5Demo-infinitus-lcnotification-getNotification",
        events: {
            'tap .goBack': common.goBack,
            "tap #try": "try",

        },
        render: function () {
            me = this;
        },
        onShow: function () {
            common.initFnParams();

        },
        try: function () {
             
             
            bsl.infinitus.lcnotifiction.getNotification(function(success) {
                alert(success);
            });
        },
        
    });
    return view;
});

