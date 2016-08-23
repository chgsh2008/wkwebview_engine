//
//  AppConstants.h
//  UniversalArchitecture
//
//  Created by zhangli on 12-10-26.
//  Copyright (c) 2012年 issuser. All rights reserved.
//

/**
 *
 * 公共常量类 (需要写清楚注释，以"斜杠+两个星号"开头)
 *
 * @author  zhangli
 * @version  [V1.0.0, 2012-10-26]
 */


/****************************************请求头定义*******************************************/
//#import <iConsole/iConsole.h>


/****************************************接口请求URL定义*******************************************/

#define GMCS  @"http://m.infinitus.com.cn"
#define CAT_MON_URL  @"http://uits.infinitus.com.cn"
#define CAT_CRASH_URL  @"http://apm.infinitus.com.cn"



//开发环境
#define URL_ROOT @"https://gbssdev.infinitus.com.cn"      //开发环境
#define URL_ROOT_EMCS_CDN @"https://emcsdev-cdn.infinitus.com.cn" //开发环境CDN
#define URL_ROOT_EMCS @"https://emcsdev.infinitus.com.cn" // 统一移动平台模块下载开发环境
#define URL_UIM @"uim-test.infinitus.com.cn" //开发测试统一认证系统
//#define PUSH_APP_NAME @"com.infinitus.idep.emcs.dev" //推送的App Name
//#define PUSH_SECRET_ACCESS_KEY @"1b2250d5-95ee-4356-be3d-93b13cb39d25" //推送的密钥
#define kVisit_URL @"http://wechat-dev.infinitus.com.cn/wechat-front/html5/Viewer/index.html?platform=BUPM"   //参观报名url
#define ELN_URL_HOST @"http://eln-dev.infinitus.com.cn"

#define URL_ROOT_GMCS @"http://m-test.infinitus.com.cn"      // 官网只有测试和生产两个版本

#define IConsoleLog(...) [iConsole log:__VA_ARGS__]
#define CATAPP_ID    100



#ifdef IOS_PRE_TEST_URL

//预测试环境
#define URL_ROOT @"https://gbsspre-test.infinitus.com.cn"      //开发环境
#define URL_ROOT_EMCS_CDN @"https://emcsdev-cdn.infinitus.com.cn" //开发环境CDN
#define URL_ROOT_EMCS @"https://emcspre-test.infinitus.com.cn" // 统一移动平台模块下载测试环境
#define URL_UIM @"uim-test.infinitus.com.cn" //开发测试统一认证系统
#define kVisit_URL @"http://wechat-dev.infinitus.com.cn/wechat-front/html5/Viewer/index.html?platform=BUPM"   //参观报名url
#define ELN_URL_HOST @"http://eln-dev.infinitus.com.cn"

#define URL_ROOT_GMCS @"http://m-test.infinitus.com.cn"      // 官网只有测试和生产两个版本

//#define NSLog(...) NSLog(__VA_ARGS__)
#define IConsoleLog(...) [iConsole log:__VA_ARGS__]
#define CATAPP_ID    101
#endif


#ifdef IOS_TEST_URL

//准生产环境
#define URL_ROOT @"https://gbsstest.infinitus.com.cn"       //准生产测试环境
#define URL_ROOT_EMCS_CDN @"https://emcstest-cdn.infinitus.com.cn"  //准生产测试环境CDN
#define URL_ROOT_EMCS @"https://emcstest.infinitus.com.cn" // 统一移动平台模块下载准生产测试环境
#define URL_UIM @"uim-test.infinitus.com.cn" //开发测试统一认证系统
#define kVisit_URL @"http://wechat-dev.infinitus.com.cn/wechat-front/html5/Viewer/index.html?platform=BUPM"   //参观报名url
#define ELN_URL_HOST @"http://eln-test.infinitus.com.cn"

#define URL_ROOT_GMCS @"http://m.infinitus.com.cn"      // 官网只有测试和生产两个版本

//#define NSLog(...) NSLog(__VA_ARGS__)
#define IConsoleLog(...) [iConsole log:__VA_ARGS__]
#define CATAPP_ID    102
#endif


#ifdef IOS_PRODUCT_URL

//生产环境
#define URL_ROOT @"https://gbss.infinitus.com.cn"         //正式生产环境Mobile
#define URL_ROOT_EMCS_CDN @"https://emcs-cdn.infinitus.com.cn"  //生产环境CDN
#define URL_ROOT_EMCS @"https://emcs.infinitus.com.cn" // 统一移动平台模块下载生产环境
#define URL_UIM @"uim.infinitus.com.cn" //生产统一认证系统

#define URL_ROOT_GMCS @"http://m.infinitus.com.cn"      //生产环境

#define NSLog(...)
#define IConsoleLog(...)

