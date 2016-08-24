define(['zepto', 'butterfly/view', 'util', 'bsl', '../../common', '../../images/base64[300x300]x4'], function($, View, Util, bsl, common, base64) {

    var me = null;

    var view = View.extend({
        id: "bslH5Demo-infinitus-tools-rotateScreen",
        events: {},
        render: function() {
            me = this;
        },
        onShow: function() {
            // console.log("main:" + $(".content-block-title").html());
            common.initFnParams();

            var btnPortrait = $("#portrait");
            var btnLandscape = $("#landscape");
            var btnAuto = $("#auto");
            btnPortrait.on("click", function(e) {
                bsl.infinitus.tools.rotateScreen(0);
            });
            btnLandscape.on("click", function(e) {
                bsl.infinitus.tools.rotateScreen(1);
            });
            btnAuto.on("click", function(e) {
                bsl.infinitus.tools.rotateScreen(2);
            });

        }
    });
    return view;
});
