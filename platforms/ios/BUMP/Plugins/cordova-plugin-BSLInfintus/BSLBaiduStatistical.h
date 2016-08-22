//
//  BaiduStatistical.h
//  GbssApps-IOS
//
//  Created by 袁作敏 on 15/3/10.
//
//

#import <Cordova/CDVPlugin.h>

@interface BSLBaiduStatistical : CDVPlugin
/**
 * 记录某页面的跳入
 * @param name String 页面名称
 */
- (void)recordPageStart:(CDVInvokedUrlCommand *)command;
/**
 * 记录某页面的跳出
 * @param name String 页面名称
 */
- (void)recordPageEnd:(CDVInvokedUrlCommand *)command;
/**
 * 记录一次事件点击
 * @param eventId String 为module_name
 * @param eventLabel String 为dealerNo
 */
- (void)recordEventNumber:(CDVInvokedUrlCommand *)command;
/**
 * 记录一次事件开始
 * @param eventId String 为module_name
 * @param eventLabel String 为dealerNo
 */
- (void)recordEventStart:(CDVInvokedUrlCommand *)command;
/**
 * 记录一次事件结束
 * @param eventId String 为module_name
 * @param eventLabel String 为dealerNo
 */
- (void)recordEventEnd:(CDVInvokedUrlCommand *)command;
@end