#define CATAPP_ID    1
//#define PUSH_APP_NAME @"com.infinitus.emcs" //推送的App Name
//#define PUSH_SECRET_ACCESS_KEY @"4eb325f6-0eeb-4133-afb9-64e0d92335fc" //推送的密钥



#define   kVisit_URL @"http://wechat.infinitus.com.cn/wechat-front/html5/Viewer/index.html?platform=BUPM"   //参观报名url
#define ELN_URL_HOST @"http://iu.infinitus.com.cn"

#endif

#define EMCS_CDN_CER [NSData dataWithContentsOfFile:[[NSBundle mainBundle] pathForResource:@"emcsdev-cdn" ofType:@"cer"]]




#pragma mark - 核心业务接口

#define URL_ROOT_GBSS [URL_ROOT stringByAppendingString:@"/gbss-bupm"]//gbss-mobile


//登入
#define URL_ROOT_LOGIN_OPEN_API [URL_ROOT_GBSS stringByAppendingString:@"/j_spring_cas_rest_security_check"]

//登出
#define URL_LOGOUT [URL_ROOT_GBSS stringByAppendingString:@"/j_spring_security_logout"]

//快捷支付
//#define URL_TENPAY       @"https://wap.tenpay.com/cgi-bin/wappayv2.0/wappay_gate.cgi"
/**************************************** App启动 *******************************************/

//3.2.1 启动页加载（全量更新）
#define URL_GET_LOADING_PHOTO      [URL_ROOT_GBSS stringByAppendingString:@"/front/gbss-mobile-webapp/portal/getRequest?url=/front/emcs-server-mobile/start/getLoaingPhoto"]

/**************************************** 登录 *******************************************/
//3.3.1 获取验证码
#define URL_GET_CAPTCHA        [URL_ROOT_GBSS stringByAppendingString:@"/front/gbss-mobile-newAccount/guest/query/getGuestCaptcha"]
//3.3.2.1 获取登录人信息
#define URL_LOGIN_SELF_INFO    [URL_ROOT_GBSS stringByAppendingString:@"/front/gbss-mobile-portal/newPortal/getLoginInfo"]

//3.3.4 注册推送服务
#define URL_PUSH_REGISTER      [URL_ROOT_GBSS stringByAppendingString:@"/front/gbss-mobile-newAccount/account/push/iosRegister"]

// 校验e帆网密码
#define URL_CHECK_GBSS_PWD      [URL_ROOT_GBSS stringByAppendingString:@"/front/gbss-mobile-newAccount/password/check/verifyGbssPwd"]

// 修改业务密码时发送手机号获取短信验证码
#define URL_GETTING_SMS_CODE    [URL_ROOT_GBSS stringByAppendingString:@"/front/gbss-mobile-newAccount/guest/sendServicePwd/sendIdentifyingCode"]

// 修改e帆网密码时发送手机号获取短信验证码
#define URL_GETTING_GBSS_PWD_CODE    [URL_ROOT_GBSS stringByAppendingString:@"/front/gbss-mobile-newAccount/guest/sendGbssPwd/sendGbssPwdIdentifyingCode"]

// 3.2.7 检查登录用户名是否已激活用户记录
#define URL_CHECK_GUESTLOGIN    [URL_ROOT_GBSS stringByAppendingString:@"/front/gbss-mobile-newBusiness/businessGuest/check/checkGuestLogin"]

// 3.5.12.1.3 修改e帆网密码
#define URL_MODIFY_PWD          [URL_ROOT_GBSS stringByAppendingString:@"/front/gbss-mobile-newAccount/password/newMidify/modifyPasswordEncode"]

//  修改业务密码
#define URL_MODIFY_PWD_BUSINESS [URL_ROOT_GBSS stringByAppendingString:@"/front/gbss-mobile-newAccount/servicePwd/update/modifyDealerServicePwd"]

// 3.5.12.1.2 获取e帆网密码策略不用登陆的
#define URL_PWD_POLICY_NOTLOGIN          [URL_ROOT_GBSS stringByAppendingString:@"/front/gbss-mobile-newAccount/guest/get/pwdpolicy"]
// 3.2.9 登录页确认修改e帆网密码
#define URL_UPDATE_DEALER_PWD   [URL_ROOT_GBSS stringByAppendingString:@"/front/gbss-mobile-newAccount/guest/update/updateDealerPwd"]

/**************************************** 首页 *******************************************/

//3.4.2 首页-积分优惠卷提醒
#define URL_GET_INTEGRAL_TIP              [URL_ROOT_GBSS stringByAppendingString:@"/front/gbss-mobile-account/account/getIntegralTip"]

//3.5 获取模块的数据数量提示
#define URL_GET_NUM_Tip [URL_ROOT_GBSS stringByAppendingString:@"/front/gbss-mobile-newBusiness/business/query/getModulesNumTip"]


