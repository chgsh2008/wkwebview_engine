//
//  infinitus.js
//  Infinitus_3Channels
//
//  无限极原生功能JS API库
//
//  Object参数支持的类型：基础类型(如：int,boolean,double,float,char等) String
//
//  ctsCmd.execVoidCmd(sClassName,sMethod,aParams); // 没有返回值的方法使用此方法调用;返回值支持NSNumber和NSString;在主线程执行
//  ctsCmd.execCmd(sClassName,sMethod,aParams); // 有返回值的方法使用此方法调用;void返回值方法不能使用该方法调用会导致异常退出;在web线程执行
//  ctsCmd.log(sLog); // 输出日志到控制台
//
//  Created by fanlanjun on 14-08-12.
//  Copyright (c) 2014年 fanlanjun. All rights reserved.
//

/**
 * 页面跳转对象
 */
var transfer = {
	className: "Transfer",
	gotoBusinessQuery: function(cubeid) {
		ctsCmd.execVoidCmd(this.className, "gotoBusinessQuery", JSON.stringify([cubeid]));
	},
    selectedTabItem: function(json) {
        ctsCmd.execVoidCmd(this.className, "selectedTabItem", JSON.stringify([json]));
    },
	/**
	 * 返回到上一个HTML页面或返回到上一个视图
	 * @param bIsGoView boolean 为真时不调用浏览器返回直接返回到上一个视图 参数可选
	 * @param sFun String 返回后调用上个页面的JS 参数可选
	 * @param oParam Object 调用函数传的参数 参数可选
	 */
	returnBack: function(bIsGoView, sFun, oParam) {
		ctsCmd.execVoidCmd(this.className, "returnBack", JSON.stringify([bIsGoView, sFun, oParam]));
	},
	/**
	 * 打一个新视图
	 * @param sUrl String HTML页面在线或本地地址
	 * @param sInitFun String 打开新页面调用页面的JS 参数可选
	 * @param oInitParam Object 调用函数传的参数 参数可选
	 * @param sTitle String 标题
	 * @param jNavInfo JSON 跟菜单参数设置一致
	 */
	openPageWithTitle: function(sUrl, sInitFun, oInitParam, sTitle, jNavInfo) {
		ctsCmd.execVoidCmd(this.className, "openPage", JSON.stringify([sUrl, sInitFun, oInitParam, sTitle, jNavInfo]));
	},
    /**
     *  打开一个视图
     *  合并旧有的openPageWithTitle和openPage方法
     *
     *  @param command  json对象，
     *  {
     *   url：string 类型，HTML页面在线或本地地址
     *   sInitFun：string 类型，打开新页面调用页面的JS 参数可选
     *   oInitParam：object 类型，调用函数传的参数 参数可选
     *   sTitle：string 类型，页面的标题
     *   sFlag:Boolean 类型 打开新页面时是否删除中间webview true删除 false不删
     *   jNavInfo：Json类型，原生用到的参数{'rotation':1,'navigationBar':1,'returnView':1,'gotoneturl':true} ,跟菜单参数设置一致
     *  }
     */
    openWebPage: function(jsonStr) {
        ctsCmd.execVoidCmd(this.className, "openWebPage", JSON.stringify([jsonStr]));
    },
	/**
	 * 打一个新视图
	 * @param sUrl String HTML页面在线或本地地址
	 * @param sFlag bool 打开新页面时是否删除中间webview true删除 false不删
	 * @param jNavInfo JSON 跟菜单参数设置一致
	 */
	openPage: function(sUrl, sFlag, jNavInfo) {
		ctsCmd.execVoidCmd(this.className, "openNewPage", JSON.stringify([sUrl, sFlag, jNavInfo]));
	},
	/**
	 *  关闭视图
	 */
	closePage: function(sUrl) {
		ctsCmd.execVoidCmd(this.className, "closePage", JSON.stringify([sUrl]));
	},
	/**
	 * 在当前视图加载一个新页面；使用此方法将清除web的前进和后退历史
	 * @param sUrl String HTML页面在线或本地地址
	 */
	loadPageWithUrl: function(sUrl) {
		ctsCmd.execVoidCmd(this.className, "loadPageWithUrl", JSON.stringify([sUrl]));
	},
	/**
	 * 用户账号信息失效时，登出该账号
	 */
	logoutByUserInvalid: function() {
		ctsCmd.execVoidCmd(this.className, "logoutByUserInvalid", JSON.stringify([]));
	},
	/**
	 * 返回到首页
	 */
	goHome: function() {
		ctsCmd.execVoidCmd(this.className, "goHome", JSON.stringify([]));
	},
	/**
	 * 登录接口
	 * @param sCallback String function callback(bLogin){} bLogin 布尔类型 是否登录成功
	 */
	login: function(sCallback) {
		ctsCmd.execVoidCmd(this.className, "login", JSON.stringify([sCallback]));
	},
	/**
	 * 跳转到支付页面
	 * @param sPayUrl String 支付提交地址
	 * @param sCallback String function callback(jData){}
	 jData JSON对象 支付结果；用户取消支付时对象为null
	 */
	openPayPage: function(sPayUrl, sCallback, paySecond) {
		ctsCmd.execVoidCmd(this.className, "openPayPage", JSON.stringify([sPayUrl, sCallback, paySecond]));
	},
	/**
	 * 加载分割页面WebView请求（iPad专用）
	 * @param sUrl String 支付提交地址
	 */
	loadSplitWebViewRequest: function(sUrl) {
		ctsCmd.execVoidCmd(this.className, "loadSplitWebViewRequest", JSON.stringify([sUrl]));
	},
    /**
     * 加载左边WebView请求（iPad专用）
     * @param sUrl String  左边页面的地址，可不传，不传相当于刷新左边页面
     * @param sFun String 打开地址完成后调用JS方法
     * @param oParam Object 调用JS函数传的参数 参数可选
     * @param sShouldReload String 不传地址时是否要重新加载 默认重新加载 false则不重新加载
     */
    reloadLeftRequest:function(sUrl,sFun,oParam,sShouldReload){
        ctsCmd.execVoidCmd(this.className, "reloadLeftRequest", JSON.stringify([sUrl,sFun,oParam,sShouldReload]));

    },
	/**
	 * 选择通信录
	 * @param sCallback String function callback(sPhoneNumber){}
	 sPhoneNumber String 选择的手机号码
	 */
	pickContact: function(sCallback) {
		ctsCmd.execVoidCmd(this.className, "pickContact", JSON.stringify([sCallback]));
	}
};


