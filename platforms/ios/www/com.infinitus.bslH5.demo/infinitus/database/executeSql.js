
/*global define,alert,console*/
define(['zepto', 'butterfly/view', 'util', 'bsl', '../../common'], function($, View, Util, bsl, common) {

    var me = null;

    var view = View.extend({
        id: "bslH5Demo-infinitus-sqlite-executeSql",
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

            var db = bsl.sqlite.openDatabase({
                name: "testDB.db"
            });

            db.transaction(function(tx) {
                //tx.executeSql('DROP TABLE IF EXISTS test_table');
                tx.executeSql('CREATE TABLE IF NOT EXISTS test_table (id integer primary key, data text, data_num integer)');

                tx.executeSql("INSERT INTO test_table (data, data_num) VALUES (?,?)", ["test200", 200], function(tx, res) {
                    console.log("insertId: " + res.insertId + " -- probably 1");
                    console.log("rowsAffected: " + res.rowsAffected + " -- should be 1");

                    tx.executeSql("select count(id) as cnt from test_table;", [], function(tx, res) {
                        console.log("res.rows.length: " + res.rows.length + " -- should be 1");
                        console.log("res.rows.item(0).cnt: " + res.rows.item(0).cnt + " -- should be 1");
                        alert("res.rows.item(0).cnt: " + res.rows.item(0).cnt + " -- should be 1");
                    });

                }, function(e) {
                    console.log("ERROR: " + e.message);
                });
            });
        }



    });
    return view;
});
