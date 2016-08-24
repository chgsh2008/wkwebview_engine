define(['zepto', 'butterfly/view', 'util', 'bsl', '../../common', '../../images/base64[300x300]x4', "underscore"], function($, View, Util, bsl, common, base64, _) {
    var me = null;

    var view = View.extend({
        id: "bslH5Demo-infinitus-tools-checkAppInstall",
        isFirstShow: true,
        events: {
            'tap .goBack': common.goBack,
            "tap #try": "try",
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
            var type_n = $("input");
            type_n = type_n.map(function(index, item) {
                return item.checked ? item : null;
            });
            type_n = +type_n[0].id;
            bsl.infinitus.tools.checkAppInstall(type_n, function(str) {
                bsl.infinitus.tools.showDialog("注意", str, ["确认"], null);
            });

        }
    });
    return view;
});
