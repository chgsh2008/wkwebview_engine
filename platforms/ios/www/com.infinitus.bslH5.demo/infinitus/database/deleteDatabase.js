
/*global define,alert,console*/
define(['zepto', 'butterfly/view', 'util', 'bsl', '../../common'], function($, View, Util, bsl, common) {

    var me = null;

    var view = View.extend({
        id: "bslH5Demo-infinitus-sqlite-deleteDatabase",
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
            function successcb(){
                alert('删除成功');
            }

            function errorcb(){
                alert('删除失败');
            }

            //删除一个数据库
            bsl.sqlite.deleteDatabase({
                name: "testDB.db",
                location: 1
            }, successcb, errorcb);
        }


    });
    return view;
});
