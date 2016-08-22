//
//  Tools.h
//  Infinitus
//
//  Created by Frank Fan on 14-8-14.
//  Copyright (c) 2014年 zhangli. All rights reserved.
//

//#import <WebViewExten/WebViewExten.h>
//#import "ISAlertView.h"
//#import "TimeActionSheet.h"
//#import "ConfirmPwdViewController.h"
//#import "ELCImagePickerController.h"
//#import "ScannerViewController.h"
//#import "AppShareData.h"
//#import "MessageController.h"
#import <UIKit/UIKit.h>
#import <Cordova/CDVPlugin.h>
//#import "DownloadFileManager.h"
//#import "OpenFileManager.h"
//#import "RBDMuteSwitch.h"


/**
 * 页面工具插件类
 */
@interface BSLTools : CDVPlugin
<UINavigationControllerDelegate,
UIImagePickerControllerDelegate>

/**
 *  拍照增加了返回图片转化成Base64
 */
@property (nonatomic) BOOL isBase64Result;
/**
 *  拍照缩略图的Scale
 */
@property (nonatomic) CGFloat thumbScale;




/**
 * 获取无限极接口统一公共参数
 * command.arguments = [];
 * @return Array 接口公共参数
 */
- (void)getCommonParam:(CDVInvokedUrlCommand *)command;

/**
 * 设置页面标题
 * command.arguments = [sTitle];
 * @param sTitle String 标题
 */
- (void)setTitle:(CDVInvokedUrlCommand *)command;

/**
 * 显示对话框
 * command.arguments = [sTitle,sMsg,aBtnTitles,sCallback];
 * @param sTitle String 标题
 * @param sMsg String 提示内容
 * @param aBtnTitles Array 按钮数组如: ['确定','取消']
 * @param sCallback String 回调函数名 参数可选 结构function callback(iIndex){} iIndex从0开始
 */
- (void)showDialog:(CDVInvokedUrlCommand *)command;

/**
 *  关闭对话框
 *  @param CALLBACK 要关闭的对话框的回调名称
 */
-(void)closeDialog:(CDVInvokedUrlCommand*)command;

/**
 * 显示提示
 * command.arguments = [sMsg,iDuration];
 * @param sMsg String 提示内容
 * @param iDuration int 显示时长，默认为2秒 参数可选
 */
- (void)showToast:(CDVInvokedUrlCommand *)command;

/**
 * 显示加载中进度框
 * command.arguments = [sMsg];
 * @param sMsg String 进度提示内容 参数可选
 */
- (void)showLoading:(CDVInvokedUrlCommand *)command;

/**
 * 关闭加载中进度框
 * command.arguments = [];
 */
- (void)dismissLoading:(CDVInvokedUrlCommand *)command;

/**
 * 设置返回动作，默认直接返回；设置动作后由开发者控制返回操作
 * command.arguments = [sFunName];
 * @param sFunName String 点击返回键或返回按钮时调用的JS 参数可选
 */
- (void)setBackAction:(CDVInvokedUrlCommand *)command;

/**
 * 缩放图片
 * command.arguments = [imgs];
 * @param imgs  json数组：格式：["图片1的本地绝对路径","图片2的本地绝对路径"]
 */
- (void)lookPhoto:(CDVInvokedUrlCommand *)command;


/**
 * 获取客户端请求host：
 * command.arguments = [];
 * @returns json对象：gbss，uim，emcs，root，cdn（属性的使用请参考接口文档说明，自带https://前缀）
 */
- (void)getHost:(CDVInvokedUrlCommand *)command;

/**
 * 读取用户设置信息
 * command.arguments = [sKey];
 * @param sKey String 查询的key名称
 * @return Object 保存的内容
 */
- (void)readUserDefault:(CDVInvokedUrlCommand *)command;

/**
 * 保存信息到用户设置
 * command.arguments = [sKey, oValue];
 * @param sKey String key名称
 * @param oValue Object 要保存的内容
 */
