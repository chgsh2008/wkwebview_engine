/*解释字符串为json对象
 *过滤开头和结尾的双引""
 *非法json格式返回null，避免终止程序
 */
define(function() {

	function parseJSON(str) {
		var result = null;

		if (typeof str === "string") {
			try {
				result = JSON.parse(str.replace(/^\"|\"$/g, ""));
			} catch (e) {
				var error = e.message ? e.message : e;
				console.error(error);
				result = null;
			}
		}

		return result;
	}

	return parseJSON;
});