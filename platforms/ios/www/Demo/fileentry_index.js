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


        //get文件
        document.getElementById("btnFile").addEventListener('click',function () {
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
                        LOG = LOG + "File Name: " + file.name + "</br>file size:"+file.size();
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

        //移动文件
        document.getElementById("btnMoveFile").addEventListener('click',function () {
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
                        //成功移动文件回调
                        var moveFileSuccessCallback = function(fileEntry){
                            LOG = LOG + "File Name: " + fileEntry.name + "</br>full Name: "+fileEntry.nativeURL;
                            showInfo.innerHTML=LOG;
                        };
                        //移动文件失败回调
                        var moveFileFailCallback = function(error){
                            alert("Move Failed to retrieve file: " + error.code);
                        };

                        var parent = "Directory2015969321828/Directory2015969383483",//document.getElementById('parent').value,
                            parentName = parent.substring(parent.lastIndexOf('/')+1);
                        var parentEntry = new bsl.io.DirectoryEntry(parentName, parent,fileSystem, fileSystem.nativeURL);
                        //移动文件
                        fileEntry.moveTo(parentEntry, "NewFile20159715105968.txt",moveFileSuccessCallback,moveFileFailCallback);
                    };
                    //获取文件失败回调
                    var getFileFailCallback = function(error){
                        alert("getFileFailCallback: "+error.code);
                    };
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

        //复制文件
        document.getElementById("btnCopyFile").addEventListener('click',function () {
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
                        //复制文件失败回调
                        var copyFileSuccessCallback = function(fileEntry){
                            LOG = LOG + "File Name: " + fileEntry.name + "</br>full Name: "+fileEntry.nativeURL;
                            showInfo.innerHTML=LOG;
                        };
                        //复制文件失败回调
                        var copyFileFailCallback = function(error){
                            alert("Move Failed to retrieve file: " + error.code);
                        };

                        var parent = "Directory2015969321828/Directory2015969383483",//document.getElementById('parent').value,
                            parentName = parent.substring(parent.lastIndexOf('/')+1);
                        var parentEntry = new bsl.io.DirectoryEntry(parentName, parent,fileSystem, fileSystem.nativeURL);
                        //复制文件
                        fileEntry.copy(parentEntry, "NewFile20159715105968.txt",copyFileSuccessCallback,copyFileFailCallback);
                    };
                    //获取文件失败回调
                    var getFileFailCallback = function(error){
                        alert("getFileFailCallback: "+error);
                    };
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

        //把文件UR返回
        document.getElementById("btnURLFile").addEventListener('click',function () {
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
                        var fileURL = fileEntry.toURL();
                        LOG = LOG + fileURL;
                        showInfo.innerHTML=LOG;
                    };
                    //获取文件失败回调
                    var getFileFailCallback = function(error){
                        alert("getFileFailCallback: "+error);
                    };
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

        //删除文件
        document.getElementById("btnRemoveFile").addEventListener('click',function () {
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
                        //成功删除文件回调
                        var removeFileSuccessCallback = function(entry){
                            LOG = LOG + "删除成功...";
                            showInfo.innerHTML=LOG;
                        };
                        //删除文件失败回调
                        var removeFileFailCallback = function(error){
                            alert("删除失败: "+error.code);
                        };
                        var fileURL = fileEntry.remove(removeFileSuccessCallback, removeFileFailCallback);
                    };
                    //获取文件失败回调
                    var getFileFailCallback = function(error){
                        alert("getFileFailCallback: "+error);
                    };
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

        //获取文件的上层目录
        document.getElementById("btnParentDirectory").addEventListener('click',function () {
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
                        //成功返回上层目录回调
                        var getParentFileSuccessCallback = function(entry){
                            LOG = LOG + "Parent Name: " + entry.name;
                            showInfo.innerHTML=LOG;
                        };
                        //返回上层目录失败回调
                        var getParentFileFailCallback = function(error){
                            alert("返回上层目录失败: "+error.code);
                        };
                        //获取上层目录
                        var fileURL = fileEntry.getParent(getParentFileSuccessCallback, getParentFileFailCallback);
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

        //创建文件的writer对象
        document.getElementById("btnCreateWriter").addEventListener('click',function () {
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
                            writer.write("Some text to the file");
                            showInfo.innerHTML="写入文件成功";
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


