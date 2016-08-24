define([], function() {

  return {
    server: 'http://localhost:1338/',
    request: function(params) {
      var defaults = {
        url: this.server + params.path,//http://localhost:1338/user, 
        type: 'GET',
        // contentType: 'text/plain', //raw; charset=utf-8
        complete: function(request, status) {},
        beforeSend: function(){}
      };

      params = _.extend(defaults, params);

      var _preSuccessFunc = params.success;
      var _preErrorFunc = params.error;
      var _preCompeteFunc = params.complete;
      var _preBeforeSend = params.beforeSend;

      params.beforeSend = function() {
        _preBeforeSend();
      };

      params.success = function(data) {
        _preSuccessFunc(data);

      };

      params.error = function(events, statusText) {
        _preErrorFunc(events, statusText);

      };

      params.complete = function(request, status) {
        _preCompeteFunc(status, request);
      };
      console.log(params)
      $.ajax(params);
    },

    getList: function (params) {
      console.log(params)
      // this.request(params);
    }
  };
});