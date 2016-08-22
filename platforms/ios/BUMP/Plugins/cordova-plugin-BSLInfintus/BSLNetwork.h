//
//  Network.h
//  bsl
//
//  Created by FanFrank on 14/11/6.
//
//

//#import <WebViewExten/WebViewExten.h>
//#import "HttpClientComponent.h"
#import <UIKit/UIKit.h>
#import <Cordova/CDVPlugin.h>
#import "AppDelegate.h"

@interface BSLNetwork : CDVPlugin

/**
 * get方式请求http接口内容
 * command.arguments = [sUrl, jParam, sCallback, bIsCache]
 * @param sUrl String 请求地址
 * @param jParam JSON 请求参数
 * @param sCallback String 回调函数名
 *      code int 状态码 无网络:-101 地址不合法:-102；其它参照http状态码定义
 *      result 成功时为服务器返回的数据，其它为错误内容
 *      结构function callback(code,result){}
 * @param bIsCache boolean 参数可选 是否需要缓存
 */
- (void)get:(CDVInvokedUrlCommand *)command;

/**
 * post方式请求http接口内容
 * command.arguments = [sUrl, jParam, sCallback]
 * @param sUrl String 请求地址
 * @param jParam JSON 请求参数
 * @param sCallback String 回调函数名
 *      code int 状态码 无网络:-101 地址不合法:-102；其它参照http状态码定义
 *      result 成功时为服务器返回的数据，其它为错误内容
 *      结构function callback(code,result){}
 */
- (void)post:(CDVInvokedUrlCommand *)command;

/**
 * 返回当前网络状态
 * command.arguments = []
 * @return int 0没有网络，1gprs网络，2wifi网络
 */
- (void)checkNetState:(CDVInvokedUrlCommand *)command;

/**
 * 上传通讯录到服务器
 * command.arguments = []
 * @param sCallback String 回调函数名
 *      code int 状态码 无网络:-101 地址不合法:-102；其它参照http状态码定义
 *      result 成功时为服务器返回的数据，其它为错误内容
 *      结构function callback(code,result){}
 */
- (void)uploadContacts:(CDVInvokedUrlCommand *)command;

//显示上一条网络请求错误信息
-(void)showLastNetworkErrorInfo:(CDVInvokedUrlCommand*)command;


/**
 *  监听检测网络状态
 *
 *  @param command
 */
-(void)checkNetworkChanging:(CDVInvokedUrlCommand *)command;


@end
