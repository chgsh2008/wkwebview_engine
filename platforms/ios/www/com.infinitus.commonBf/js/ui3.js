/* global define,document */
define(['bsl'], function(bsl) {

    var activeBtn = null;   //保存点中的按钮/开关
    var activeClass = "";   //保存点中的按钮/开关的class
    var isSwitch = false;
    var isButton = false;
    var isAddMinus = false;
    var isRadio = false;
    var isCheckbox = false;
    var isNetworkFail = false; //网络状态
    var startTime = 0;
    var map = {
        "on" : "off",
        "off": "on",
        "normal" : "fill",
        "stroke" : "fill",
        "fill"   : "press"
    };

    //判断是否是ui3的按钮
    function testUI3Btn(el) {
        var c = el.className;
        if (/ui3-btn/.test(c)) {
            activeBtn = el;
            activeClass = c;
            return true;
        }
        return false;
    }

    //判断是否是ui3的开关
    function testUI3Switch(el) {
        return /ui3-switch/.test(el.className);
    }

    //判断是否是加减器
    function testUI3AddMinus(el) {
        return /ui3-addminus-(add|minus)/.test(el.className) && !/ui3-disable/.test(el.className);
    }

    //判断是否是单选框
    function testUI3Radio(el) {
        return /ui3-radio/.test(el.className);
    }

    //判断是否是复选框
    function testUI3Checkbox(el) {
        return /ui3-checkbox/.test(el.className);
    }

    //替换css类
    function replaceClass(el) {
        var reg = /(ui3-btn-)(normal|stroke|fill)|(ui3-switch-)(on|off)/;
        el.className = el.className.replace(reg, function(match, a, b, c, d) {
            if (a) {
                return a + map[b];
            } else {
                el.dataset.value = map[d] === "off" ? 0 : 1;
                return c + map[d];
            }
        });
    }

    //复原UI3按钮
    function endButton() {
        if (activeBtn) {
            activeBtn.className = activeClass;
            activeBtn = null;
            activeClass = "";
            isButton = false;
        }
    }

    //复原UI3加减器
    function endAddMinus() {
        if (activeBtn) {
            isAddMinus = false;
            activeBtn.classList.remove("ui3-addminus-active");
        }
    }

    //结束开关
    function endSwitch() {
        if (activeBtn) {
            isSwitch = false;
            activeBtn = null;
        }
    }

    //结束单选框
    function endRadio() {
        if (activeBtn) {
            isRadio = false;
            activeBtn = null;
        }
    }

    //结束复选框
    function endCheckbox() {
        if (activeBtn) {
            isCheckbox = false;
            activeBtn = null;
        }
    }

    //touchStart
    function touchStart(e) {
        var el = e.target;
        if (testUI3Btn(el) && !isButton) {
            isButton = true;
            replaceClass(el);
        }
        if (testUI3Switch(el)) {
            isSwitch = true;
            activeBtn = el;
            startTime = new Date().getTime();
        }
        if (testUI3AddMinus(el)) {
            isAddMinus = true;
            activeBtn = el;
            el.classList.add("ui3-addminus-active");
            startTime = new Date().getTime();
        }
        if (testUI3Radio(el)) {
            isRadio = true;
            activeBtn = el;
            startTime = new Date().getTime();
        }
        if (testUI3Checkbox(el)) {
            isCheckbox = true;
            activeBtn = el;
            startTime = new Date().getTime();
        }
        if (el.id === "ui3_network_fail") {
            isNetworkFail = true;
        }
    }

    //touchMove
    function touchMove() {
        if (isButton) {
            endButton();
        }
        if (isSwitch) {
            endSwitch();
        }
        if (isAddMinus) {
            endAddMinus();
        }
        if (isRadio) {
            endRadio();
        }
        if (isCheckbox) {
            endCheckbox();
        }
        if (isNetworkFail) {
            isNetworkFail = false;
        }
    }

    //touchEnd
    function touchEnd() {
        var name;
        if (isButton) {
            endButton();
        }
        if (isSwitch && (new Date().getTime() - startTime < 300)) {
            replaceClass(activeBtn);
            if (activeBtn && activeBtn.ui3_instance) {
                activeBtn.ui3_instance.callback(activeBtn);
            }
            activeBtn = null;
            isSwitch = false;
        }
        if (isAddMinus) {
            if (activeBtn && activeBtn.parentNode.ui3_instance && (new Date().getTime() - startTime < 300)) {
                activeBtn.parentNode.ui3_instance.callback(activeBtn);
            }
            endAddMinus();
        }
        if (isRadio && (new Date().getTime() - startTime < 300)) {
            if (activeBtn && activeBtn.ui3_instance && !/ui3-radio-active/.test(activeBtn.className)) {
                name = activeBtn.getAttribute("name");
                var radio = document.querySelector(".ui3-radio-active[name='"+name+"']");
                if (radio) {
                    radio.ui3_instance.unSelected(radio);
                }
                activeBtn.ui3_instance.beSelected(activeBtn);
                activeBtn.ui3_instance.callback(activeBtn);
            }
            endRadio();
        }
        if (isCheckbox && (new Date().getTime() - startTime < 300)) {
            if (activeBtn && activeBtn.ui3_instance) {
                name = activeBtn.getAttribute("name");
                var checkboxs, arr = [];
                activeBtn.ui3_instance.toggle(activeBtn);
                checkboxs = document.querySelectorAll(".ui3-checkbox-active[name='"+name+"']");
                if (checkboxs) {
                    for (var i=0,l=checkboxs.length; i<l; i++) {
                        arr.push(checkboxs[i].dataset.value);
                    }
                    activeBtn.ui3_instance.callback(arr);
                }
            }
            endCheckbox();
        }
        if (isNetworkFail) {
            //兼容木有bsl的模块
            if ((typeof bsl === "object") && bsl.infinitus.tools.openSettingsURLString) {
                bsl.infinitus.tools.openSettingsURLString();
            } else if ((typeof tools === "object") && tools.openSettingsURLString) {
                tools.openSettingsURLString();
            }
            isNetworkFail = false;
        }
    }

    var UI3 = {

        timer: null,

        init : function() {
            //监听document，使用事件代理方式处理ui3按钮
            document.addEventListener("touchstart", touchStart, false);
            document.addEventListener("touchmove", touchMove, false);
            document.addEventListener("touchend", touchEnd, false);
            document.addEventListener("touchcancel", touchEnd, false);
        },

        //开关
        Switch: function(selector, options) {
            var el;

            //默认选项
            this.options = {
                "default" : 0 //默认值
            };

            el = typeof selector === "string" ? document.querySelector(selector) : selector;

            for (var i in options) {
                if (options.hasOwnProperty(i)) {
                    this.options[i] = options[i];
                }
            }

            el.classList.add("ui3-switch-" + (this.options.default === 0 ? "off" : "on"));
            el.dataset.value = this.options.default;
            el.ui3_instance = this;
        },

        //加减器
        AddMinus: function(selector, options) {
            var el, num, html, minstr, maxstr, valuestr;

            //默认选项
            this.options = {
                "default" : 0,  //默认值
                "min" : 0,      //最小值
                "max" : 99,     //最大值
                "step": 1      //步长，每次加值
            };

            el = typeof selector === "string" ? document.querySelector(selector) : selector;

            //获取默认值
            num = Number(el.innerText);
            if (!options.default && num) {
                options.default = num;
            }

            for (var i in options) {
                if (options.hasOwnProperty(i)) {
                    this.options[i] = options[i];
                }
            }

            el.classList.add("ui3-addminus");
            el.dataset.value = this.options.default;
            el.ui3_instance = this;

            function judgeValue(t) {
                return t ? ' ui3-disable' : '';
            }

            //判断是否最小值
            minstr = judgeValue(this.options.default === this.options.min);
            //判断是否最大值
            maxstr = judgeValue(this.options.default === this.options.max);
            //最大值和最小值相等
            valuestr = judgeValue(this.options.min === this.options.max);

            //jshint -W014
            html = '<div class="ui3-addminus-minus ui3-icon-minus'+minstr+'"></div>'
                 + '<div class="ui3-addminus-value'+valuestr+'">'+this.options.default+'</div>'
                 + '<div class="ui3-addminus-add ui3-icon-plus'+maxstr+'"></div>';
            //jshint +W014

            el.innerHTML = html;

        },

        //单选框
        Radio: function(selector, options) {
            var list, i, l;

            //默认选项
            this.options = {
                "default" : ""  //默认值
            };

            list = typeof selector === "string" ? document.querySelectorAll(selector) : selector;

            for (i in options) {
                if (options.hasOwnProperty(i)) {
                    this.options[i] = options[i];
                }
            }

            for (i=0,l=list.length; i<l; i++) {
                if (String(this.options.default) === String(list[i].dataset.value)) {
                    list[i].classList.add("ui3-radio-active");
                }
                list[i].classList.add("ui3-radio");
                list[i].ui3_instance = this;
            }

        },

        //复选框
        Checkbox: function(selector, options) {
            var list, o, i, l;

            //默认选项
            this.options = {
                "default" : null  //默认值
            };

            list = typeof selector === "string" ? document.querySelectorAll(selector) : selector;

            for (i in options) {
                if (options.hasOwnProperty(i)) {
                    this.options[i] = options[i];
                }
            }

            o = this.options.default;
            for (i=0,l=list.length; i<l; i++) {
                if (o instanceof Array) {
                    for (var j=0,k=o.length; j<k; j++) {
                        if (o[j] === list[i].dataset.value) {
                            list[i].classList.add("ui3-checkbox-active");
                            break;
                        }
                    }
                }
                list[i].classList.add("ui3-checkbox");
                list[i].ui3_instance = this;
            }
        },

        //显示网络请求失败
        showNetworkFail: function() {
            clearTimeout(UI3.timer);

            var div = document.getElementById("ui3_network_fail");
            if (!div) {
                div = document.createElement("div");
                div.id = "ui3_network_fail";
                div.className = "ui3-network-fail";
                div.innerHTML = '网络请求失败，请检查您的网络';
                document.body.appendChild(div);
            }
            div.classList.remove("hidden");
            UI3.timer = setTimeout(function() {
                div.classList.add("show");
            }, 10);
        },

        //隐藏网络请求失败
        hideNetworkFail: function() {
            clearTimeout(UI3.timer);

            var div = document.getElementById("ui3_network_fail");
            if (div) {
                div.classList.remove("show");
                UI3.timer = setTimeout(function() {
                    div.classList.add("hidden");
                }, 1000);
            }
        }

    };

    //开关原型链
    UI3.Switch.prototype = {
        //回调
        callback: function(e) {
            var value = !!Number(e.dataset.value);
            //执行自定义回调
            if (typeof this.options.callback === "function") {
                this.options.callback(value);
            }
        }
    };

    //加减器原型链
    UI3.AddMinus.prototype = {
        //回调
        callback: function(e) {
            var p = e.parentNode;
            var c1 = p.children[0];
            var c2 = p.children[2];
            var value = Number(p.dataset.value);

            if (/ui3-addminus-minus/.test(e.className)) {
                value = value - this.options.step;
                if (value <= this.options.min) {
                    value = this.options.min;
                    c1.classList.add("ui3-disable");
                } else {
                    c2.classList.remove("ui3-disable");
                }
            } else {
                value = value + this.options.step;
                if (value >= this.options.max) {
                    value = this.options.max;
                    c2.classList.add("ui3-disable");
                } else {
                    c1.classList.remove("ui3-disable");
                }
            }

            //赋值
            p.dataset.value = value;
            p.children[1].innerText = value;

            //执行自定义回调
            if (typeof this.options.callback === "function") {
                this.options.callback(value);
            }
        }
    };

    //单选框原型链
    UI3.Radio.prototype = {
        //去选
        unSelected: function(el) {
            el.classList.remove("ui3-radio-active");
        },
        //选中
        beSelected: function(el) {
            el.classList.add("ui3-radio-active");
        },
        //回调
        callback: function(e) {
            var value = String(e.dataset.value);
            //执行自定义回调
            if (typeof this.options.callback === "function") {
                this.options.callback(value);
            }
        }
    };

    //复选框原型链
    UI3.Checkbox.prototype = {
        //切换选中/去选状态
        toggle: function(el) {
            if (/ui3-checkbox-active/.test(el.className)) {
                el.classList.remove("ui3-checkbox-active");
            } else {
                el.classList.add("ui3-checkbox-active");
            }
        },
        //回调
        callback: function(value) {
            //执行自定义回调
            if (typeof this.options.callback === "function") {
                this.options.callback(value);
            }
        }
    };

    //初始化UI3.0
    UI3.init();

    window.UI3 = UI3;

    return UI3;

});