/**
 * 通用接口方法对象
 */
var tools = {
	className: "Tools",
	/**
	 * 调试标识符
	 */
	debug: false,
	 
	/**
	 *  保存持久化登录信息
	 * @param responseHeader String 参数
	 */

	// responseHeader＝{
	//      “UIM-TCG”: “AFAFA”,
	//      “pToken”: “fafaefa”,
	//      “pUserName” :“waffaw”,
	//      “deviceId” : "FFFFFF",
	// }

	saveTGCCookie: function(responseHeader) {   
		ctsCmd.execVoidCmd(this.className,  "saveTGCCookie", JSON.stringify([responseHeader]));

	},
    openSettingsURLString: function() {
        ctsCmd.execVoidCmd(this.className,  "openSettingsURLString", "");
    },
	/**
	 *  登陆后键值对
	 * @param keys string ["gwHomeSet","elnHomeSet"]参数,空则为全部;出参为json
	 */
	getUserInfo: function(keys) {

		return JSON.parse(ctsCmd.execCmd(this.className, "getUserInfo", JSON.stringify([keys]))); //所选取的key值对应的字典或map的json｛gwHomeSet:...,elnHomeSet｝
	},

	/**
	 *  登陆成功广播和APP激活广播
	 * @param sCallback string  js方法名 "gwHomeSet"
	 */
	addObserverForUserInfo: function(sCallback) {

		 
		ctsCmd.execVoidCmd(this.className,  "addObserverForUserInfo", JSON.stringify([sCallback]));
		// 有广播时，调用对应js，并加上参数；gwHomeSet(result),result为int，0为未登陆，1为登陆


	},
	/**
	 * 获取无限极接口统一公共参数
	 * @return Array 接口公共参数
	 */
	getCommonParam: function() {
		return JSON.parse(ctsCmd.execCmd(this.className, "getCommonParam", JSON.stringify([])));
	},
	/**
	 * 设置页面标题
	 * @param sTitle String 标题
	 */
	setTitle: function(sTitle) {
		ctsCmd.execVoidCmd(this.className, "setTitle", JSON.stringify([sTitle]));
	},
	/**
	 * 显示提示
	 * @param sMsg String 提示内容
	 * @param iDuration int 显示时长，默认为2秒 参数可选
	 */
	showToast: function(sMsg, iDuration) {
		ctsCmd.execVoidCmd(this.className, "showToast", JSON.stringify([sMsg, iDuration]));
		//    senderMessageToOc(this.className, "showToast", JSON.stringify([sMsg,iDuration]));
	},
	/**
	 * 显示对话框
	 * @param sTitle String 标题
	 * @param sMsg String 提示内容
	 * @param aBtnTitles Array 按钮数组如: ['确定','取消']
	 * @param sCallback String 回调函数名 参数可选
	 *      结构function callback(iIndex){} iIndex从0开始
	 */
	showDialog: function(sTitle, sMsg, aBtnTitles, sCallback) {
		ctsCmd.execVoidCmd(this.className, "showDialog", JSON.stringify([sTitle, sMsg, aBtnTitles, sCallback]));
	},
	/**
	 *  微信分享  参数没有内容时传空字符串
	 *  @param 标题        string
	 *  @param 内容        string
	 *  @param 要分享的链接   string
	 *  @param 要分享的图片链接 string
	 *  @param 要分享的音乐链接 string
	 *  @param 分享类型   int 0文本 1图片 2新闻 3音乐 4视频 5应用 6非GIF消息 7GIF消息
     *  @param 要分享的id contentID
	 **/
	share2WX: function(title, msg, url, imgurl, musicurl, shareType, contentID,sCallBack) {
		ctsCmd.execVoidCmd(this.className, "share2WX", JSON.stringify([title, msg, url, imgurl, musicurl, shareType,contentID, sCallBack]));
	},
	/**
	 *  分享到指定平台  参数没有内容时传空字符串
	 *  @param 所分享的平台        array
	 *  @param 标题        string
	 *  @param 内容        string
	 *  @param 要分享的链接   string
	 *  @param 要分享的图片链接 string
	 *  @param 要分享的音乐链接 string
	 *  @param 分享类型   int 0文本 1图片 2新闻 3音乐 4视频 5应用 6非GIF消息 7GIF消息
     *  @param 要分享的id contentID
	 **/
	shareContent: function(shareList, title, msg, url, imgurl, musicurl, shareType,contentID, successCallback) {
		ctsCmd.execVoidCmd(this.className, "shareContent", JSON.stringify([shareList, title, msg, url, imgurl, musicurl, shareType, contentID,successCallback]));
	},

	//根据回调名称关闭对话框
	closeDialog: function(sCallback) {
		ctsCmd.execVoidCmd(this.className, "closeDialog", JSON.stringify([sCallback]));
	},

	/**
	 * 调整提示y坐标
	 * @param yCoord float 调整值 参数可选
	 */
	adjustToast: function(yCoord) {
		//console.log(yCoord);
		ctsCmd.execVoidCmd(this.className, "adjustToast", JSON.stringify([yCoord]));
	},
	/**
	 * 显示加载中进度框
	 * @param sMsg String 进度提示内容 参数可选
	 */
	showLoading: function(sMsg) {
		ctsCmd.execVoidCmd(this.className, "showLoading", JSON.stringify([sMsg]));
	},
	/**
	 * 关闭加载中进度框
	 */
	dismissLoading: function() {
		ctsCmd.execVoidCmd(this.className, "dismissLoading", JSON.stringify([]));
	},
	/**
	 * 设置返回动作，默认直接返回；设置动作后由开发者控制返回操作
	 * @param sFunName String 点击返回键或返回按钮时调用的JS 参数可选
	 */
	setBackAction: function(sFunName) {
		ctsCmd.execVoidCmd(this.className, "setBackAction", JSON.stringify([sFunName]));
	},
	/**
	 * 缩放图片
	 * @param imgs  json数组：格式：["图片1的本地绝对路径","图片2的本地绝对路径"]
	 *
	 */
	lookPhoto: function(imgs) {
		ctsCmd.execVoidCmd(this.className, "lookPhoto", JSON.stringify([imgs]));
	},
	/**
	 *  选取系统相册图片，可多选
	 *  callback内容：图片路径的数组
	 */
	chooseSysPhoto: function(sCallback) {
		ctsCmd.execVoidCmd(this.className, "chooseSysPhoto", JSON.stringify([sCallback]));
	},
	/**
	 *  选取系统相册，可多选
	 *  maxOption 可选上限
	 *  list 已选相册的哈希表
	 * callback内容：图片路径哈希表
	 */
	chooseMorePhotoToH5: function(maxOption, list, sCallback, isThumbSmall, isPersistence) {
		ctsCmd.execVoidCmd(this.className, "chooseMorePhotoToH5", JSON.stringify([maxOption, list, sCallback, isThumbSmall, isPersistence]));
	},
	choosePhotos: function(sCallback, maximumImagesCount, scale, isThumbSmall, isBase64Result, defaultSelectList) {
		ctsCmd.execVoidCmd(this.className, "choosePhotos", JSON.stringify([maximumImagesCount, defaultSelectList, scale, isThumbSmall, isBase64Result, sCallback]));
	},
	/**
	 *  在导航栏右上角增加一个按钮
	 *
	 *  @param text     导航栏的问题
	 *  @param callback 回调方法
	 */
	addRightBtn: function(text, callback) {
		ctsCmd.execVoidCmd(this.className, "addRightBtn", JSON.stringify([text, callback]));
	},
	/**
	 *  选取系统相册，对图片进行缩放，翻转等操作
	 *  callback内容：图片路径数组
	 */
	chooseCropPhotoToH5: function(sCallback) {
		ctsCmd.execVoidCmd(this.className, "chooseCropPhotoToH5", JSON.stringify([sCallback]));
	},
	/**
	 *  H5调用原生存储页面和高度
	 *  参数：ScrollID
	 *  参数：ScrollHeight
	 */
	postScrollHeightToTop: function(scrollId, height) {
		ctsCmd.execVoidCmd(this.className, "postScrollHeightToTop", JSON.stringify([scrollId, height]));
	},
	/**
	 *  发送短信
	 *  参数：电话号码
	 *  参数：内容
	 */
	sendMessage: function(telNumber, text) {
		ctsCmd.execVoidCmd(this.className, "sendMessage", JSON.stringify([telNumber, text]));
	},

	/**
	 * 获取客户端请求host：
	 * @return json对象：gbss，uim，emcs，root（属性的使用请参考接口文档说明，自带https://前缀）
	 */
	scanBarcode: function(sCallback, isContinue) {
		ctsCmd.execVoidCmd(this.className, "scanBarcode", JSON.stringify([sCallback, isContinue]));
	},
	/**
	 *  进入扫描页面
	 */
	sendScanningResults: function(msg) {
		ctsCmd.execVoidCmd(this.className, "sendScanningResults", JSON.stringify([msg]));
	},
	/**
	 *  关闭扫描界面
	 */
	closeBarcode: function(sCallback) {
		ctsCmd.execVoidCmd(this.className, "closeBarcode", JSON.stringify([sCallback]));
	},
	/**
	 *  回传结果给扫描页面
	 */
	getHost: function() {
		return JSON.parse(ctsCmd.execCmd(this.className, "getHost", JSON.stringify([])));
	},
	/**
	 * 客户端版本检测
	 * @param sCallback String 回调函数名 参数可选 结构function callback(hasUpdate){} hasUpdate boolean类型
	 */
	checkVersion: function(sCallback) {
		ctsCmd.execVoidCmd(this.className, "checkVersion", JSON.stringify([sCallback]));
	},
	/**
	 * 打电话
	 * @param sPhoneNumber String 电话号码
	 */
	makePhoneCall: function(sPhoneNumber) {
		ctsCmd.execVoidCmd(this.className, "makePhoneCall", JSON.stringify([sPhoneNumber]));
	},
	/**
	 * 安全退出
     *@para isHiddenAlert bool 是否隐藏温馨提示框
	 */
	logout: function(isHiddenAlert) {
		ctsCmd.execVoidCmd(this.className, "logout", JSON.stringify([isHiddenAlert]));
	},
	/**
	 * 日期选择器
	 * @param sCallback String 回调函数
	 *      result String 选择的日期，格式：YYYY-MM-DD HH:mm:ss
	 *      function callback(result);
	 * @param iDateType int 选择器类型：0 Date 1 Time 2 DateAndTime
	 * @param sSelected String 默认选中的日期，格式：Y-M-D H:m:s
	 */
	showDatePicker: function(sCallback, iDateType, sSelected) {
		ctsCmd.execVoidCmd(this.className, "showDatePicker", JSON.stringify([sCallback, iDateType, sSelected]));
	},
	/**
	 * 业务密码确认
	 * @param sCallback String 回调函数名 结构function callback(bResult){} bResult boolean 验证结果
	 */
	confirmBusinessPwd: function(sCallback) {
		ctsCmd.execVoidCmd(this.className, "confirmBusinessPwd", JSON.stringify([sCallback]));
	},
	/**
	 * ecb加密
	 * @param sOldText String 要加密的内容
	 * @return String 加密后内容
	 */
	ecbEncrypt: function(sOldText) {
		return ctsCmd.execCmd(this.className, "ecbEncrypt", JSON.stringify([sOldText]));
	},
	/**
	 * 保存网页临时缓存
	 * @param sKey String key名称
	 * @param oValue Object 要保存的内容
	 * @return boolean 结果
	 */
	saveTempCache: function(sKey, oValue) {
		return ctsCmd.execCmd(this.className, "saveTempCache", JSON.stringify([sKey, oValue]));
	},
	/**
	 * 读取网页临时缓存
	 * @param sKey String 查询的key名称
	 * @return Object 保存的内容
	 */
	readTempCache: function(sKey) {
		return ctsCmd.execCmd(this.className, "readTempCache", JSON.stringify([sKey]));
	},
	/**
	 * 清除网页临时缓存
	 * @return Object 保存的内容
	 */
	cleanTempCache: function() {
		ctsCmd.execCmd(this.className, "cleanTempCache", JSON.stringify([]));
	},
	/**
	 * 主动旋转屏幕
	 * @param rotation 0竖屏（默认），1横屏，2重力感应控制
	 */
	rotateScreen: function(rotation) {
		ctsCmd.execVoidCmd(this.className, "rotateScreen", JSON.stringify([rotation]));
	},
	/**
	 * 显示指引页
	 * @param sImgName String 图片名不包含图片后缀
	 * @param sModuleIdentifier String 模块标识
	 */
	addTipsToController: function(sImgName, sModuleIdentifier, callback) {
		ctsCmd.execVoidCmd(this.className, "addTipsToController", JSON.stringify([sImgName, sModuleIdentifier, callback]));
	},
	/**
	 * 获取主题定义的颜色值
	 * @param sColorName String configure.xml文件定义的颜色值key名称
	 * @return String 16进制的颜色值 如：#000000
	 */
	themeColor: function(sColorName) {
		return ctsCmd.execCmd(this.className, "themeColor", JSON.stringify([sColorName]));
	},
	/**
	 * 调用ipad左边分屏webView页面的js函数
	 * @param sFunNames String js函数名
	 */
	callPadLeftJS: function(sFunName) {
		ctsCmd.execVoidCmd(this.className, "callPadLeftJS", JSON.stringify([sFunName]));
	},
	takePhoto: function(sCallback) {
		ctsCmd.execVoidCmd(this.className, "takePhoto", JSON.stringify([sCallback]));
	},
	takePhotoParam: function(thumbScale, isBase64Result, sCallback) {
		ctsCmd.execVoidCmd(this.className, "takePhoto", JSON.stringify([sCallback, thumbScale, isBase64Result]));
	},
	getLocation: function(sCallback) {
		ctsCmd.execVoidCmd(this.className, "getLocation", JSON.stringify([sCallback]));
	},
	uploadFileByByte: function(filePath, uploadPath, tokenUrl, sCallBack, paramJson) {
		ctsCmd.execVoidCmd(this.className, "uploadFileByByte", JSON.stringify([filePath, uploadPath, tokenUrl, sCallBack, paramJson]));
	},
	uploadPhoto: function(photoFile, photoType, sCallBack) {
		ctsCmd.execVoidCmd(this.className, "uploadPhoto", JSON.stringify([photoFile, photoType, sCallBack]));
	},
	openAppAndCopyMsg: function(Msg, openType) {
		ctsCmd.execVoidCmd(this.className, "openAppAndCopyMsg", JSON.stringify([Msg, openType]));
	},
	wechatPay: function(type, jsonStr, sCallback) {
		ctsCmd.execVoidCmd(this.className, "wechatPay", JSON.stringify([type, jsonStr, sCallback]));
	}
};

