/*global define,console,alert,Butterfly*/
define(['zepto', 'butterfly/view', 'util', 'bsl', '../../common', '../../images/base64[300x300]x4'], function($, View, Util, bsl, common, base64) {

    var me = null;

    var view = View.extend({
        id: "bslH5Demo-infinitus-tools-preview",
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
            $("input").blur();
            var params = {
                vibrate:'',//是否开启震动
                vibrateHz:'',//震动频率,只对Android生效，iOS默认1~2秒，高频率
                sound:'',//是否播放声音
                soundPath:''// 声音文件的相对路径, 模块名称/xxx.wav，注意Android和iOS的声音格式不一致
            };
            params = $.extend(true, {}, params, common.fnParams);
            console.log(params);
            alert(JSON.stringify(params));
            bsl.infinitus.tools.audioServicesPlay(function(status){
                console.log(status);

                var isSuccess = status[0];
                var errorCode = status[1];
                if(isSuccess === 0) {
                   switch(errorCode) {
                       case 1:
                       {
                           Butterfly.Toast("设备无法震动");
                           break;
                       }
                       case 2:
                       {
                           Butterfly.Toast("声音文件找不到");
                           break;
                       }
                       case 3:
                       {
                           Butterfly.Toast("设备被调为静音");
                           break;
                       }
                       case 4:
                       {
                           Butterfly.Toast("文件损坏或者格式不支持播放");
                           break;
                       }
                       default:
                           break;
                   }

                }
            }, params);
            console.log('- End -');
        },
    });
    return view;
});
