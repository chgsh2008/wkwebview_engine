/**
 * Created by kevin on 15/10/15.
 */
require.config({
    baseUrl: '../',
    paths: {
        bsl: 'bsl',

    }
});
require(['bsl'],function(bsl) {
    document.addEventListener('deviceready', onDeviceready, false);
    function onDeviceready() {

        var DEFAULT_SIZE = 5000000; // max to avoid popup in safari/ios
//        var isIE = isWindows || isWP8;
        //var isWebKit = !isIE; // TBD [Android or iOS]
        var dbName = "H5Database.sqlite";
        var element = document.getElementById('LOG');

        function openDB() {
            return bsl.sqlite.openDatabase(dbName, "2.0", "Demo", DEFAULT_SIZE);

        }

        function dbcopy()
        {
            //Database filename to be copied is demo.db
            //location = 0, will copy the db to default SQLite Database Directory
            //window.plugins.sqlDB.copy(dbName, 0, copySuccess,copyError);
            //or
            //location = 1, will copy the database to /Library folder
            //window.plugins.sqlDB.copy(dbName, 1, copySuccess,copyError);
            //or
            //location = 2, will copy the database to /Library/LocalDatabase folder (Disable iCloud Backup)
            window.plugins.sqlDB.copy(dbName, 2, copySuccess,copyError);
            //bsl.sqlDB.copy(dbName, 2, copySuccess,copyError);

        }

        function removeDB()
        {
            var location = 2;
            //window.plugins.sqlDB.remove(dbName, location, rmsuccess,rmerror);
            bsl.sqlDb.remove(dbName,location,function(){
                element.innerHTML = "good, 成功删除数据库";
            },function(error){
                element.innerHTML = "oh no, 删除数据库失败";
            })
        }

        function copySuccess()
        {
            //open db and run your queries
            dbOpen = window.sqlitePlugin.openDatabase({name: dbName});
            element.innerHTML = "good, 数据库创建成功,并已打开数据";
        }

        function copyError(e)
        {
            //db already exists or problem in copying the db file. Check the Log.
            console.log("Error Code = "+JSON.stringify(e));
            element.innerHTML = "数据库创建失败, Error Code = "+JSON.stringify(e);
        }

        //document.getElementById("btnCreateDB").addEventListener('click',function () {
        //    dbcopy();
        //});

        document.getElementById("btnCreateTable").addEventListener('click',function () {
            var db = openDB();
            //ok(!!db, "db object");
            db.transaction(function(tx) {
                //ok(!!tx, "tx object");
                tx.executeSql('DROP TABLE IF EXISTS test_table');
                tx.executeSql('CREATE TABLE IF NOT EXISTS test_table (id integer primary key, data text, data_num integer)');
                element.innerHTML = "成功创建表";
            });

        });

        document.getElementById("btnInsertTable").addEventListener('click',function () {
            var db = openDB();
            //ok(!!db, "db object");
            db.transaction(function(tx) {
                tx.executeSql("INSERT INTO test_table (data, data_num) VALUES (?,?)", ["test", 100], function(tx, res) {
                    element.innerHTML = "insertId: " + res.insertId + " -- probably 1" + "rowsAffected: " + res.rowsAffected + " -- should be 1";

                    //tx.executeSql("select count(id) as cnt from test_table;", [], function(tx, res) {
                    //    console.log("res.rows.length: " + res.rows.length + " -- should be 1");
                    //    console.log("res.rows.item(0).cnt: " + res.rows.item(0).cnt + " -- should be 1");
                    //});
                }, function(e) {
                    element.innerHTML = "ERROR: " + e.message;
                });
            });

        });

        document.getElementById("btnSelectTable").addEventListener('click',function () {
            var db = openDB();
            //ok(!!db, "db object");
            db.transaction(function(tx) {
                tx.executeSql("select * from test_table where data_num=?", [100], function(tx, res) {
                    //console.log("insertId: " + res.insertId + " -- probably 1");
                    //console.log("rowsAffected: " + res.rowsAffected + " -- should be 1");
                    element.innerHTML = "查询数据:";
                    for(var i=0;i<res.rows.length;i++){
                        element.innerHTML += "<br/>"+res.rows.item(i).id +"   "+res.rows.item(i).data +"   "+res.rows.item(i).data_num;
                    }
                    //element.innerHTML = "查询数据:"+res.rows.item(0).data +"   "+res.rows.item(0).data_num;
                    //done();
                });
            });

        });

        document.getElementById("btnDeleteDB").addEventListener('click',function () {
            removeDB();

        });

        document.getElementById("btnBack").addEventListener('click',function () {
            bsl.infinitus.transfer.returnBack(false,"returnBackCallback","");
        });


    }
});