/*
 * JS冒泡信息组件,added by lee 2013.09.03。
 */


define(['zepto'], function($) {



	//冒泡提示信息: msg:提示内容, duration:停留时间
	var Toast = function(msg, duration, deferred) {
		duration = isNaN(duration) ? 2000 : duration;
		var m = document.createElement('div');
		$(m).addClass("piece-toast-content");
		m.innerHTML = msg;
		m.style.cssText = "width:60%; min-width:150px; background:rgba(0,0,0,.8); color:#fff; padding:10px 10px; text-align:center; border-radius:5px; position:fixed; bottom:15%; left:20%; margin-left:-10px; z-index:999999; font-weight:bold;word-break:break-all;";
		document.body.appendChild(m);
		setTimeout(function() {
			var d = 0.5;
			m.style.webkitTransition = '-webkit-transform ' + d + 's ease-in, opacity ' + d + 's ease-in';
			m.style.opacity = '0';
			setTimeout(function() {
				// modify by simona on 20141118 ,加入判断m节点的高度和宽度是否大于0
				if ($(".piece-toast-content").size() > 0 && $(m).width() && $(m).height()) {
					document.body.removeChild(m);
				}
				if (typeof deferred !== "undefined") {
					deferred.resolve();
				}
			}, d * 1000);
		}, duration);
	};


	return Toast;
});