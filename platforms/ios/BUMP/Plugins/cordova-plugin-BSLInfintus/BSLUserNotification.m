//
//  BSLNotification.m
//  GbssApps-IOS
//
//  Created by Suycity on 15/10/29.
//
//

#import "BSLUserNotification.h"
//#import <JRNLocalNotificationCenter/JRNLocalNotificationCenter.h>
//#import "JRNLocalNotificationCenter.h"
#import "SVProgressHUD.h"

@implementation BSLUserNotification

- (void)getNavigationStatus:(CDVInvokedUrlCommand *)command{
    BOOL isNotifyAlert = NO, isNotifySound = NO;
//    if (iOS8_OR_LATER)
//    {
//        UIUserNotificationType types = [[UIApplication sharedApplication] currentUserNotificationSettings].types;
//        isNotifyAlert = (types & UIUserNotificationTypeAlert) == UIUserNotificationTypeAlert;
//        isNotifySound = (types & UIUserNotificationTypeSound) == UIUserNotificationTypeSound;
//    }
//    else
//    {
//        UIRemoteNotificationType types = [[UIApplication sharedApplication] enabledRemoteNotificationTypes];
//        isNotifyAlert = (types & UIRemoteNotificationTypeAlert) == UIRemoteNotificationTypeAlert;
//        isNotifySound = (types & UIRemoteNotificationTypeSound) == UIRemoteNotificationTypeSound;
//    }
//    int i = 1;
//    if (!isNotifyAlert && !isNotifySound) {
//        i = 0;
//    }
    [self sendPluginResult:[CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsInt:0] command:command];
}
- (void)addUserNotification:(CDVInvokedUrlCommand *)command{
    id json = [command argumentAtIndex:0];
    BOOL isAdd = YES;
    if ([json isKindOfClass:NSDictionary.class]) {
        isAdd = [BSLUserNotification createNotification:json];
    }
    else if([json isKindOfClass:NSArray.class]){
        for (id js in json) {
            if([js isKindOfClass:NSDictionary.class]&&(![BSLUserNotification createNotification:js])){
                    isAdd = NO;
            }
        }
    }
    [self sendPluginResult:[CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsBool:isAdd] command:command];
}
- (void)getUserNotification:(CDVInvokedUrlCommand *)command{
    [self sendPluginResult:[CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsArray:[BSLUserNotification getNotification]] command:command];
}
- (void)removeAllNotification:(CDVInvokedUrlCommand *)command{
//    [[JRNLocalNotificationCenter defaultCenter] cancelAllLocalNotifications];
}
- (void)removeUserNotification:(CDVInvokedUrlCommand *)command{
    id json = [command argumentAtIndex:0];
    BOOL isRemove = [BSLUserNotification removeNotification:json];
    CDVPluginResult *result = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK
                                                  messageAsBool:isRemove];
    [self sendPluginResult:result command:command];
}
- (void)sendPluginResult:(CDVPluginResult *)Result command:(CDVInvokedUrlCommand *)command{
    [self.commandDelegate sendPluginResult:Result callbackId:command.callbackId];
}
#pragma mark - ++++++
+ (void)applicationDidReceiveLocalNotification:(UILocalNotification*)notification{
    [self applicationDidFinishLaunchingWithOptions:notification.userInfo];
}
+ (void)applicationDidFinishLaunchingWithOptions:(NSDictionary *)launchOptions{
    
    if (launchOptions && launchOptions[@"ID"]) {
        if (![launchOptions[@"repeatInterval"] intValue]) {
            [self removeNotification:launchOptions];
        }
        [UIApplication sharedApplication].applicationIconBadgeNumber -= 1;
    }else{
        [UIApplication sharedApplication].applicationIconBadgeNumber = 0;
    }
}

