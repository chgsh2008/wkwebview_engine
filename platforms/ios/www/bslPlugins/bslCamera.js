define([],function(){
    var cmr = {
        description: "访问摄像头设备",
        cameraDirection: Camera.Direction.BACK,//前置or后置摄像
        supportedImageResolutions: navigator.device.capture.supportedImageModes,//拍照分辨率，ios下空数组
        supportedVideoResolutions: navigator.device.capture.supportedVideoModes,//摄像分辨率，ios下空数组
        supportedImageFormats: navigator.device.capture.supportedImageModes,//拍照文件格式，ios下空数组
        supportedVideoFormats: navigator.device.capture.supportedVideoModes,//摄像文件格式，ios下空数组
        shouldSaveToPhotoAlbum:false,//是否保存至相册
//        pathForCopy:null,//图像临时保存的文件名，可以是路径

        //获取bslCamera对象
        getCamera: function(index){
        	var me = this;
            me.cameraDirection = (index == 2) ? Camera.Direction.FRONT : Camera.Direction.BACK;
        	
            return me;
        },

        initialize: function(){
        	var me = this;
            me.cameraDirection = Camera.Direction.BACK;
            supportedImageResolutions = navigator.device.capture.supportedImageModes;
            supportedVideoResolutions = navigator.device.capture.supportedVideoModes;
            supportedImageFormats = navigator.device.capture.supportedImageModes;
            supportedVideoFormats = navigator.device.capture.supportedVideoModes;

        },

        //录像函数
        startVideoCapture:function(successCB, errorCB, option){
            navigator.device.capture.captureVideo(cameraSuccess, cameraError, option);

            function cameraSuccess(mediaFiles){
              var i, path, len;
              for (i = 0, len = mediaFiles.length; i < len; i += 1){
                  path = mediaFiles[i].fullPath;
              }
              successCB(path);
            }

            function cameraError(error){
                var result = error;
                if (result.code == CaptureError.CAPTURE_INTERNAL_ERR) {
                    result.message = "The camera or microphone failed to capture image or sound.";
                }

                else if (result.code == CaptureError.CAPTURE_APPLICATION_BUSY){
                    result.message = "The camera or audio capture application is currently serving another capture request.";
                }

                else if (result.code == CaptureError.CAPTURE_INVALID_ARGUMENT){
                    result.message = "Invalid use of the API (e.g., the value of limit is less than one).";
                }

                else if (result.code == CaptureError.CAPTURE_NO_MEDIA_FILES){
                    result.message = " The user exits the camera or audio capture application before capturing anything.";
                }

                else if (result.code == CaptureError.CAPTURE_NOT_SUPPORTED){
                    result.message = "The requested capture operation is not supported.";
                }

                errorCB(result);
            }
        },

        //拍照函数
        captureImage: function(successCB, errorCB, option){
            var me = this;
            var op = me.initOption(option);//初始化拍照参数

            navigator.camera.getPicture(cameraSuccess,cameraError,op);

            //拍照成功回调
            function cameraSuccess(imageURI) {
                 successCB(imageURI);
            }
          
            //拍照失败回调
            function cameraError(message) {
                var error = new Object();
                error.message = message;
                errorCB(error);
            }

        },

        //区别出%和px的坐标
        convertPopover:function(obj,isHorizontal){
            var result = obj;
            var index;
            if ((index = obj.indexOf("px")) >= 0){
                result = obj.substring(0,index);
            }

            else if ((index = obj.indexOf("%"))>= 0){
                result = obj.substring(0,index); 
                var length = (isHorizontal) ? 768 : 1024;
                result = length * result/100.0;
            }

            return result;
        },

        //初始化拍照参数
        initOption: function(sourceOption){
            var me = this;

            var formatValue = Camera.EncodingType.JPEG;
            var popoverValue;
            
            for (var key in sourceOption){

                if (key == "filename") {
//                    me.pathForCopy = sourceOption[key];
                };

                if (key == "format"){
                    var temp = sourceOption[key];
                    formatValue = (temp == "png") ? Camera.EncodingType.PNG : Camera.EncodingType.JPEG;
                }

                if (key == "index") {
                    var indexValue = sourceOption[key];
                    me.cameraDirection = (indexValue == 2) ? Camera.Direction.FRONT : Camera.Direction.BACK;
                } 

                if (key == "popover"){
                    var popover = sourceOption[key];
                    if (popover) {
                        var top = me.convertPopover(popover["top"],false);
                        var left = me.convertPopover(popover["left"],true);
                        var w = me.convertPopover(popover["width"],true);
                        var h = me.convertPopover(popover["height"],false);

                        popoverValue = { 
                              x : left,
                              y :  top,
                              width : w,
                              height : h,
                              arrowDir : Camera.PopoverArrowDirection.ARROW_ANY
                        };
                    } 
                }

                if (key == "shouldSaveToPhotoAlbum"){
                    me.shouldSaveToPhotoAlbum = sourceOption[key];
                }                
            }

            var op = {
                quality : 50,//文档建议ios下quality < 50
                destinationType : Camera.DestinationType.FILE_URIs,
                sourceType : Camera.PictureSourceType.CAMERA,
                // allowEdit : true,
                encodingType: formatValue,
                // targetWidth: 100,
                // targetHeight: 100,
                popoverOptions: popoverValue,
                saveToPhotoAlbum: me.shouldSaveToPhotoAlbum,
                cameraDirection: me.cameraDirection
            };
            return op;
        }
       
    };
       return cmr;
});
