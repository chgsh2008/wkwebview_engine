
/*global define,alert,console*/
define(['zepto', 'butterfly/view', 'util', 'bsl', 'jroll'], function($, View, Util, bsl) {

    var me = null

    var view = View.extend({
        id: "bslH5Demo-infinitus-cache-getH5Cache",
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
            bsl.infinitus.cache.getH5Cache("key", function(e){
                alert(e);
            });
        }



    });
    return view;
});
