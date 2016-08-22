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

        //document.getElementById("btnBack").addEventListener('click',function () {
        //    window.history.back(-1);
        //});


        //获取设备信息
        function showDialog_Alert() {
            //alert("before show dialog alert");
            bsl.dialog.alert("text message",function(){
                alert("dialog alert callback");
            },"title","OK");
        }
        document.getElementById("btnBack").addEventListener('click',function () {
                                                            bsl.infinitus.transfer.returnBack(false,"returnBackCallback","");
                                                            });

        
        document.getElementById("btnAlert").addEventListener('click',function () {
            showDialog_Alert();
        });

        document.getElementById("btnConfirm").addEventListener('click',function () {
            bsl.dialog.confirm("text message",function(){
                alert("dialog confirm callback");
            },"title",["OK","Cancel"]);
        });

        document.getElementById("btnPrompt").addEventListener('click',function () {
            bsl.dialog.prompt("text message",function(){
                alert("dialog prompt callback");
            },"title",["OK","Cancel"],"My text");
        });

        document.getElementById("btnBeep").addEventListener('click',function () {
            alert("before beep");
            bsl.dialog.beep(30);
        });


    }
});

