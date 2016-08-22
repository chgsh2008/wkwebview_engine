/**
 * Created by kevin on 15/8/31.
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
    //alert("star");

    function checkConnection() {
        window.location.href="networkInfo_index.html";
    }

    document.getElementById("btnCheckNetwork").onclick = function () {
        //checkConnection();
        bsl.infinitus.transfer.openPageWithTitle("Demo/networkInfo_index.html", "", "", "网络判断")
    };

    //document.getElementById("btnBack").addEventListener('click',function () {
    //    window.history.back(-1);
    //});


    document.getElementById("btnCamera").addEventListener('click',function () {
        //window.location.href="camera_index.html";
        bsl.infinitus.transfer.openPageWithTitle("Demo/camera_index.html", "", "", "摄像头")
    });

    document.getElementById("btnDevice").addEventListener('click',function () {
        //window.location.href="device_index.html";
        bsl.infinitus.transfer.openPageWithTitle("Demo/device_index.html", "", "", "设备")
    });

    document.getElementById("btnDialog").addEventListener('click',function () {
        //window.location.href="dialog_index.html";
        bsl.infinitus.transfer.openPageWithTitle("Demo/dialog_index.html", "", "", "弹出对话框")
    });

    document.getElementById("btnBarcode").addEventListener('click',function () {
        //window.location.href="barcode_index.html";
        bsl.infinitus.transfer.openPageWithTitle("Demo/barcode_index.html", "", "", "Barcode")
    });

    document.getElementById("btnFile").addEventListener('click',function () {
        //window.location.href="fileindex.html";
        bsl.infinitus.transfer.openPageWithTitle("Demo/fileindex.html", "", "", "文件操作")
    });

    document.getElementById("btnInfinitus").addEventListener('click',function () {
        window.location.href="infinitus_index.html";
        //bsl.infinitus.transfer.openPageWithTitle("Demo/infinitus_index.html", "", "", "旧有infinitus接口")
    });

    document.getElementById("btnShare").addEventListener('click',function () {
        //window.location.href="share_index.html";
        bsl.infinitus.transfer.openPageWithTitle("Demo/share_index.html", "", "", "分享")
    });

    document.getElementById("btnMedia").addEventListener('click',function () {
        //window.location.href="media_index.html";
        bsl.infinitus.transfer.openPageWithTitle("Demo/media_index.html", "", "", "多媒体")
    });

    document.getElementById("btnGeolocation").addEventListener('click',function () {
        //window.location.href="geolocation_index.html";
        bsl.infinitus.transfer.openPageWithTitle("Demo/geolocation_index.html", "", "", "定位")
    });

    document.getElementById("btnGlobalization").addEventListener('click',function () {
        //window.location.href="globalization_index.html";
        bsl.infinitus.transfer.openPageWithTitle("Demo/globalization_index.html", "", "", "本地化")
    });

    document.getElementById("btnZip").addEventListener('click',function () {
        window.location.href="zip_index.html";
    });
        
    document.getElementById("btnContact").addEventListener('click',function () {
     bsl.infinitus.transfer.openPageWithTitle("Demo/contact_index.html", "", "", "本地化")
                                                           });
   document.getElementById("btnMessage").addEventListener('click',function () {
        bsl.infinitus.transfer.openPageWithTitle("Demo/message_index.html", "", "", "本地化")
    });

    document.getElementById("btnSqlite").addEventListener('click',function () {
        window.location.href="sqliteDemo_index.html";
        //bsl.infinitus.transfer.openPageWithTitle("Demo/sqliteDemo_index.html", "", "", "Sqlite Demo")
    });

    document.getElementById("btnBack").addEventListener('click',function () {
                                                            bsl.infinitus.transfer.returnBack(false,"returnBackCallback","");
                                                            });

    document.getElementById("btnPhotoBrowser").addEventListener('click',function () {
        window.location.href="photoBrowser_index.html";
    });


}

});
