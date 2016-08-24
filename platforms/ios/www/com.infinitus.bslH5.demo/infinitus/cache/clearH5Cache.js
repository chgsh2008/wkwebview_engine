
/*global define,alert,console*/
define(['zepto', 'butterfly/view', 'util', 'bsl', 'jroll'], function($, View, Util, bsl) {

    var me = null

    var view = View.extend({
        id: "bslH5Demo-infinitus-cache-clearH5Cache",
        events: {
            'tap .goBack' : Util.goBack,
            "tap #try": "try"
        },
        render: function() {
            me = this;
        },
        onShow: function() {

        },
        try: function() {
            bsl.infinitus.cache.clearH5Cache();
            window.alert("清除成功")；
        }



    });
    return view;
});
