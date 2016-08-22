//
//  BSLNotification.h
//  GbssApps-IOS
//
//  Created by Suycity on 15/10/29.
//
//

#import <UIKit/UIKit.h>
#import <Cordova/CDVPlugin.h>

@interface BSLUserNotification : CDVPlugin

- (void)getNavigationStatus:(CDVInvokedUrlCommand *)command;
- (void)addUserNotification:(CDVInvokedUrlCommand *)command;
- (void)getUserNotification:(CDVInvokedUrlCommand *)command;
- (void)removeUserNotification:(CDVInvokedUrlCommand *)command;
- (void)removeAllNotification:(CDVInvokedUrlCommand *)command;
/**
 *  删除已过期的通知，保持清洁。
 */
+ (void)removeObsoleteNotification;

+ (void)applicationDidFinishLaunchingWithOptions:(NSDictionary *)launchOptions;
+ (void)applicationDidReceiveLocalNotification:(UILocalNotification*)notification;


@end
