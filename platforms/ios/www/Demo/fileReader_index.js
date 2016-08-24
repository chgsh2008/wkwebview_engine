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


        //创建文件
        document.getElementById("btnCreateFile").addEventListener('click',function () {
            var showInfo=document.getElementById("LOG");
            var LOG="";
            var now = new Date();
            var nowStr = now.getFullYear() +"" +(now.getMonth()+1) +""+now.getDate() +""+now.getHours() +""+now.getMinutes() +""+now.getSeconds() +""+now.getMilliseconds();
            nowStr = "File"+nowStr+".txt";
            //成功获取系统目录回调
            var onFileSystemSuccess = function(fileSystem) {
                var directoryEntry = fileSystem.root;
                //成功创建文件回调
                var createFileSuccessCallback = function(fileEntry){
                    //get file success callback
                    var onFileSuccess = function(file){
                        LOG = LOG + "File Name: " + file.name + "</br>file size:"+file.size;
                        showInfo.innerHTML=LOG;
                    };
                    //get file failed callback
                    var onFileFail = function(error){
                        alert("Failed to get file: " + error.code);
                    };
                    fileEntry.file(onFileSuccess, onFileFail);
                };
                //创建文件失败回调
                var createFileFailCallback = function(error){
                    alert("Failed to retrieve file: " + error.code);
                };
                //创建文件,
                directoryEntry.getFile(nowStr, {create: true, exclusive: false},createFileSuccessCallback,createFileFailCallback);
                //获取文件
                //directoryEntry.getFile("newFile20159217105968.txt", {create: false, exclusive: false},createFileSuccessCallback,createFileFailCallback);
            };
            //获取系统目录失败回调
            var onFileSystemFail = function(error){
                alert("onFileSystemFail: "+evt.target.error.code);
            };
            bsl.io.requestFileSystem(LocalFileSystem.PERSISTENT, 0, onFileSystemSuccess, onFileSystemFail);
        });

        //写入文件
        document.getElementById("btnWriteData").addEventListener('click',function () {
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
                            writer.onwrite = function(evt) {
                                showInfo.innerHTML="写入文件成功";
                            };
                            writer.write("Some text to the file");
                            //showInfo.innerHTML="写入文件成功";
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

        //读取文件内容
        document.getElementById("btnReadAsText").addEventListener('click',function () {
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
                        var reader = new bsl.io.FileReader();
                        reader.onloadend = function(evt){
                            LOG = "Read success: " + evt.target.result;
                            showInfo.innerHTML= LOG;
                        };
                        reader.readAsText(fileEntry);
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

        //Truncate截取部分内容
        document.getElementById("btnTruncate").addEventListener('click',function () {
            writeSeekTruncate();
        });

    }
});


