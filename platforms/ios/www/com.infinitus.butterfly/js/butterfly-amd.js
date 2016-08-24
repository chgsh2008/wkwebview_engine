/* global require,_,console,Butterfly */

require.config({
    baseUrl: '../',
    packages: [{
        name: 'butterfly',
        location: './com.infinitus.butterfly/js',
        main: 'butterfly'
    }],
    paths: {
        // require.js plugins
        view: 'com.infinitus.butterfly/js/requirejs-butterfly',
        // lib
        zepto: 'com.infinitus.butterfly/bower_components/zepto/zepto',
        jquery: 'com.infinitus.butterfly/bower_components/jquery/jquery-1.9.1.min',
        // jquery: 'lib/bower_components/jquery/jquery-1.9.1.min',
        underscore: 'com.infinitus.butterfly/bower_components/underscore/underscore',
        backbone: 'com.infinitus.butterfly/bower_components/backbone/backbone',
        text: 'com.infinitus.butterfly/bower_components/requirejs-text/text',
        spin: 'com.infinitus.butterfly/bower_components/spinjs/spin.min',
        butterfly: 'com.infinitus.butterfly/js/butterfly',
        commonObj: 'com.infinitus.butterfly/js/common',
        i18n: 'com.infinitus.butterfly/bower_components/requirejs-i18n/js/i18n',
        components: 'com.infinitus.butterfly/components/components',
        //以下的是组件
        iScroll: 'com.infinitus.butterfly/bower_components/iscroll/js/iscroll-lite',
        list: 'com.infinitus.butterfly/components/list',

        //listview组件使用到的iscroll
        iscroll: 'com.infinitus.butterfly/bower_components/iscroll/js/iscroll-probe',
        listview: 'com.infinitus.butterfly/components/listview/ListView',
        bsl: 'bsl',

        util: 'com.infinitus.commonBf/js/EMCSUtil',
        slide: "com.infinitus.otms.receiptWritingBf/js/slide-direction",
        //公共方法
        com: 'com.infinitus.commonBf/js/com',
        //初始化公共方法
        init: 'com.infinitus.commonBf/js/init',
        ecConfig: 'com.infinitus.butterfly/bower_components/echarts/config',
        //公共请求地址
        openAPI: 'com.infinitus.commonBf/js/openapi',
        //jroll
        jroll: 'com.infinitus.commonBf/js/jroll.min',
        jroll_infinite: 'com.infinitus.commonBf/js/jroll.infinite.min',
        //ui3.0
        ui3: 'com.infinitus.commonBf/js/ui3',
        ui3_dialog: 'com.infinitus.commonBf/js/ui3.dialog',
        ui3_refresh: 'com.infinitus.commonBf/js/ui3.refresh',
        cat :'com.infinitus.commonBf/js/cat_amd'
    },
    waitSeconds: 7,
    shim: {
        zepto: {
            exports: '$'
        },
        underscore: {
            exports: '_'
        },
        iScroll: {
            exports: 'iScroll'
        },
        //iscroll-lite中不存在listview中使用到的部分方法，所以使用iscroll-probe
        iscroll: {
            exports: 'IScroll'
        },
        backbone: {
            deps: ['underscore'],
            exports: 'Backbone'
        },
        slide: {
            deps: ['zepto']
        }
    }
});

require(['bsl'], function(bsl) {

    /**
     * 如果是生产环境，重写所有console的方法，禁止在生产环境输出
     * 提供__console方法在生产环境输出日志
     */
    window.__console = window.console;

    bsl.infinitus.tools.getHost(function(host) {
        var n;
        host = JSON.parse(host);

        //生产环境，重写console
        if (host.root.indexOf('gbss.infinitus.com.cn') > -1) {

            n = function() {};
            window.console = {
                assert: n,
                clear: n,
                count: n,
                debug: n,
                dir: n,
                dirxml: n,
                error: n,
                group: n,
                groupCollapsed: n,
                groupEnd: n,
                info: n,
                log: n,
                markTimeline: n,
                profile: n,
                profileEnd: n,
                table: n,
                time: n,
                timeEnd: n,
                timeStamp: n,
                timeline: n,
                timelineEnd: n,
                trace: n,
                warn: n
            };

        }

        //开始butterfly代码
        //增加了cat.js 捕获页面错误，监控页面操作 chenjiongming 2016-07-01
        require(['butterfly', 'components'], function(butterfly, Components) {

            //iOS scroll to top
            setTimeout(function() {
                window.scrollTo(0, 1);
            }, 0);

            

            butterfly = _.extend(butterfly, Components);

            console.info("butterfly...");
            console.info(Butterfly);
            console.info('Components...');
            console.info(Components);

        });

    });

});
