/* global define */
"use strict";
define(['zepto'], function($) {

    var wrapEl, boxEl, titleEl, contentEl, buttonsEl;


    function dialog(options) {

        if (typeof options.callback === "function") {
            dialog.callback = options.callback;
        } else {
            dialog.callback = null;
        }

        dialog.init();
        dialog.setTitle(options.title);
        dialog.setContent(options.content);
        dialog.setButtons(options.buttons);
        dialog.show();
    }

    //初始化
    dialog.init = function() {

        if (!wrapEl) {
            //创建弹窗
            wrapEl = document.createElement("div");
            wrapEl.className = "overlay hidden ui3-dialog-wrap";
            boxEl = document.createElement("div");
            boxEl.className = "ui3-dialog-box";
            titleEl = document.createElement("div");
            titleEl.className = "ui3-dialog-title";
            contentEl = document.createElement("div");
            contentEl.className = "ui3-dialog-content";
            buttonsEl = document.createElement("div");
            buttonsEl.className = "ui3-dialog-buttons";

            boxEl.appendChild(titleEl);
            boxEl.appendChild(contentEl);
            boxEl.appendChild(buttonsEl);
            wrapEl.appendChild(boxEl);
            document.body.appendChild(wrapEl);

            //点击遮罩事件
            $(".ui3-dialog-wrap").tap(function(e) {
                if (e.target.className.indexOf("ui3-dialog-wrap") !== -1) {
                    dialog.hide();
                }
            });
            //点击按钮事件
            $(".ui3-dialog-buttons").tap(function(e) {
                var index = e.target.dataset.index;
                if (index && dialog.callback) {
                    dialog.callback(Number(index));
                }
            });
        }

    };

    //设置标题
    dialog.setTitle = function(t) {
        titleEl.innerHTML = t;

        //超过14个字符为多行文本
        if (t.length > 14) {
            titleEl.style.fontSize = ".3rem";
            titleEl.style.textAlign = "left";
        } else {
            titleEl.style.fontSize = ".34rem";
            titleEl.style.textAlign = "center";
        }
    };

    //设置内容
    dialog.setContent = function(c) {
        contentEl.innerHTML = c;

        //如果文本内容为空，删除padding
        if (c === "") {
            contentEl.style.padding = "0";
        } else {
            contentEl.style.padding = "0 .4rem .5rem";
        }
    };

    //设置按钮
    dialog.setButtons = function(b) {
        var bhtml = "",
            i = 0,
            l = b.length,
            k = "";

        function a(index, cls, value) {
            return '<div data-index="' + index + '" class="ui3-dialog-button ui3-btn-m ui3-btn-' + cls + '">' + value + '</div>';
        }

        switch (l) {
            case 1:
                bhtml = "<div data-index='0' class='ui3-btn-m ui3-btn-stroke' style='border:none;border-radius:0;border-bottom-left-radius:.16rem;border-bottom-right-radius:.16rem;'>" + b[0] + "</div>";
                buttonsEl.style.padding = "0";
                break;
            case 2:
                bhtml = a(0, 'normal', b[0]);
                bhtml += a(1, 'fill', b[1]);
                bhtml += '<div class="clear"></div>';
                buttonsEl.style.padding = ".3rem";
                break;
            default:
                for (i = 0; i < l; i++) {
                    if (i === 0) {
                        k = "border-bottom: 1px solid #dadada;";
                    } else if (i === l - 1) {
                        k = "border-bottom-left-radius:.16rem;border-bottom-right-radius:.16rem;border-top: 1px solid #fff;";
                    } else {
                        k = "border-bottom: 1px solid #dadada;border-top: 1px solid #fff;";
                    }
                    bhtml += "<div data-index='" + i + "' class='ui3-btn-m ui3-btn-stroke' style='border:none;border-radius:0;" + k + "'>" + b[i] + "</div>";
                }
                buttonsEl.style.padding = "0";

        }
        buttonsEl.innerHTML = bhtml;
    };

    dialog.show = function() {
        wrapEl.classList.remove("hidden");
    };

    dialog.hide = function() {
        wrapEl.classList.add("hidden");
    };

    return dialog;

});
