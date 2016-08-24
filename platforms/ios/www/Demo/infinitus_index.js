/**
 * Created by kevin on 15/9/8.
 */

function chooseSysPhotoCallback(data) {
	alert("data： " + data);
};

function chooseMorePhotoToH5Callback(data) {
	alert("data： " + data);
}

function chooseCropPhotoToH5Callback(data) {
	alert("data： " + data);
}

function scanBarcodeCallback(data) {
	alert("data： " + data);
}

function sendScanningResultsCallback(data) {
	alert("data： " + data);
}

function closeBarcodeCallback(data) {
	alert("data： " + data);
}

function checkVersionCallback(data) {
	alert("data： " + data);
}

function showDatePickerCallback(data) {
	alert("data： " + data);
}

function confirmBusinessPwdCallback(data) {
	alert("data： " + data);
}

function callPadLeftJSCallback(data) {
	alert("data： " + data);
}

function takePhotoCallback(data) {
	alert("data： " + data);
}

function getLocationCallback(data) {
	alert("data： " + data);
}

function uploadFileByByteCallback(data) {
	alert("data： " + data);
}

function uploadPhotoCallback(data) {
	alert("data： " + data);
}

function returnBackCallback(data) {
	alert("data： " + data);
}

function loginCallback(data) {
	alert("data： " + data);
}

function pickContactCallback(data) {
	alert("data： " + data);
}

function cacheImageWithUrlCallback(data) {
	alert("data： " + data);
}

function getHttpCallbackFunName(data) {
	alert("data： " + data);
}

function uploadContactsCallbackFunName(data) {
	alert("data： " + data);
}

function callbackFileByByte(key, result) {
	alert("数组第一位 :" + typeof("广州") + "\n" + "数组第二位:" + typeof("广州") + "\n" + "数组第三位:" + typeof("广州"));
}

