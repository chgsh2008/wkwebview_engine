
/* global define,var,console,alert*/
define(['zepto', 'butterfly/view', 'util', 'bsl', '../../common'], function($, View, Util, bsl, common) {

    var me = null;

    var view = View.extend({
        id: "bslH5Demo-infinitus-network-post",
        events: {
            'tap .goBack' : common.goBack,
            "tap #try": "try"
        },
        render: function() {
            me = this;
        },
        onShow: function() {

        },
        try: function() {
            console.log("111");
            function callBack(value) {
                alert(value);
            }
            /**
             * post方式请求http接口内容
             * @param sUrl String 请求地址
             * @param jParam JSON 请求参数
             * @param sCallback String 回调函数名
             *      code int 状态码 无网络:-101 地址不合法:-102 用户未授权访问通讯录:-304；其它参照http状态码定义
             *      result 成功时为服务器返回的数据，其它为错误内容
             *      结构function callback(result,code){}
             */
            bsl.infinitus.network.post("https://gbssdev.infinitus.com.cn/gbss-mobile/front/gbss-mobile-newAccount/guest/getGuestLoginInfo?model=0&appVersion=2.2.1&version=3",
                "",
                callBack);
        }


    });
    return view;
});
