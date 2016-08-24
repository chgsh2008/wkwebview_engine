
/*global define,alert,console*/
define(['zepto', 'butterfly/view', 'util', 'bsl', '../../common'], function($, View, Util, bsl, common) {

    var me = null;

    var view = View.extend({
        id: "bslH5Demo-infinitus-sqlite-openDatabase",
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
            //function callback(value){
            //    alert(value);
            //}

            bsl.sqlite.openDatabase({name: "testDB.db"});
        }


    });
    return view;
});