/* 获取小喇叭 */
#define URL_GET_TIPS_LIST           [URL_ROOT_GBSS stringByAppendingString:@"/front/gbss-mobile-newBusiness/message/query/getUserMessage"]

/**************************************** 我的助手 *******************************************/
//3.2.11 确认修改业务密码
#define URL_GET_PASSWORD        [URL_ROOT_GBSS stringByAppendingString:@"/front/gbss-mobile-newAccount/guest/update/updateDealerServicePwd"]


/**************************************** 业务管理 *******************************************/
//3.8.1 获取区域信息（增量更新）
#define URL_GET_REGION        [URL_ROOT_GBSS stringByAppendingString:@"/front/gbss-mobile-business/common/getRegion"]
// 请求助力计划报表地址
#define URL_GET_REPORTURL  [URL_ROOT_GBSS stringByAppendingString:@"/front/gbss-mobile-business/queryHelpPlan/index"]

/**************************************** 其他 *******************************************/

//3.9.1 版本检测
#define URL_CHECK_VERSION    [URL_ROOT_GBSS stringByAppendingString:@"/front/gbss-mobile-newAccount/guest/app/checkVersion"]

//3.3.5主题接口
#define URL_GET_THEME_LIST   [URL_ROOT stringByAppendingString:@"/gbss-mobile/front/gbss-mobile-webapp/portal/getRequest?url=/front/emcs-server-mobile/theme/getThemeList"]

// 保存客户信息（导入通讯录）
#define URL_SAVE_CUSTOM_INFO        [URL_ROOT_GBSS stringByAppendingString: @"/front/gbss-mobile-newAccount/customer/save/saveCustomerInfo"]



//登录有礼promCode
//#define PROM_CODE       @"P1131201"

#ifdef IOS_DEVICE_PAD

#define  kHOMESIGN  @"BUPM-PAD-HOME"//首页导航栏code父标示
#define  kCANEDITSIGN  @"BUPM-PAD-HOME-EDIT"//首页导航栏可选标示
#else

#define  kHOMESIGN  @"BUPM-PHONE-HOME"//首页导航栏code父标示
#define  kCANEDITSIGN  @"BUPM-PHONE-HOME-EDIT"//首页导航栏可选标示
#endif

/*************** wnh 20160426 大平台tabbar菜单标识 *****************************/
#define kMenuDataMainPageKey @"menuDataMainPage"
#define kMenuDataEFanKey @"menuDataEFan"
#define kMenuDataElnKey @"menuDataEln"
#define kMenuDataMyKey @"menuDataMy"

#ifdef IOS_DEVICE_PAD
#define kMainPageCodeKey @"BUPM-PAD-HOME"  //code 父标识
#define kElnCodeKey @"BUPM-PAD-ELN"
#define kMyCodeKey @"BUPM-PAD-MY"
#else
#define kMainPageCodeKey @"BUPM-PHONE-HOME"
#define kElnCodeKey @"BUPM-PHONE-ELN"
#define kMyCodeKey @"BUPM-PHONE-MY"
#endif
/**************************** end *******************************************/


#define isLandscapeLeft [UIApplication sharedApplication].statusBarOrientation == UIDeviceOrientationLandscapeLeft
#define isLandscapeRight [UIApplication sharedApplication].statusBarOrientation == UIDeviceOrientationLandscapeRight
#define isPortraitUp [UIApplication sharedApplication].statusBarOrientation == UIDeviceOrientationPortraitUpsideDown
#define isPortraitDown [UIApplication sharedApplication].statusBarOrientation == UIDeviceOrientationPortrait
/*存储版本号的key*/
#define LAST_VERSION                         @"LastVersion"

/** AES加密密钥 */
//#define AES_KEY                         @"iss&iss123"             

/** ECB加解密密钥  */
#define ECB_KEY                         @"aW5maW5pdHVzLV9UaHJlZUNoYW5uZWxz"

/** 保存手势内容到钥匙串标识 */
#define kKeychainSaveGesture            @"INFINITUS_SAVE_GESTURE"

/** 请求超时时间 */
#define kRequsetTimeOutSeconds      60.0

#define kProductCacheDateKey            @"productCacheDate"

/** 定义列表每页条数 */
#define PAGESIZE 10

/** 游客卡号 */
#define kGuestCardNumber                @"ANONYMOUS"

/** 获取版本号 */
#define kBundleShortVersionString       [[[NSBundle mainBundle] infoDictionary] objectForKey:@"CFBundleShortVersionString"]
#define kBundleVersionString            [[[NSBundle mainBundle] infoDictionary] objectForKey:@"CFBundleVersion"]


