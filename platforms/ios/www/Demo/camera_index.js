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


        //拍照
        function takePicture() {
            var cmr = bsl.camera.getCamera(2);
            //var cmr = bsl.camera.getCamera();
            cmr.captureImage(
                function(imageURI){
                    setTimeout(function() {
                        alert("image :" + imageURI);
                    }, 1);

                     var largeImage = document.getElementById('imgPicture');
                     largeImage.style.display = 'block';
                     largeImage.src = imageURI;
                },
                function(error){
                    alert("message:" + error.message);
                },
                {
                    format  : "png",
                    index   : 1,
                    popover : {
                        top: "100",
                        left: "10%",
                        width: "10%",
                        height:"100"
                    },
                    shouldSaveToPhotoAlbum: true,

                });
        }
        
        document.getElementById("btnBack").addEventListener('click',function () {
                                                            bsl.infinitus.transfer.returnBack(false,"returnBackCallback","");
                                                            });

        document.getElementById("btnTakePicture").addEventListener('click',function () {
            takePicture();
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


