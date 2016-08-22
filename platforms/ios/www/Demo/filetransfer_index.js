/**
 * Created by kevin on 15/9/7.
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


        /**
         * 上传图片
         * @param imageURI 本地图片路径
         */
        function uploadPhoto(imageURI) {
            var options = new bsl.io.FileUploadOptions();
            options.fileKey="file";
            options.fileName=imageURI.substr(imageURI.lastIndexOf('/')+1);
            options.mimeType="image/jpeg";

            var params = {};
            params.value1 = "test";
            params.value2 = "param";

            options.params = params;

            var ft = new bsl.io.FileTransfer();
            ft.upload(imageURI, encodeURI("http://some.server.com/upload.php"), uploadSuccessCallback, uploadFailCallback, options);
        }

        /**
         * 上传图片成功
         * @param r
         */
        function uploadSuccessCallback(r) {
            var showInfo=document.getElementById("LOG");
            var LOG="";
            LOG += "Code = " + r.responseCode;
            LOG += "</br>Response = " + r.response;
            LOG += "</br>Sent = " + r.bytesSent;

            console.log(LOG);
            showInfo.innerHTML = LOG;
        }

        /**
         * 上传图片失败
         * @param error
         */
        function uploadFailCallback(error) {
            alert("An error has occurred: Code = " + error.code);
            console.log("upload error source " + error.source);
            console.log("upload error target " + error.target);
        }

        //上传文件
        document.getElementById("btnUploadFile").addEventListener('click',function () {
            // Retrieve image file location from specified source
            navigator.camera.getPicture(
                uploadPhoto,
                function(message) { alert('get picture failed'); },
                {
                    quality         : 50,
                    destinationType : navigator.camera.DestinationType.FILE_URI,
                    sourceType      : navigator.camera.PictureSourceType.PHOTOLIBRARY
                }
            );
        });

        //下载文件
        document.getElementById("btnDownloadFile").addEventListener('click',function () {
            var showInfo=document.getElementById("LOG");
            var LOG="";
            var now = new Date();
            var nowStr = now.getFullYear() +"" +(now.getMonth()+1) +""+now.getDate() +""+now.getHours() +""+now.getMinutes() +""+now.getSeconds() +""+now.getMilliseconds();
            nowStr = "Directory"+nowStr+"";
            //成功获取系统目录回调
            var onFileSystemSuccess = function(fileSystem) {
                var srcDirectoryEntry = fileSystem.root;
                //成功定位目录回调
                var lookFileSuccessCallback = function(dirEntry) {
                    var directoryEntry = dirEntry;
                    var fileTransfer = new bsl.io.FileTransfer();
                    var uri = encodeURI("http://some.server.com/download.php");
                    var filePath = directoryEntry.nativeURL;
                    fileTransfer.download(
                        uri,
                        filePath,
                        function(entry) {
                            LOG += "download complete: " + entry.fullPath;
                            console.log(LOG);
                            showInfo.innerHTML = LOG;
                        },
                        function(error) {
                            LOG += "download error source " + error.source;
                            LOG += "</br>download error target " + error.target;
                            LOG += "</br>upload error code" + error.code;
                            console.log(LOG);
                            showInfo.innerHTML = LOG;
                        },
                        false,
                        {
                            headers: {
                                "Authorization": "Basic dGVzdHVzZXJuYW1lOnRlc3RwYXNzd29yZA=="
                            }
                        }
                    );
                };
                //定位目录失败回调
                var lookFileFailCallback = function(error){
                    alert("look Failed to retrieve file: " + error.code);
                };
                //定位到某目录
                srcDirectoryEntry.getDirectory("Directory2015969321572", {create: false, exclusive: false},lookFileSuccessCallback,lookFileFailCallback);
            };
            //获取系统目录失败回调
            var onFileSystemFail = function(error){
                alert("onFileSystemFail: "+evt.target.error.code);
            };
            bsl.io.requestFileSystem(LocalFileSystem.PERSISTENT, 0, onFileSystemSuccess, onFileSystemFail);
        });

        //正在写入文件时Abort
        document.getElementById("btnAbort").addEventListener('click',function () {
            var showInfo=document.getElementById("LOG");
            var LOG="";
            var now = new Date();
            var nowStr = now.getFullYear() +"" +(now.getMonth()+1) +""+now.getDate() +""+now.getHours() +""+now.getMinutes() +""+now.getSeconds() +""+now.getMilliseconds();
            nowStr = "Directory"+nowStr+"";
            //成功获取系统目录回调
            var onFileSystemSuccess = function(fileSystem) {
                var srcDirectoryEntry = fileSystem.root;
                //成功定位目录回调
                var lookFileSuccessCallback = function(dirEntry) {
                    var directoryEntry = dirEntry;
                    //成功获取文件回调
                    var getFileSuccessCallback = function(fileEntry){
                        //成功创建FileWriter回调
                        var createWriterFileSuccessCallback = function(writer){
                            //成功写入文件内容事件
                            writer.onwrite = function(evt) {
                                showInfo.innerHTML="写入文件成功";
                            };
                            writer.write("Some text to the file");
                            writer.abort();
                        };
                        //创建FileWriter 失败回调
                        var createWriterFileFailCallback = function(error){
                            alert("获取FileWriter失败: "+error.code);
                        };
                        //创建FileWriter
                        fileEntry.createWriter(createWriterFileSuccessCallback, createWriterFileFailCallback);
                    };
                    //获取文件失败回调
                    var getFileFailCallback = function(error){
                        alert("getFileFailCallback: "+error);
                    };
                    //定位到某文件
                    directoryEntry.getFile("File20159217105968.txt", {create: false, exclusive: false},getFileSuccessCallback,getFileFailCallback);
                };
                //定位目录失败回调
                var lookFileFailCallback = function(error){
                    alert("look Failed to retrieve file: " + error.code);
                };
                //定位到某目录
                srcDirectoryEntry.getDirectory("Directory2015969321572", {create: false, exclusive: false},lookFileSuccessCallback,lookFileFailCallback);
            };
            //获取系统目录失败回调
            var onFileSystemFail = function(error){
                alert("onFileSystemFail: "+evt.target.error.code);
            };
            bsl.io.requestFileSystem(LocalFileSystem.PERSISTENT, 0, onFileSystemSuccess, onFileSystemFail);
        });


    }
});

