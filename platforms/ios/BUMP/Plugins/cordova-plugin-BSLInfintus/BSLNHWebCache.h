//
//  WebCache.h
//  bsl
//
//  Created by FanFrank on 14/11/7.
//
//

//#import <WebViewExten/WebViewExten.h>
#import <UIKit/UIKit.h>
#import <Cordova/CDVPlugin.h>

@interface BSLNHWebCache : CDVPlugin

/**
 * 清除缓存
 * command.args=[sCallback];
 * @param sCallback String 回调函数名 参数可选
 *      result boolean 结果
 *      结构function callback(result){}
 */
- (void)clean:(CDVInvokedUrlCommand *)command;

/**
 * 下载图片并缓存到缓存器中
 * command.arguments = [sCallback, sImgUrl, sUserInfo]
 * @param sCallback(imgUrl,filePath,otherInfo);
 * @param sImgUrl String 图片地址
 * @param sUserInfo String 需要保存的内容
 */
- (void)cacheImageWithUrl:(CDVInvokedUrlCommand *)command;

///设置和获取H5全局缓存
-(void)setH5Cache:(CDVInvokedUrlCommand*)command;
-(void)getH5Cache:(CDVInvokedUrlCommand *)command;
-(void)clearH5Cache:(CDVInvokedUrlCommand *)command;
@end
