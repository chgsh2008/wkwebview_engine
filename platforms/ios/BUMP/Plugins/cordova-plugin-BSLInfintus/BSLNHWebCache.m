//
//  WebCache.m
//  bsl
//
//  Created by FanFrank on 14/11/7.
//
//

#import "BSLNHWebCache.h"
//#import "LogoutBiz.h"
//#import "CacheManager.h"
//#import "GbssWebImageManager.h"

@interface BSLNHWebCache()
//<GbssWebImageManagerDelegate>

@property (nonatomic, retain) NSMutableDictionary *cacheImageCommand;
//@property (nonatomic, retain) GbssWebImageManager *webImageManager;

@end

@implementation BSLNHWebCache
#define H5KEYS @"h5keys"
- (void)dealloc
{
    // Remove in progress downloader from queue
//    self.webImageManager = nil;
}
-(void)setH5Cache:(CDVInvokedUrlCommand *)command
{
    NSLog(@"=====key===%@=====%@",[command argumentAtIndex:0],[command argumentAtIndex:1]);
//    NSString *errorStr = [command checkParamType:@[[NSString class],[NSString class]]];
//    if (!errorStr) {
        NSUserDefaults* cache= [NSUserDefaults standardUserDefaults];
        [cache setObject:[command argumentAtIndex:1] forKey:[command argumentAtIndex:0]];
        [cache synchronize];
        NSArray* keys=[cache arrayForKey:H5KEYS];
        if (keys) {
            NSMutableArray* newKeys= [NSMutableArray arrayWithArray:keys];
            if ([newKeys containsObject:[command argumentAtIndex:0]]) {
                return;
            }
            [newKeys addObject:[command argumentAtIndex:0]];
            [cache setObject:newKeys forKey:H5KEYS];
            [cache synchronize];
        }else{
            NSArray* array=[NSArray arrayWithObject:[command argumentAtIndex:0]];
            [cache setObject:array forKey:H5KEYS];
            [cache synchronize];
        }
        //        AppDelegate* delegate= [UIApplication sharedApplication].delegate;
        //        delegate.h5Cache = [command argumentAtIndex:0];
//    }
    
    
}
-(void)getH5Cache:(CDVInvokedUrlCommand *)command
{
//    NSString *errorStr = [command checkParamType:@[[NSString class],[NSString class]]];
//    if (errorStr) {
//        return @"";
//    }
//    //AppDelegate* delegate= [UIApplication sharedApplication].delegate;
    NSUserDefaults* cache= [NSUserDefaults standardUserDefaults];
//    [self.webView evaluatingJavaScriptOnMain:[NSString stringWithFormat:@"%@('%@')", [command argumentAtIndex:1], [command argumentAtIndex:0]]];
    NSString *value=[cache valueForKey:[command argumentAtIndex:0]];
    NSLog(@"=====key===%@=====%@",[command argumentAtIndex:0],value);
//    return [cache valueForKey:[command argumentAtIndex:0]];
    CDVPluginResult* pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsString:[cache valueForKey:[command argumentAtIndex:0]]];
    [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
}
-(void)clearH5Cache:(CDVInvokedUrlCommand *)command
{
    NSUserDefaults *cache= [NSUserDefaults standardUserDefaults];
    NSArray *keys= [cache arrayForKey:H5KEYS];
    if (keys) {
        for (NSString* key in keys) {
            [cache removeObjectForKey:key];
        }
        [cache removeObjectForKey:H5KEYS];
        [cache synchronize];
    }
}
- (NSMutableDictionary *)cacheImageCommand
{
    if (!_cacheImageCommand)
        self.cacheImageCommand = [NSMutableDictionary dictionary];
    return _cacheImageCommand;
}

//- (GbssWebImageManager *)webImageManager
//{
//    if (!_webImageManager)
//        self.webImageManager = [[GbssWebImageManager alloc] init];
//    return _webImageManager;
//}

//清除缓存
-(void)deleteCache
{
//    LogoutBiz *logoutBiz = [[LogoutBiz alloc] initWithTarget:self.viewController.view];
//    [logoutBiz startBlockAnimation];
//    NSUserDefaults *userDefaults = [NSUserDefaults standardUserDefaults];
//    NSString *dealerNo = [userDefaults objectForKey:@"dealerNo"];
//    CacheManager *cacheManager = [[CacheManager alloc] init];
//    [cacheManager deleteCache:dealerNo];
//    
//    [logoutBiz stopBlockAnimation];
//    [logoutBiz showToastWithTitle:@"" message:@"清除缓存成功！"];
    
}

#pragma mark - Web methods

- (void)clean:(CDVInvokedUrlCommand *)command
{
    //清除缓存
    [self deleteCache];
}

- (void)cacheImageWithUrl:(CDVInvokedUrlCommand *)command
{
        NSURL *url = [NSURL URLWithString:[command argumentAtIndex:0]];
        if (url)
        {
            [self.cacheImageCommand setObject:command forKey:[command argumentAtIndex:0]];
//            [self.webImageManager downloadWithURL:url delegate:self];
//            NSString *path = url.absoluteString;
//            SDImageCache *Cache = [SDImageCache sharedImageCache];
//            
//            path = [Cache defaultCachePathForKey:path];
//            UIImage *image = [UIImage imageWithContentsOfFile:path];
//            if (image) {
//                [self webImageManager:nil didFindImage:image filePath:path imgUrl:url.absoluteString];
//            }else{
//                [[SDWebImageDownloader sharedDownloader]
//                 downloadImageWithURL:url options:SDWebImageDownloaderProgressiveDownload progress:nil
//                 completed:^(UIImage *image, NSData *data, NSError *error, BOOL finished) {
//                     if (!error) {
//                         [self webImageManager:nil didFindImage:image filePath:path imgUrl:url.absoluteString];
//                     }
//                 }];
//            }
        }
        else
        {
//            [iConsole error:@"%@",[command getErrorStr:CTStatusCodeIllegalArgument msg:[NSString stringWithFormat:@"图片地址非法:%@", [command argumentAtIndex:1]]]];
//            IConsoleLog(@"%@",[NSString stringWithFormat:@"图片地址非法:%@", [command argumentAtIndex:0]]);
            [self.commandDelegate sendPluginResult:[CDVPluginResult resultWithStatus:CDVCommandStatus_ERROR messageAsString:[NSString stringWithFormat:@"图片地址非法:%@", [command argumentAtIndex:0]]] callbackId:command.callbackId];
            
        }
    
}

#pragma mark - GbssWebImageManagerDelegate

//- (void)webImageManager:(GbssWebImageManager *)imageManager didFindImage:(UIImage *)image filePath:(NSString *)filePath imgUrl:(NSString *)imgUrl
//{
//    CDVInvokedUrlCommand *command = [_cacheImageCommand objectForKey:imgUrl];
//    if (command)
//    {
////        [self.webView evaluatingJavaScriptOnMain:[NSString stringWithFormat:@"%@('%@','%@',%@);", [command argumentAtIndex:0], imgUrl, filePath, [self.webView convertStringJSObject:[command argumentAtIndex:2]]]];
//        CDVPluginResult* pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsArray:@[imgUrl,filePath,[command argumentAtIndex:1]]];
//        [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
//        
//        [_cacheImageCommand removeObjectForKey:imgUrl];
//    }
//}
@end