- (void)saveUserDefault:(CDVInvokedUrlCommand *)command;

/**
 * 读取用户设置信息
 * command.arguments = [sKey];
 * @param sKey String 查询的key名称
 * @return Object 保存的内容
 */
- (void)readMemory:(CDVInvokedUrlCommand *)command;

/**
 * 保存信息到用户设置
 * command.arguments = [sKey, oValue];
 * @param sKey String key名称
 * @param oValue Object 要保存的内容
 * @return boolean 结果
 */
- (void)saveMemory:(CDVInvokedUrlCommand *)command;

/**
 * 客户端版本检测
 * command.arguments = [sCallback];
 * @param sCallback String 回调函数名 参数可选 结构function callback(hasUpdate){}
 */
- (void)checkVersion:(CDVInvokedUrlCommand *)command;

/**
 * 打电话
 * command.arguments = [sPhoneNumber];
 * @param sPhoneNumber String 电话号码
 */
- (void)makePhoneCall:(CDVInvokedUrlCommand *)command;

/**
 * 安全退出
 */
- (void)logout:(CDVInvokedUrlCommand *)command;

/**
 * 数据选择器
 */
- (void)showPicker:(CDVInvokedUrlCommand *)command;

/**
 * 日期选择器
 * command.arguments = [sCallback,iDateType,sSelected];
 * @param sCallback String 回调函数
 *      result String 选择的日期，格式：Y-M-D H:m:s
 *      function callback(result);
 * @param iDateType int 选择器类型：0 Date 1 Time 2 DateAndTime
 * @param sSelected String 默认选中的日期，格式：Y-M-D H:m:s
 */
- (void)showDatePicker:(CDVInvokedUrlCommand *)command;

/**
 * 业务密码确认
 * command.arguments = [sCallback];
 * @param sCallback String 回调函数名 结构function callback(bResult){} bResult 验证结果
 */
- (void)confirmBusinessPwd:(CDVInvokedUrlCommand *)command;

/**
 * ecb加密
 * command.arguments = [sOldText];
 * @param sOldText String 要加密的内容
 * @return String 加密后内容
 */
- (void)ecbEncrypt:(CDVInvokedUrlCommand *)command;

/**
 * 保存网页临时缓存
 * @param sKey String key名称
 * @param oValue Object 要保存的内容
 * @return boolean 结果
 */
- (void)saveTempCache:(CDVInvokedUrlCommand *)command;

/**
 * 读取网页临时缓存
 * @param sKey String 查询的key名称
 * @return Object 保存的内容
 */
- (void)readTempCache:(CDVInvokedUrlCommand *)command;

/**
 * 清除网页临时缓存
 * @return Object 保存的内容
 */
- (void)cleanTempCache:(CDVInvokedUrlCommand *)command;

/**
 * 主动旋转屏幕
 * @param rotation 0竖屏（默认），1横屏，2重力感应控制
 */
- (void)rotateScreen:(CDVInvokedUrlCommand *)command;

/**
 * 显示指引页
 * @param sImgName String 图片名不包含图片后缀
 * @param sModuleIdentifier String 模块标识
 */
- (void)addTipsToController:(CDVInvokedUrlCommand *)command;

/**
 * 获取主题包定义的颜色值
 * @param sColorName String configure.xml文件定义的颜色值key名称
 * @return String 16进制的颜色值 如：#000000
 */
- (void)themeColor:(CDVInvokedUrlCommand *)command;

/**
 * 调用ipad左边分屏webView页面的js函数
 * @param sFunNames String js函数名
 */
- (void)callPadLeftJS:(CDVInvokedUrlCommand *)command;

/**
 *  @param title
 *  @param message
 *  @param url
 *  @param imgurl
 *  @param musicUrl
 */
-(void)share2WX:(CDVInvokedUrlCommand*)command;

/**
 *  获取经纬度
 *  @param 回调函数名称
 */
-(void)getLocation:(CDVInvokedUrlCommand*)command;

/**
 *  拍照
 *  @param 回调函数名称
 */
