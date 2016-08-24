define(['bsl'], function(bsl) {

    var OpenAPI = {};

    bsl.infinitus.tools.getHost(function(value) {
    	
    	OpenAPI.ip = Butterfly.parseJSON(value)['root'];
    });
    //开发
    //OpenAPI.ip = "http://gbssdev.infinitus.com.cn";
    //测试
   // OpenAPI.ip = "http://gbsspre-test.infinitus.com.cn";
   // });

    return OpenAPI ;
});  