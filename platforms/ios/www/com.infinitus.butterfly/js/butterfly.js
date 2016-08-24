/* global define,Backbone,console */
(function(root, factory) {

    if (typeof define === 'function' && define.amd) {
        define(['exports', 'underscore', 'zepto', 'backbone', 'view'], function(exports, _, $, Backbone, ViewPlugin) {
            root.Butterfly = factory(root, exports, _, $, Backbone, ViewPlugin);
        });

    } else {
        root.Butterfly = factory(root, {}, root._, (root.jQuery || root.Zepto || root.ender || root.$), Backbone);
    }

})(this, function(root, Butterfly, _, $, Backbone, ViewPlugin) {

    String.prototype.endsWith = function(suffix) {
        return this.indexOf(suffix, this.length - suffix.length) !== -1;
    };

    //author: meizz
    Date.prototype.format = function(format) {
        var o = {
            "M+": this.getMonth() + 1, //month
            "d+": this.getDate(), //day
            "h+": this.getHours(), //hour
            "m+": this.getMinutes(), //minute
            "s+": this.getSeconds(), //second
            "q+": Math.floor((this.getMonth() + 3) / 3), //quarter
            "S": this.getMilliseconds() //millisecond
        };

        if (/(y+)/.test(format)) {
            format = format.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
        }
        for (var k in o) {
            if (new RegExp("(" + k + ")").test(format)) {
                format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length));
            }
        }
        return format;
    };

    //Butterfly start
    Butterfly.VERSION = '1.0';

    Butterfly.log = function() {
        var a = [];
        a[0] = new Date().format('h:mm:ss:S') + '[><] ' + arguments[0];
        a.concat(arguments);
        console.log.apply(console, a);
    };

    // Butterfly.Router
    Butterfly.Router = Backbone.Router.extend({
        routes: {
            '*path(?*queryString)': 'any'
        },
        any: function(path, queryString) {
            Butterfly.log('route: %s ? %s', path, queryString);
            if (this.routingOptions) {
                this.routingOptions.queryString = queryString;
            }
            root.butterfly.route(path, this.routingOptions);
            delete this.routingOptions;
        }
    });

    Butterfly.history = Backbone.history;

    // Butterfly.Application
    var Application = Butterfly.Application = function(el) {
        this.el = el;
    };

    _.extend(Application.prototype, {

        navigate: function(fragment, options) {
            //default options
            options = options || {
                trigger: true
            };
            //default trigger
            options.trigger = (options.trigger === undefined) ? true : options.trigger;
            //pass params
            this.router.routingOptions = options;
            Backbone.history.navigate(fragment, options);
        },

        route: function(path, options) {
            if (this.rootView.route) {
                this.rootView.route(path, options);
            }
        },

        //launch application
        fly: function() {

            var me = this;
            this.scanRootView(function(view) {

                me.rootView = view;

                me.router = new Butterfly.Router();

                var pathname = window.location.pathname;
                var rootPath = pathname.substr(0, pathname.lastIndexOf('/'));
                Butterfly.log("start history with root: %s", rootPath);
                Backbone.history.start({
                    pushState: false,
                    silent: false
                });

                view.render();
                view.show();

            }, function(err) {

                console.error("fail to load root view: %s", err);
                throw err;
            });

            return this;
        },

        scanRootView: function(success, fail) {
            var rootView = this.el.querySelector('[data-view]');
            if (!rootView) {
                throw new Error('root view not found');
            }

            ViewPlugin.loadView(rootView, function(View) {

                var view = new View();

                success(view);

            }, fail);
        },

        /* 通过path获取view
         * 用途：跨页面调用方法
         * 例：a页面需要调用b页面的方法，在a页面里 var b = butterfly.getViewByPath("b"); b.onShow();
         */
        getViewByPath: function(path) {

            var views = this.rootView.views;
            var result = views.filter(function(view) {
                if (view.path.indexOf(path) !== -1) {
                    return view;
                }
            });

            return result.length > 0 ? result[0].view : null;
        }

    });

    $(function() {
        root.butterfly = new Butterfly.Application(document.body).fly();
    });

    return Butterfly;
});