/**
 * 用户设置信息对象
 */
var userDefault = {
	className: "Tools",
	/**
	 * 读取用户设置信息
	 * @param sKey String 查询的key名称
	 * @return Object 保存的内容
	 */
	readValue: function(sKey) {
		var result = ctsCmd.execCmd(this.className, "readUserDefault", JSON.stringify([sKey]));
		return result;
	},
	/**
	 * 保存信息到用户设置
	 * @param sKey String key名称
	 * @param oValue Object 要保存的内容
	 * @return boolean 结果
	 */
	saveValue: function(sKey, oValue) {
		return JSON.parse(ctsCmd.execCmd(this.className, "saveUserDefault", JSON.stringify([sKey, oValue])));
	}
};

/**
 * 内存缓存对象
 */
var memory = {
	className: "Tools",
	/**
	 * 读取用户设置信息
	 * @param sKey String 查询的key名称
	 * @return Object 保存的内容
	 */
	readValue: function(sKey) {

		var result = ctsCmd.execCmd(this.className, "readMemory", JSON.stringify([sKey]));
		return result;
	},
	/**
	 * 保存信息到用户设置
	 * @param sKey String key名称
	 * @param oValue Object 要保存的内容
	 * @return boolean 结果
	 */
	saveValue: function(sKey, oValue) {
		return JSON.parse(ctsCmd.execCmd(this.className, "saveMemory", JSON.stringify([sKey, oValue])));
	}
};

