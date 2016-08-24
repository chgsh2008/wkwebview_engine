define([],function(){	
	var gallery = {
		description:"访问系统相册",

		save:function(path,successCB, errorCB){
			cordova.exec(successCB,errorCB,"Gallery","save",[path]);
		},

		pick:function(successCB, errorCB, option){

       		var parms = {
       			filename: option["filename"],
       			filter:   option["filter"],
       			animation:option["animation"],
       			popover:  option["popover"]
       		};

       		function success(value){
       			var Event = {
       				files:value,
       				init:function(parm){
       					this.files = parm;
       					return this;
       				}
       			};
       			if (Object.prototype.toString.apply(value) === '[object Array]' ) {
       				var event = Event.init(value);
       				successCB(event);
       			}

       			else{
       				successCB(value);
       			}
       		}
       		
			cordova.exec(success,errorCB,"Gallery","pick",[parms]);
		}

	};

	return gallery;

});