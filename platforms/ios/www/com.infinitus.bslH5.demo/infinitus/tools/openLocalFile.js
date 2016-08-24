define(['zepto', 'butterfly/view', 'util', 'bsl', '../../common', '../../images/base64[300x300]x4'], function($, View, Util, bsl, common, base64) {

    var me = null;

    var view = View.extend({
        id: "bslH5Demo-infinitus-tools-openLocalFile",
        events: {
            'tap .goBack': common.goBack,
            "tap #try": "try"
        },
        render: function () {
            me = this;
        },
        onShow: function () {
            // console.log("main:" + $(".content-block-title").html());
            common.initFnParams();
        },
        try: function () {
            console.log('- Start -');
            var params = {
                isOther:'',//是否必须使用第三方打开
                isNotExist:'',//文件不存在是否提示用户是否下载
                downloadUrl:'',//该文件的下载地址
                localFile:'',//本地的文档路径:绝对路径|file:///+路径  相对路径|模块名+路径
                fileName:''
            };
            params = $.extend(true, {}, params, common.fnParams);
            console.log(params);
            bsl.infinitus.tools.openLocalFile({
                "isOther": params.isOther,
                "isNotExist": params.isNotExist,
                "downloadUrl": params.downloadUrl,
                "localFile": params.localFile,
                "fileName": params.fileName
            });
            console.log('- End -');
        },
    });
    return view;
});