/**
 * 数据库对象
 */
var database = {
	className: "Database",
	/**
	 * 查询数据库内容
	 * @param sSql String 查询语句
	 * @param aParams Array 使用?占位符时的sql语句参数 参数可选
	 * @return Array 查询结果
	 */
	querySql: function(sSql, aParams) {
		return JSON.parse(ctsCmd.execCmd(this.className, "querySql", JSON.stringify([sSql, aParams])));
	},
	/**
	 * 增 删 改数据库内容
	 * @param sSql String 执行语句
	 * @param aParams Array 使用?占位符时的sql语句参数 参数可选
	 * @return boolean 执行结果
	 */
	execSql: function(sSql, aParams) {
		return JSON.parse(ctsCmd.execCmd(this.className, "execSql", JSON.stringify([sSql, aParams])));
	}

};

/**
 * 缓存处理对象
 */
var cache = {
	className: "NHWebCache",
	/**
	 * 清除缓存
	 * @param sCallback String 回调函数名 参数可选
	 *      result boolean 结果
	 *      结构function callback(result){}
	 */
	clean: function(sCallback) {
		ctsCmd.execVoidCmd(this.className, "clean", JSON.stringify([sCallback]));
	},
	//设置缓存
	setH5Cache: function(keys, value) {
		ctsCmd.execVoidCmd(this.className, "setH5Cache", JSON.stringify([keys, value]));
	},
	getH5Cache: function(keys) {
		var result = ctsCmd.execCmd(this.className, "getH5Cache", JSON.stringify([keys]));
		return result;
	},
	clearH5Cache: function() {
		ctsCmd.execVoidCmd(this.className, "clearH5Cache", JSON.stringify([]));
	},
	/**
	 * 下载图片并缓存到缓存器中
	 * @param sImgUrl String 图片地址
	 * @param sUserInfo String 需要保存的内容
	 * @param sCallback(imgUrl,filePath,sUserInfo);
	 */
	cacheImageWithUrl: function(sCallback, sImgUrl, sUserInfo) {
		ctsCmd.execVoidCmd(this.className, "cacheImageWithUrl", JSON.stringify([sCallback, sImgUrl, sUserInfo]));
	}
};

