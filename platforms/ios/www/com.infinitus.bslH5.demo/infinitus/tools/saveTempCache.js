define(['zepto', 'butterfly/view', 'util', 'bsl', '../../common', '../../images/base64[300x300]x4', "underscore"], function($, View, Util, bsl, common, base64, _) {
    var me = null;

    var view = View.extend({
        id: "bslH5Demo-infinitus-tools-saveTempCache",
        isFirstShow: true,
        events: {
            'tap .goBack': common.goBack,
            "tap #save": "save",
            "tap #delete": "delete",
            "tap #read": "read",
        },
        render: function() {
            me = this;
        },
        onShow: function() {
            // console.log("main:" + $(".content-block-title").html());
            common.initFnParams();
        },

        try: function() {
            console.log('- Start -');
        },
        delete: function() {
            var key = $("dd input").eq(0).val();
            bsl.infinitus.tools.cleanTempCache(key);
        },
        read: function() {
            var key = $("dd input").eq(0).val();
            bsl.infinitus.tools.readTempCache(key,function(s){
                window.alert(s);
            });
        },
        save: function() {
            var key = $("dd input").eq(0).val();
            var value = $("dd input").eq(1).val();
            bsl.infinitus.tools.saveTempCache(key,value);
        }
    });
    return view;
});
