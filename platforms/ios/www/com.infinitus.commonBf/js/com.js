define(['zepto'], function() {
	var com ={
		cElement : function(ele,txt,cls,data){
			cls = cls || "";
			var elem = document.createElement(ele)
			if(cls) elem.className = cls;
			if(txt) elem.innerHTML = txt;
			if(data){
				for(var i in data){
					elem.setAttribute(i,data[i]);
				}
			}
			elem = $(elem);
			return elem;
		}
	}
	return com;
})