/**
 * 网络请求对象
 */
var network = {
	className: "Network",
    
    /**   检测网络状态
     *    sCallback	String 回调函数名 ，返回 状态码 string类型
     *    0 没有网络
     *    1 WIFI网络
     *    2 移动网络数据
     */
    checkNetworkChanging:function(sCallback){
         ctsCmd.execVoidCmd(this.className, "checkNetworkChanging", JSON.stringify([sCallback]));
     },
    
    
	/**
	 * get方式请求http接口内容
	 * @param sUrl String 请求地址
	 * @param jParam JSON 请求参数
	 * @param sCallback String 回调函数名
	 *      code int 状态码 无网络:-101 地址不合法:-102；其它参照http状态码定义
	 *      result 成功时为服务器返回的数据，其它为错误内容
	 *      结构function callback(result,code){}
	 * @param bIsCache boolean 参数可选 是否需要缓存
	 */
	get: function(sUrl, jParam, sCallback, bIsCache) {
		ctsCmd.execVoidCmd(this.className, "get", JSON.stringify([sUrl, jParam, sCallback, bIsCache]));
	},
	/**
	 * post方式请求http接口内容
	 * @param sUrl String 请求地址
	 * @param jParam JSON 请求参数
	 * @param sCallback String 回调函数名
	 *      code int 状态码 无网络:-101 地址不合法:-102 用户未授权访问通讯录:-304；其它参照http状态码定义
	 *      result 成功时为服务器返回的数据，其它为错误内容
	 *      结构function callback(result,code){}
	 */
	post: function(sUrl, jParam, sCallback) {
		ctsCmd.execVoidCmd(this.className, "post", JSON.stringify([sUrl, jParam, sCallback]));
	},
	/**
	 * get方式请求http接口内容
	 * @param sUrl String 请求地址
	 * @param jParam JSON 请求参数
	 * @param sCallback
	 *      String 回调函数名 code int 状态码 无网络:-101 地址不合法:-102；其它参照http状态码定义
	 *      result 成功时为服务器返回的数据，其它为错误内容 结构function callback(result,code){}
	 * @param bIsCache boolean 参数可选 是否需要缓存
	 */
	getForCDN: function(sUrl, jParam, sCallback, isCND) {
		ctsCmd.execVoidCmd(this.className, "get", JSON.stringify([sUrl, jParam, sCallback]));
	},
	/**
	 * post方式请求http接口内容(CDN)
	 * @param sUrl String 请求地址
	 * @param jParam JSON 请求参数
	 * @param sCallback String 回调函数名
	 *      code int 状态码 无网络:-101 地址不合法:-102；其它参照http状态码定义
	 *      result 成功时为服务器返回的数据，其它为错误内容 结构function callback(code,result){}
	 */
	postForCDN: function(sUrl, jParam, sCallback, isCDN) {
		ctsCmd.execVoidCmd(this.className, "post", JSON.stringify([sUrl, jParam, sCallback]));
	},
	/**
	 * 返回当前网络状态
	 * @return int 0没有网络，1gprs网络，2wifi网络
	 */
	checkNetState: function() {
		return ctsCmd.execCmd(this.className, "checkNetState", JSON.stringify([]));
	},
	/**
	 * 上传通讯录到服务器
	 * command.arguments = []
	 * @param sCallback String 回调函数名
	 *      code int 状态码 无网络:-101 地址不合法:-102；其它参照http状态码定义
	 *      result 成功时为服务器返回的数据，其它为错误内容
	 *      结构function callback(code,result){}
	 */
	uploadContacts: function(sCallback) {
		ctsCmd.execVoidCmd(this.className, "uploadContacts", JSON.stringify([sCallback]));
	},
	showLastNetworkErrorInfo: function() {
		ctsCmd.execVoidCmd(this.className, "showLastNetworkErrorInfo", JSON.stringify([]));
	}
};


