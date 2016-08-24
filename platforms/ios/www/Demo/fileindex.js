/**
 * Created by kevin on 15/9/2.
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

        document.getElementById("btnBack").addEventListener('click',function () {
                                                            bsl.infinitus.transfer.returnBack(false,"returnBackCallback","");
                                                            });


        document.getElementById("btnDirectory").addEventListener('click',function () {
            //window.location.href="directoryentry_index.html";
            bsl.infinitus.transfer.openPageWithTitle("Demo/directoryentry_index.html", "", "", "目录")
        });

        document.getElementById("btnFileEntry").addEventListener('click',function () {
            //window.location.href="fileentry_index.html";
            bsl.infinitus.transfer.openPageWithTitle("Demo/fileentry_index.html", "", "", "文件File")
        });

        document.getElementById("btnFileWriter").addEventListener('click',function () {
            //window.location.href="filewriter_index.html";
            bsl.infinitus.transfer.openPageWithTitle("Demo/filewriter_index.html", "", "", "文件写入数据")
        });

        document.getElementById("btnFileReader").addEventListener('click',function () {
            //window.location.href="fileReader_index.html";
            bsl.infinitus.transfer.openPageWithTitle("Demo/fileReader_index.html", "", "", "文件读取数据")
        });

        document.getElementById("btnFilTransfer").addEventListener('click',function () {
            //window.location.href="filetransfer_index.html";
            bsl.infinitus.transfer.openPageWithTitle("Demo/filetransfer_index.html", "", "", "文件上传下载")
        });

    }
});