/** 首页配置文件 */
#define kHomeSetVersion @"HomeSetVersion" // 游客
#define kHomeSetLoginVersion(role) [NSString stringWithFormat:@"HomeSetVersion-%d", role]
//#define kHomeSetDefaultVersion @"1.0"

/** 通知 */
#define SCAN_JOB_FINISHED @"ScanJobFinished"
#define SCANNING_RESULTS_RETURN @"ScanningResultsReturn"
#define KILL_SCANNING_OBSERVER @"KillScanningObserver"

#define kChangeTabNotificationKey @"changeTabNotificationKey"

// 是否要必改密码
#define kIsMustChangePasswdKey @"kIsMustChangePasswdKey"

//define this constant if you want to use Masonry without the 'mas_' prefix
#define MAS_SHORTHAND
//define this constant if you want to enable auto-boxing for default syntax
#define MAS_SHORTHAND_GLOBALS
//#import "Masonry.h"


/**************************************** 生日提醒 *******************************************/
// 获取生日提醒 URL
#define URL_BIRTHDAY        [URL_ROOT stringByAppendingString: @"/gbss-bupm/front/gbss-mobile-newAccount/customer/query/customerBirthNotifyByBupm"]


/**************************************** 获取版本更新信息 *******************************************/
// 启动时，登录后，接收到指定Header时调用，  用于获取版本更新，皮肤，小广告，游客模块，首页配置等信息，快捷方式，教育网登录后同步数据 URL
#define URL_GUEST_LOGIN_REACTIVE_GETHEADER_INFO        [URL_ROOT_GBSS stringByAppendingString: @"/front/gbss-mobile-newAccount/guest/bupm/getLoginInfo"]

#define kDeviceWidth [UIScreen mainScreen].bounds.size.width
#define KDeviceHeight [UIScreen mainScreen].bounds.size.height



/**************************************** 推送 ***********************************************/

//推送device token
#define kDeviceToken @"DeviceToken"
//获取推送设备和状态信息
#define AppStatueAndPushRegistInfo  [URL_ROOT_EMCS stringByAppendingString: @"/front/emcs-server-newMobile/guest/appStatus"]

#ifdef IOS_PRODUCT_URL
// 注册推送
#define RegistGuestPush [URL_ROOT_EMCS stringByAppendingString: @"/push-api/device/reg"]
//回执消息
#define RebackPush [URL_ROOT_EMCS stringByAppendingString: @"/push-api/message/handleReceipt"]
// 拉取离线消息
#define QueryOfflineMessages [URL_ROOT_EMCS stringByAppendingString: @"/push-api/message/queryofflinemessages"]
//验证scoket连接信息
#define verifyRegistInfo [URL_ROOT_EMCS stringByAppendingString: @"/push-api/device/verifyDeviceRegInfo"]
#else
// 开发测试准生产
// 注册推送
#define RegistGuestPush @"https://emcsdev.infinitus.com.cn/push-api/device/reg"
//回执消息
#define RebackPush @"https://emcsdev.infinitus.com.cn/push-api/message/handleReceipt"
// 拉取离线消息
#define QueryOfflineMessages @"https://emcsdev.infinitus.com.cn/push-api/message/queryofflinemessages"
//验证scoket连接信息
#define verifyRegistInfo @"https://emcsdev.infinitus.com.cn/push-api/device/verifyDeviceRegInfo"

#endif

/**
 本地通知常量Key
 */
#define Did_ReceiveLocal_Notification @"didReceiveLocalNotification"
#define Did_ReceiveLocal_Notification_To_CubeWebView @"didReceiveLocalNotification_To_CubeWebView"
#define kSaveSocketConnectionInfo @"SaveSocketConnectionInfo"
#define kPushKey @"infinitus_push_sign_key"//用来加密的sha1
#define kGetUserAndAppEquipInfo @"getUserAndAppEquipInfo"
#define kELNPushNotification   @"ENLPushNotification"
#define kUserLogoutNotification  @"userLogoutNotification"
#define kLoginViewDismissNotification @"loginViewDismissNotification"  // 登录页面关闭时通知
#define kWebViewDismissNotification @"webViewDismissNotification"  // WebView页面关闭时通知

/**************************************** OpenWebPage *******************************************/

#define OpenPage_URL @"url"
#define OpenPage_InitFun @"sInitFun"
#define OpenPage_InitParam @"oInitParam"
#define OpenPage_Title @"sTitle"
#define OpenPage_Flag @"sFlag"
#define OpenPage_NavInfo @"jNavInfo"


/************************************** 二次密码验证 **********************************************/

#define Password_CacheTime @"Password_CacheTime"

/************************************** data path **********************************************/


/************************************** color **************************************************/
#define kLineColor [Utils colorWithHexString:@"#dbdbdb"]
#define kNavRightBtnColor [Utils colorWithHexString:@"#bc2826"]