/**
 * 百度统计
 */
var baiduTools = {
	className: "BaiduStatistical",
	/**
	 * 记录某页面的跳入
	 * @param name String 页面名称
	 */
	recordPageStart: function(strName) {
		ctsCmd.execVoidCmd(this.className, "recordPageStart", JSON
			.stringify([strName]));
	},
	/**
	 * 记录某页面的跳出
	 * @param name String 页面名称
	 */
	recordPageEnd: function(strName) {
		ctsCmd.execVoidCmd(this.className, "recordPageEnd", JSON
			.stringify([strName]));
	},
	/**
	 * 记录一次事件点击
	 * @param eventId String 为module_name
	 * @param eventLabel String 为dealerNo
	 */
	recordEventNumber: function(strModuleName, dealerNo) {
		ctsCmd.execVoidCmd(this.className, "recordEventNumber", JSON
			.stringify([strModuleName, dealerNo]));
	},
	/**
	 * 记录一次事件开始
	 * @param eventId String 为module_name
	 * @param eventLabel String 为dealerNo
	 */
	recordEventStart: function(strEventId, dealerNo) {
		ctsCmd.execVoidCmd(this.className, "recordEventStart", JSON
			.stringify([strEventId, dealerNo]));
	},
	/**
	 * 记录一次事件结束
	 * @param eventId String 为module_name
	 * @param eventLabel String 为dealerNo
	 */
	recordEventEnd: function(strEventId, dealerNo) {
		ctsCmd.execVoidCmd(this.className, "recordEventEnd", JSON
			.stringify([strEventId, dealerNo]));
    }
  
    
};
var CatStatistical={
analytics:function(aa){
    ctsCmd.execVoidCmd("CatStatistical", "analytics", JSON
                       .stringify([aa]));
},
crashed:function(crashDetail){
    ctsCmd.execVoidCmd("CatStatistical", "crashed", JSON
                       .stringify([crashDetail]));
},
monitor:function(monitorDetail){
        ctsCmd.execVoidCmd("CatStatistical", "monitor", JSON
                           .stringify([monitorDetail]));
    }
    
};