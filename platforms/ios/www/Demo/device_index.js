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
        function getDeviceInfo() {
        var element = document.getElementById('deviceProperties');
        element.innerHTML = 'Device Model: ' + bsl.device.model + '<br />' +
        'Device Cordova: ' + bsl.device.cordova + '<br />' +
        'Device Platform: ' + bsl.device.platform + '<br />' +
        'Device UUID: ' + bsl.device.uuid + '<br />' +
        'Device Version: ' + bsl.device.version + '<br />';
        }
        
        document.getElementById("btnBack").addEventListener('click',function () {
                                                            bsl.infinitus.transfer.returnBack(false,"returnBackCallback","");
                                                            });
        
        
        document.getElementById("btnGetDevice").addEventListener('click',function () {
                                                                 getDeviceInfo();
                                                                 
                                                                 
                                                                 });
        //录像
        document.getElementById("btnVedio").addEventListener('click',function () {
                                                             var cmr = bsl.camera.getCamera();
                                                             cmr.startVideoCapture(
                                                                                   function(path){
                                                                                   alert(path);
                                                                                   },function(error){
                                                                                   alert(error.code + " " + error.message);
                                                                                   },{});
                                                             });
        
        
        
        
        }
        });

