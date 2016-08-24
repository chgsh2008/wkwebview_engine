/**
 * Created by kevin on 15/9/25.
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


        document.getElementById("btnBrowser").addEventListener('click',function () {
            var successCallback=function(data){

            };
            var failCallback = function(error){

            };
            bsl.photoBrw.photoBrowser(successCallback, failCallback,
                [["http://ww2.sinaimg.cn/thumbnail/98719e4agw1e5j49zmf21j20c80c8mxi.jpg",
                    "http://ww2.sinaimg.cn/thumbnail/642beb18gw1ep3629gfm0g206o050b2a.gif",
                    "http://ww2.sinaimg.cn/thumbnail/8e88b0c1gw1e9lpr2n1jjj20gy0o9tcc.jpg",
                    "http://ww2.sinaimg.cn/thumbnail/8e88b0c1gw1e9lpr39ht9j20gy0o6q74.jpg",
                    "http://ww3.sinaimg.cn/thumbnail/8e88b0c1gw1e9lpr3xvtlj20gy0obadv.jpg",
                    "file:///Users/kevin/Documents/GitHub/HZPhotoBrowser/HZPhotoBrowserDemo/HZPhotoBrowserDemo/Images/photo3l.jpg",
                    "http://ww2.sinaimg.cn/thumbnail/677febf5gw1erma104rhyj20k03dz16y.jpg",
                    "http://ww4.sinaimg.cn/thumbnail/677febf5gw1erma1g5xd0j20k0esa7wj.jpg"]
                ])

        });

        document.getElementById("btnBack").addEventListener('click',function () {
            bsl.infinitus.transfer.returnBack(false,"returnBackCallback","");
        });


    }
});