require.config({
	baseUrl: '../',
	paths: {
		bsl: 'bsl',
	}
});
require(['bsl'], function(bsl) {
	document.addEventListener('deviceready', onDeviceready, false);

	function onDeviceready() {
        
        document.getElementById("btnShowDataPicker").addEventListener('click', function() {
             bsl.infinitus.picker.showDataPicker(function(data) {
                 var str = "";
                 var i = 0;
                 for(i = 0; i < data.length; i++){
                    var num = i+1;
                    str += "数组第"+num+"位: "+typeof(data[0])+"\n";
                 }
               alert(str);
            },
             {
                 "dataSource":[
                               {"广东省": ["广州市", "深圳市", "肇庆市", "珠海市", "佛山市"]},
                               {"湖南省": ["长沙市", "株洲市"]},
                               {"湖北省": ["武汉市", "黄石市", "荆州市", "黄冈市"]}
                               ],
                "dataSourcePath":"",
                "depth":2,
                "defaultSelected":["北京市"]
             });
        });
        
        
        document.getElementById("btnAudioServicesPlay").addEventListener('click', function() {
             bsl.infinitus.tools.audioServicesPlay(function(data) {
             	alert(JOSN.stringify(data));
             },{"vibrate":true, "sound":true, "soundPath":"com.infinitus.setting/message.wav"});
       });

		//document.getElementById("btnBack").addEventListener('click',function () {
		//    window.history.back(-1);
		//});

		document.getElementById("btnOpenLocalFile").addEventListener('click', function() {

			/**
			 *  console.log具体可参数：https://github.com/apache/cordova-plugin-console
			 *  The plugin support following methods of the console object:
			 *  console.log
			 *  console.error
			 *  console.exception
			 *  console.warn
			 *  console.info
			 *  console.debug
			 *  console.assert
			 *  console.dir
			 *  console.dirxml
			 *  console.time
			 *  console.timeEnd
			 *  console.table
			 
			 *  Methods of the console object which are implemented, but do nothing:
			 *  console.clear
			 *  console.trace
			 *  console.groupEnd
			 *  console.timeStamp
			 *  console.profile
			 *  console.profileEnd
			 *  console.count
			 */
			console.log("测试-测试-测试-测试-console.log works well");


			/**
			 *  打开文件，
			 *   使用场景：
			 *   1.需要打开的本地文件，请传入本地文档的路径。目前暂时只支持第三那方打开的方式。
			 *   2.需要打开远程文件，则会先搜索本地是否有缓存，根据isNotExist这个参数，当缓存不存在的时候，是否进行下载。
			 *   3.远程文件会默认存到tmp目录。
			 *   4.版本支持 2.7 and later。
			 *
			 *  @param isOther     是否必须使用第三方打开, 目前暂时只支持第三那方打开的方式。
			 *  @param isNotExist  文件不存在是否提示用户是否下载
			 *  @param downloadUrl 该文件的下载地址,
			 *  @param localFile   本地的文档路径
			 */
			bsl.infinitus.tools.openLocalFile({
				"isNotExist": true,
				"downloadUrl": "https://itunesconnect.apple.com/docs/UsingApplicationLoader.pdf"
			});
		});

		document.getElementById("btnSendMessage").addEventListener('click', function() {
			/**
			 * 发送短信
			 */
			bsl.infinitus.tools.sendMessage("13600011122", "好好学习，天天向上");
		});

		document.getElementById("btnGetCommonParam").addEventListener('click', function() {

			/**
			 * 获取无限极接口统一公共参数
			 * @return Array 接口公共参数
			 */
			bsl.infinitus.tools.getCommonParam(
				function(data) {
					alert("success: " + JSON.stringify(data));

				});
		});

		document.getElementById("btnSetTitle").addEventListener('click', function() {
			/**
			 * 设置页面标题
			 * @param sTitle String 标题
			 */
			bsl.infinitus.tools.setTitle("新闻title");
		});

		document.getElementById("btnShowDialog").addEventListener('click', function() {
			/**
			 * 显示对话框
			 * @param sTitle String 标题
			 * @param sMsg String 提示内容
			 * @param aBtnTitles Array 按钮数组如: ['确定','取消']
			 * @param sCallback String 回调函数名 参数可选
			 *      结构function callback(iIndex){} iIndex从0开始
			 */
			bsl.infinitus.tools.showDialog("注意", "这是具体内容", "OK", function() {
				alert("yes, ok");
			});
		});

		document.getElementById("btnCloseDialog").addEventListener('click', function() {
			//根据回调名称关闭对话框
			bsl.infinitus.tools.closeDialog();
		});

		document.getElementById("btnShare2WX").addEventListener('click', function() {
			/**
			 *  微信分享  参数没有内容时传空字符串
			 *  @param 标题        string
			 *  @param 内容        string
			 *  @param 要分享的链接   string
			 *  @param 要分享的图片链接 string
			 *  @param 要分享的音乐链接 string
			 *  @param 分享类型   int 0文本 1图片 2新闻 3音乐 4视频 5应用 6非GIF消息 7GIF消息
			 **/
			bsl.infinitus.tools.shareContent([1, 2], "title", "message", "https://www.baidu.com/", "http://www.sxdaily.com.cn/NMediaFile/2015/0316/SXRB201503161058000498758459584.jpg", "", 1, function(data) {
				alert("success: " + data);
			});
		});

		document.getElementById("btnShowToast").addEventListener('click', function() {
			/**
			 * 显示提示
			 * @param sMsg String 提示内容
			 * @param iDuration int 显示时长，默认为2秒 参数可选
			 */
			bsl.infinitus.tools.showToast("保存成功", "2");
		});

		document.getElementById("btnAdjustToast").addEventListener('click', function() {
			/**
			 * 调整提示y坐标
			 * @param yCoord float 调整值 参数可选
			 */
			bsl.infinitus.tools.adjustToast(100);
			bsl.infinitus.tools.showToast("保存成功", "2");
		});

		document.getElementById("btnShowLoading").addEventListener('click', function() {
			/**
			 * 显示加载中进度框
			 * @param sMsg String 进度提示内容 参数可选
			 */
			bsl.infinitus.tools.showLoading("正在下载中 ...");
		});

		document.getElementById("btnDismissLoading").addEventListener('click', function() {
			/**
			 * 关闭加载中进度框
			 */
			bsl.infinitus.tools.dismissLoading();
		});

		document.getElementById("btnSetBackAction").addEventListener('click', function() {
			/**
			 * 设置返回动作，默认直接返回；设置动作后由开发者控制返回操作
			 * @param sFunName String 点击返回键或返回按钮时调用的JS 参数可选
			 */
			bsl.infinitus.tools.setBackAction("callBackFunctionName");
		});

		document.getElementById("btnLookPhoto").addEventListener('click', function() {
			/**
			 * 缩放图片
			 * @param imgs  json数组：格式：["图片1的本地绝对路径","图片2的本地绝对路径"]
			 *
			 */
			bsl.infinitus.tools.lookPhoto(["http://www.xxjxsj.cn/article/UploadPic/2009-10/2009101018545196251.jpg",
				"http://pic1a.nipic.com/2008-11-26/200811268173650_2.jpg"
			]);
		});
		document.getElementById("btnChooseSysPhoto").addEventListener('click', function() {
			bsl.infinitus.tools.chooseSysPhoto(function(data) {
				alert("data： " + JSON.stringify(data));
			});
		});
		/////////////////////////////
		document.getElementById("btnChooseSysPhoto_Old").addEventListener('click', function() {
			tools.chooseSysPhoto("chooseSysPhotoCallback");
		});

		document.getElementById("btnChooseSysPhoto_New").addEventListener('click', function() {
			bsl.infinitus.tools.chooseSysPhoto(function(data) {
				alert("data： " + JSON.stringify(data));
			});
		});
		//////////////////////////
		document.getElementById("btnChooseMorePhotoToH5_Old").addEventListener('click', function() {
			tools.chooseMorePhotoToH5(3, "", "chooseSysPhotoCallback");
		});

		document.getElementById("btnChooseMorePhotoToH5_New").addEventListener('click', function() {
			bsl.infinitus.tools.chooseMorePhotoToH5(3, "", function(data) {
				alert("data： " + JSON.stringify(data));
			}, true);
		});
		/////////////////////////////
		document.getElementById("btnChoosePhotos_Old").addEventListener('click', function() {
			tools.choosePhotos(3, "", 0.4, false, false, "chooseSysPhotoCallback");
		});

		document.getElementById("btnChoosePhotos_New").addEventListener('click', function() {

			bsl.infinitus.tools.chooseLocalPhotos(
				function(data) {
					alert("data： " + JSON.stringify(data));
				}, {
					"maximumImagesCount": 2,
					"defaultSelectList": "",
					"maxPixel": 600,
					"maxSize": 100,
					"isBase64Result": true
				});
		});
		/////////////////////////////
		//        <button id="btnChooseSysPhoto_New" class="button">新->单选图片</button>
		//        <button id="btnChooseSysPhoto_Old" class="button">旧->单选图片</button>
		//        <button id="btnChooseMorePhotoToH5_New" class="button">新->多选图片</button>
		//        <button id="btnChooseMorePhotoToH5_Old" class="button">旧->多选图片</button>
		//        <button id="btnChoosePhotos_New" class="button">新->多选图片,参数齐全</button>
		//        <button id="btnChoosePhotos_Old" class="button">旧->多选图片,参数齐全</button>

		document.getElementById("btnChooseMorePhotoToH5").addEventListener('click', function() {
			/**
			 *  选取系统相册，可多选
			 *  maxOption 可选上限
			 *  list 已选相册的哈希表
			 * callback内容：图片路径哈希表
			 */
			bsl.infinitus.tools.chooseMorePhotoToH5("10", ["图片1的本地绝对路径", "图片2的本地绝对路径"],
				function(data) {
					alert("data： " + JSON.stringify(data));
				}
			);

		});

		document.getElementById("btnChooseCropPhotoToH5").addEventListener('click', function() {
			/**
			 *  选取系统相册，对图片进行缩放，翻转等操作
			 *  callback内容：图片路径数组
			 */
			bsl.infinitus.tools.chooseCropPhotoToH5(
				function(data) {
					alert("data： " + JSON.stringify(data));
				});
		});

		document.getElementById("btnPostScrollHeightToTop").addEventListener('click', function() {
			/**
			 *  H5调用原生存储页面和高度
			 *  参数：ScrollID
			 *  参数：ScrollHeight
			 */
			bsl.infinitus.tools.postScrollHeightToTop("scroll_id", "150");
			alert("只是把H5的参数保存到原生里面去，看不到效果");
		});

		document.getElementById("btnScanBarcode").addEventListener('click', function() {
			/**
			 * 扫描二维码
			 * @return json对象
			 */
			bsl.infinitus.tools.scanBarcode(false,
				function(data) {
					alert("data： " + JSON.stringify(data));
				});
		});

		document.getElementById("btnSendScanningResults").addEventListener('click', function() {

			/**
			 *  进入扫描页面
			 *  注意: 这个只能传方法名作为字符串
			 */
			bsl.infinitus.tools.sendScanningResults("sendScanningResultsCallback");
		});

		document.getElementById("btnGetHost").addEventListener('click', function() {
			//获取Host
			bsl.infinitus.tools.getHost(function(data) {
				alert("data： " + JSON.stringify(data));
			});
		});

		document.getElementById("btnCloseBarcode").addEventListener('click', function() {
			/**
			 *  关闭扫描界面
			 */
			bsl.infinitus.tools.closeBarcode();
		});

		document.getElementById("btnCheckVersion").addEventListener('click', function() {
			/**
			 * 客户端版本检测
			 * @param sCallback String 回调函数名 参数可选 结构function callback(hasUpdate){} hasUpdate boolean类型
			 */
			bsl.infinitus.tools.checkVersion(function(data) {
				alert("data： " + JSON.stringify(data));
			});
		});

		document.getElementById("btnMakePhoneCall").addEventListener('click', function() {
			/**
			 * 打电话
			 * @param sPhoneNumber String 电话号码
			 */
			bsl.infinitus.tools.makePhoneCall("13900011123");
		});

		document.getElementById("btnLogout").addEventListener('click', function() {
			bsl.infinitus.tools.logout();
		});

		document.getElementById("btnShowDatePicker").addEventListener('click', function() {
			/**
			 * 日期选择器
			 * @param sCallback String 回调函数
			 *      result String 选择的日期，格式：YYYY-MM-DD HH:mm:ss
			 *      function callback(result);
			 * @param iDateType int 选择器类型：0 Date 1 Time 2 DateAndTime
			 * @param sSelected String 默认选中的日期，格式：Y-M-D H:m:s
			 */
			bsl.infinitus.tools.showDatePicker(0, {
					"selectDate": "2015-09-09 09:09:09",
					"MaxDate": "2015-10-1 00:00:00",
					"MinDate": "2015-09-08 00:00:00"
				},
				function(data) {
					alert("data： " + JSON.stringify(data));
				});
		});

		document.getElementById("btnConfirmBusinessPwd").addEventListener('click', function() {
			/**
			 * 业务密码确认
			 * @param sCallback String 回调函数名 结构function callback(bResult){} bResult boolean 验证结果
			 */
			bsl.infinitus.tools.confirmBusinessPwd(function(data) {
				alert("data： " + JSON.stringify(data));
			});
		});

		document.getElementById("btnEcbEncrypt").addEventListener('click', function() {
			/**
			 * ecb加密
			 * @param sOldText String 要加密的内容
			 * @return String 加密后内容
			 */
			bsl.infinitus.tools.ecbEncrypt("this is text need to encrypt",
				function(data) {
					alert("data： " + JSON.stringify(data));
				});
		});

		document.getElementById("btnSaveTempCache").addEventListener('click', function() {
			/**
			 * 保存网页临时缓存
			 * @param sKey String key名称
			 * @param oValue Object 要保存的内容
			 * @return boolean 结果
			 */
			bsl.infinitus.tools.saveTempCache("key", "this is a saved value");
		});

		document.getElementById("btnReadTempCache").addEventListener('click', function() {
			/**
			 * 读取网页临时缓存
			 * @param sKey String 查询的key名称
			 * @return Object 保存的内容
			 */
			bsl.infinitus.tools.readTempCache("key",
				function(data) {
					alert("data： " + JSON.stringify(data));
				});
		});

		document.getElementById("btnCleanTempCache").addEventListener('click', function() {
			/**
			 * 清除网页临时缓存
			 */
			bsl.infinitus.tools.cleanTempCache();
		});

		document.getElementById("btnRotateScreen").addEventListener('click', function() {
			/**
			 * 主动旋转屏幕
			 * @param rotation 0竖屏（默认），1横屏，2重力感应控制
			 */
			bsl.infinitus.tools.rotateScreen(1);
		});

		document.getElementById("btnAddTipsToController").addEventListener('click', function() {
			/**
			 * 显示指引页
			 * @param sImgName String 图片名不包含图片后缀
			 * @param sModuleIdentifier String 模块标识
			 */
			bsl.infinitus.tools.addTipsToController("bg_login@2x", "com.infinitus.settting");
		});

		document.getElementById("btnThemeColor").addEventListener('click', function() {
			/**
			 * 获取主题定义的颜色值
			 * @param sColorName String configure.xml文件定义的颜色值key名称
			 * @return String 16进制的颜色值 如：#000000
			 */
			bsl.infinitus.tools.themeColor("colorName",
				function(data) {
					alert("data： " + JSON.stringify(data));
				});
		});

		document.getElementById("btnCallPadLeftJS").addEventListener('click', function() {
			/**
			 * 调用ipad左边分屏webView页面的js函数
			 * @param sFunNames String js函数名
			 */
			bsl.infinitus.tools.callPadLeftJS(
				function(data) {
					alert("data： " + JSON.stringify(data));
				}
			);
		});

		document.getElementById("btnTakePhoto").addEventListener('click', function() {
			/**
			 * 拍照
			 * @param sFunNames String js函数名
			 */
			bsl.infinitus.tools.takePhoto(
				function(data) {
					alert("data： " + JSON.stringify(data));
				}
			);
		});

		document.getElementById("btnGetLocation").addEventListener('click', function() {
			/**
			 * 获取位置
			 * @param sFunNames String js函数名
			 */
			bsl.infinitus.tools.getLocation(
				function(data) {
					alert("data： " + JSON.stringify(data));
				});

		});

		document.getElementById("btnUploadPhoto").addEventListener('click', function() {
			bsl.infinitus.tools.chooseLocalPhotos(function(photos) {
				var photo = JSON.parse(photos);
				var keys = new Array(photo.length);
				var value = new Array(photo.length);
				for (var i = 0; i < photo.length; i++) {
					keys[i] = toString(new Date()) + i;
					value[i] = photo[i].pic;
				}

				/**
				 * 上传文件
				 * @param filePath 文件路径
				 * @param uploadPath 上传文件路径
				 * @param tokenUrl tokenUrl
				 * @param sFunNames String js函数名
				 */
				tools.uploadFileByByte(JSON.stringify(value), JSON.stringify(keys), "/gbss-mobile/front/gbss-mobile-newBusiness/qiniu/getUploadToken", "callbackFileByByte", {
					"isShowToast": true,
					"isMultipleCallBack": true
				});
			}, {        
				"maximumImagesCount": 9,
				        "maxPixel": 5,
				        "maxSize": 100,
				        "isThumbSmall": true,
				        "isBase64Result": false,
				        "isPersistence": false
			});
		});




		document.getElementById("btnOpenAppAndCopyMsg").addEventListener('click', function() {
			/**
			 * 打开微信或者QQ，并复制内容到剪贴板
			 * @param message 内容
			 * @param openType 打开的app
			 */
			bsl.infinitus.tools.openAppAndCopyMsg("message", 1);
		});


		document.getElementById("btnGotoBusinessQuery").addEventListener('click', function() {
			/**
			 * 根据ID打开BENDI模块
			 * @param cubeid 模块id
			 */
			bsl.infinitus.transfer.gotoBusinessQuery("cubeid");
		});

		document.getElementById("btnReturnBack").addEventListener('click', function() {
			//alert("before call cordova exec");
			/**
			 * 返回到上一个HTML页面或返回到上一个视图
			 * @param bIsGoView boolean 为真时不调用浏览器返回直接返回到上一个视图 参数可选
			 * @param sFun String 返回后调用上个页面的JS 参数可选
			 * @param oParam Object 调用函数传的参数 参数可选
			 */
			bsl.infinitus.transfer.returnBack(false, "", function(data) {
				alert("success: " + JSON.stringify(data));
			});
		});

		document.getElementById("btnOpenPage").addEventListener('click', function() {
			alert("请注意开发这个功能时，请参照原旧的调用参数\n这里演示的参数不是真正项目时的参数");
			/**
			 * 打一个新视图
			 * @param sUrl String HTML页面在线或本地地址
			 * @param sFlag bool 打开新页面时是否删除中间webview true删除 false不删
			 */
			bsl.infinitus.transfer.openPage("Demo/openpage_demo.html", true);
		});

		document.getElementById("btnOpenPageWithTitle").addEventListener('click', function() {
			alert("请注意开发这个功能时，请参照原旧的调用参数\n这里演示的参数不是真正项目时的参数");
			/**
			 * 打一个新视图
			 * @param sUrl String HTML页面在线或本地地址
			 * @param sFlag bool 打开新页面时是否删除中间webview true删除 false不删
			 */
			//			bsl.infinitus.transfer.openPageWithTitle("Demo/openpage_demo.html", "", "", "带title打开页面")
			//             bsl.infinitus.transfer.openPageWithTitle("https://www.baidu.com", "appShare", "", "页面测试", JSON.stringify({
			//                                                                                                                                                                       'navigationBar': 1
			//                                                                                                                                                                       }));

			bsl.infinitus.transfer.openPageWithTitle("https://www.baidu.com", "callback", "", "标题测试", JSON.stringify({
				'rotation': 1,
				'navigationBar': 1,
				'returnView': 1,
				'gotoneturl': true
			}));
		});

		document.getElementById("btnClosePage").addEventListener('click', function() {
//			alert("请注意开发这个功能时，请参照原旧的调用参数\n这里演示的参数不一定是真正项目时的参数");
			/**
			 *  关闭视图
			 */
			bsl.infinitus.transfer.closePage("Demo/infinitus_inex.html");
		});
        
        document.getElementById("btnOpenPageWithOption").addEventListener('click', function () {
            //全部参数的Key：sUrl,sInitFun,oInitParam,sTitle,JSON.stringify({'rotation' : 0})//最后一个参数的key是 jNavInfo
            //(1)
//              bsl.infinitus.transfer.openWebPage({"url":"https://www.baidu.com"});
            //(2)
//              bsl.infinitus.transfer.openWebPage({"url":"https://www.baidu.com","sTitle":"测试页面"});
            //(3)
              bsl.infinitus.transfer.openWebPage({"url":"https://www.baidu.com","sTitle":"测试页面",jNavInfo:{"rotation":1,"navigationBar":1,"returnView":1,"gotoneturl":true}});
            //(4)
//                bsl.infinitus.transfer.openWebPage({"url":"https://www.baidu.com","sFlag":true});
            //(5)
//                bsl.infinitus.transfer.openWebPage({"url":"https://www.baidu.com","sFlag":true,jNavInfo:true});
            //(6)
//              bsl.infinitus.transfer.openWebPage({"url":"https://www.baidu.com","sFlag":true,"sTitle":"测试页面",jNavInfo:true});
            //(7)
//              bsl.infinitus.transfer.openWebPage({"url":"https://www.baidu.com","sFlag":true,"sTitle":"测试页面",jNavInfo:{"rotation":1,"navigationBar":1,"returnView":1,"gotoneturl":true}});
            //(8)
//                bsl.infinitus.transfer.openWebPage({"url":"https://www.baidu.com","sFlag":true,"sTitle":"测试页面",jNavInfo:JSON.stringify({'navigationBar': 1})});
            //(9)
//                bsl.infinitus.transfer.openWebPage({"url":"com.infinitus.queryInvoiceBf/index.html#/com.infinitus.queryInvoiceBf/processingRecord","sFlag":true,"sTitle":"测试页面",jNavInfo:JSON.stringify({"rotation":1,"navigationBar":1,"returnView":1,"gotoneturl":false})});
         });


		document.getElementById("btnLoadPageWithUrl").addEventListener('click', function() {
//			alert("请注意开发这个功能时，请参照原旧的调用参数\n这里演示的参数不一定是真正项目时的参数");
			/**
			 * 在当前视图加载一个新页面；使用此方法将清除web的前进和后退历史
			 * @param sUrl String HTML页面在线或本地地址
			 */
			bsl.infinitus.transfer.loadPageWithUrl("https://www.baidu.com");
		});

		document.getElementById("btnLogoutByUserInvalid").addEventListener('click', function() {
			/**
			 * 用户账号信息失效时，登出该账号
			 */
			bsl.infinitus.transfer.logoutByUserInvalid();
		});

		document.getElementById("btnGoHome").addEventListener('click', function() {
//			alert("这个返回首页是关闭H5页面，返回到app的首页，现在无法演示");
			/**
			 * 返回到首页
			 */
			bsl.infinitus.transfer.goHome();
		});

		document.getElementById("btnLogin").addEventListener('click', function() {
			/**
			 * 登录接口
			 * @param sCallback String function callback(bLogin){} bLogin 布尔类型 是否登录成功
			 */
			bsl.infinitus.transfer.login(
				function(data) {
					alert("success: " + JSON.stringify(data));
				}
			);
		});

		document.getElementById("btnOpenPayPage").addEventListener('click', function() {
			alert("这个是打开支付页面，现在无法演示");
			/**
			 * 跳转到支付页面
			 * @param sPayUrl String 支付提交地址
			 * @param sCallback String function callback(jData){}
			 jData JSON对象 支付结果；用户取消支付时对象为null
			 */
			bsl.infinitus.transfer.openPayPage("payUrl", "",
				function(data) {
					alert("success: " + JSON.stringify(data));
				});
		});

		document.getElementById("btnWeChatPay").addEventListener('click', function() {
			bsl.infinitus.tools.wechatPay(0, {
				"prepayid": "wx2015120316323120ef9ae7ac050736"
			}, function(result) {
				alert("支付结果" + result);
			});
		});
		//
		document.getElementById("btncheckAppInstall").addEventListener('click', function() {
			bsl.infinitus.tools.checkAppInstall(3, function(result) {
				alert("检测结果" + result);
			});
		});
		//
		document.getElementById("btncheckPreview").
		addEventListener('click', function() {
			bsl.infinitus.tools.preview({
				"urlType": "1",
				"url": ["http://pica.nipic.com/2007-11-09/200711912453162_2.jpg",
					"http://img.taopic.com/uploads/allimg/130501/240451-13050106450911.jpg"
				],
				"zoom": "true",
				"position": "1",
				"showPositionTip": "true"
			});
		});
		document.getElementById("btnLoadSplitWebViewRequest").addEventListener('click', function() {
			alert("这个功能是在iPad下分屏功能，类似iPad的\"设置\"分屏，现在无法演示");
			/**
			 * 加载分割页面WebView请求
			 * @param sUrl String 支付提交地址
			 */
			bsl.infinitus.transfer.loadSplitWebViewRequest("pageUrl");
		});

		document.getElementById("btnPickContact").addEventListener('click', function() {
			/**
			 * 选择通信录
			 * @param sCallback String function callback(sPhoneNumber){}
			 sPhoneNumber String 选择的手机号码
			 */
			bsl.infinitus.transfer.pickContact(
				function(data) {
					alert("success: " + JSON.stringify(data));
				}
			);
		});


		document.getElementById("btnReadValue").addEventListener('click', function() {
			/**
			 * 读取用户设置信息
			 * @param sKey String 查询的key名称
			 * @return Object 保存的内容
			 */
			bsl.infinitus.userDefault.readValue("saveKey", function(data) {
				alert("success: " + JSON.stringify(data));
			});
		});

		document.getElementById("btnSaveValue").addEventListener('click', function() {
			/**
			 * 保存信息到用户设置
			 * @param sKey String key名称
			 * @param oValue Object 要保存的内容
			 * @return boolean 结果
			 */
			bsl.infinitus.userDefault.saveValue("saveKey", "saveValue");
		});


		document.getElementById("btnQuerySql").addEventListener('click', function() {
			/**
			 * 查询数据库内容
			 * @param sSql String 查询语句
			 * @param aParams Array 使用?占位符时的sql语句参数 参数可选
			 * @return Array 查询结果
			 */
			bsl.infinitus.database.querySql("select * from Table1 where name = ?", "kevin",
				function(data) {
					alert("success: " + JSON.stringify(data));
				});
		});

		document.getElementById("btnExecSql").addEventListener('click', function() {
			/**
			 * 增 删 改数据库内容
			 * @param sSql String 执行语句
			 * @param aParams Array 使用?占位符时的sql语句参数 参数可选
			 * @return boolean 执行结果
			 */
			bsl.infinitus.database.execSql("update Table1 set myName='newName' where name = ?", "kevin",
				function(data) {
					alert("success: " + JSON.stringify(data));
				});
		});


		document.getElementById("btnClean").addEventListener('click', function() {
			/**
			 * 清除缓存
			 * @param sCallback String 回调函数名 参数可选
			 *      result boolean 结果
			 *      结构function callback(result){}
			 */
			bsl.infinitus.cache.clean();
		});

		document.getElementById("btnSetH5Cache").addEventListener('click', function() {
			//设置缓存
			bsl.infinitus.cache.setH5Cache("key", "new value");
		});

		document.getElementById("btnGetH5Cache").addEventListener('click', function() {
			//获取缓存
			bsl.infinitus.cache.getH5Cache("key",
				function(data) {
					alert("success: " + JSON.stringify(data));
				});
		});

		document.getElementById("btnClearH5Cache").addEventListener('click', function() {
			////清除缓存
			bsl.infinitus.cache.clearH5Cache();
		});

		document.getElementById("btnCacheImageWithUrl").addEventListener('click', function() {
			/**
			 * 下载图片并缓存到缓存器中
			 * @param sImgUrl String 图片地址
			 * @param sUserInfo String 需要保存的内容
			 * @param sCallback(imgUrl,filePath,sUserInfo);
			 */
			//bsl.infinitus.cache.cacheImageWithUrl("cacheImageWithUrlCallback","http://down1.sucaitianxia.com/ai/21/ai4572.jpg","save text");
			bsl.infinitus.cache.cacheImageWithUrl("http://down1.sucaitianxia.com/ai/21/ai4572.jpg", "save text",
				function(data) {
					alert("success: " + JSON.stringify(data));
				});


		});


		document.getElementById("btnGet").addEventListener('click', function() {
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
			bsl.infinitus.network.get("https://gbssdev.infinitus.com.cn/gbss-mobile/front/gbss-mobile-newAccount/guest/getGuestLoginInfo?model=0&appVersion=2.2.1&version=3",
				"", false,
				function(data) {
					alert("success: " + JSON.stringify(data));
				});
		});

		document.getElementById("btnPost").addEventListener('click', function() {
			/**
			 * post方式请求http接口内容
			 * @param sUrl String 请求地址
			 * @param jParam JSON 请求参数
			 * @param sCallback String 回调函数名
			 *      code int 状态码 无网络:-101 地址不合法:-102 用户未授权访问通讯录:-304；其它参照http状态码定义
			 *      result 成功时为服务器返回的数据，其它为错误内容
			 *      结构function callback(result,code){}
			 */
			bsl.infinitus.network.post("https://gbssdev.infinitus.com.cn/gbss-mobile/front/gbss-mobile-newAccount/guest/getGuestLoginInfo?model=0&appVersion=2.2.1&version=3",
				"",
				function(data) {
					alert("success: " + JSON.stringify(data));
				});
		});

		document.getElementById("btnGetForCDN").addEventListener('click', function() {
			/**
			 * get方式请求http接口内容
			 * @param sUrl String 请求地址
			 * @param jParam JSON 请求参数
			 * @param sCallback
			 *      String 回调函数名 code int 状态码 无网络:-101 地址不合法:-102；其它参照http状态码定义
			 *      result 成功时为服务器返回的数据，其它为错误内容 结构function callback(result,code){}
			 * @param bIsCache boolean 参数可选 是否需要缓存
			 */
			bsl.infinitus.network.getForCDN("https://gbssdev.infinitus.com.cn/gbss-mobile/front/gbss-mobile-newAccount/guest/getGuestLoginInfo?model=0&appVersion=2.2.1&version=3",
				"", true,
				function(data) {
					alert("success: " + JSON.stringify(data));
				});
		});

		document.getElementById("btnPostForCDN").addEventListener('click', function() {
			/**
			 * post方式请求http接口内容(CDN)
			 * @param sUrl String 请求地址
			 * @param jParam JSON 请求参数
			 * @param sCallback String 回调函数名
			 *      code int 状态码 无网络:-101 地址不合法:-102；其它参照http状态码定义
			 *      result 成功时为服务器返回的数据，其它为错误内容 结构function callback(code,result){}
			 */
			bsl.infinitus.network.postForCDN("https://gbssdev.infinitus.com.cn/gbss-mobile/front/gbss-mobile-newAccount/guest/getGuestLoginInfo?model=0&appVersion=2.2.1&version=3",
				"", true,
				function(data) {
					alert("success: " + JSON.stringify(data));
				});
		});

		document.getElementById("btnCheckNetState").addEventListener('click', function() {
			/**
			 * 返回当前网络状态
			 * @return int 0没有网络，1gprs网络，2wifi网络
			 */
			bsl.infinitus.network.checkNetState(function(data) {
				alert("success: " + JSON.stringify(data));
			});
		});

		document.getElementById("btnUploadContacts").addEventListener('click', function() {
			/**
			 * 上传通讯录到服务器
			 * command.arguments = []
			 * @param sCallback String 回调函数名
			 *      code int 状态码 无网络:-101 地址不合法:-102；其它参照http状态码定义
			 *      result 成功时为服务器返回的数据，其它为错误内容
			 *      结构function callback(code,result){}
			 */
			bsl.infinitus.network.uploadContacts(
				function(data) {
					alert("success: " + JSON.stringify(data));
				}
			);
		});

		document.getElementById("btnShowLastNetworkErrorInfo").addEventListener('click', function() {
			/**
			 * 显示网络错误信息
			 */
			bsl.infinitus.network.showLastNetworkErrorInfo();
		});


		document.getElementById("btncheckNetworkChanging").addEventListener('click', function() {
			/**
			 * 显示网络错误信息
			 */
			bsl.infinitus.network.checkNetworkChanging(function(data) {
				alert("网络：" + data);
			});
		});


		document.getElementById("btnRecordPageStart").addEventListener('click', function() {
			/**
			 * 记录某页面的跳入
			 * @param name String 页面名称
			 */
			bsl.infinitus.baiduTools.recordPageStart("Demo/infinitus_index.html");
		});

		document.getElementById("btnRecordPageEnd").addEventListener('click', function() {
			/**
			 * 记录某页面的跳出
			 * @param name String 页面名称
			 */
			bsl.infinitus.baiduTools.recordPageEnd("Demo/infinitus_index.html");
		});

		document.getElementById("btnRecordEventNumber").addEventListener('click', function() {
			/**
			 * 记录一次事件点击
			 * @param eventId String 为module_name
			 * @param eventLabel String 为dealerNo
			 */
			bsl.infinitus.baiduTools.recordEventNumber("Demo/infinitus_index.html");
		});

		document.getElementById("btnRecordEventStart").addEventListener('click', function() {
			/**
			 * 记录一次事件开始
			 * @param eventId String 为module_name
			 * @param eventLabel String 为dealerNo
			 */
			bsl.infinitus.baiduTools.recordEventStart("eventId");
		});

		document.getElementById("btnRecordEventEnd").addEventListener('click', function() {
			/**
			 * 记录一次事件结束
			 * @param eventId String 为module_name
			 * @param eventLabel String 为dealerNo
			 */
			bsl.infinitus.baiduTools.recordEventEnd("eventId");
		});
		document.getElementById("addNotification").addEventListener('click', function() {
			var json = {
				"firstTime": "2015-10-29 15:50:00", // yyyy-MM-dd HH:mm:ss
				"ID": "12345",
				"repeatInterval": "0", //0123 (0 不循环 , 1 一天 ， 2周  以此类推)
				"repeatNumber": "2", // 当用户不处理的时候，再次处理的次数，默认0次 。
				"content": "我就是内容",
				"title": "我还是标题",
			}

			bsl.infinitus.lcnotifiction.addNotification(json, function(data) {
				alert("success： " + data);
			}, function(error) {
				alert("fail: " + error);
			});
		});
		document.getElementById("removeNotification").addEventListener('click',
			function() {
				var json = {
					"firstTime": "2015-10-29 15:50:00", // yyyy-MM-dd HH:mm:ss
					"ID": "12345",
					"repeatInterval": "0", //0123 (0 不循环 , 1 一天 ， 2周  以此类推)
					"repeatNumber": "2", // 当用户不处理的时候，再次处理的次数，默认0次 。
					"content": "我就是内容",
					"title": "我还是标题",
				}
				bsl.infinitus.lcnotifiction.removeNotification(json, function(data) {},
					function(error) {})
			});
		document.getElementById("getNotification").addEventListener('click',
			function() {

				bsl.infinitus.lcnotifiction.getNotification(json, function(data) {
					alert(data)
				}, function(error) {})
			});
		var buttons = ["确定"];
		document.getElementById("btnShowDialog_Picker").addEventListener('click',
			function() {
				bsl.infinitus.picker.showDialog(function(selectedIndex) {
										alert("Click Button index :" + selectedIndex + "  typeof : " + typeof(selectedIndex));
					if (buttons.length == 1) {
						buttons = ["退出购货", "现在设置"];
					} else if (buttons.length == 2) {
						buttons = ["保存并退出", "删除并退出", "继续支付"];
					} else {
						buttons = ["OK"];
					}
				}, {
					"title": "<p align=\"center\"><font color=\"#262626\" size=\"16pt\"><strong>请输入e帆网密码</strong></font></p>",
					"content": "<p align=\"right\"><font color=\"#b3b3b3\" size=\"14pt\">忘记e帆网密码\></font></p>",
					"buttomTitles": buttons,
					"backgroundColor": "",
				})
			});
			document.getElementById("btnConfirmBusinessPwd_Picker").addEventListener('click',
			function() {
				bsl.infinitus.picker.confirmBusinessPwd(function(selectedIndex) {
										alert("result :" + selectedIndex + "  typeof : " + typeof(selectedIndex));
					
				})
			});

	}
	//
});