-(void)takePhoto:(CDVInvokedUrlCommand*)command;

/**
 *  七牛上传
 *  @param filePath json字符串（数组）本地文件路径串
 *  @param uploadPath json字符串（数组）七牛路路经串
 *  @param tokenUrl 字符串 获取token的url
 *  @param sCallBack 字符串 回调函数名称
 */
-(void)uploadFileByByte:(CDVInvokedUrlCommand*)command;
/**
 *  上传文件到infinitus
 *  @param photoFile 文件路径
 *  @param photoType 上传类型
 *  @param sCallBack 字符串 回调函数名称
 */
- (void)uploadPhoto:(CDVInvokedUrlCommand*)command;
/**
 *  相册组件
 */
- (void)chooseLocalPhotos:(CDVInvokedUrlCommand *)command;
/**
 *  退出UIViewController
 */
- (void)closeBarcode:(CDVInvokedUrlCommand *)command;
/**
 *  打开微信，或者qq，并复制内容到剪贴板
 *  @param Msg 复制的内容
 *  @param openType 打开的类型 0是微信 1是qq
 */
- (void)openAppAndCopyMsg:(CDVInvokedUrlCommand *)command;



/**
 *  当控件获取Focus时，调用原生接口
 *  @param scrollId
 *  @param scrollHeight
 */
-(void)postScrollHeightToTop:(CDVInvokedUrlCommand *)command;

/**
 *  发送短信
 */
-(void)sendMessage:(CDVInvokedUrlCommand *)command;


/**
 *  检测是否已安装第三方应用
 */
- (void)checkAppInstall:(CDVInvokedUrlCommand *)command;
/*
 * 微信支付
 */
- (void)wechatPay:(CDVInvokedUrlCommand *)command;

/**
 *  分享到指定平台
 */
- (void)shareContent:(CDVInvokedUrlCommand *)command;
/**
 *  上传文件到指定服务器
 */
- (void)uploadData:(CDVInvokedUrlCommand*)command;
/**
 *  右上角添加一个按钮,样式和返回按钮一模一样
 *
 */
- (void)addRightBtn:(CDVInvokedUrlCommand *)command;
/**
 *  打开设置页面
 */
- (void)openSettingsURLString:(CDVInvokedUrlCommand *)command;


/**
 *  文件打开
 *  参数 JSON
 *     {
 *      "isOther": Boolean 是否必须使用第三方打开,
 *      "isNotExist": Boolean 文件不存在是否提示用户是否下载
 *      "downloadUrl" : String 该文件的下载地址,
 *      "localFile" : String 本地的文档路径
 *     }
 *
 *   使用场景：
 *   1.需要打开的本地文件，请传入本地文档的路径。目前暂时只支持第三那方打开的方式。
 *   2.需要打开远程文件，则会先搜索本地是否有缓存，根据isNotExist这个参数，当缓存不存在的时候，是否进行下载。
 *   3.远程文件会默认存到tmp目录。
 *   4.版本支持 2.7 and later。
 *  @param command
 */
-(void)openLocalFile:(CDVInvokedUrlCommand *)command;


/**
 *  {
 * @option //标识当前以下参数为可选
 * "vibrate ": Boolean 是否开启震动,
 * "vibrateHz": int (建议不要超过10)震动频率,只对Android生效，iOS默认1~2秒，高频率。
 * "sound": Boolean 是否播放声音,
 * "soundPath": 声音文件的相对路径, 模块名称/xxx.wav，注意Android和iOS的声音格式不一致。
 * }
 *
 *  @param command
 */
-(void)audioServicesPlay:(CDVInvokedUrlCommand *)command;

/**
 *  登录成功或APP激活通知
 *
 *  @param command
 */
-(void)addObserverForUserInfo:(CDVInvokedUrlCommand*)command;
/**
 *  @author Suycity, 2016/08/15
 *
 *  关闭WebView广播
 *
 */
-(void)addObserverForCloseWebView:(CDVInvokedUrlCommand*)command;

@end
