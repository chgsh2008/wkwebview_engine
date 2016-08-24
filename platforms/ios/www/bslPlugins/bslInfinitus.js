define([], function(require, exports, module) {
	/**
	 * 旧版通用接口方法对象
	 */
	var ift_new = {
		descr: "bsl.infinitus",

		picker: {
			/**
			 * 显示对话框
			 * "title": "温馨提示", // 必选 String 显示的标题，可支持Html文本，字体支持必须是原生支持的字体。
			 * "content": "请重新登录", // 必选 String 显示的内容，可支持Html文本，字体支持必须是原生支持的字体。
			 * "buttomTitles"  : ["确定","取消"],//可选 按钮的可选数组，最多支持3个
			 * "backgroundColor" : "0xFFFFF",//可选 String 16进制的颜色值 默认显示当前的主题颜色
			 *      结构function callback(iIndex){} iIndex从0开始
			 */
			showDialog: function(sCallback, json) {
				cordova.exec(sCallback, null,
					"BSLPicker", "showDialog", [json]);
			},

			showDataPicker: function(sCallback, json) {
				cordova.exec(sCallback, null,
					"BSLPicker", "showDataPicker", [json]);
			},
			/**
			 * 业务密码确认
			 * @param sCallback String 回调函数名 结构function callback(bResult){} bResult boolean 验证结果
			 */
			confirmBusinessPwd: function(successCallback) {
				cordova.exec(successCallback, null,
					"BSLPicker", "confirmBusinessPwd", []);
			}
		},
		/**
		 * 页面跳转对象
		 */
		transfer: {
			gotoBusinessQuery: function(cubeid) {
				cordova.exec(null, null,
					"BSLTransfer", "gotoBusinessQuery", [cubeid]);
			},
			/**
			 * 返回到上一个HTML页面或返回到上一个视图
			 * @param bIsGoView boolean 为真时不调用浏览器返回直接返回到上一个视图 参数可选
			 * @param sFun String 返回后调用上个页面的JS 参数可选
			 * @param oParam Object 调用函数传的参数 参数可选
			 */
			returnBack: function(bIsGoView, oParam, sFun) {
				cordova.exec(null, null,
					"BSLTransfer", "returnBack", [bIsGoView, sFun, oParam]);
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
				cordova.exec(null, null,
					"BSLTransfer", "openWebPage", [jsonStr]);
			},
			/**
			 * 打一个新视图
			 * @param sUrl String HTML页面在线或本地地址
			 * @param sInitFun String 打开新页面调用页面的JS 参数可选
			 * @param oInitParam Object 调用函数传的参数 参数可选
			 * @param sTitle String 标题
			 * @param jNavInfo JSON 菜单栏参数配置
			 */
			openPageWithTitle: function(sUrl, sInitFun, oInitParam, sTitle, jNavInfo) {
				//				cordova.exec(null, null,
				//					"BSLTransfer", "openPage", [sUrl, sInitFun, oInitParam, sTitle, jNavInfo]);
				this.openWebPage({
					"url": sUrl,
					"sInitFun": sInitFun,
					"oInitParam": oInitParam,
					"sTitle": sTitle,
					"jNavInfo": jNavInfo
				});
			},
			/**
			 *  关闭视图
			 */
			closePage: function(sUrl) {
				cordova.exec(null, null,
					"BSLTransfer", "closePage", [sUrl]);
			},
			/**
			 * 打一个新视图
			 * @param sUrl String HTML页面在线或本地地址
			 * @param sFlag bool 打开新页面时是否删除中间webview true删除 false不删
			 * @param jNavInfo JSON 菜单栏参数配置
			 */
			openPage: function(sUrl, sFlag, jNavInfo) {
				//				cordova.exec(null, null,
				//					"BSLTransfer", "openNewPage", [sUrl, sFlag, jNavInfo]);
				this.openWebPage({
					"url": sUrl,
					"sFlag": sFlag,
					"jNavInfo": jNavInfo
				});
			},
			/**
			 * 在当前视图加载一个新页面；使用此方法将清除web的前进和后退历史
			 * @param sUrl String HTML页面在线或本地地址
			 */
			loadPageWithUrl: function(sUrl) {
				cordova.exec(null, null,
					"BSLTransfer", "loadPageWithUrl", [sUrl]);
			},
			/**
			 * 用户账号信息失效时，登出该账号
			 */
			logoutByUserInvalid: function() {
				cordova.exec(null, null,
					"BSLTransfer", "logoutByUserInvalid", []);
			},
			/**
			 * 返回到首页
			 */
			goHome: function() {
				cordova.exec(null, null,
					"BSLTransfer", "goHome", []);
			},
			/**
			 * 登录接口
			 * @param sCallback String function callback(bLogin){} bLogin 布尔类型 是否登录成功
			 */
			login: function(successCallback) {
				cordova.exec(successCallback, null,
					"BSLTransfer", "login", []);
			},
			/**
			 * 跳转到支付页面
			 * @param sPayUrl String 支付提交地址
			 * @param sCallback String function callback(jData){}
			 jData JSON对象 支付结果；用户取消支付时对象为null
			 */
			openPayPage: function(sPayUrl, paySecond, successCallback) {
				cordova.exec(successCallback, null,
					"BSLTransfer", "openPayPage", [sPayUrl, paySecond]);
			},
			/**
			 * 加载分割页面WebView请求
			 * @param sUrl String 支付提交地址
			 */
			loadSplitWebViewRequest: function(sUrl, successCallback) {
				cordova.exec(successCallback, null,
					"BSLTransfer", "loadSplitWebViewRequest", [sUrl]);
			},
            /**
             * 是否分割页面openSplitView
             * @param isShouldOpen ，0为不要，1为要
            */
            openSplitView:function(isShouldOpen,successCallback){
                cordova.exec(successCallback, successCallback,
                    "BSLTransfer", "openSplitView", [isShouldOpen]);
       
            },
            /**
             * 加载左边的页面地址
             * @param sUrl ，为地址，不传相当于刷新当前页面
             * @param sFun String 打开地址完成后调用JS方法
             * @param oParam Object 调用JS函数传的参数 参数可选
             * @param sShouldReload String 不传地址时是否要重新加载 默认重新加载 false则不重新加载
             */
            reloadLeftRequest:function(sUrl,sFun,oParam,sShouldReload){
                cordova.exec(null, null,
                    "BSLTransfer", "reloadLeftRequest", [sUrl,sFun,oParam,sShouldReload]);
       
            },
           /**
            * 加载分割页面WebView请求
            * @param sUrl String 支付提交地址
            */
           selectedTabItem: function(json) {
               cordova.exec(null, null,
                            "BSLTransfer", "selectedTabItem", [json]);
           },
			/**
			 * 选择通信录
			 * @param sCallback String function callback(sPhoneNumber){}
			 sPhoneNumber String 选择的手机号码
			 */
			pickContact: function(successCallback) {
				cordova.exec(successCallback, null,
					"BSLTransfer", "pickContact", []);
			}
		},
		/**
		 * 通用接口方法对象
		 */
		tools: {

			/**
			 * 保存持久化登录信息
			 * @param responseHeader String 参数
			 */
			saveTGCCookie:   function(responseHeader) {    
				cordova.exec(null,  null, "BSLTools",  "saveTGCCookie", [responseHeader]);
			},
			/**
			 * 登陆后键值对
			 * @param responseHeader string ["gwHomeSet","elnHomeSet"]参数，空则为所有；出参为字典或map
			 */
			getUserInfo: function(funCallback, keys) {
				cordova.exec(funCallback, funCallback,
					"BSLTools", "getUserInfo", [keys]);
			}, 
			/**
			 * 登陆成功广播和APP激活广播
			 * @param funCallback: function(result){}  //result为int，0为未登陆，1为登陆
			 */
			addObserverForUserInfo: function(funCallback) {
					cordova.exec(funCallback, funCallback, "BSLTools", "addObserverForUserInfo", []);
			},
            addObserverForCloseWebView: function(funCallback) {
                   cordova.exec(funCallback, funCallback, "BSLTools", "addObserverForCloseWebView", []);
           },
				/**
				 *  打开文件，
				 *   使用场景：
				 *   1.需要打开的本地文件，请传入本地文档的路径。目前暂时只支持第三那方打开的方式。
				 *   2.需要打开远程文件，则会先搜索本地是否有缓存，根据isNotExist这个参数，当缓存不存在的时候，是否进行下载。
				 *   3.远程文件会默认存到tmp目录。
				 *   4.版本支持 2.7 and later。
				 *
				 *  jsonStr包含：
				 *  @param isOther     是否必须使用第三方打开, 目前暂时只支持第三那方打开的方式。
				 *  @param isNotExist  文件不存在是否提示用户是否下载
				 *  @param downloadUrl 该文件的下载地址,
				 *  @param localFile   本地的文档路径
				 */
			openLocalFile: function(jsonStr) {
				cordova.exec(null, null,
					"BSLTools", "openLocalFile", [jsonStr]);
			},

			preview: function(imageDic) {
				cordova.exec(null, null, "BSLTools", "preview", [imageDic]);
			},
			/*
			 url: 类型为数组类型的字符串；支持本地路径、网络路径、base64
			 urlType:整形，显示图片路径的类型：0：本地路径；1：网络地址；2：base64图片；3：本地路径或网络地址，通过http来前缀判断
			 zoom:布尔类型，是否可以缩放
			 position:整形，默认显示第几张图片。
			 showPositionTip:布尔类型，是否显示图片总数、图片当前页码数的提示文字
			 */
			sendMessage: function(telNumber, text) {
				cordova.exec(null, null,
					"BSLTools", "sendMessage", [telNumber, text]);
			},
			/**
			 * 获取无限极接口统一公共参数
			 * @return Array 接口公共参数
			 */
			getCommonParam: function(successCallback) {
				cordova.exec(successCallback, null,
					"BSLTools", "getCommonParam", []);
			},
			/**
			 * 设置页面标题
			 * @param sTitle String 标题
			 */
			setTitle: function(sTitle) {
				cordova.exec(null, null,
					"BSLTools", "setTitle", [sTitle]);
			},
			/**
			 * 显示对话框
			 * @param sTitle String 标题
			 * @param sMsg String 提示内容
			 * @param aBtnTitles Array 按钮数组如: ['确定','取消']
			 * @param sCallback String 回调函数名 参数可选
			 *      结构function callback(iIndex){} iIndex从0开始
			 */
			showDialog: function(sTitle, sMsg, aBtnTitles, successCallback) {
				cordova.exec(successCallback, null,
					"BSLTools", "showDialog", [sTitle, sMsg, aBtnTitles]);
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
			share2WX: function(title, msg, url, imgurl, musicurl, shareType,contentID, successCallback) {
                if(!successCallback){//兼容旧方法
                        cordova.exec(contentID, null,
                                     "BSLTools", "share2WX", [title, msg, url, imgurl, musicurl, shareType,title]);
                }else{
                        cordova.exec(successCallback, null,
                                     "BSLTools", "share2WX", [title, msg, url, imgurl, musicurl, shareType,contentID]);
                }
			},
			checkAppInstall: function(type, successCallback) {
				cordova.exec(successCallback, null,
					"BSLTools", "checkAppInstall", [type]);
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
                if(!successCallback){//兼容旧方法
                    cordova.exec(contentID, null,
                                 "BSLTools", "shareContent", [shareList,title, msg, url, imgurl, musicurl, shareType,title]);
                }else{
                    cordova.exec(successCallback, null,
                             "BSLTools", "shareContent", [shareList, title, msg, url, imgurl, musicurl, shareType,contentID]);
                }
			},
			//根据回调名称关闭对话框
			closeDialog: function() {
				cordova.exec(null, null,
					"BSLTools", "closeDialog", [""]);
			},

			/**
			 * 显示提示
			 * @param sMsg String 提示内容
			 * @param iDuration int 显示时长，默认为2秒 参数可选
			 */
			showToast: function(sMsg, iDuration) {
				cordova.exec(null, null,
					"BSLTools", "showToast", [sMsg, iDuration]);
			},
			/**
			 * 调整提示y坐标
			 * @param yCoord float 调整值 参数可选
			 */
			adjustToast: function(yCoord) {
				cordova.exec(null, null,
					"BSLTools", "adjustToast", [yCoord]);
			},
			/**
			 * 显示加载中进度框
			 * @param sMsg String 进度提示内容 参数可选
			 */
			showLoading: function(sMsg) {
				cordova.exec(null, null,
					"BSLTools", "showLoading", [sMsg]);
			},
			/**
			 * 关闭加载中进度框
			 */
			dismissLoading: function() {
				cordova.exec(null, null,
					"BSLTools", "dismissLoading", []);
			},
			/**
			 * 设置返回动作，默认直接返回；设置动作后由开发者控制返回操作
			 * @param sFunName String 点击返回键或返回按钮时调用的JS 参数可选
			 */
			setBackAction: function(sFunName) {
				cordova.exec(null, null,
					"BSLTools", "setBackAction", [sFunName]);
			},
			/**
			 * 缩放图片
			 * @param imgs  json数组：格式：["图片1的本地绝对路径","图片2的本地绝对路径"]
			 *
			 */
			lookPhoto: function(imgs) {
				cordova.exec(null, null,
					"BSLTools", "lookPhoto", [imgs]);
			},
			/**
			 *  选取系统相册图片，可多选
			 *  callback内容：图片路径的数组
			 */
			chooseSysPhoto: function(successCallback) {
				this.chooseLocalPhotos(successCallback, {
					"maximumImagesCount": 100,
					"isReturnsImage": true, //是否只返回UIImage
					"isOnOrder": false //是否多选
				});
			},
			/**
			 *  选取系统相册，可多选
			 *  maxOption 可选上限
			 *  list 已选相册的哈希表
			 * callback内容：图片路径哈希表
			 */
			chooseMorePhotoToH5: function(maxOption, list, successCallback, isThumbSmall) {
				this.chooseLocalPhotos(successCallback, {
					"maximumImagesCount": maxOption,
					"defaultSelectList": list,
					"isThumbSmall": isThumbSmall,
					"isReturnsImage": false, //是否只返回UIImage
					"isOnOrder": true //是否多选
				});
			},
			/**
			 *
			 jsonParam:{
			     maximumImagesCount	整形， 最大能选择的图片数量
			     defaultSelectList	数组字符串，默认选中的图片
			     scale	浮点数，比例，0-1
			     isThumbSmall	布尔，true：缩略图使用小图，android为72*72；false:缩略图压缩一定的比例，宽和高的比例和原图一致
			     isBase64Result	布尔，图片是否返回路径，还是base64编码
			 }
			 */
			choosePhotos: function(maximumImagesCount, defaultSelectList, scale, isThumbSmall, isBase64Result, sCallback) {
				this.chooseLocalPhotos(sCallback, {
					"maximumImagesCount": maximumImagesCount,
					"defaultSelectList": defaultSelectList,
					"scale": scale,
					"isThumbSmall": isThumbSmall,
					"isBase64Result": isBase64Result,
					"isReturnsImage": false, //是否只返回UIImage
					"isOnOrder": true //是否多选
				});
			},
			chooseLocalPhotos: function(sCallback, jsonParam) {
				cordova.exec(sCallback, null,
					"BSLTools", "chooseLocalPhotos", [jsonParam]);
			},
			/**
			 *  在导航栏右上角增加一个按钮
			 *
			 *  @param text     导航栏的问题
			 *  @param callback 回调方法
			 */
			addRightBtn: function(text, successCallback) {
				cordova.exec(successCallback, null,
					"BSLTools", "addRightBtn", [text]);
			},
			openSettingsURLString: function() {
				cordova.exec(null, null,
					"BSLTools", "openSettingsURLString", []);
			},
			/**
			 *  选取系统相册，对图片进行缩放，翻转等操作
			 *  callback内容：图片路径数组
			 */
			chooseCropPhotoToH5: function(successCallback) {
				cordova.exec(successCallback, null,
					"BSLTools", "chooseCropPhotoToH5", []);
			},
			/**takePhoto
			 *  H5调用原生存储页面和高度
			 *  参数：ScrollID
			 *  参数：ScrollHeight
			 */
			postScrollHeightToTop: function(scrollId, height) {
				cordova.exec(null, null,
					"BSLTools", "postScrollHeightToTop", [scrollId, height]);
			},
			/**
			 * 获取客户端请求host：
			 * @return json对象：gbss，uim，emcs，root（属性的使用请参考接口文档说明，自带https://前缀）
			 */
			scanBarcode: function(isContinue, successCallback) {
				cordova.exec(successCallback, null,
					"BSLTools", "scanBarcode", [isContinue]);
			},
			/**
			 *  进入扫描页面
			 */
			sendScanningResults: function(msg) {
				cordova.exec(null, null,
					"BSLTools", "sendScanningResults", [msg]);
			},
			/**
			 *  关闭扫描界面
			 */
			closeBarcode: function() {
				cordova.exec(null, null,
					"BSLTools", "closeBarcode", []);
			},
			/**
			 *  回传结果给扫描页面
			 */
			getHost: function(successCallback) {
       
				cordova.exec(successCallback, null,
                             "BSLTools", "getHost", []);
       
            },
			/**
			 * 客户端版本检测
			 * @param sCallback String 回调函数名 参数可选 结构function callback(hasUpdate){} hasUpdate boolean类型
			 */
			checkVersion: function(successCallback) {
				cordova.exec(successCallback, null,
					"BSLTools", "checkVersion", []);
			},
			/**
			 * 打电话
			 * @param sPhoneNumber String 电话号码
			 */
			makePhoneCall: function(sPhoneNumber) {
				cordova.exec(null, null,
					"BSLTools", "makePhoneCall", [sPhoneNumber]);
			},
			/**
			 * 安全退出
             *@isHiddenAlert BOOL 是否隐藏温馨提示框
			 */
			logout: function(isHiddenAlert) {
				cordova.exec(null, null,
					"BSLTools", "logout", [isHiddenAlert]);
			},
			/**
			 * 日期选择器
			 * @param successCallback String 回调函数
			 *      result String 选择的日期，格式：YYYY-MM-DD HH:mm:ss
			 *      function callback(result);
			 * @param iDateType int 选择器类型：0 Date 1 Time 2 DateAndTime
			 * @param sSelected String 默认选中的日期，格式：Y-M-D H:m:s
			 */
			showDatePicker: function(iDateType, sSelected, successCallback) {
				cordova.exec(successCallback, null,
					"BSLTools", "showDatePicker", [iDateType, sSelected]);
			},
			/**
			 * 业务密码确认
			 * @param sCallback String 回调函数名 结构function callback(bResult){} bResult boolean 验证结果
			 */
			confirmBusinessPwd: function(successCallback) {
				cordova.exec(successCallback, null,
					"BSLTools", "confirmBusinessPwd", []);
			},
			/**
			 * ecb加密
			 * @param sOldText String 要加密的内容
			 * @return String 加密后内容
			 */
			ecbEncrypt: function(sOldText, successCallback) {
				cordova.exec(successCallback, null,
					"BSLTools", "ecbEncrypt", [sOldText]);
			},
			/**
			 * 保存网页临时缓存
			 * @param sKey String key名称
			 * @param oValue Object 要保存的内容
			 * @return boolean 结果
			 */
			saveTempCache: function(sKey, oValue) {
				cordova.exec(null, null,
					"BSLTools", "saveTempCache", [sKey, oValue]);
			},
			/**
			 * 读取网页临时缓存
			 * @param sKey String 查询的key名称
			 * @return Object 保存的内容
			 */
			readTempCache: function(sKey, successCallback) {
				cordova.exec(successCallback,
					null,
					"BSLTools", "readTempCache", [sKey]);

			},
			/**
			 * 清除网页临时缓存
			 * @return Object 保存的内容
			 */
			cleanTempCache: function() {
				cordova.exec(null, null,
					"BSLTools", "cleanTempCache", []);
			},
			/**
			 * 主动旋转屏幕
			 * @param rotation 0竖屏（默认），1横屏，2重力感应控制
			 */
			rotateScreen: function(rotation) {
				cordova.exec(null, null,
					"BSLTools", "rotateScreen", [rotation]);
			},
			/**
			 * 显示指引页
			 * @param sImgName String 图片名不包含图片后缀
			 * @param sModuleIdentifier String 模块标识
             * @param callback 图片点击后回调
			 */
			addTipsToController: function(sImgName, sModuleIdentifier, callback) {
				cordova.exec(callback, null,
					"BSLTools", "addTipsToController", [sImgName, sModuleIdentifier]);
			},
			/**
			 * 获取主题定义的颜色值
			 * @param sColorName String configure.xml文件定义的颜色值key名称
			 * @return String 16进制的颜色值 如：#000000
			 */
			themeColor: function(sColorName, successCallback) {
				cordova.exec(successCallback, null,
					"BSLTools", "themeColor", [sColorName]);
			},
			/**
			 text	字符串	支付订单中显示的文字
			 price	字符串	支付价格，单位是分；"100"代表1元，"1"代表1分钱
			 order	字符串	我们服务器上生成的订单号，必须是唯一的，否则只能第一次支付成功
			 callback	方法变量	支付回调方法，该方法返回一个整形数据：
			 2：支付成功
			 1：支付失败
			 0：支付取消
			 */
			wechatPay: function(type, jsonStr, successCallback) {
				cordova.exec(successCallback, null,
					"BSLTools", "wechatPay", [type, jsonStr]);
			},
			/**
			 * 调用ipad左边分屏webView页面的js函数
			 * @param sFunNames String js函数名
			 */
			callPadLeftJS: function(successCallback) {
				cordova.exec(successCallback,
					null,
					"BSLTools", "callPadLeftJS", []);
			},
			takePhoto: function(successCallback) {
				cordova.exec(successCallback, null,
					"BSLTools", "takePhoto", []);
			},
			takePhotoParam: function(thumbScale, isBase64Result, successCallback) {
				cordova.exec(successCallback, null,
					"BSLTools", "takePhoto", [thumbScale, isBase64Result]);
			},
			getLocation: function(successCallback) {
				cordova.exec(successCallback,
					null,
					"BSLTools", "getLocation", []);
			},
			uploadFileByByte: function(filePath, uploadPath, tokenUrl, successCallback, paramJson) {
				cordova.exec(successCallback, null,
					"BSLTools", "uploadFileByByte", [filePath, uploadPath, tokenUrl, paramJson]);
			},
			uploadPhoto: function(photoFile, photoType, successCallback) {
				cordova.exec(successCallback, null,
					"BSLTools", "uploadPhoto", [photoFile, photoType]);
			},
			/**
			 *  上传文件
			 *  详情查看iwiki文档
			 *  https://iwiki.infinitus.com.cn/pages/viewpage.action?pageId=16886923#id-原生提供给HTML5接口（Cordova）-上传文件
			 */
			uploadData: function(uploadType, ParamJson, uploadUrl, successCallback) {
				cordova.exec(successCallback, null,
					"BSLTools", "uploadData", [uploadType, ParamJson, uploadUrl]);
			},
			openAppAndCopyMsg: function(Msg, openType) {
				cordova.exec(null, null,
					"BSLTools", "openAppAndCopyMsg", [Msg, openType]);
			},
			/**
			 *  发起手机系统服务，震动并播放声音
			 *
			 *  @param json {
			 *  @option //标识当前以下参数为可选
			 *  "vibrate ": Boolean 是否开启震动,
			 *  "vibrateHz": int (建议不要超过10)震动频率,只对Android生效，iOS默认1~2秒，高频率。
			 *  "sound": Boolean 是否播放声音,
			 *  "soundPath": 声音文件的相对路径, 模块名称/xxx.wav，注意Android和iOS的声音格式不一致。
			 *  }
			 *
			 *  @return
			 */
			audioServicesPlay: function(successCallback, json) {
				cordova.exec(successCallback, null,
					"BSLTools", "audioServicesPlay", [json]);
			}
		},
		/**
		 * 用户设置信息对象
		 */
		userDefault: {
			/**
			 * 读取用户设置信息
			 * @param sKey String 查询的key名称
			 * @return Object 保存的内容
			 */
			readValue: function(sKey, successCallback) {
				cordova.exec(successCallback, null,
					"BSLTools", "readUserDefault", [sKey]);
			},
			/**
			 * 保存信息到用户设置
			 * @param sKey String key名称
			 * @param oValue Object 要保存的内容
			 * @return boolean 结果
			 */
			saveValue: function(sKey, oValue) {
				//var value = userDefault.saveValue(sKey, oValue);
				cordova.exec(null, null,
					"BSLTools", "saveUserDefault", [sKey, oValue]);
			}
		},
		/**
		 * 内存缓存对象
		 */
		memory: {
			/**
			 * 读取用户设置信息
			 * @param sKey String 查询的key名称
			 * @return Object 保存的内容
			 */
			readValue: function(sKey, successCallback) {
				cordova.exec(successCallback, null,
					"BSLTools", "readMemory", [sKey]);
			},
			/**
			 * 保存信息到用户设置
			 * @param sKey String key名称
			 * @param oValue Object 要保存的内容
			 * @return boolean 结果
			 */
			saveValue: function(sKey, oValue) {
				cordova.exec(null, null,
					"BSLTools", "saveMemory", [sKey, oValue]);
			}
		},
		/**
		 * 数据库对象
		 */
		database: {
			className: "Database",
			/**
			 * 查询数据库内容
			 * @param sSql String 查询语句
			 * @param aParams Array 使用?占位符时的sql语句参数 参数可选
			 * @return Array 查询结果
			 */
			querySql: function(sSql, aParams, successCallback) {
				cordova.exec(successCallback, null,
					"BSLDatabase", "querySql", [sSql, aParams]);
			},
			/**
			 * 增 删 改数据库内容
			 * @param sSql String 执行语句
			 * @param aParams Array 使用?占位符时的sql语句参数 参数可选
			 * @return boolean 执行结果
			 */
			execSql: function(sSql, aParams, successCallback) {
				cordova.exec(successCallback, null,
					"BSLDatabase", "executeSql", [sSql, aParams]);
			}
		},
		/**
		 * 缓存处理对象
		 */
		cache: {
			//设置缓存
			setH5Cache: function(keys, value) {
				cordova.exec(null, null,
					"BSLNHWebCache", "setH5Cache", [keys, value]);
			},
			getH5Cache: function(keys, successCallback) {
				cordova.exec(successCallback, null,
					"BSLNHWebCache", "getH5Cache", [keys]);
			},
			clearH5Cache: function() {
				cordova.exec(null, null,
					"BSLNHWebCache", "clearH5Cache", []);
			},
			clean: function() {
				cordova.exec(null, null,
					"BSLNHWebCache", "clean", []);
			},
			/**
			 * 下载图片并缓存到缓存器中
			 * @param sImgUrl String 图片地址
			 * @param sUserInfo String 需要保存的内容
			 * @param sCallback(imgUrl,filePath,sUserInfo);
			 */
			cacheImageWithUrl: function(sImgUrl, sUserInfo, successCallback) {
				cordova.exec(successCallback, null,
					"BSLNHWebCache", "cacheImageWithUrl", [sImgUrl, sUserInfo]);
			}
		},
		/**
		 * 网络请求对象
		 */
		network: {

			/**
			 *  检测网络状态
			 *
			 *  @param successCallback
			 */
			checkNetworkChanging: function(successCallback) {
				cordova.exec(successCallback, function(error) {}, "BSLNetwork", "checkNetworkChanging", []);
			},

			/**
			 * get方式请求http接口内容
			 * @param sUrl String 请求地址
			 * @param jParam JSON 请求参数
			 * @param sCallback String 回调函数名
			 *      code int 状态码 无网络:-101 地址不合法:-102；其它参照http状态码定义
			 *      result 成功时为服务器返回的数据，其它为错误内容
			 *      结构function callback(result,code){}
			 */
			get: function(sUrl, jParam, successCallback) {
				cordova.exec(successCallback, function(error) {},
					"BSLNetwork", "get", [sUrl, jParam]);
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
			post: function(sUrl, jParam, successCallback) {
				cordova.exec(successCallback, null,
					"BSLNetwork", "post", [sUrl, jParam]);
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
			getForCDN: function(sUrl, jParam, isCND, successCallback) {
				cordova.exec(successCallback, null,
					"BSLNetwork", "get", [sUrl, jParam]);
			},
			/**
			 * post方式请求http接口内容(CDN)
			 * @param sUrl String 请求地址
			 * @param jParam JSON 请求参数
			 * @param sCallback String 回调函数名
			 *      code int 状态码 无网络:-101 地址不合法:-102；其它参照http状态码定义
			 *      result 成功时为服务器返回的数据，其它为错误内容 结构function callback(code,result){}
			 */
			postForCDN: function(sUrl, jParam, isCDN, successCallback) {
				cordova.exec(successCallback, null,
					"BSLNetwork", "post", [sUrl, jParam]);
			},
			/**
			 * 返回当前网络状态
			 * @return int 0没有网络，1gprs网络，2wifi网络
			 */
			checkNetState: function(successCallback) {
				cordova.exec(successCallback, function(error) {}, "BSLNetwork", "checkNetState", []);
			},
			/**
			 * 上传通讯录到服务器
			 * command.arguments = []
			 * @param sCallback String 回调函数名
			 *      code int 状态码 无网络:-101 地址不合法:-102；其它参照http状态码定义
			 *      result 成功时为服务器返回的数据，其它为错误内容
			 *      结构function callback(code,result){}
			 */
			uploadContacts: function(successCallback) {
				cordova.exec(successCallback, null,
					"BSLNetwork", "uploadContacts", []);
			},
			showLastNetworkErrorInfo: function() {
				network.showLastNetworkErrorInfo();
			}
		},
		/**
		 * 百度统计
		 */
		baiduTools: {
			/**
			 * 记录某页面的跳入
			 * @param name String 页面名称
			 */
			recordPageStart: function(strName) {
				//baiduTools.recordPageStart(strName);
				cordova.exec(function(data) {
						//successCallback(data);
					}, function(error) {
						//failCallback(error);
					},
					"BSLBaiduStatistical", "recordPageStart", [strName]);
			},
			/**
			 * 记录某页面的跳出
			 * @param name String 页面名称
			 */
			recordPageEnd: function(strName) {
				//baiduTools.recordPageEnd(strName);
				cordova.exec(function(data) {
						//successCallback(data);
					}, function(error) {
						//failCallback(error);
					},
					"BSLBaiduStatistical", "recordPageEnd", [strName]);
			},
			/**
			 * 记录一次事件点击
			 * @param eventId String 为module_name
			 * @param eventLabel String 为dealerNo
			 */
			recordEventNumber: function(strModuleName, dealerNo) {
				//baiduTools.recordEventNumber(strModuleName);
				cordova.exec(function(data) {
						//successCallback(data);
					}, function(error) {
						//failCallback(error);
					},
					"BSLBaiduStatistical", "recordEventNumber", [strModuleName, dealerNo]);
			},
			/**
			 * 记录一次事件开始
			 * @param eventId String 为module_name
			 * @param eventLabel String 为dealerNo
			 */
			recordEventStart: function(strEventId, dealerNo) {
				//baiduTools.recordEventStart(strEventId);
				cordova.exec(function(data) {
						//successCallback(data);
					}, function(error) {
						//failCallback(error);
					},
					"BSLBaiduStatistical", "recordEventStart", [strEventId, dealerNo]);
			},
			/**
			 * 记录一次事件结束
			 * @param eventId String 为module_name
			 * @param eventLabel String 为dealerNo
			 */
			recordEventEnd: function(strEventId, dealerNo) {
				//baiduTools.recordEventEnd(strEventId);
				cordova.exec(function(data) {
						//successCallback(data);
					}, function(error) {
						//failCallback(error);
					},
					"BSLBaiduStatistical", "recordEventEnd", [strEventId, dealerNo]);
			}
		},
		/**
		 *   本地通知
		 */
		lcnotifiction: {
			/**
			 BSLUserNotification
			 */
			addNotification: function(Param, successCallback, errorCallback) {
				cordova.exec(successCallback, errorCallback,
					"BSLUserNotification", "addUserNotification", [Param]);
			},
			removeAllNotification: function() {
				cordova.exec(function() {}, function() {},
					"BSLUserNotification", "removeAllNotification", []);
			},
			removeNotification: function(Param, successCallback, errorCallback) {
				cordova.exec(successCallback, errorCallback,
					"BSLUserNotification", "removeUserNotification", [Param]);
			},
			getNotification: function(successCallback, errorCallback) {
				cordova.exec(successCallback, errorCallback,
					"BSLUserNotification", "getUserNotification", []);
			},
			getNavigationStatus: function(successCallback) {
				cordova.exec(successCallback, function(error) {},
					"BSLUserNotification", "getNavigationStatus", []);
			},
		},
       cat:{
       
          analytics: function(json){
                cordova.exec(null, null,
                    "BSLCatStatistical", "analytics", [json]);
           },
       crashed: function(json){
           cordova.exec(null, null,
                    "BSLCatStatistical", "crashed", [json]);
       },
       monitor:function(monitorDetail){
           cordova.exec(null, null,"BSLCatStatistical", "monitor", [monitorDetail]);
       },
       },
	}
	return ift_new;
})