define(["./bslWebviewObject"],function(webviewObject){

    var UI = {
         description:"系统原生控件",
         launchWebView:null,//加载应用的入口页面
         currentWebView:null,//当前窗口的WebviewObject对象
         allWebViews:null,//所有视图

         initialize:function(){
            var me = this;
            me.launchWebView = me.getLaunchWebView();
            me.allWebViews = [me.launchWebView];
         },

         all:function(){
            var me = this;
            return me.allWebViews;
         },

         create:function(url,id,styles){
            var me = this;
            var object = webviewObject.init(url,id,styles);
            cordova.exec(function(){
                console.log("create successfully");
//                alert("create view successfully.使用前注释")
            },function(i){
                consolg.log("create fail");
                me.allWebViews.splice(i,i);
            },"WebView","createWebView",[url,id,styles]);

            me.allWebViews.push(object);

            return object;
         },

         getLaunchWebView:function(){
            console.log(window.location.href);
            var me = this;

            if (!me.launchWebView) {
                me.launchWebView = webviewObject.init(null,"LaunchWebViewID",null);
            }

            cordova.exec(function(dic){
                var url = dic["url"];
                var title = dic["title"];
                me.launchWebView.url = url;
                me.launchWebView.viewTitle = title;

              },function(){

                console.log("getLaunchWebview error");

              },"WebView","getLaunchWebview",[]);

            return me.launchWebView;
         },

         close:function(id_wvobj,aniClose,duration){
            var me = this;
            var id = id_wvobj;
            for (var i=0; i<me.allWebViews.length; i++){
                var obj = me.allWebViews[i];
                if (obj.viewID == id) {
                    
                    cordova.exec(function(i){
                        me.allWebViews.splice(i,i);    
                    },function(){
                        console.log("close fail");
                    },"WebView","closeWebView",[id,aniClose,duration]);
                    break;
                }
            } 
         },

         //由原生调用，滑动删除后更新js视图对象数组
         removeView:function(Id){
            var me = this;
            for (var i=0; i<me.allWebViews.length; i++){
                var obj = me.allWebViews[i];
                if (obj.viewID == Id) {
                    me.allWebViews.splice(i,i);
                    break;
                }
            }
         },

         getWebviewById:function(id){
            var me = this;
            var result = null;

            for (var i=0; i<me.allWebViews.length; i++){
                var obj = me.allWebViews[i];
                if (obj.viewID == id) {
                    result = obj;
                    break;
                }
            } 

            return result;
         },

         open:function(url, id, styles, aniShow, duration, showedCB){
            var me = this;
            var object = webviewObject.init(url,id,styles);

            cordova.exec(function(){
                  showedCB();
              },function(error){
                  console.log(error);

              },"WebView","openWebView",[url,id,styles,aniShow,duration]);

            me.allWebViews.push(object);

            return object;
         },
           
         hide:function(id_wvobj, aniHide, duration){
            var id;
            if (id_wvobj.viewID){
                id = id_wvobj.viewID;
            }

            else{
                id = id_wvobj;
            }

            cordova.exec(function(){
                console.log("hide suc!");
            },function(){
                console.log("hide error");
            },"WebView","hideWebView",[id,aniHide,duration]);
        },

        show:function(id_wvobj, aniShow, duration, showedCB){
            var me = this;
            var obj;
            if (id_wvobj.viewID) {
                obj = id_wvobj;
            }

            else{
                obj = me.getWebviewById(id_wvobj);
            }

            obj.show(aniShow,duration,showedCB);
        },

        currentWebview:function(){
            var me = this;
            var currentUrl = window.location.href;
            var result = null;
            for (var i = 0; i < me.allWebViews.length; i++) {
                var obj = me.allWebViews[i];
                if (obj.getURL() == currentUrl) {
                    result = obj;break;
                } 
            }

            return result;
        },

        updateUrls:function(viewID,url){
            var me = this;
            var view = me.getWebviewById(viewID);
            if (view) {
                view.url = url;
                return;
            }
        },
  
    };

	return UI;

});