/*global define,console*/
define(['zepto', 'init', 'util', 'bsl', './config'], function($, init, Util, bsl, config) {

    var tempId, tempCallback, common, readyInit = false;

    //创建__localDataBase全局对象
    if (!window.__localDataBase) {
        window.__localDataBase = {};
    }

    // function resetValueType(value, elmType, valueType) {
    //     console.log(value, elmType, valueType)
    //     if (elmType == 'input' || elmType == 'button' && valueType != '') {
    //         valueType = valueType.trim().toLowerCase();
    //         switch (valueType) {
    //             case 'number':
    //                 value = Number(value);
    //                 break;
    //             case 'boolean':
    //                 {
    //                     if (value == 'true') { // 布尔值
    //                         value = true;
    //                     } else { // 布尔值
    //                         value = false;
    //                     }
    //                     break;
    //                 }
    //             default:
    //                 break;
    //         }
    //     } else {
    //         value = autoResetValueType(value);
    //     }
    //     return value;
    // }

    function resetValueType(value, exceptedValueType) {
        if(value===undefined){
            value="";
        }
        value = value.trim();
        if (exceptedValueType && exceptedValueType.trim().toLowerCase() === 'json') {
            // 尝试转换成JSON对象
            try {
                value = JSON.parse(value.replace(/'/g, '"'));
            } catch (err) {
                bsl.infinitus.tools.showToast('JSON解析错误');
                value = {};
            }
        } else {
            if (value == 'true') { // 布尔值
                value = true;
            } else if (value == 'false') { // 布尔值
                value = false;
            } else if (/^\d+$/.test(value)) { // 数值
                value = Number(value);
            } else {}
        }
        return value;
    }

    common = {

        fnParams: {},

        init: function() {

            if (!readyInit) {

                //获取初始化字体大小
                init.getStyle();
                readyInit = true;

                //如果点击的不是表单元素，收回软键盘
                document.addEventListener("touchstart", function(e) {
                    var tag = e.target.tagName;
                    var act = document.activeElement;
                    if ((act.tagName === "INPUT" || act.tagName === "TEXTAREA") && tag !== "INPUT" && tag !== "TEXTAREA") {
                        act.blur();
                    }
                }, false);

                //监听安卓返回键，执行当前活动页面的goBack方法
                if (typeof bsl.infinitus.tools.setBackAction === "function") {
                    bsl.infinitus.tools.setBackAction(function() {
                        common.goBack();
                    });
                }

            }

        },

        initFnParams: function() {
            common.fnParams = {};
            var pageId = butterfly.rootView.views[butterfly.rootView.views.length - 1].view.id;
            var $page = $('#' + pageId);
            $page.find('.configWrap dt').each(function(index, el) {
                var key = $(el).text();
                var $valueElm = $(el).next();
                var value, elmType;
                var valueType = $valueElm.data('valuetype') || '';
                // 按钮组
                if ($valueElm.hasClass('buttons-row')) {
	                var checkedFlag = false;
	                $valueElm.children().each(function(){
		                if($(this).hasClass("active")){
			                checkedFlag = true;
			                value = $(this).text();
		                }
	                })
                    if(!checkedFlag)
	                    value = $valueElm.children().eq(0).addClass('active').text();

                    elmType = 'button';
                    $valueElm.on('tap', '.button', function(e) {
                        $(this).addClass('active').siblings().removeClass('active');
                        common.fnParams[key] = resetValueType(this.innerHTML.trim(), valueType);
                        console.log(key + ': ' + common.fnParams[key] + ' (' + typeof common.fnParams[key] + ')');
                    });
                    common.fnParams[key] = resetValueType(value,valueType);
                }
                // 输入框
                else if ($valueElm.hasClass('input-row')) {
                    elmType = 'input';
                    //value = $valueElm.children().eq(0).attr('placeholder') || '';
                    if($valueElm.children().eq(0).val()) {
                        value = $valueElm.children().eq(0).val();
                    } else {
                        value = $valueElm.children().eq(0).attr('placeholder') || '';
                    }
                     $valueElm.on('change', 'input, textarea', function(e) {
                         if($(e.target).val().trim()) {
                             common.fnParams[key] = resetValueType(this.value.trim(), valueType);
                         }
                        console.log(key + ': ' + common.fnParams[key] + ' (' + typeof common.fnParams[key] + ')');
                    });
                    if(value.trim()) {
                        common.fnParams[key] = resetValueType(value,valueType);
                    }

                }
                // 其他
                else {
                    elmType = 'others';
                    common.fnParams[key] = resetValueType(value, valueType);
                }
            });
            console.log(common.fnParams);
            return;
        },

        goBack: function() {

            var flag = false;

            //遍历查看是否有弹窗未关
            $(".overlay").each(function() {
                if (!$(this).hasClass("hidden")) {
                    flag = true;
                }
            });

            if (flag) {
                $(".overlay").addClass("hidden");
            } else {
                //安卓软键盘弹出时不执行返回操作
                if (/Android/.test(navigator.userAgent) && (document.activeElement.tagName === "INPUT" || document.activeElement.tagName === "TEXTAREA")) {
                    document.activeElement.blur();
                } else if (butterfly.rootView.views.length === 1) { //首页
                    bsl.infinitus.transfer.returnBack(true);
                } else {
                    window.history.back();
                }
            }
        },

        navigate: function(url) {
            window.butterfly.navigate(config.moduleName + '/' + url, {
                trigger: true
            });
        },

        //剔除数组相同元素
        deleteTheSame: function(ids) {
            var i, l, j, t, c = [];
            for (i = 0, l = ids.length; i < l; i++) {
                t = true;
                for (j = 0; j < c.length; j++) {
                    if (ids[i] === c[j]) {
                        t = false;
                        break;
                    }
                }
                if (t) {
                    c.push(ids[i]);
                }
            }
            return c;
        }
    }

    return common;
});
