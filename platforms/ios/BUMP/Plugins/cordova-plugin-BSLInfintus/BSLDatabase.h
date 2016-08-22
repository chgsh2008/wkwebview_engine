//
//  Database.h
//  bsl
//
//  Created by FanFrank on 14/11/7.
//
//

//#import <WebViewExten/WebViewExten.h>
#import <UIKit/UIKit.h>
#import <Cordova/CDVPlugin.h>


@interface BSLDatabase : CDVPlugin

/**
 * 查询数据库内容
 * command.arguments = [sSql,aParams]
 * @param sSql String 查询语句
 * @param aParams Array 使用?占位符时的sql语句参数 参数可选
 * @return Array 查询结果
 */
- (void)querySql:(CDVInvokedUrlCommand *)command;

/**
 * 增 删 改数据库内容
 * command.arguments = [sSql,aParams]
 * @param sSql String 执行语句
 * @param aParams Array 使用?占位符时的sql语句参数 参数可选
 * @return boolean 执行结果
 */
- (void)executeSql:(CDVInvokedUrlCommand *)command;

@end
