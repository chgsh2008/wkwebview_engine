/* global define,console,$,require,Backbone */
define(['butterfly/view'], function(View) {

    //::性能优化:: 仅保持倒数两个veiw的display为block
    function keepLastTwoVeiwsBlock(views) {
        if (/Android/.test(navigator.userAgent)) {
            var l = views.length;
            for (var i = 0; i < l; i++) {
                if (i === l - 1 || i === l - 2) {
                    views[i].view.el.style.display = "block";
                } else {
                    views[i].view.el.style.display = "none";
                }
            }
        }
    }

    //::性能优化:: 后退，返回之前的页面，跨页面后退操作，1->2->3->4->2，将3、4移除
    //返回view的位置+1或0
    function goHistoryPage(path, views) {
        var l = views.length;
        for (var i = 0; i < l; i++) {
            if (path === views[i].path) {
                return i + 1; //避免i为0里判断失效
            }
        }
        return 0;
    }

    //show only contain one direct subview
    return View.extend({

        initialize: function() {
            View.prototype.initialize.apply(this, arguments);
            this.views = [];
            this.currentView = '';
            this.baseZIndex = 10;
            this.firstLoad = true;
        },

        route: function(paths, options) {
            /* ========================================================================
             * 通过index.html中的data-default定义默认跳转
             * 若data-default不存在或为空，调到当前模块的main.html
             * ======================================================================== */
            var path, mainEl, defaultPath, defaultModule;

            path = paths;

            if (!paths) { //地址栏没有配置路径
                console.log("paths没数据");
                mainEl = $(this.el);

                //配置路径
                defaultPath = mainEl.attr('data-default');

                //获取当前模块
                var pathname = window.location.pathname;
                var rootPath = pathname.substr(0, pathname.lastIndexOf('/'));
                defaultModule = rootPath.substr(rootPath.lastIndexOf('/') + 1);

                if (!defaultPath) {
                    defaultPath = defaultModule + '/main';
                } else if (defaultPath.indexOf('/') === -1) //若data-default没有模块名，则默认为当前模块
                {
                    defaultPath = defaultModule + '/' + defaultPath;
                }

                path = defaultPath || "";
            }

            //对于hash值多余或不完成的处理（暂定方案）
            if (path.indexOf('/') === path.length - 1) {
                path = path + "main";
            }

            require(['view!' + path + '.html'], function(ViewClass) {
                var index = goHistoryPage(path, this.views);
                //判断是不是后退操作。
                if (index) {

                    if (!this.views[index - 1] && !this.views[index]) {
                        return;
                    }

                    var currentView = this.views[this.views.length - 1].view;

                    this.views[index - 1].view.el.style.display = "block";
                    this.baseZIndex = this.views[index].view.el.style.zIndex * 1;

                    //移除多余的dom
                    for (var i = index, l = this.views.length - 1; i < l; i++) {
                        this.views[i].view.$el.remove();
                    }
                    //移除views
                    this.views.splice(index, l - index + 1);

                    currentView.animateSlideOutRight(function() {
                        //hide & remote top
                        currentView.$el.hide();
                        currentView.$el.remove();

                        //执行onShow
                        this.views[index - 1].view.show();
                        console.log(this.views);

                        //仅保持倒数两个veiw的display为block
                        keepLastTwoVeiwsBlock(this.views);

                    }.bind(this));

                } else {
                    var newView = new ViewClass();
                    this.views.push({
                        path: path,
                        view: newView
                    });
                    console.log(this.views);
                    newView.$el.css({
                        'position': 'absolute',
                        'top': '0px',
                        'bottom': '0px',
                        'width': '100%',
                        'z-index': this.baseZIndex++
                    });
                    console.log(newView.id);
                    console.log(newView.el);

                    if (newView.id && !newView.el.id) {
                        newView.el.id = newView.id;
                    } else if (!newView.id && !newView.el.id) {
                        console.warn(path + " [><] 缺少id！ 详见 https://iwiki.infinitus.com.cn/pages/viewpage.action?pageId=16893340 或 https://www.zybuluo.com/BarZu/note/231186");
                    } else {
                        console.warn(path + " [><] id冲突！ 详见 https://iwiki.infinitus.com.cn/pages/viewpage.action?pageId=16893340 或 https://www.zybuluo.com/BarZu/note/231186");
                    }
                    newView.render();
                    this.el.appendChild(newView.el);
                    if (!this.firstLoad) {
                        newView.animateSlideInRight(function() {
                            newView.show(options);
                            //仅保持倒数两个veiw的display为block
                            keepLastTwoVeiwsBlock(this.views);
                        }.bind(this));
                    } else {
                        newView.show(options);
                    }
                }
                this.firstLoad = false;

                //chenjiongming 可获取页面元素butterfly 
                //.ui3-header .text-center
                setTimeout(function(){
                    var title = $("[data-click-title]").attr("data-click-title");
                    if(title!=="我的"){
                        if($("body").find("div").hasClass("bodyer")){
                            var titleA = $(".bodyer").last().find("[data-click-title]").attr("data-click-title");
                            var titleB = $(".bodyer").siblings("header").last().find("[data-click-title]").attr("data-click-title");
                            var titleX = $(".bodyer").siblings("header").find(".text-center").text();
                            bsl.infinitus.cat.analytics({
                                "category": titleA||titleB||titleX,
                                "action": "浏览",
                                "label": "",
                                "value": ""
                            });
                        }else if($("body").find("div").hasClass("page-layout")){
                            var titleC = $(".page-layout").siblings("header").last().find("[data-click-title]").attr("data-click-title");
                            var titleD = $(".page-layout").last().find("[data-click-title]").attr("data-click-title");
                            bsl.infinitus.cat.analytics({
                                "category": titleC||titleD,
                                "action": "浏览",
                                "label": "",
                                "value": ""
                            });
                        }else if($("body").find("header").hasClass("dp_header")){
                            setTimeout(function(){
                                bsl.infinitus.cat.analytics({
                                    "category": $("#btnShare").data("click-title"),
                                    "action": "浏览",
                                    "label": "",
                                    "value": ""
                                });
                            },3000);   
                        }else if($("body").find("div").hasClass("content")){
                            var titleG = $(".content").siblings("header").last().find("h1").text();
                            var titleK = $(".content").siblings("#bar-header").children("div").children("div").attr("data-click-title");
                            var titleH = $(".content").last().find("[data-click-title]").attr("data-click-title");
                            var titleO = $(".blue-bar").last().find("h1").text();
                            var titleP = $(".content").siblings("header").last().find("h1").attr("data-click-title");
                            if(titleG=="无限极健康食品"){
                                bsl.infinitus.cat.analytics({
                                    "category": titleH||"无限极产品列表",
                                    "action": "浏览",
                                    "label": "",
                                    "value": ""
                                });
                            }else if(titleG=="萃雅护肤品"){
                                bsl.infinitus.cat.analytics({
                                    "category": titleH||"萃雅护产品列表",
                                    "action": "浏览",
                                    "label": "",
                                    "value": ""
                                });
                            }else if(titleG=="心维雅护肤品"){
                                bsl.infinitus.cat.analytics({
                                    "category": titleH||"心维雅产品列表",
                                    "action": "浏览",
                                    "label": "",
                                    "value": ""
                                });
                            }else if(titleG=="享优乐养生用品"){
                                bsl.infinitus.cat.analytics({
                                    "category": titleH||"享优乐产品列表",
                                    "action": "浏览",
                                    "label": "",
                                    "value": ""
                                });
                            }else if(titleG=="植雅个人护理品"){
                                bsl.infinitus.cat.analytics({
                                    "category": titleH||"植雅产品列表",
                                    "action": "浏览",
                                    "label": "",
                                    "value": ""
                                });
                            }else if(titleG=="帮得佳家居用品"){
                                bsl.infinitus.cat.analytics({
                                    "category": titleH||"帮得佳产品列表",
                                    "action": "浏览",
                                    "label": "",
                                    "value": ""
                                });
                            }else if(titleO=="健康食品组合定制"){
                                bsl.infinitus.cat.analytics({
                                    "category": titleO,
                                    "action": "浏览",
                                    "label": "",
                                    "value": ""
                                });
                            }else{
                                bsl.infinitus.cat.analytics({
                                    "category": titleP||titleH||titleG||titleK,
                                    "action": "浏览",
                                    "label": "",
                                    "value": ""
                                });
                            }
                        }else if($("body").find("div").hasClass("wrapper")){
                            var titleI = $(".wrapper").siblings("header").last().find("h1").text();
                            var titleJ = $(".wrapper").last().find("[data-click-title]").attr("data-click-title");
                            bsl.infinitus.cat.analytics({
                                "category": titleI||titleJ,
                                "action": "浏览",
                                "label": "",
                                "value": ""
                            });
                        }else{
                            var titleE = $("[data-click-title]").attr("data-click-title");
                            var titleF = $(".text-center").text();
                            if(titleF==titleE){
                                bsl.infinitus.cat.analytics({
                                    "category": titleF,
                                    "action": "浏览",
                                    "label": "",
                                    "value": ""
                                });
                            }else if(titleE == undefined){
                                bsl.infinitus.cat.analytics({
                                    "category": titleF,
                                    "action": "浏览",
                                    "label": "",
                                    "value": ""
                                });
                            }else{
                                bsl.infinitus.cat.analytics({
                                    "category": titleE,
                                    "action": "浏览",
                                    "label": "",
                                    "value": ""
                                });
                            }
                        }
                    }
                },3000);
                /*setTimeout(function(){
                    try{
                        if($("body").find("div").hasClass("bodyer")){
                            var titleA = $(".bodyer").last().find("[data-click-title]").attr("data-click-title");
                            var titleB = $(".bodyer").siblings("header").last().find("[data-click-title]").attr("data-click-title");
                            bsl.infinitus.cat.analytics({
                                "category": titleA||titleB,
                                "action": "浏览",
                                "label": "",
                                "value": ""
                            });
                            
                        }else if($("body").find("div").hasClass("page-layout")){
                            var titleC = $(".page-layout").siblings("header").last().find("[data-click-title]").attr("data-click-title");
                            var titleD = $(".page-layout").last().find("[data-click-title]").attr("data-click-title");
                            bsl.infinitus.cat.analytics({
                                "category": titleC||titleD,
                                "action": "浏览",
                                "label": "",
                                "value": ""
                            });
                        }else if($("body").find("header").hasClass("dp_header")){
                            setTimeout(function(){
                                bsl.infinitus.cat.analytics({
                                    "category": $('#btnShare').attr("data-click-title"),
                                    "action": "浏览",
                                    "label": "",
                                    "value": ""
                                });
                            },1000);   
                        }else if($("body").find("div").hasClass("content")){
                            var titleG = $(".content").siblings("header").last().find("h1").text();
                            var titleK = $(".content").siblings("#bar-header").children("div").children("div").attr("data-click-title");
                            var titleH = $(".content").last().find("[data-click-title]").attr("data-click-title");
                            var titleO = $(".wrapper").last().find("[data-click-title]").attr("data-click-title");
                            var titleP = $(".content").siblings("header").last().find("h1").attr("data-click-title");
                            if(titleG=="无限极健康食品"){
                                bsl.infinitus.cat.analytics({
                                    "category": titleH||"无限极产品列表",
                                    "action": "浏览",
                                    "label": "",
                                    "value": ""
                                });
                            }else if(titleG=="萃雅护肤品"){
                                bsl.infinitus.cat.analytics({
                                    "category": titleH||"萃雅护产品列表",
                                    "action": "浏览",
                                    "label": "",
                                    "value": ""
                                });
                            }else if(titleG=="心维维护肤品"){
                                bsl.infinitus.cat.analytics({
                                    "category": titleH||"心维维产品列表",
                                    "action": "浏览",
                                    "label": "",
                                    "value": ""
                                });
                            }else if(titleG=="享优乐养生用品"){
                                bsl.infinitus.cat.analytics({
                                    "category": titleH||"享优乐产品列表",
                                    "action": "浏览",
                                    "label": "",
                                    "value": ""
                                });
                            }else if(titleG=="植雅个人护理品"){
                                bsl.infinitus.cat.analytics({
                                    "category": titleH||"植雅产品列表",
                                    "action": "浏览",
                                    "label": "",
                                    "value": ""
                                });
                            }else if(titleG=="帮得佳家居用品"){
                                bsl.infinitus.cat.analytics({
                                    "category": titleH||"帮得佳产品列表",
                                    "action": "浏览",
                                    "label": "",
                                    "value": ""
                                });
                            }else if(titleO=="健康食品组合定制"){
                                bsl.infinitus.cat.analytics({
                                    "category": titleO,
                                    "action": "浏览",
                                    "label": "",
                                    "value": ""
                                });
                            }else{
                                bsl.infinitus.cat.analytics({
                                    "category": titleP||titleH||titleG||titleK,
                                    "action": "浏览",
                                    "label": "",
                                    "value": ""
                                });
                            }
                        }else if($("body").find("div").hasClass("wrapper")){
                            var titleI = $(".wrapper").siblings("header").last().find("h1").text();
                            var titleJ = $(".wrapper").last().find("[data-click-title]").attr("data-click-title");
                            bsl.infinitus.cat.analytics({
                                "category": titleI||titleJ,
                                "action": "浏览",
                                "label": "",
                                "value": ""
                            });
                        }else{
                            var titleE = $("[data-click-title]").attr("data-click-title");
                            var titleF = $(".text-center").text();
                            if(titleF==titleE){
                                bsl.infinitus.cat.analytics({
                                    "category": titleF,
                                    "action": "浏览",
                                    "label": "",
                                    "value": ""
                                });
                            }else if(titleE == undefined){
                                bsl.infinitus.cat.analytics({
                                    "category": titleF,
                                    "action": "浏览",
                                    "label": "",
                                    "value": ""
                                });
                            }else{
                                bsl.infinitus.cat.analytics({
                                    "category": titleE,
                                    "action": "浏览",
                                    "label": "",
                                    "value": ""
                                });
                            }
                        }
                    }catch(e){
                        bsl.infinitus.cat.analytics({
                            "category": "无法获取页面标题",
                            "action": "浏览","label": "","value": ""
                        });
                    }
                },1000);*/
                //chenjiongming end

            }.bind(this), function() {
                Backbone.history.navigate('#/' + path);
            });

        }
    });
});
