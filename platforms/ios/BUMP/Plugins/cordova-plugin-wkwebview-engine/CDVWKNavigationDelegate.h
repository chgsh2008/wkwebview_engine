//
//  CDVWKNavigationDelegate.h
//  BUMP
//
//  Created by Kevin on 16/8/22.
//
//

#import <Foundation/Foundation.h>
#import <Cordova/CDV.h>
#import <WebKit/WebKit.h>

@interface CDVWKNavigationDelegate : NSObject<WKNavigationDelegate>


@property (nonatomic, weak) CDVPlugin* enginePlugin;

- (instancetype)initWithEnginePlugin:(CDVPlugin*)enginePlugin;

@end
