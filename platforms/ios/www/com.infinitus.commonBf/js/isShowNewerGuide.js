/**
 * [新手指引方法]
 * by dyz 2016-08-03
 * @type {Object}
 */
/*
使用方法：
1,在页面中构造好指引遮罩和样式--html
2,初始化设置：isShowNewerGuide({//设置新手指引
                modal:"calendarBf",//模块唯一标识
                parentSelector:"#main",//模块顶级元素
                padId:".ui-newerGuide",//pad显示新手指引对应的html
                phoneId:".ui-newerGuide"//phone显示新手指引对应的html
            });
3,存储数据集获取：isShowNewerGuide("saveKey");
4,判断设备类型：isShowNewerGuide("deviceType");
5,清空新手指引已存在数据：isShowNewerGuide("clear");
*/
 
define([], function() {
    function NewerGuide(option) {
        this.setConfig(option);
        var canShow;
        if (!this.modal) { //必须传入要显示新手指引的页面唯一标识
            return;
        }
        //判断是否需要显示
        canShow=this.getFlag(this.modal);
      //  canShow = true; //测试
        if (!canShow) {
            return;
        }
        this.show();
        this._attachEvents();
    }
    NewerGuide.prototype = {
        uniqAttr:"ui-newer-guide", //新手指引模板唯一标识属性
        saveKey:"newerGuide_20180803",//存放新手指引显示与否唯一标识的前缀
        setConfig: function(option) {
          //  this.uniqAttr = "ui-newer-guide"; //新手指引模板唯一标识属性
          //  this.saveKey = "newerGuide_20180803"; //存放新手指引显示与否唯一标识的前缀
            //option参数
            this.modal = option.modal;//唯一模块标识，如日程管理模块，可用calendarBf,日程新增可用calendarAdd
            this.parentSelector = option.parentSelector || "body";//生成的新手指引dom所在的父元素
            this.padId=option.padId;//新手指引元素id--pad使用
            this.phoneId=option.phoneId;//新手指引元素id--phone使用

           // this.padUrl = option.padUrl;//新手指引图片url--pad使用
           // this.phoneUrl = option.phoneUrl;//新手指引图片url--phone使用
        },
        _events: [],
        _attachEvents: function() {
            // this._detachEvents();
            //绑定关闭事件
            var that = this;
            var uniqAttr = "[" + that.uniqAttr + "]";
            $(uniqAttr).one("click", function(e) {
                e.preventDefault();
                e.stopPropagation();
                that.remove();
            });
        },
        _detachEvents: function() {},
        /**
         * 显示新手指引元素
         * @return {[string]}  [无返回值]
         */
        show: function() {
            var tpl;
            var that = this;

            //标记已显示
            that.setFlag(that.modal);
            //删除旧的遮罩
            that.remove();
            //构造并显示
            tpl = that.create(); //构造新手指引元素
            //显示
           // $(that.parentSelector).append(tpl);

        },
        remove: function() { //关闭
            var that = this;
            var uniqAttr,parentSelector;
            parentSelector=that.parentSelector;
            uniqAttr = "[" + that.uniqAttr + "]";
            if ($(parentSelector+" "+uniqAttr).length) {
               // $(uniqAttr).remove();
               $(parentSelector+" "+uniqAttr).css("display","none");
            }
        },
        /**
         * [构造新手指引]
         * @return {[string]}  [返回模板字符串]
         */
        create: function() {
            var parentSelector,uniqAttr,padId,phoneId,id,height;
            var that=this;
            uniqAttr = that.uniqAttr;
            parentSelector=that.parentSelector;
            padId=that.padId;
            phoneId=that.phoneId;
            height=document.body.clientHeight;
            id = that.deviceType() === "pad" ? padId : phoneId;
            $(parentSelector+" "+id).attr(uniqAttr,true);
            $(parentSelector+" "+id).css("display","block");
            $(parentSelector+" "+id).height(height);
        },
        /**
         * [设置模块已显示过新手指引]
         * @param {[string]} modal [需要设置已显示新手指引标识的页面唯一标识符]
         */
        setFlag: function(modal) {
            var that = this;
            var saveKey = that.saveKey
            val = true;
            modal = modal.replace(/\.|\/|\\/g, "_");

            var obj = window.localStorage.getItem(saveKey);
            obj = obj ? $.parseJSON(obj) : {};
            obj[modal] = true;

            window.localStorage.setItem(saveKey, JSON.stringify(obj));
        },
        /**
         * [获取模块是否已显示新手指引]
         * @param  {[string]} modal [需要判断的页面唯一标识符]
         * @return {[boolen]}       [需要显示返回true,不需要显示返回false]
         */
        getFlag: function(modal) {
            var that = this;
            var saveKey = that.saveKey;
            modal = modal.replace(/\.|\/|\\/g, "_");
            var obj = window.localStorage.getItem(saveKey);

            obj = obj ? $.parseJSON(obj) : {};

            return !obj[modal];
        },
        /**
         * 检测当前设备
         * @return {[string]} [若是pad则返回pad,否则返回phone]
         */
        deviceType: function() {
            var pad = ["iPad"],
                padReg = new RegExp('(.+\\\()(' + pad.join("\|") + ')(.+\\\).+)');
            var brand = window.navigator.appVersion.replace(padReg, '$2');
           //   var brand=bsl.infinitus.tools.getCommonParam()[0].brand;//使用原生方式判断机型
            if (pad.indexOf(brand) !== -1) {
                return "pad";
            } else {
                return "phone";
            }
        },
        clear:function(){//清空新手指引数据
            var saveKey = this.saveKey;
            window.localStorage.removeItem(saveKey);
        }
    };

   return function(){
        //显示新手指引---by dyz 2016-08-03
        //参数详见setConfig
        var args = Array.apply(null, arguments);
        if(typeof args[0]==="string"){
            if(!NewerGuide.prototype[args[0]]){
                return ;
            }
            if(typeof NewerGuide.prototype[args[0]]==="function"){
                return NewerGuide.prototype[args[0]]();
            }else{
                return NewerGuide.prototype[args[0]];
            }
        }else{
            new NewerGuide(args[0]);
        }
   };
});
