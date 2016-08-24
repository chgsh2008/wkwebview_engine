/* global define */

define(['jroll'], function(JRoll) {
    //css3兼容变量
    var sty = document.createElement('div').style;
    var tSF = ("transform" in sty) ? "transform" : "-webkit-transform";
    var tSD = ("transitionDuration" in sty) ? "transition-duration" : "-webkit-transition-duration";

    //修改JRoll的回弹系数
    JRoll.prototype._compute = function (val, max) {
        var me = this;
        if (val > 0) {
            if (me.options.bounce && (val > 10)) {
                return Math.round(val / 3.5);
            } else {
                return 0;
            }
        }

        if (val < max) {
            if (me.options.bounce && (val < (max - 10))) {
                return Math.round(max + ((val - max) / 3.5));
            } else {
                return max;
            }
        }

        return val;
    };

    function refresh(jroll, callback) {

        if (jroll) {

            //获取下拉元素的div
            var div = jroll.wrapper.querySelector(".ui3-refresh");
            var loading, logo, text, timer;
            
            var clearTimer = function() {
                clearTimeout(timer);
                timer = null;
            };
            
            var doUpdate = function() {
                clearTimer();
                if (text.innerText === "松手立即刷新") {
                    text.innerText = "加载中...";
                    loading.classList.add("ui3-refresh-animate");
                    jroll.options.momentum = false;
                    jroll.options.bounce = false;
                    jroll.scroller.style[tSD] = "200ms";
                    jroll._scrollTo(0, div.offsetHeight);
                    div.style[tSD] = "200ms";
                    div.style[tSF] = "translateY(" + div.offsetHeight + "px)";

                    setTimeout(function() {
                        jroll.options.momentum = true;
                        jroll.options.bounce = true;
                        jroll.scroller.style[tSD] = "0ms";
                        div.style[tSD] = "0ms";

                        //执行刷新
                        callback();
                    }, 200);
                }
            };

            if (!div) {
                div = document.createElement("div");
                div.className = "ui3-refresh";
                div.innerHTML = '<div class="ui3-refresh-box">' +
                                    '<div class="ui3-refresh-logo ui3-icon-infinitus2">' +
                                        '<div class="ui3-refresh-loading"></div>' +
                                    '</div>' +
                                    '<div class="ui3-refresh-text">下拉刷新一下</div>' +
                                    '<div class="ui3-refresh-date">'+refresh.getHourMinute()+'</div>' +
                                '</div>';
                jroll.wrapper.appendChild(div);
            }

            loading = div.querySelector(".ui3-refresh-loading");
            logo = div.querySelector(".ui3-refresh-logo");
            text = div.querySelector(".ui3-refresh-text");

            jroll.on("scroll", function(e) {
                var o = (div.offsetHeight + this.y) / div.offsetHeight;
                var r = Math.abs(1 - o) * 360;

                div.style[tSF] = "translateY(" + this.y + "px)";
                if ((this.y > 0) && (this.y - div.offsetHeight > 0)) {
                    text.innerText = "松手立即刷新";
                } else {
                    text.innerText = "下拉刷新一下";
                }
                loading.style[tSF] = "rotateZ(" + r + "deg)";
                
                //非安卓设备当手指达到底部边缘时刷新，解决IOS从底部滑出手指无法刷新的bug
                if (e && (navigator.userAgent.indexOf("Android") === -1) && e.touches) {
                    if (e.touches[0].pageY >= window.innerHeight) {
                        if (!timer) {
                            timer = setTimeout(doUpdate, 500);
                        }
                    } else {
                        clearTimer();
                    }
                }
            });

            jroll.wrapper.addEventListener("touchend", function() {
                
                //开始刷新
                doUpdate();
            }, false);
        }
    }

    //刷新完成后必须执行的动作
    refresh.end = function(jroll, callback) {
        //获取下拉元素的div
        var div = jroll.wrapper.querySelector(".ui3-refresh");
        var loading = div.querySelector(".ui3-refresh-loading");
        var text = div.querySelector(".ui3-refresh-text");

        // text.innerText = "刷新完成";
        div.style[tSD] = "400ms";

        callback();

        setTimeout(function() {
            div.style[tSF] = "translateY(" + -div.offsetHeight + "px)";
            jroll.scrollTo(0, 0, 400);

            setTimeout(function() {
                loading.classList.remove("ui3-refresh-animate");
                div.style[tSD] = "0ms";
            }, 400);
        }, 400);
    };

    //返回时间格式为hh:mm
    refresh.getHourMinute = function() {
        var d = new Date();
        var time = "最后更新：" + d.getFullYear() + "-" + f(d.getMonth()+1) + "-" + f(d.getDate()) + " " + f(d.getHours()) + ":" + f(d.getMinutes());

        //不足两位在前面补0
        function f(n) {
            return n.toString().replace(/^(\d)$/, "0$1");
        }

        return time;
    };

    return refresh;
});
