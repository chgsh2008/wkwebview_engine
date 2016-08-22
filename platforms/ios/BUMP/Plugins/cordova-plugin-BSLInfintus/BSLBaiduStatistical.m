//
//  BaiduStatistical.m
//  GbssApps-IOS
//
//  Created by 袁作敏 on 15/3/10.
//
//

#import "BSLBaiduStatistical.h"

@implementation BSLBaiduStatistical

/**
 * 记录某页面的跳入
 * @param name String 页面名称
 */
- (void)recordPageStart:(CDVInvokedUrlCommand *)command
{
    NSString *name = [command argumentAtIndex:0];
//    [[BaiduMobStat defaultStat] pageviewStartWithName:name];
}
/**
 * 记录某页面的跳出
 * @param name String 页面名称
 */
- (void)recordPageEnd:(CDVInvokedUrlCommand *)command
{
    NSString *name = [command argumentAtIndex:0];
//    [[BaiduMobStat defaultStat] pageviewEndWithName:name];
    
}
/**
 * 记录一次事件点击
 * @param eventId String 为module_name
 * @param eventLabel String 为dealerNo
 */
- (void)recordEventNumber:(CDVInvokedUrlCommand *)command
{
    NSString *eventId = [command argumentAtIndex:0];
    NSString *eventLabel = [command argumentAtIndex:1];
//    [[BaiduMobStat defaultStat] logEvent:eventId eventLabel:eventLabel];
    
}
/**
 * 记录一次事件开始
 * @param eventId String 为module_name
 * @param eventLabel String 为dealerNo
 */
- (void)recordEventStart:(CDVInvokedUrlCommand *)command
{
    NSString *eventId = [command argumentAtIndex:0];
    NSString *eventLabel = [command argumentAtIndex:1];
//    [[BaiduMobStat defaultStat] eventStart:eventId eventLabel:eventLabel];
}
/**
 * 记录一次事件结束
 * @param eventId String 为module_name
 * @param eventLabel String 为dealerNo
 */
- (void)recordEventEnd:(CDVInvokedUrlCommand *)command
{
    NSString *eventId = [command argumentAtIndex:0];
    NSString *eventLabel = [command argumentAtIndex:1];
//    [[BaiduMobStat defaultStat] eventEnd:eventId eventLabel:eventLabel];
}

@end
