define([], function() {

	//show only contain one direct subview
	//模块内的页面跳转
	var commonObj = {
		pageNavigate: function(path) {
			var url = location.href;
			var paraString = url.substring(url.indexOf("#") + 1, url.length); //地址#号后面的路径 
			//如果是有路径传参的话，要将参数给去掉
			if (paraString && paraString.indexOf("?") > 0) {
				paraString = paraString.substring(0, paraString.indexOf("?"));
			}
			paraStrings = paraString.split("/");

			//判断传进来的路径是不是只是页面文件名称
			if (path && path !== "") {
				pathsArr = path.split("/");
				if (pathsArr.length == 1) { //说明传的只是一个文件的名称
					path = "#/" + paraStrings[1] + "/" + path;
					//拼路径
				}
			}
			Backbone.history.navigate(path);
		},
		//模块间的页面跳转
		modulePageNavigate: function(module, page) {
			var newWindow = window.open("_blank");
			newWindow.location = 'file:///Users/fengzhongjincao/Desktop/build/com.infinitus.addSaleList/index.html#/com.infinitus.addSaleList/productList';
			return;
			if (module && module !== "") {
				//跳转的方法需要由原生提供，因为这里新起了一个webview
				var newWindow = window.open('_blank');
				newWindow.location = 'file:///Users/fengzhongjincao/Desktop/build/' + module + '/index.html' + '#/' + module + '/' + page;
				// window.open('file:///Users/fengzhongjincao/Desktop/build/'+module+'/index.html') ;
			} else {
				alert("请输入正确的路径...");
				console.info("请输入正确的路径...");
			}
		}

	}

	return commonObj;
});