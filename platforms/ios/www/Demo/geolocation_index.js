/**
 * Created by kevin on 15/9/9.
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


        //初始化
        var watchID=null;
        function onGeolocationSuccess(position) {
            var element = document.getElementById('LOG');
            element.innerHTML = 'Latitude: '           + position.coords.latitude              + '<br />' +
                'Longitude: '          + position.coords.longitude             + '<br />' +
                'Altitude: '           + position.coords.altitude              + '<br />' +
                'Accuracy: '           + position.coords.accuracy              + '<br />' +
                'Altitude Accuracy: '  + position.coords.altitudeAccuracy      + '<br />' +
                'Heading: '            + position.coords.heading               + '<br />' +
                'Speed: '              + position.coords.speed                 + '<br />' +
                'Timestamp: '          + position.timestamp                    + '<br />';
        }
        function onGeolocationError(error) {
            alert('code: '    + error.code    + '\n' +
                'message: ' + error.message + '\n');
        }




        function onWatchSuccess(position) {
            var element = document.getElementById('LOG');
            element.innerHTML = 'Latitude: '  + position.coords.latitude      + '<br />' +
                'Longitude: ' + position.coords.longitude     + '<br />' +
                '<hr />'      + element.innerHTML;
        }

        function onWatchError(error) {
            alert('code: '    + error.code    + '\n' +
                'message: ' + error.message + '\n');
        }
        //取消监听
        function clearWatch() {
            if (watchID != null) {
                bsl.geolocation.clearWatch(watchID);
                alert('清除成功');
                watchID = null;
            }
        }

        document.getElementById("btnGetLocation").addEventListener('click',function () {
            //调用当前设备信息接口
            bsl.geolocation.getCurrentPosition(onGeolocationSuccess, onGeolocationError);
        });

        document.getElementById("btnWatchPosition").addEventListener('click',function () {
            //设置延迟为3秒
            var options = { frequency: 2000  };
            //调用监听位置变化接口
            watchID = bsl.geolocation.watchPosition(onWatchSuccess, onWatchError, options);
        });

        document.getElementById("btnClearWatch").addEventListener('click',function () {
            clearWatch();
        });




    }
});

