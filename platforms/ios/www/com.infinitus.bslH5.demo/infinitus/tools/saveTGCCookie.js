/**
 * Created by chenwenqing on 2016/4/7.
 */
/*global define, console, alert*/
define(['zepto', 'butterfly/view', 'util', 'bsl', '../../common'], function($, View, Util, bsl, common) {

    var me = null;
    var flag = null;

    var view = View.extend({
        id: "bslH5Demo-infinitus-tools-saveTGCCookie",
        events: {
            'tap .goBack': common.goBack,
            "tap #ajaxNormal": "ajaxNormal",
            "tap #flag1": "flag1",
            "tap #flag2": "flag2",
            "tap #flag3": "flag3"
        },
        render: function () {
            me = this;
        },
        onShow: function () {
            // console.log("main:" + $(".content-block-title").html());
            //common.initFnParams();
        },
        try: function() {

        },
        ajaxNormal: function() {
            Util.Ajax({
                url: "/front/gbss-mobile-newBusiness/dealer/check/checkDealerPoInfo", //检查是否有购货权限
                data: {
                    poProcessCode: 'G001'
                },
                type: 'GET',
                success: function(data) {
                    alert("请求接口成功");
                },
                complete: function(xhr) {
                    alert(xhr.getAllResponseHeaders());
                }

            });
        },
        ajaxTestCookie: function() {
            Util.Ajax({
                url: '/gbss-bupm/front/gbss-mobile-portal/guest/testCookie',
                data: {
                    flag: flag
                },
                type: 'GET',
                hostType: 'root',
                success: function(data) {

                },
                complete: function(xhr, status) {
                    alert(xhr.getAllResponseHeaders());
                    var headers = {};
                    var gbssCookie = xhr.getResponseHeader("GBSS-Cookie");
                    var uimTGC = xhr.getResponseHeader("UIM-TGC");
                    var jSessionId = xhr.getResponseHeader("JSESSIONID");
                    var pUserName = xhr.getResponseHeader("pUserName");
                    var pToken = xhr.getResponseHeader("pToken");
                    var pDeviceId = xhr.getResponseHeader("pDeviceId");
                    if (gbssCookie) {
                        headers['GBSS-Cookie'] = gbssCookie;
                    }
                    if (uimTGC) {
                        headers['UIM-TGC'] = uimTGC;
                    }
                    if (jSessionId) {
                        headers.JSESSIONID = jSessionId;
                    }
                    if (pUserName) {
                        headers.pUserName = pUserName;
                    }
                    if (pToken) {
                        headers.pToken = pToken;
                    }
                    if (pDeviceId) {
                        headers.pDeviceId = pDeviceId;
                    }
                    if (bsl.infinitus.tools.saveTGCCookie) {
                        alert("this app supports saveTGCCookie");
                        alert("the cookie is"+JSON.stringify(headers));
                        bsl.infinitus.tools.saveTGCCookie(JSON.stringify(headers));
                    }
                    // me.ajaxNormal();
                }
            });
        },
        flag1: function() {
            flag = "1";
            me.ajaxTestCookie();

        },
        flag2: function() {
           flag = "2";
            me.ajaxTestCookie();

        },
        flag3: function() {
            flag = "3";
            me.ajaxTestCookie();
        }

    });
    return view;
});
