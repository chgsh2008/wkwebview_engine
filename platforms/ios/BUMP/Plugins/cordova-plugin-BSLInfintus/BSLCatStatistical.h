//
//  BSLCatStatistical.h
//  GbssApps-IOS
//
//  Created by james on 16/6/28.
//
//

#import <Foundation/Foundation.h>
#import <Cordova/CDVPlugin.h>

@interface BSLCatStatistical : CDVPlugin
-(void)analytics:(CDVInvokedUrlCommand*)command;
-(void)crashed:(CDVInvokedUrlCommand*)command;
@end
