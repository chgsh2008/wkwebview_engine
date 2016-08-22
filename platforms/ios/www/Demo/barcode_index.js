
require.config({
    baseUrl: '../',
    paths: {
        bsl: 'bsl',
    }
});
require(['bsl'],function(bsl) {
    document.addEventListener('deviceready', onDeviceready, false);
    function onDeviceready() {

        //document.getElementById("btnBack").addEventListener('click',function () {
        //    window.history.back(-1);
        //});

        document.getElementById("btnScan").addEventListener('click',function () {
            bsl.barcode.scan(function(result){
                alert("获取到一只野生的二维码\n" +
                    "扫描结果: " + result.text + "\n" +
                    "编码类型: " + result.format + "\n" +
                    "能否回调: " + result.cancelled);
            },function(error){
                alert("Scanning failed: " + error);
            },"");
        });
        document.getElementById("btnBack").addEventListener('click',function () {
                                                            bsl.infinitus.transfer.returnBack(false,"returnBackCallback","");
                                                            });

        document.getElementById("btnEncode").addEventListener('click',function () {

        });




    }
});
