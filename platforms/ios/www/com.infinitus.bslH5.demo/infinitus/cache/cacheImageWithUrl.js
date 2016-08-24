define(['zepto', 'butterfly/view', 'util', 'bsl', 'jroll'], function($, View, Util, bsl, JRoll) {

    var me = null, jroll = null;

    var view = View.extend({
        id: "bslH5Demo-infinitus-cache-cacheImageWithUrl",
        events: {
            'tap .goBack' : Util.goBack,
            "tap #try": "try"
        },
        render: function() {
            me = this;
        },
        onShow: function() {
            console.log("main:" + $(".content-block-title").html());

            //使用JRoll滑动页面
            jroll = new JRoll("#cacheImageWithUrl_jroll", {bounce: true});
        },
        try: function() {
            console.log('- Start -');
            //获取图片
            Util.Ajax({
                url : "/gbss-mobile/front/gbss-mobile-newProduct/product/query/listProduct?poProcessCode=G001&listTypeCode=P01&onSaleDateSort=DEFAULT&subListTypeCodeFlag=true&page=1&rows=10&whCode=S003&brand=iPads&os=0&machineModel=x86_64&coreVersion=8.0&netType=WiFi&appVersion=2.0.0&osVersion=8.0&screen=1136x640&imei=&model=0",
                complete: function(xhr) {
                    var data = Butterfly.parseJSON(xhr.response);
                    var list;

                    if (data) {
                        list = data.content;

                        //补全图片路径
                        Util.formatImage(list, ['iconImg', 'resourceImg'], function(data) {
                            me.loadImageToClient(data);
                        });

                        
                    }
                }
            });
        },
        loadImageToClient: function(list) {
            var html = "";

            //拼接HTML
            for (var i=0, l=list.length; i<l; i++) {
                html += "<li><img id='" + list[i].iconImgKey + "' data-big='" + list[i].resourceImg + "'></li>";
            }
            document.getElementById("result").innerHTML = html;

            //把图片缓存到客户端
            Util.loadImage(list, ['iconImg', 'resourceImg'], function(param) {
                var filePath = param[1];
                var userInfo = param[2];
                var img = document.getElementById(userInfo);
                if (img) {
                    img.onload = function() {
                        jroll.refresh();
                    };
                    img.src = filePath;
                }
            });
        }


    });
    return view;
});