+ (CFCalendarUnit)getCalendar:(NSString *)Unit{
    if ([Unit isEqualToString:@"1"]) {
        return kCFCalendarUnitDay;
    }
    else if ([Unit isEqualToString:@"2"]) {
        return kCFCalendarUnitWeek;
    }
    else if ([Unit isEqualToString:@"3"]) {
        return kCFCalendarUnitMonth;
    }
    else if ([Unit isEqualToString:@"4"]) {
        return kCFCalendarUnitYear;
    }
    else{
        return 0;
    }
}
+ (BOOL)createNotification:(NSDictionary *)Param{
    
    NSDateFormatter *formatter = [[NSDateFormatter alloc] init];
    [formatter setDateFormat:@"yyyy-MM-dd HH:mm:ss"];
//#ifdef DEBUG
//    NSDate *firstDate = [[NSDate date] dateByAddingTimeInterval:1 * 20];
//#else
    NSDate *firstDate = [formatter dateFromString:Param[@"firstTime"]];
//#endif
    int rn = [Param[@"repeatNumber"] intValue];
    if (!rn) rn = 1;
//    for (int i = 1; i <= rn; i++) {
//
//        [[JRNLocalNotificationCenter defaultCenter]
//         postNotificationOn:firstDate
//         forKey:[NSString stringWithFormat:@"%f",[firstDate timeIntervalSince1970]]
//         alertBody:Param[@"title"]
//         alertAction:@"Open"
//         soundName:nil
//         launchImage:nil
//         userInfo:Param
//         badgeCount:0
//         repeatInterval:(NSCalendarUnit)[self getCalendar:[Param[@"repeatInterval"] description]]];
//        
//        firstDate = [firstDate dateByAddingTimeInterval:10 * 60];
//    }
    return YES;
}
/**
 *  删除已过期的通知，保持清洁。
 */
+ (void)removeObsoleteNotification{
    // 取出全部本地通知
    NSArray *notifications = [UIApplication sharedApplication].scheduledLocalNotifications;
    NSDateFormatter *formatter = [[NSDateFormatter alloc] init];
    [formatter setDateFormat:@"yyyy-MM-dd HH:mm:ss"];
//    for (UILocalNotification *localNotification in notifications) {
//        NSDate *firstDate = [formatter dateFromString:localNotification.userInfo[@"firstTime"]];
//        NSTimeInterval interval = [firstDate timeIntervalSinceNow];
//        if (interval < 0 && localNotification.repeatInterval == 0) {
//            [[JRNLocalNotificationCenter defaultCenter] cancelLocalNotification:localNotification];
//        }
//    }
}
+ (BOOL)removeNotification:(NSDictionary *)Param{
    // 取出全部本地通知
    NSArray *notifications = [UIApplication sharedApplication].scheduledLocalNotifications;
    // 设置要移除的通知id
    // 遍历进行移除
    BOOL isRemove = NO;
    for (UILocalNotification *localNotification in notifications) {
        // 将每个通知的id取出来进行对比
        BOOL isEqual = YES;
        for (NSString *keyStr in [Param allKeys]) {
            if (![localNotification.userInfo[keyStr] isEqualToString:Param[keyStr]]) {
                isEqual = NO;
            }
            if (isEqual == NO) break ;
        }
        if (isEqual) {
            // 移除某一个通知
//            [[JRNLocalNotificationCenter defaultCenter] cancelLocalNotification:localNotification];
            isRemove = YES;
        }
        
    }
    return isRemove;
}
+ (NSArray *)getNotification{
    NSArray *notifications = [UIApplication sharedApplication].scheduledLocalNotifications;
    NSMutableArray *idArrs = [NSMutableArray array];
    for (UILocalNotification *ln in notifications) {
        [idArrs addObject:ln.userInfo];
    }
    return idArrs;
}

/**
 //json
 {
 "firstTime" : "起始时间",// yyyy-MM-dd HH:mm:ss
 "ID" : "通知的ID",
 "repeatInterval" : "循环时间", //0123 (0 不循环 , 1 一天 ， 2周  以此类推)
 "repeatNumber" : "循环次数", // 当用户不处理的时候，再次处理的次数，默认0次 。
 "content" :"内容",
 "title" :"标题",
 }
	kCFCalendarUnitYear = (1UL << 2),
	kCFCalendarUnitMonth = (1UL << 3),
	kCFCalendarUnitDay = (1UL << 4),
 kCFCalendarUnitWeekday = (1UL << 9),
 */

@end
