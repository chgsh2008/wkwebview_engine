/*
 * JS中初始化该控件。
 * var loader = new Loader({
 *       autoshow:false,    //是否初始化时就弹出加载控件
 *       target:'#test'     //页面目标组件表识
 *  });
 * loader.show();       //显示加载窗
 * loader.hide();       //隐藏加载窗
 * loader.hideAll();    //隐藏所有加载窗
 * 
 * loading组件，最终转换出html5
 * <div class="cube-loader">
 *      <div class="cube-loader-icon">
 *      </div>
 * </div>
 */
define(['zepto'], function($){

    var me;
    var canceled;
    var keys = [37, 38, 39, 40];

    function preventDefault(e) {
      e = e || window.event;
      if (e.preventDefault)
          e.preventDefault();
      e.returnValue = false;  
    }
    
    function keydown(e) {
        for (var i = keys.length; i--;) {
            if (e.keyCode === keys[i]) {
                preventDefault(e);
                return;
            }
        }
    }

    function scrolling(e) {
        preventDefault(e);
    }

    function disableScrolling(){
        if(window.addEventListener){
            window.addEventListener('DOMMouseScroll', scrolling, false);
            window.addEventListener('touchmove',scrolling,false);
            window.onmousewheel = document.onmousewheel = scrolling;
            document.onkeydown = keydown;
        }
    }

    function enableScrolling(){
        if (window.removeEventListener) {
            window.removeEventListener('DOMMouseScroll', scrolling, false);
            window.removeEventListener('touchmove',scrolling,false);
        }
        window.onmousewheel = document.onmousewheel = document.onkeydown = null;
    }
    
    //判断是否已替换，来判断是否已经构造完成
    var Loader = function(config){
        this.config = { autoshow: true, target: 'body', text: '载入中...', cancelable: true };
        canceled = false;
        if(config) {
            this.config = $.extend(this.config, config);
        }
        if(this.config.autoshow) {
            this.show();
        }
    };

    //change事件需要执行用户自定义事件，还要广播事件。
    Loader.prototype.show = function() {
        me = this;
        disableScrolling();
        var targetOjb = $(this.config.target);
        var cube_loader =  this.find();
        if(cube_loader) return;

        cube_loader = $("<div/>").addClass("cube-loader");
        
        var cube_loader_block = $("<div/>").addClass("cube-loader-block");
        var cube_loader_icon = $("<img/>").addClass("cube-loader-icon").attr('src','data:img/jpg;base64,iVBORw0KGgoAAAANSUhEUgAAAEYAAABGBAMAAACDAP+3AAAAHlBMVEX///+3t7e6urq4uLi4uLi5ubm5ubm5ubm5ubm5ubm/fxe2AAAACXRSTlMAIEaMjaPH8PN2+20BAAAA80lEQVR4XsWWLQ4CMRCFgRCwGDzHAIfCcwMEB8BxABQaw9yWAE1HfOS9bjahI799See187OTjjE7XM8bLZluI+K2kpp1vOMoNbuP5iGzuX80T5XRPL6xF3YWRXOqhHaWRXOphHZSUwjt5FmV0E7NmQb5iQZ5RJISTDUJNbwEnsXLZM4k9E7COwThW5DwTUlYGyB/6ClypgcOm7Aveqpw0VPJRU8lRxn8KhiUEwqvTePPaszZe/d32PYW/k1RA11KkcT3ju9B38t+JvjZMmRG+VnnZ6afvX6GN+8Cv1P8bvI7btiupMFRuzsNjv2XgB1R/P3iBSZwz1CJGJLVAAAAAElFTkSuQmCC');
        var cube_cancel_icon = $("<img/>").addClass("cube-loader-cancel");
        cube_cancel_icon.click(function(){
            enableScrolling();
            if(me.config.cancelable!=false){
                cube_loader.remove();
                canceled = true;
            }
        });
        cube_cancel_icon[0].src = "data:image/png;base64,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";

        var p = $("<p style='padding-bottom:10px;'></p>").append(this.config.text);
        cube_loader_block.append(cube_loader_icon);
        cube_loader_block.append(p);
        cube_loader.append(cube_loader_block);
        cube_loader.append(cube_cancel_icon);

        var children = $(this.config.target).children();
        if(children && children.length>0) {
            children.first().before(cube_loader);
        } else {
            $(targetOjb).append(cube_loader);
        }
    };

    //
    Loader.prototype.hide = function() {
        enableScrolling();
        var cube_loader = this.find();
        if(cube_loader) $(cube_loader).remove();
    };

    Loader.prototype.hideAll = function() {
        enableScrolling();
        var cube_loader = $(".cube-loader");
        if(cube_loader && cube_loader.length>0) {
            $(cube_loader).each(function(){
                $(this).remove();
            });
        }
    };

    Loader.prototype.find = function() {
        var targetOjb = $(this.config.target);
        var result;
        var children = targetOjb.children();
        $(children).each(function(){
            if($(this).hasClass("cube-loader")) {
                result = this;
            }
        });
        return result;
    }

    Loader.prototype.isCanceled = function(){
        return canceled;
    }
    return Loader;
});