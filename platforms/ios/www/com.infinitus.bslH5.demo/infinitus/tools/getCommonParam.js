define(['zepto', 'butterfly/view', 'util', 'bsl', '../../common'], function($, View, Util, bsl, common) {

    var me = null;

    var view = View.extend({
        id: "bslH5Demo-infinitus-tools-getCommonParam",
        events: {
            'tap .goBack' : common.goBack,
            "tap #try": "try"
        },
        render: function() {
            me = this;
        },
        onShow: function() {
            console.log("main:" + $(".content-block-title").html());
        },
        try: function() {
            console.log('- Start -');
            bsl.infinitus.tools.getCommonParam(function(value) {
                console.dir(value);
                commonParam = Butterfly.parseJSON(value);
                console.dir(commonParam);
                console.log('- End -');
                // value = JSON.stringify(commonParam);
                $('#result').html(value).closest('.resultWrap').show();
            });
        }


    });
    return view;
});
