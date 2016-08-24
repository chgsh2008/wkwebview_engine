/**
 * HTML5 Session存储模块，Session DB实例
 * 
 */
define(['zepto'], function($){

	var Session = function(){
		
	}

	Session.saveObject = function(key, object) {
		//做一下参数判断
		if(typeof object == "undefined" || object == null){
			object = null  ;  //赋值为空值，否则程序报错
		}
		window.sessionStorage[key] = JSON.stringify(object);
	}

	Session.loadObject = function(key) {
		var objectString =  window.sessionStorage[key];
		return objectString == null ? null : JSON.parse(objectString);
	}

	Session.deleteObject = function(key) {
		window.sessionStorage[key] = null;
	}

	return Session;
});