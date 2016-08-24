define([],function(){	
    var webViewObj = {
        description:"Webview窗口对象",
        viewID:"webView标识",
        url:"加载的HTML页面地址",
        styles:"窗口的样式",
        viewTitle:"HTML页面的标题",
        currentUrl:"当前页面的URL",
        onclose:"Webview窗口关闭事件",
        onerror:"Webview窗口错误事件",
        onloaded:"Webview窗口页面加载完成事件",
        onloading:"Webview窗口页面开始加载事件",

        getURL:function(){
            var me = this;
            return me.url;
        },

        show:function(aniShow, duration, showedCB){
            var me = this;
            cordova.exec(function(){
                showedCB();
            },function(error){
              console.log(error);
            },"WebView","showWebView",[me.viewID,aniShow,duration]);
        },

        init:function(url,id,styles){
            var obj = new Object();
            var me = this;
            obj.viewID = id;  
            obj.url = url
            obj.styles = styles;
            obj.description = me.description;//prototype
            obj.getURL = me.getURL;
            obj.show = me.show;
            obj.addEventListener = me.addEventListener;
            obj.triggerEvent = me.triggerEvent;

            return obj;
        },

        triggerEvent:function(obj,event){
            
        },  

        addEventListener:function(event, listener, capture){

//            function add(el,type,fn,capture){
//                el.listeners = el.listeners || {};
//                el.listeners[type] = el.listeners[type] || [];
//                el.listeners[type].push(fn);
//                el.addEventListener(type,fn,capture);
//            }


        },

    };

    return webViewObj;

});