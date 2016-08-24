
/*global define,alert,console*/
define(['zepto', 'butterfly/view', 'util', 'bsl', 'jroll'], function($, View, Util, bsl) {

    var me = null;

    var view = View.extend({
        id: "bslH5Demo-infinitus-cache-setH5Cache",
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
            $("#cacheValue").val();
            bsl.infinitus.cache.setH5Cache("key", $("#cacheValue").val());
            window.alert("保存成功");
        }



    });
    return view;
});
