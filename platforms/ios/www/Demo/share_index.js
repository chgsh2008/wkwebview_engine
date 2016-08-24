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


        var option = {"title":"分享标题",
            "image":"http://gb.cri.cn/mmsource/images/2015/04/03/6/13408114972508190950.jpg",
            "link":"https://www.baidu.com/"};
        document.getElementById("btnShareToWXSession").addEventListener('click',function () {
            var showInfo=document.getElementById("LOG");
            var LOG="";
            bsl.share.shareToWeixinSession(function(data){
                LOG = "share to WeiXin Session success: "+data;
                showInfo.innerHTML = LOG;
            },function(error){
                LOG = "share to WeiXin Session fail: "+error;
                showInfo.innerHTML = LOG;
            },option);
        });

        document.getElementById("btnShareToWXTimeline").addEventListener('click',function () {
            var showInfo=document.getElementById("LOG");
            var LOG="";
            bsl.share.shareToWeixinTimeline(function(data){
                LOG = "share to WeiXin Timeline success: "+data;
                showInfo.innerHTML = LOG;
            },function(error){
                LOG = "share to WeiXin Timeline fail: "+error;
                showInfo.innerHTML = LOG;
            },option);
        });

        document.getElementById("btnShareToQQFriends").addEventListener('click',function () {
            var showInfo=document.getElementById("LOG");
            var LOG="";
            bsl.share.shareToQQFriends(function(data){
                LOG = "share success: "+data;
                showInfo.innerHTML = LOG;
            },function(error){
                LOG = "share fail: "+error;
                showInfo.innerHTML = LOG;
            },option);
        });

        document.getElementById("btnShareToQQZone").addEventListener('click',function () {
            var showInfo=document.getElementById("LOG");
            var LOG="";
            bsl.share.shareToQQZone(function(data){
                LOG = "share success: "+data;
                showInfo.innerHTML = LOG;
            },function(error){
                LOG = "share fail: "+error;
                showInfo.innerHTML = LOG;
            },option);
        });

        document.getElementById("btnShareToSina").addEventListener('click',function () {
            var showInfo=document.getElementById("LOG");
            var LOG="";
            bsl.share.shareToSina(function(data){
                LOG = "share success: "+data;
                showInfo.innerHTML = LOG;
            },function(error){
                LOG = "share fail: "+error;
                showInfo.innerHTML = LOG;
            },option);
        });

    }
});