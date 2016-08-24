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

        
        
        //文件查看或者创建
        function createFile() {
            var showInfo=document.getElementById("LOG");
            var LOG="";
            var now = new Date();
            var nowStr = now.getFullYear() +"" +(now.getMonth()+1) +""+now.getDate() +""+now.getHours() +""+now.getMinutes() +""+now.getSeconds() +""+now.getMilliseconds();
            nowStr = "File"+nowStr+".txt";
            //成功获取系统目录回调
            var onFileSystemSuccess = function(fileSystem) {
                var directoryEntry = fileSystem.root;
                var createFileSuccessCallback = function(fileEntry){
                    LOG = LOG + "File Name: " + fileEntry.name + "</br>full Name: "+fileEntry.nativeURL;
                    showInfo.innerHTML=LOG;
                };
                //获取系统目录失败回调
                var createFileFailCallback = function(error){
                    alert("Failed to retrieve file: " + error.code);
                };
                //创建文件,
                directoryEntry.getFile(nowStr, {create: true, exclusive: false},createFileSuccessCallback,createFileFailCallback);
                //获取文件
                //directoryEntry.getFile("newFile20159217105968.txt", {create: false, exclusive: false},createFileSuccessCallback,createFileFailCallback);
            };
            var onFileSystemFail = function(error){
                alert("onFileSystemFail: "+evt.target.error.code);
            };
            bsl.io.requestFileSystem(LocalFileSystem.PERSISTENT, 0, onFileSystemSuccess, onFileSystemFail);

        }
        //文件查看或者创建
        document.getElementById("btnCreateFile").addEventListener('click',function () {
            createFile();
        });

        //目录查看或者创建
        document.getElementById("btnDirectory").addEventListener('click',function () {
            var showInfo=document.getElementById("LOG");
            var LOG="";
            var now = new Date();
            var nowStr = now.getFullYear() +"" +(now.getMonth()+1) +""+now.getDate() +""+now.getHours() +""+now.getMinutes() +""+now.getSeconds() +""+now.getMilliseconds();
            nowStr = "Directory"+nowStr+"";
            //成功获取系统目录回调
            var onFileSystemSuccess = function(fileSystem) {
                var directoryEntry = fileSystem.root;
                //成功创建目录回调
                var createFileSuccessCallback = function(fileEntry){
                    LOG = LOG + "File Name: " + fileEntry.name + "</br>full Name: "+fileEntry.nativeURL;
                    showInfo.innerHTML=LOG;
                };
                //创建目录失败回调
                var createFileFailCallback = function(error){
                    alert("Failed to retrieve file: " + error.code);
                };
                //创建目录,
                //directoryEntry.getDirectory(nowStr, {create: true, exclusive: false},createFileSuccessCallback,createFileFailCallback);
                //获取目录
                directoryEntry.getDirectory("Directory201596111149579", {create: false, exclusive: false},createFileSuccessCallback,createFileFailCallback);
            };
            //获取系统目录失败回调
            var onFileSystemFail = function(error){
                alert("onFileSystemFail: "+evt.target.error.code);
            };
            bsl.io.requestFileSystem(LocalFileSystem.PERSISTENT, 0, onFileSystemSuccess, onFileSystemFail);
        });

        //移动目录
        document.getElementById("btnMoveDirectory").addEventListener('click',function () {
            var showInfo=document.getElementById("LOG");
            var LOG="";
            var now = new Date();
            var nowStr = now.getFullYear() +"" +(now.getMonth()+1) +""+now.getDate() +""+now.getHours() +""+now.getMinutes() +""+now.getSeconds() +""+now.getMilliseconds();
            nowStr = "Directory"+nowStr+"";
            //成功获取系统目录回调
            var onFileSystemSuccess = function(fileSystem) {
                var srcDirectoryEntry = fileSystem.root;
                //成功定位目录回调
                var lookFileSuccessCallback = function(fileEntry) {
                    var directoryEntry = fileEntry;
                    //成功移动目录回调
                    var moveFileSuccessCallback = function(fileEntry){
                        LOG = LOG + "File Name: " + fileEntry.name + "</br>full Name: "+fileEntry.nativeURL;
                        showInfo.innerHTML=LOG;
                    };
                    //移动目录失败回调
                    var moveFileFailCallback = function(error){
                        alert("Move Failed to retrieve file: " + error.code);
                    };

                    var parent = "Directory2015969321828/Directory2015969383483",//document.getElementById('parent').value,
                        parentName = parent.substring(parent.lastIndexOf('/')+1),
                        newName = "NewFolder";
                    var parentEntry = new bsl.io.DirectoryEntry(parentName, parent,fileSystem, fileSystem.nativeURL);
                    alert("parentName: "+parentName +"/ parentEntry: "+parentEntry);
                    //移动目录
                    directoryEntry.moveTo(parentEntry, newName,moveFileSuccessCallback,moveFileFailCallback);
                };
                //定位目录失败回调
                var lookFileFailCallback = function(error){
                    alert("look Failed to retrieve file: " + error.code);
                };
                //定位到某目录
                srcDirectoryEntry.getDirectory("Directory2015969321572/Directory20159693734525/Directory2015969424430", {create: false, exclusive: false},lookFileSuccessCallback,lookFileFailCallback);
            };
            //获取系统目录失败回调
            var onFileSystemFail = function(error){
                alert("onFileSystemFail: "+evt.target.error.code);
            };
            bsl.io.requestFileSystem(LocalFileSystem.PERSISTENT, 0, onFileSystemSuccess, onFileSystemFail);
        });

        //复制目录
        document.getElementById("btnCopyDirectory").addEventListener('click',function () {
            var showInfo=document.getElementById("LOG");
            var LOG="";
            var now = new Date();
            var nowStr = now.getFullYear() +"" +(now.getMonth()+1) +""+now.getDate() +""+now.getHours() +""+now.getMinutes() +""+now.getSeconds() +""+now.getMilliseconds();
            nowStr = "Directory"+nowStr+"";
            //成功获取系统目录回调
            var onFileSystemSuccess = function(fileSystem) {
                var srcDirectoryEntry = fileSystem.root;
                //成功定位目录回调
                var lookFileSuccessCallback = function(fileEntry) {
                    var directoryEntry = fileEntry;
                    //成功复制目录回调
                    var copyFileSuccessCallback = function(fileEntry){
                        LOG = LOG + "File Name: " + fileEntry.name + "</br>full Name: "+fileEntry.nativeURL;
                        showInfo.innerHTML=LOG;
                    };
                    //复制目录失败回调
                    var copyFileFailCallback = function(error){
                        alert("Move Failed to retrieve file: " + error.code);
                    };

                    var parent = "Directory2015969321828/Directory2015969383483",//document.getElementById('parent').value,
                        parentName = parent.substring(parent.lastIndexOf('/')+1),
                        newName = "NewFolder";
                    var parentEntry = new bsl.io.DirectoryEntry(parentName, parent,fileSystem, fileSystem.nativeURL);
                    alert("parentName: "+parentName +"/ parentEntry: "+parentEntry);
                    //复制目录
                    directoryEntry.copyTo(parentEntry, newName,copyFileSuccessCallback,copyFileFailCallback);
                };
                //定位目录失败回调
                var lookFileFailCallback = function(error){
                    alert("look Failed to retrieve file: " + error.code);
                };
                //定位到某目录
                srcDirectoryEntry.getDirectory("Directory2015969321572/Directory20159693734525/Directory2015969424430", {create: false, exclusive: false},lookFileSuccessCallback,lookFileFailCallback);
            };
            //获取系统目录失败回调
            var onFileSystemFail = function(error){
                alert("onFileSystemFail: "+evt.target.error.code);
            };
            bsl.io.requestFileSystem(LocalFileSystem.PERSISTENT, 0, onFileSystemSuccess, onFileSystemFail);
        });

        document.getElementById("btnURLFile").addEventListener('click',function () {
            var onFileSystemSuccess = function(fileEntry) {
                var LOG="";
                var showInfo=document.getElementById("LOG");
                var dirURL = fileEntry.toURL();
                LOG = LOG + "File Name: " + fileEntry.name + "</br>full Name: "+fileEntry.nativeURL + "</br> URL:"+dirURL;
                showInfo.innerHTML=LOG;
            };
            var onFileSystemFail = function(error){
                alert("look Failed to retrieve file: " + error.code);
            };

            bsl.io.requestFileSystem(LocalFileSystem.PERSISTENT, 0, onFileSystemSuccess, onFileSystemFail);
        });

        //删除目录
        document.getElementById("btnRemoveDirectory").addEventListener('click',function () {
            var showInfo=document.getElementById("LOG");
            var LOG="";
            //成功获取系统目录回调
            var onFileSystemSuccess = function(fileSystem) {
                var srcDirectoryEntry = fileSystem.root;
                //成功定位目录回调
                var lookFileSuccessCallback = function(fileEntry) {
                    var directoryEntry = fileEntry;
                    //成功删除目录回调
                    var removeFileSuccessCallback = function(fileEntry){
                        LOG = LOG + "File Name: " + fileEntry.name + "</br>full Name: "+fileEntry.nativeURL;
                        showInfo.innerHTML=LOG;
                    };
                    //删除目录失败回调
                    var removeFileFailCallback = function(error){
                        alert("remove Failed to retrieve file: " + error.code);
                    };
                    directoryEntry.remove(removeFileSuccessCallback,removeFileFailCallback);
                };
                //定位目录失败回调
                var lookFileFailCallback = function(error){
                    alert("look Failed to retrieve file: " + error.code);
                };
                //定位到某目录
                srcDirectoryEntry.getDirectory("Directory2015969321572/Directory20159693734525/Directory2015969424430", {create: false, exclusive: false},lookFileSuccessCallback,lookFileFailCallback);
            };
            //获取系统目录失败回调
            var onFileSystemFail = function(error){
                alert("onFileSystemFail: "+evt.target.error.code);
            };
            bsl.io.requestFileSystem(LocalFileSystem.PERSISTENT, 0, onFileSystemSuccess, onFileSystemFail);
        });

        document.getElementById("btnParentDirectory").addEventListener('click',function () {
            var showInfo=document.getElementById("LOG");
            var LOG="";
            //成功获取系统目录回调
            var onFileSystemSuccess = function(fileSystem) {
                var srcDirectoryEntry = fileSystem.root;
                //成功定位目录回调
                var lookFileSuccessCallback = function(fileEntry) {
                    var directoryEntry = fileEntry;
                    //成功获取上层目录回调
                    var getParentDirFileSuccessCallback = function(fileEntry){
                        LOG = LOG + "File Name: " + fileEntry.name + "</br>full Name: "+fileEntry.nativeURL;
                        showInfo.innerHTML=LOG;
                    };
                    //获取上层目录失败回调
                    var getParentDirFileFailCallback = function(error){
                        alert("get parent directory Failed to retrieve file: " + error.code);
                    };
                    //获取父目录
                    directoryEntry.getParent(getParentDirFileSuccessCallback,getParentDirFileFailCallback);
                };
                //定位目录失败回调
                var lookFileFailCallback = function(error){
                    alert("look Failed to retrieve file: " + error.code);
                };
                //定位到某目录
                srcDirectoryEntry.getDirectory("Directory2015969321572/Directory20159693734525/Directory2015969624711", {create: false, exclusive: false},lookFileSuccessCallback,lookFileFailCallback);
            };
            //获取系统目录失败回调
            var onFileSystemFail = function(error){
                alert("onFileSystemFail: "+evt.target.error.code);
            };
            bsl.io.requestFileSystem(LocalFileSystem.PERSISTENT, 0, onFileSystemSuccess, onFileSystemFail);
        });

        document.getElementById("btnCreateReader").addEventListener('click',function () {
            var showInfo=document.getElementById("LOG");
            var LOG="";
            //成功获取系统目录回调
            var onFileSystemSuccess = function(fileSystem) {
                var srcDirectoryEntry = fileSystem.root;
                //成功定位目录回调
                var lookFileSuccessCallback = function(fileEntry) {
                    var directoryReader = fileEntry.createReader();
                    LOG = LOG + directoryReader;
                    showInfo.innerHTML=LOG;
                };
                //定位目录失败回调
                var lookFileFailCallback = function(error){
                    alert("look Failed to retrieve file: " + error.code);
                };
                //定位到某目录
                srcDirectoryEntry.getDirectory("Directory2015969321572/Directory20159693734525/Directory2015969624711", {create: false, exclusive: false},lookFileSuccessCallback,lookFileFailCallback);
            };
            //获取系统目录失败回调
            var onFileSystemFail = function(error){
                alert("onFileSystemFail: "+evt.target.error.code);
            };
            bsl.io.requestFileSystem(LocalFileSystem.PERSISTENT, 0, onFileSystemSuccess, onFileSystemFail);
        });

    }
});




