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

        var audio;
        var isRecord = false;
        var isPlay = false;

        alert("init Audio")
        var src = "myrecording.mp3";
        if (window.device.platform.toLowerCase().indexOf("ios") > -1) {
            src = "myrecording.wav";

        }

        function originalrecord() {
            if (isRecord) {
                alert("audio is record")
                return;
            }
            if (isPlay) {
                alert("audio is play")
                return;

            }


            audio = new bsl.audio(src,
                // success callback
                function() {
                    alert("recordAudio():Audio Success");
                },

                // error callback
                function(err) {
                    alert("recordAudio():Audio Error: " + err.code);
                });

            // Record audio
            audio.startRecord();
            isRecord = true;

        }

        function stoprecord() {
            audio.stopRecord();
            isRecord = false;
        }




        function paly() {
            if (isPlay) {
                alret("正在播放~~");
                return;
            }
            audio = new bsl.audio(src,
                // success callback
                function() {
                    console.log("playAudio():Audio Success");
                },
                // error callback
                function(err) {
                    console.log("playAudio():Audio Error: " + err);
                });
            // Play audio
            audio.play();
            alert("开始播放录音~~" + src);
            isPlay = true;
        }

        function stoppaly() {
            audio.stop();
            isPlay = false;
        }

        function pause() {
            alert("暂停播放录音~~");
            audio.pause()
            isPlay = false;
        }

        function getDuration() {
            var duration = audio.getDuration();
            if (duration > 0) {
                alert(audio.getDuration() + "s");
            } else {
                alert("没有播放录音~~");
            }

        }

        function getPosition() {
            // 获取媒体播放到的位置
            audio.getCurrentPosition(
                // 获取成功后调用的回调函数
                function(position) {
                    if (position > 0) {
                        alert(position + "s");
                    } else {
                        alert("没有播放录音~~");
                    }
                },
                // 发生错误后调用的回调函数
                function(e) {
                    console.log("Error getting pos=" + e);
                }
            );

        }

        document.getElementById("btnRecord").addEventListener("click", originalrecord, false);
        document.getElementById("btnStopRecord").addEventListener("click", stoprecord, false);
        document.getElementById("btnPlay").addEventListener("click", paly, false);
        document.getElementById("btnStopPlay").addEventListener("click", stoppaly, false);
        document.getElementById("btnPause").addEventListener("click", pause, false);
        document.getElementById("btnGetDuration").addEventListener("click", getDuration, false);
        document.getElementById("btnGetPosition").addEventListener("click", getPosition, false);
        document.getElementById("btnBack").addEventListener('click',function () {
                                                            bsl.infinitus.transfer.returnBack(false,"returnBackCallback","");
                                                            });


    }
});
