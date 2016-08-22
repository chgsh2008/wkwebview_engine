//
//  Transfer.h
//  Infinitus
//
//  Created by Frank Fan on 14-8-14.
//  Copyright (c) 2014年 zhangli. All rights reserved.
//

//#import <WebViewExten/WebViewExten.h>
//#import "FastPayViewController.h"
//#import "AddressBookViewController.h"
//#import "NHPopoverViewController.h"
//#import "LoginViewController.h"
#import <UIKit/UIKit.h>
#import <Cordova/CDVPlugin.h>
#import <Foundation/Foundation.h>
//#import "PeopleAddressPicker.h"

/**
 * 页面跳转插件类
 */
@interface BSLTransfer : CDVPlugin
<UINavigationControllerDelegate>

/**
 * 返回到上一个HTML页面或返回到上一个视图
 * command.arguments = [bIsGoView,sFun,oParam];
 *
 * @param bIsGoView
 *            boolean 为真时不调用浏览器返回直接返回到上一个视图 参数可选
 * @param sFun
 *            String 返回后调用上个页面的JS 参数可选
 * @param oParam
 *            Object 调用函数传的参数 参数可选
 */
- (void)returnBack:(CDVInvokedUrlCommand *)command;

/**
 * 打一个新视图
 * command.arguments = [sUrl,sInitFun,oInitParam,title];
 *
 * @param sUrl
 *            String HTML页面在线或本地地址
 * @param sInitFun
 *            String 打开新页面调用页面的JS 参数可选
 * @param oInitParam
 *            Object 调用函数传的参数 参数可选
 * @param title
 *            title 标题
 */
- (void)openPage:(CDVInvokedUrlCommand *)command;
- (void)closePage:(CDVInvokedUrlCommand *)command;

/**
 * 打一个新视图
 * @param sUrl String HTML页面在线或本地地址
 * @param sFlag bool 打开新页面时是否删除中间webview true删除 false不删
 */
-(void)openNewPage:(CDVInvokedUrlCommand*)command;

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
-(void)openWebPage:(CDVInvokedUrlCommand *)command;

/**
 * 用户账号信息失效时，登出该账号
 * command.arguments = [];
 */
- (void)logoutByUserInvalid:(CDVInvokedUrlCommand *)command;

/**
 * 返回到首页
 * command.arguments = [];
 */
- (void)goHome:(CDVInvokedUrlCommand *)command;

/**
 * 设置标题栏
 * command.arguments = [jInitParam];
 * @param jInitParam JSON 初始化参数 参数可选
 *      对象结构：{sTitle,sLeftTitle,sLeftAction,sRightTitle,sRightAction}
 *      sTitle String 页面标题
 *      sLeftTitle String 左按钮标题
 *      sRightTitle String 右按钮标题
 *      sLeftAction和sRightAction String 10000返回，10001刷新，10002返回首页，其它填JS函数名点击按钮调用该函数
 */
- (void)setNaviBar:(CDVInvokedUrlCommand *)command;

/**
 * 在当前视图加载一个新页面；使用此方法将清除web的前进和后退历史
 * command.arguments = [sUrl, sTitle];
 * @param sUrl String HTML页面在线或本地地址
 * @param sTitle String 标题
 */
- (void)loadPageWithUrl:(CDVInvokedUrlCommand *)command;

/**
 * 登录接口
 * command.arguments = [sCallback];
 * @param sCallback String function callback(bLogin){} bLogin 布尔类型 是否登录成功
 */
- (void)login:(CDVInvokedUrlCommand *)command;

/**
 * 跳转到支付页面
 * @param sPayUrl String 支付提交地址
 * @param sCallback String function callback(jData){} jData JSON对象 支付结果
 */
- (void)openPayPage:(CDVInvokedUrlCommand *)command;

/**
 * 加载分割页面WebView请求
 * @param sUrl String 支付提交地址
 */
- (void)loadSplitWebViewRequest:(CDVInvokedUrlCommand *)command;
/**
 * @param sUrl 是否加载分屏
 */
- (void)openSplitView:(CDVInvokedUrlCommand *)command;
/**
 * 选择通信录
 * @param sCallback 回调方法 回调类型String
 */
- (void)pickContact:(CDVInvokedUrlCommand *)command;

//根据ID打开BENDI模块
-(void)gotoBusinessQuery:(CDVInvokedUrlCommand*)command;


/*
 "selectedItem":[0,1],//Array，数组第一位表示首页下的四个Tab页，第二位表示官网的头条，多媒体之类的Tap
 "sFunction":"sfunction",//String ,打开指定Tab后向相应的WebView主动发出该函数。
 "sParam":"sParam" // String  为sfunction的参数值
 */
/**
 *  指定首页的Tab页和子Tab
 *
 *  @param command  json对象，
 *  {
 *   selectedItem： [0,1],//Array，数组第一位表示首页下的四个Tab页，第二位表示官网的头条，多媒体之类的Tap
 *   sFunction： //String ,打开指定Tab后向相应的WebView主动发出该函数
 *   sParam： // String  为sfunction的参数值
 *   sTitle：string 类型，页面的标题
 *   }
 */
-(void)selectedTabItem:(CDVInvokedUrlCommand*)command;

@end
