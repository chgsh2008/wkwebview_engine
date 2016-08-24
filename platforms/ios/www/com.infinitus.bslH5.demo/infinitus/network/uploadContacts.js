
/* global define,var,console,alert*/
define(['zepto', 'butterfly/view', 'util', 'bsl', '../../common'], function($, View, Util, bsl, common) {

    var me = null;

    var view = View.extend({
        id: "bslH5Demo-infinitus-network-uploadContacts",
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
             * 上传通讯录到服务器
             * command.arguments = []
             * @param sCallback String 回调函数名
             *      code int 状态码 无网络:-101 地址不合法:-102；其它参照http状态码定义
             *      result 成功时为服务器返回的数据，其它为错误内容
             *      结构function callback(code,result){}
             */
            bsl.infinitus.network.uploadContacts(callBack);
        }


    });
    return view;
});
