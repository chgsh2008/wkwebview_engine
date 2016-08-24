define(['zepto', 'butterfly/view', 'util', 'bsl', '../../common', '../../images/base64[300x300]x4', "underscore"], function($, View, Util, bsl, common, base64, _) {
    var me = null;

    var view = View.extend({
        id: "bslH5Demo-infinitus-tools-closeDialog ",
        isFirstShow: true,
        events: {
            'tap .goBack': common.goBack,
        },
        render: function() {
            me = this;
        },
        onShow: function() {
            // console.log("main:" + $(".content-block-title").html());
            common.initFnParams();
            bsl.infinitus.tools.showDialog("温馨提示", "点击确定关闭对话框", ["确定"], me.callback);
        },
        callback: function() {
            bsl.infinitus.tools.closeDialog();
        }
    });
    return view;
});
