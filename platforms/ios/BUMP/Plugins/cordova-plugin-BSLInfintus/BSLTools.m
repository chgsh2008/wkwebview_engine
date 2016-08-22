//
//  Tools.m
//  Infinitus
//
//  Created by Frank Fan on 14-8-14.
//  Copyright (c) 2014年 zhangli. All rights reserved.
//

#import "BSLTools.h"
//#import "JSONKit.h"
//#import <iConsole/iConsole.h>
#import "SVProgressHUD.h"
//#import "CTImageSeeViewController.h"
//#import "AppConstants.h"
//#import "UpdateAlertView.h"
//#import "HomePageViewController.h"
//#import "LogoutBiz.h"
//#import "NHPopoverViewController.h"
//#import "FileUtil.h"
//#import <MobileCoreServices/UTCoreTypes.h>
//#import "ELCAlbumPickerController.h"
//#import "ELCImagePickerController.h"
//#import "ELCAssetTablePicker.h"
//#import "GetPasswordViewController.h"
//#import "Old_CubeWebViewController.h"
//#import "GSImagePickerModel.h"
//#import "YCOAuth.h"
//#import "NSData+isValueImage.h"
//#import <AGCommon/UIDevice+Common.h>
//#import <AGCommon/UIImage+Common.h>
//#import <AGCommon/UINavigationBar+Common.h>
//#import <AGCommon/NSString+Common.h>
//#import <ShareSDK/ShareSDK.h>
//#import <objc/runtime.h>
//#import <SDWebImage/SDWebImageManager.h>
//#import <SDWebImage/UIButton+WebCache.h>
//#import "HZPhotoBrowser.h"
////#import "UIButton+WebCache.h"
//#import "HZPhotoItemModel.h"
//#import "HZImagesGroupView.h"
//#import "CommonTools.h"
//#import "NSFileManager+Extra.h"
//#import "AppDelegate.h"
//#import "BaiduMobStat.h"
//#import "Utility.h"
//#import "NVStatisticsService.h"
//
//#import "CTBaseRootViewController.h"

#define kHeadBgViewTag 123456789
#define kPickUserInfoKey @"kPickUserInfoKey"
#define kTimePickerFromatStr @"Y-M-D H:m:s"
#define kTimePickerCallbackFromatStr @"yyyy-MM-dd HH:mm:ss"
#define PHOTO_CACHE_LOCATION [NSString stringWithFormat:@"%@/Documents/%@", NSHomeDirectory(), @"photos"] //系统相册缓存路径
#define CAMERA_PHOTO_CACHE_LOCATION [NSString stringWithFormat:@"%@/Documents/%@", NSHomeDirectory(), @"camera_photos"] //相机拍照缓存路径
#import <CoreLocation/CoreLocation.h>
#define IS_OS_8_OR_LATER ([[[UIDevice currentDevice] systemVersion] floatValue] >= 8.0)
//#import "Function.h"
#import <Foundation/NSJSONSerialization.h>
//#import "QiniuSDK.h"
@interface BSLTools()
{
//    NHPopoverViewController* forgetPwdController;
//    ConfirmPwdViewController *_confirmPwd;
    NSString *noti;
    __strong CLLocationManager *locationManager;
//    GSImagePickerModel *imagePicker;
    
}
@property (nonatomic, retain) NSMutableDictionary *dialogs; // 保存显示的提示框，value=alert,key=回调函数名
@property (nonatomic, retain) NSString *updateAppURL; // appStore更新地址
//@property (nonatomic, retain) TimeActionSheet *timePick;
@property (nonatomic, retain) NSString *confirmPwdCall; // 确认业务密码提示框回调函数名
//@property (nonatomic, retain) NHPopoverViewController *popoverVC;
@property (nonatomic, retain) NSString* choosePhotosCall;//选择图片回调函数名
@property (nonatomic, retain) NSString* scanbarcodeCall;//扫描二维码条形码回调函数名
@property (nonatomic, assign) BOOL isConsecutiveScanning;//是否连续扫描二维码条形码
@property (nonatomic, retain) NSString* getLocationCall;//获取经度纬度回调函数名
@property (nonatomic, retain) NSString* takePhotoCall;//获取照片回调函数名
@property (nonatomic, retain) NSString* uploadByQiniuCall;//七牛上传回调函数名
//@property (nonatomic, retain) MessageController *messageViewController;//发短信

//@property (nonatomic, strong) ScannerViewController *scannerVC;
@property (nonatomic, strong) CDVInvokedUrlCommand *getLocationCommand;//定位回调

//@property (nonatomic, strong) OpenFileManager *openFileManager;//打开文件

@property (nonatomic, strong) NSMutableArray *photoItemArray;
@property (nonatomic, assign) int urlType;//图片浏览地址格式 0：本地路径；1：网络地址；2：base64图片

//@property (nonatomic, retain) RBDMuteSwitch *rBDMuteSwitch;
@property (nonatomic, retain) NSString* rBDMuteSwitchCallbackId;

//@property (nonatomic, copy) stringBlock addObserverForUserInfoBlock;
//@property (nonatomic, copy) stringBlock addObserverForCloseWebViewBlock;
@end

@implementation BSLTools

- (void)dealloc
{
//    _scannerVC.delegate = nil;
//    _scannerVC = nil;
//    _openFileManager = nil;
//    [_rBDMuteSwitch setDelegate:nil];
//    _rBDMuteSwitch = nil;
    _rBDMuteSwitchCallbackId = nil;
//    [forgetPwdController dismiss];
//    [_popoverVC dismiss];
//    [_timePick dismiss];
//    for (NSString *key in _dialogs)
//    {
//        ISAlertView *alertView = [_dialogs objectForKey:key];
//        alertView.delegate = nil;
//    }
    self.dialogs = nil;
    
//    if (self.addObserverForUserInfoBlock) {
//        [[CommonTools sharedInstance] removeObserverForUserInfo:self.addObserverForUserInfoBlock];
//        self.addObserverForUserInfoBlock = nil;
//    }
//    if (self.addObserverForCloseWebViewBlock) {
//        [[CommonTools sharedInstance] removeObserverForCloseWebView:self.addObserverForCloseWebViewBlock];
//        self.addObserverForCloseWebViewBlock = nil;
//    }
}

#pragma mark - GetOrSet
- (NSMutableDictionary *)dialogs
{
    if (_dialogs == nil)
    {
        self.dialogs = [NSMutableDictionary dictionary];
    }
    
    return _dialogs;
}

#pragma mark - Public methods

/**
 *  文件打开
 *  参数 JSON
 *     {
 *      "isOther": Boolean 是否必须使用第三方打开,
 *      "isNotExist": Boolean 文件不存在是否提示用户是否下载
 *      "downloadUrl" : String 该文件的下载地址,
 *      "localFile" : String 本地的文档路径
 *     }
 *
 *   使用场景：
 *   1.需要打开的本地文件，请传入本地文档的路径。目前暂时只支持第三那方打开的方式。
 *   2.需要打开远程文件，则会先搜索本地是否有缓存，根据isNotExist这个参数，当缓存不存在的时候，是否进行下载。
 *   3.远程文件会默认存到tmp目录。
 *   4.版本支持 2.7 and later。
 *  @param command
 */
-(void)openLocalFile:(CDVInvokedUrlCommand *)command{
////    DownloadFileManager *fileDownloadManager = [DownloadFileManager sharedInstance];
//    _openFileManager = [[OpenFileManager alloc] init];
//    NSDictionary *dictParams = [command argumentAtIndex:0];
//    if (dictParams != nil && [dictParams isKindOfClass:[NSDictionary class]] && dictParams.count > 0) {
//        BOOL isOther = [[dictParams objectForKey:@"isOther"] boolValue];
//        NSString *fileName = [dictParams objectForKey:@"fileName"];
//        BOOL isNotExist = YES;
//        if ([dictParams.allKeys containsObject:@"isNotExist"]) {
//            isNotExist = [[dictParams objectForKey:@"isNotExist"] boolValue];
//        }
//        NSString *downloadUrl = [dictParams objectForKey:@"downloadUrl"];
//        NSString *localFile = [dictParams objectForKey:@"localFile"];
//        _openFileManager.parentViewController = self.viewController;
//        [_openFileManager setDidReceiveBytesBlock:^(DownloadFileModel *file) {
//            NSLog(@"receive bytes: %@",file.fileReceivedSize);
//        }];
//        [_openFileManager setFinishedDownloadFileBlock:^(DownloadFileModel *file) {
//            NSLog(@"download finished %@", file.fileName);
//        }];
//        
//        [_openFileManager openFile:isOther isNotExist:isNotExist downloadUrl:downloadUrl localFile:localFile fileName:fileName];
//        
//    }
    
}

/**
 * {
 * @option //标识当前以下参数为可选
 * "vibrate ": Boolean 是否开启震动,
 * "vibrateHz": int (建议不要超过10)震动频率,只对Android生效，iOS默认1~2秒，高频率。
 * "sound": Boolean 是否播放声音,
 * "soundPath": 声音文件的相对路径, 模块名称/xxx.wav，注意Android和iOS的声音格式不一致。
 * }
 * errorCode： 当isSuccess为false时，errorCode有以下参数：
  * 0：None
  * 1：设备无法震动(iPad不支持震动)
  * 2：声音文件找不到
  * 3：设备调为静音
  * 4：文件损坏或者格式不支持播放
 *
 *  @param command
 */
-(void)audioServicesPlay:(CDVInvokedUrlCommand *)command{
    NSDictionary *dictParams = [command argumentAtIndex:0];
//    [self.commandDelegate runInBackground:^{
        __block NSInteger isSuccess = 1;
    NSInteger errorCode = 0;
        if ([dictParams isKindOfClass:[NSDictionary class]] && dictParams.count > 0) {
            BOOL vibrate = [[dictParams objectForKey:@"vibrate"] boolValue];
            BOOL sound = [[dictParams objectForKey:@"sound"] boolValue];
            NSString *soundPath = [dictParams objectForKey:@"soundPath"];
            if (vibrate) {
                if ([UIDevice currentDevice].userInterfaceIdiom == UIUserInterfaceIdiomPhone) {
                    isSuccess = 1;
//                    AudioServicesPlaySystemSound(kSystemSoundID_Vibrate);
                }else{
                    isSuccess = 0;
                    errorCode = 1;
                }
            }
            if (sound) {
                NSString *path;
                if ([soundPath hasPrefix:@"file:"]) {
                    path = soundPath;
                }else{
//                    path = [[[NSFileManager wwwRuntimeDirectory] path] stringByAppendingPathComponent:soundPath];//[[NSBundle mainBundle] pathForResource:@"message" ofType:@"wav"];
                }
                BOOL isExist = [[NSFileManager defaultManager] fileExistsAtPath:path];
                if (isExist) {
                    isSuccess = 1;
                    __weak __typeof(self) weakSelf = self;
                    _rBDMuteSwitchCallbackId = command.callbackId;
//                    _rBDMuteSwitch = [RBDMuteSwitch sharedInstance];
//                    [_rBDMuteSwitch setDelegate:self];
//                    [_rBDMuteSwitch setIsMutedBlock:^(BOOL muted) {
////                        isSuccess = muted;
//                        //组装并播放音效xxx
//                        SystemSoundID soundID;
//                        NSURL *filePath = [NSURL fileURLWithPath:path isDirectory:NO];
//                        AudioServicesCreateSystemSoundID((__bridge CFURLRef)filePath, &soundID);
//                        AudioServicesPlaySystemSound(soundID);
//                        
//                        CDVPluginResult *result = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsBool:muted];
//                        [weakSelf.commandDelegate sendPluginResult:result callbackId:command.callbackId];
//                        
//                    }];
//                    SystemSoundID soundID;
//                    NSURL *filePath = [NSURL fileURLWithPath:path isDirectory:NO];
//                    AudioServicesCreateSystemSoundID((__bridge CFURLRef)filePath, &soundID);
//                    AudioServicesPlaySystemSound(soundID);
//                    [_rBDMuteSwitch detectMuteSwitch];
                }else{
                    isSuccess = 0;
                    errorCode = 2;
                    CDVPluginResult *result = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsArray:@[@(isSuccess), @(errorCode)]];
                    [self.commandDelegate sendPluginResult:result callbackId:command.callbackId];
                }
                
            }else{
                CDVPluginResult *result = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsArray:@[@(isSuccess), @(errorCode)]];
                [self.commandDelegate sendPluginResult:result callbackId:command.callbackId];
            }
        }
        
//    }];
}

#pragma mark RBDMuteSwitchDelegate methods
- (void)isMuted:(BOOL)muted {
    NSInteger isSuccess = 0;
    NSInteger errorCode = 0;
    if (muted) {
        errorCode = 3;
        isSuccess = 0;
    }else{
        isSuccess = 1;
    }
    CDVPluginResult *result = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsArray:@[@(isSuccess), @(errorCode)]];
    [self.commandDelegate sendPluginResult:result callbackId:_rBDMuteSwitchCallbackId];
    
}


- (void)getCommonParam:(CDVInvokedUrlCommand *)command
{
//    NSArray *commonParam = [(Old_CubeWebViewController *)self.viewController commonParam];
////    CDVPluginResult *result = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsString:[commonParam JSONString]];
////    [result setKeepCallbackAsBool:NO];
//    [self.commandDelegate sendPluginResult:[CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsString:[commonParam JSONString]] callbackId:command.callbackId];
//    return [commonParam JSONString];
}

- (void)setTitle:(CDVInvokedUrlCommand *)command
{
//    self.viewController.navigationController.title = [command argumentAtIndex:0];
    dispatch_async(dispatch_get_main_queue(), ^{
        NSLog(@"%@ %@",[self.viewController class],self.viewController.title);
        [self.viewController.navigationController setTitle:@"fafea"];
        self.webView.backgroundColor=[UIColor redColor];
//        [self.viewController.view setNeedsDisplay];
    });
   
    
}

- (void)showDialog:(CDVInvokedUrlCommand *)command
{
    NSString *sTitle = [command argumentAtIndex:0 withDefault:@"温馨提示" andClass:[NSString class]];
    NSString *sMsg = [command argumentAtIndex:1 withDefault:@"" andClass:[NSString class]];
    NSArray *aBtnTitles = [command argumentAtIndex:2 withDefault:@[@"确定"] andClass:[NSArray class]];
    
//    ISAlertView *alertView = [[ISAlertView alloc]initWithTitle:sTitle message:sMsg delegate:nil cancelButtonTitle:nil otherButtonTitles:aBtnTitles];
//    if (command.callbackId){
//        alertView.delegate = self;
//        [self.dialogs setObject:alertView forKey:command.callbackId];
//    }
//    [alertView show];
    
}
-(void)closeDialog:(CDVInvokedUrlCommand *)command
{
 
//    for (NSString *aKey in self.dialogs.allKeys) {
//         ISAlertView* alert= [self.dialogs objectForKey:aKey];
//        if (alert) {
//            [alert dismiss];
//        }
//    }
//    [self.dialogs removeAllObjects];
   

}
- (void)showToast:(CDVInvokedUrlCommand *)command
{
    // 毫秒转秒
    float duration = [[command argumentAtIndex:1 withDefault:nil andClass:[NSNumber class]] floatValue]/1000.0f;
    if (duration <= 0)
    {
        duration = 2.0f;
    }
//    [[(Old_CubeWebViewController *)self.viewController baseBiz] showToastWithTitle:@"" message:[[command argumentAtIndex:0] description] duration:duration];
    
}

- (void)adjustToast:(CDVInvokedUrlCommand *)command
{
//    [[(Old_CubeWebViewController *)self.viewController baseBiz] adjustToast:[[command argumentAtIndex:0] floatValue]];
    
}

- (void)showLoading:(CDVInvokedUrlCommand *)command
{
//    NSString *sMsg = [command argumentAtIndex:0 withDefault:nil andClass:[NSString class]];
//    if (sMsg)
//    {
//        [[(Old_CubeWebViewController *)self.viewController baseBiz] startBlockAnimationWithMsg:sMsg];
//    }
//    else
//    {
//        [[(Old_CubeWebViewController *)self.viewController baseBiz] startBlockAnimation];
//    }
}

- (void)dismissLoading:(CDVInvokedUrlCommand *)command
{
//    [[(Old_CubeWebViewController *)self.viewController baseBiz] stopBlockAnimation];
}

- (void)setBackAction:(CDVInvokedUrlCommand *)command
{
    NSString *action = [command argumentAtIndex:0 withDefault:nil andClass:[NSString class]];
//    [(Old_CubeWebViewController *)self.viewController setReturnBackAction:action];
}

- (UIImage *)capture
{
    CGRect r = [ UIScreen mainScreen ].applicationFrame;
    UIGraphicsBeginImageContextWithOptions(r.size, self.viewController.view.opaque, 0.0);
//    UIGraphicsBeginImageContextWithOptions(parent.view.bounds.size, parent.view.opaque, 0.0);
    [self.viewController.view.layer renderInContext:UIGraphicsGetCurrentContext()];
    
    UIImage * img = UIGraphicsGetImageFromCurrentImageContext();
    
    UIGraphicsEndImageContext();
    
    return img;
}
-(void)preview:(CDVInvokedUrlCommand*)command{

//    bsl.infinitus.tools.preview({"url":["http://img4.imgtn.bdimg.com/it/u=128811874,840272376&fm=21&gp=0.jpg", "http://pic1a.nipic.com/2008-11-26/200811268173650_2.jpg"], "urlType": 1, "zoom": true, "position":1, "showPositionTip": true});
    
    self.photoItemArray= [NSMutableArray array];
    NSDictionary *jsonParam = [command argumentAtIndex:0 withDefault:nil andClass:[NSDictionary class]];
    if ([jsonParam count]) {
        
//	    NSArray *imageArray = [Utils convertNull:jsonParam[@"url"]] ;
//	    if (imageArray != nil && imageArray.count > 0) {
//	        [imageArray enumerateObjectsUsingBlock:^(NSString *src, NSUInteger idx, BOOL *stop){
//	            HZPhotoItemModel *item = [[HZPhotoItemModel alloc] init];
//	            item.thumbnail_pic = src;
//	            [_photoItemArray addObject:item];
//	        }];
//	    }
//        
//	    self.urlType= [[Utils convertNull:jsonParam[@"urlType"]] intValue];
//	    BOOL canZoom= [[Utils convertNull:jsonParam[@"zoom"]] boolValue];
//	    int selectedPicIndex=[[Utils convertNull:jsonParam[@"position"]] intValue];
//	    BOOL showPositionTip=[[Utils convertNull:jsonParam[@"showPositionTip"]] boolValue];
//	    if ((self.photoItemArray.count-1)<selectedPicIndex) {
//	        selectedPicIndex = 0;
//	    }
    
//    HZImagesGroupView *imagesGroupView = [[HZImagesGroupView alloc] initWithFrame:CGRectMake(0, 64, kDeviceWidth-10, KDeviceHeight-84)];
//    
//    imagesGroupView.photoItemArray = [_photoItemArray copy];
//    imagesGroupView.hidden=YES;
//    [self.viewController.view addSubview:imagesGroupView];
    
    
	    //启动图片浏览器
//	    HZPhotoBrowser *browserVc = [[HZPhotoBrowser alloc] init];
//	    browserVc.sourceImagesContainerView = self.viewController.view; // 原图的父控件
//	    browserVc.imageCount = self.photoItemArray.count; // 图片总数
//	    browserVc.currentImageIndex = selectedPicIndex;
//	    browserVc.isfromBSLTool =  YES;
//	    browserVc.urltype = self.urlType;
//	    browserVc.canZoom = canZoom;
//	    browserVc.showPositionTip = showPositionTip;
//	    browserVc.delegate = self;
//	    [self.viewController presentViewController:browserVc animated:YES completion:nil];
	}
}

- (void)lookPhoto:(CDVInvokedUrlCommand *)command
{
//        NSArray *imgArray = [command argumentAtIndex:0];
//   
//        CTImageSeeViewController *imgSeeView = nil;
//        imgSeeView = [[CTImageSeeViewController alloc] initWithType:kCTImageSeeViewFullPath];
//        imgSeeView.delegate=self;
//        [imgSeeView lookPhoto:imgArray defIndex:0];
//        CGRect horizonR = self.viewController.view.frame;
//#ifdef IOS_DEVICE_PAD
//        self.popoverVC = [[NHPopoverViewController alloc] initWithController:imgSeeView contentSize:CGSizeMake(480*1.2,480*1.2) autoClose:YES];
//#else
//        self.popoverVC = [[NHPopoverViewController alloc] initWithController:imgSeeView contentSize:CGSizeMake(horizonR.size.width, horizonR.size.height*0.8) autoClose:YES];
//#endif
//        [_popoverVC show];
    
}
#pragma mark - 二维码扫描关闭
- (void)closeBarcode:(CDVInvokedUrlCommand *)command{
    [self.viewController dismissViewControllerAnimated:YES completion:nil];
}
#pragma mark - 选择相册的组件
//maximumImagesCount,defaultSelectList, scale, isThumbSmall,isBase64Result
- (void)chooseLocalPhotos:(CDVInvokedUrlCommand *)command{
    _choosePhotosCall = command.callbackId;
    NSDictionary *jsonParam = [command argumentAtIndex:0 withDefault:nil andClass:[NSDictionary class]];
    if ([jsonParam count]) {
        [self openPhotosWithOption:jsonParam :command];
    }
}
- (void)openPhotosWithOption:(NSDictionary *)jsonParam :(CDVInvokedUrlCommand *)command{
    
//    ELCImagePickerController *elcPicker = [[ELCImagePickerController alloc] initImagePicker];
//    //Set the maximum number of images to select to 100
//    elcPicker.maximumImagesCount = [[Utils convertNull:jsonParam[@"maximumImagesCount"]] intValue];
//    
//    //Only return the fullScreenImage, not the fullResolutionImage
//    id returnsOriginalImage = jsonParam[@"isReturnsOriginalImage"];
//    if (!returnsOriginalImage) {
//        returnsOriginalImage = @(YES);
//    }else{
//        if ([returnsOriginalImage isKindOfClass:NSNull.class]) {
//            returnsOriginalImage = @(YES);
//        }
//    }
//    elcPicker.returnsOriginalImage = [returnsOriginalImage boolValue];
//    
//    //Return UIimage if YES. If NO, only return asset location information
//    elcPicker.returnsImage = [[Utils convertNull:jsonParam[@"isReturnsImage"]] boolValue];
//    
//    //For multiple image selection, display and return order of selected images
//    id isOnOrder = jsonParam[@"isOnOrder"];
//    if (!isOnOrder) {
//        isOnOrder = @(YES);
//    }else{
//        if ([isOnOrder isKindOfClass:NSNull.class]) {
//            isOnOrder = @(YES);
//        }
//    }
//    elcPicker.onOrder = [isOnOrder boolValue];
//    
//    //Supports image and
//    elcPicker.mediaTypes = @[(NSString *)kUTTypeImage, (NSString *)kUTTypeMovie];
//    elcPicker.imagePickerDelegate = self;
//    elcPicker.staging = command.callbackId;
//    
//    id jsonStr = [Utils convertNull:jsonParam[@"defaultSelectList"]];
//    NSArray *defaultSelectList = nil;
//    if ([jsonStr isKindOfClass:NSString.class] && [jsonStr length]) {
//        NSData *jsonData = [jsonStr dataUsingEncoding:NSUTF8StringEncoding];
//        NSError *error = nil;
//        id dic = [NSJSONSerialization JSONObjectWithData:jsonData options:0 error:&error];
//        jsonStr = dic;
//    }
//    
//    if ([jsonStr isKindOfClass:NSArray.class]){
//        defaultSelectList = jsonStr;
//    }
//    elcPicker.referenceURLInfo = defaultSelectList;
//    
//    elcPicker.isThumbSmall = [[Utils convertNull:jsonParam[@"isThumbSmall"]] boolValue];
//    elcPicker.isBase64Result = [[Utils convertNull:jsonParam[@"isBase64Result"]] boolValue];
//    elcPicker.thumScale = [[Utils convertNull:jsonParam[@"scale"]] floatValue] == 0.0 ? 1 : [[Utils convertNull:jsonParam[@"scale"]] floatValue];
//    elcPicker.maxSize = [[Utils convertNull:jsonParam[@"maxSize"]] floatValue];
//    elcPicker.maxPixel = [[Utils convertNull:jsonParam[@"maxPixel"]] floatValue];
//    elcPicker.isPersistence = [[Utils convertNull:jsonParam[@"isPersistence"]] floatValue];
//    
//    [self.viewController presentViewController:elcPicker animated:YES completion:nil];
}
#pragma mark ELCImagePickerDelegate
//- (void)elcImagePickerController:(ELCImagePickerController *)picker didFinishPickingMediaWithInfo:(NSArray *)info
//{
//    //NSMutableArray *images = [NSMutableArray array];
//    NSMutableArray *result= [NSMutableArray array];
//    //保存图片占用线程时间长，改异步
//    if(picker.returnsImage){
//        for (NSDictionary *dict in info) {
//            if (([dict objectForKey:UIImagePickerControllerMediaType] == ALAssetTypePhoto)&&([dict objectForKey:UIImagePickerControllerOriginalImage])){
//                    [result addObject:dict[@"imgName"]];
//            }
//        }
//    }else{
//        [result addObjectsFromArray:info];;
//        _choosePhotosCall = picker.staging;
//    }
//    
//    
//    if (result.count > 0&&_choosePhotosCall) {
//        //返回图片路径
//            [self.commandDelegate sendPluginResult:[CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsString:[result JSONString]] callbackId:_choosePhotosCall];
//    }
//    
//    [self.viewController dismissViewControllerAnimated:YES completion:nil];
//}
//
//
//- (void)elcImagePickerControllerDidCancel:(ELCImagePickerController *)picker
//{
//    [self.viewController dismissViewControllerAnimated:YES completion:nil];
//}
#pragma mark -
- (void)handleFile:(CDVInvokedUrlCommand *)command{
    
}
- (void)getHost:(CDVInvokedUrlCommand *)command
{
//    NSDictionary *host = @{@"gbss":URL_ROOT_GBSS,
//                           @"uim":URL_UIM,
//                           @"emcs":URL_ROOT_EMCS,
//                           @"root":URL_ROOT,
//                           @"cdn":URL_ROOT_EMCS_CDN,
//                           @"gmcsnew":URL_ROOT_GMCS,
//                           @"gmcs":GMCS
//                           };
//
//
//    [self.commandDelegate sendPluginResult:[CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsString:[host JSONString]] callbackId:command.callbackId];
//    return [host JSONString];
}
- (void)addRightBtn:(CDVInvokedUrlCommand *)command{
    __weak __typeof(self) mySelf = self;
//    [(Old_CubeWebViewController *)self.viewController addRightBtn:[command argumentAtIndex:0] withBlock:^{
//        [[mySelf commandDelegate] sendPluginResult:[CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsString:@""] callbackId:command.callbackId];
//    }];
}
/**
 *  打开设置页面
 */
- (void)openSettingsURLString:(CDVInvokedUrlCommand *)command{
    
//    [[AppDelegate appDelegate] openSystemSetting];
    
}
- (void)saveUserDefault:(CDVInvokedUrlCommand *)command
{
        id content = [command argumentAtIndex:1];
        // 判断保存的值是否为基础类型
//        if ([content isKindOfClass:[NSArray class]] || [content isKindOfClass:[NSDictionary class]])
//        {
//            content = [content JSONString];
//        }
//        else if (![content isKindOfClass:[NSNumber class]] && ![content isKindOfClass:[NSString class]])
//        {
////            [iConsole error:@"%@",[command getErrorStr:CTStatusCodeIllegalArgument msg:@"保存的Value格式不正确！"]];
//             IConsoleLog(@"保存的Value格式不正确！");
////            return [NSNumber numberWithBool:NO];
//            [self.commandDelegate sendPluginResult:[CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsInt:0] callbackId:command.callbackId];
//        }
//        
//        [[NSUserDefaults standardUserDefaults] setObject:content forKey:[command argumentAtIndex:0]];
//        [[NSUserDefaults standardUserDefaults] synchronize];
//        
//        // 切换主题时
//        if ([@"CurrentThemeName" isEqualToString:[command argumentAtIndex:0]])
//        {
//            // 更新主题样式
//            [(Old_CubeWebViewController *)self.viewController setCurrentThemeUI];
//        }
    [self.commandDelegate sendPluginResult:[CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsInt:1] callbackId:command.callbackId];
//    return [NSNumber numberWithBool:YES];
}

- (void)readUserDefault:(CDVInvokedUrlCommand *)command
{
    [self.commandDelegate sendPluginResult:[CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsString:[[NSUserDefaults standardUserDefaults] stringForKey:[command argumentAtIndex:0]]] callbackId:command.callbackId];
//        return [[NSUserDefaults standardUserDefaults] stringForKey:[command argumentAtIndex:0]];
    
}
- (void)saveMemory:(CDVInvokedUrlCommand *)command
{//bsl.infinitus.userDefault.saveValue("saveKey","saveValue");
        id content = [command argumentAtIndex:1];
        // 判断保存的值是否为基础类型
//        if ([content isKindOfClass:[NSArray class]] || [content isKindOfClass:[NSDictionary class]])
//        {
//            content = [content JSONString];
//        }
//        [Utils saveMemory:[command argumentAtIndex:0] content:content];
    
//    return [NSNumber numberWithBool:YES];
}

- (void)readMemory:(CDVInvokedUrlCommand *)command
{
//    id value = [Utils readMemory:[command argumentAtIndex:0]];
//    [self.commandDelegate sendPluginResult:[CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsString:value] callbackId:command.callbackId];
    
}

- (void)checkVersion:(CDVInvokedUrlCommand *)command
{
//    LogoutBiz *logoutBiz = [[LogoutBiz alloc] initWithTarget:self.viewController.view];
//    [logoutBiz startBlockAnimation];
//    [logoutBiz handleCheckVersionCompletion:^(id resp) {
//        [logoutBiz stopBlockAnimation];
//        NSLog(@"版本检测 : %@",resp);
//        NSDictionary *versonData = [[resp objectForKey:@"data"]objectAtIndex:0];;
//        self.updateAppURL = [versonData objectForKey:@"url"];
//        NSInteger force = [[versonData objectForKey:@"force"] integerValue];
//        UpdateAlertView *updateView = nil;
//        if(force == 1) //一般升级
//        {
//            updateView = [[UpdateAlertView alloc]initWithTitle:@"升级提示" versionNo:[versonData objectForKey:@"versionNo"] appSize:[versonData objectForKey:@"appSize"] message:[versonData objectForKey:@"desc"] delegate:self cancelButtonTitle:kUpdataAppNow otherButtonTitles:[NSArray arrayWithObject:kUpdataAppLater]];
//            updateView.tag = 100;
//            [updateView show];
//        }
//        else if(force == 2)  //强制升级
//        {
//            updateView = [[UpdateAlertView alloc]initWithTitle:@"升级提示" versionNo:[versonData objectForKey:@"versionNo"] appSize:[versonData objectForKey:@"appSize"] message:[versonData objectForKey:@"desc"] delegate:self cancelButtonTitle:kUpdataAppNow otherButtonTitles:nil];
//            updateView.tag = 101;
//            [updateView show];
//        }
//        else   //无需更新
//        {
//            [logoutBiz showToastWithTitle:@"" message:[resp objectForKey:@"msg"]];
//        }
//        
//        // 版本是否是最新
//        BOOL hasUpdate = (force == 1 || force == 2);
//        [Utils saveMemory:@"hasUpdate" content:[NSNumber numberWithBool:hasUpdate]];
////        NSString *callback = [command argumentAtIndex:0 withDefault:nil andClass:[NSString class]];
////        if (callback)
////        {
////            [self.webView evaluatingJavaScriptOnMain:[NSString stringWithFormat:@"%@(%d)", callback, hasUpdate]];
////            [self.webView stringByEvaluatingJavaScriptFromString:[NSString stringWithFormat:@"%@(%d)", callback, hasUpdate]];
//            [self.commandDelegate sendPluginResult:[CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsBool:hasUpdate] callbackId:command.callbackId];
////        }
//     
//    } failedError:^(NSString *resultMsg) {
//        [logoutBiz stopBlockAnimation];
//        if ([resultMsg isEqualToString:kUserInvalid]) {
//            [(BaseViewController *)self.viewController pushUserInvalidTip:2];
//        }else{
//            
//            [logoutBiz showToastWithTitle:@"" message:resultMsg];
//        }
//    }];
}

- (void)makePhoneCall:(CDVInvokedUrlCommand *)command
{
    [[UIApplication sharedApplication] openURL:[NSURL URLWithString:[NSString stringWithFormat:@"tel://%@", [command argumentAtIndex:0]]]];
}

- (void)logout:(CDVInvokedUrlCommand *)command
{
//    HomePageViewController *homePageVC = [AppDelegate getDelegate].homeViewController;
//    BOOL   isHiddenAlert= [[command argumentAtIndex:0 withDefault:@NO] boolValue];
//    [homePageVC prepareLoginOut:isHiddenAlert];
}

- (void)showPicker:(CDVInvokedUrlCommand *)command
{
    
}

- (void)showDatePicker:(CDVInvokedUrlCommand *)command
{
//    [_timePick dismiss];
//    TimeActionSheet *timePick = [[TimeActionSheet alloc] init];
//    self.timePick = timePick;
//    timePick.delegate=self;
//    timePick.userInfo = [NSDictionary dictionaryWithObject:command forKey:kPickUserInfoKey];
//    
//    [timePick showInView:self.webView clickPoint:(([[UIDevice currentDevice] userInterfaceIdiom] == UIUserInterfaceIdiomPhone) ? CGPointZero:[(Old_CubeWebViewController *)self.viewController getPadClickPoint:self.webView])];
//    
//    [timePick setTimeMode:[[command argumentAtIndex:0] intValue]];
//    
//    id param = [command argumentAtIndex:1];
//    NSString *selected = param;
//    NSDateFormatter *dateFormatter = [[NSDateFormatter alloc] init];
//    [dateFormatter setDateFormat:kTimePickerCallbackFromatStr];
//    if (param) {
//        id dic = nil;
//        if ([param isKindOfClass:NSString.class]) {
//            NSData *jsonData = [param dataUsingEncoding:NSUTF8StringEncoding];
//            NSError *error = nil;
//            dic = [NSJSONSerialization JSONObjectWithData:jsonData options:0 error:&error];
//        }
//        else if ([param isKindOfClass:NSDictionary.class]){
//            dic = param;
//        }
//        
//        if ([dic isKindOfClass:[NSDictionary class]]) {
//            selected = dic[@"selectDate"];
//            NSDate *maxDate = [dateFormatter dateFromString:dic[@"MaxDate"]];
//            NSDate *minDate = [dateFormatter dateFromString:dic[@"MinDate"]];
//            if (maxDate){
//                [timePick setMaximumDate:maxDate];
//            }
//            if(minDate){
//                [timePick setMinimumDate:minDate];
//            }
//            if (!maxDate || !minDate){
//                IConsoleLog(@"%@",[NSString stringWithFormat:@"日期，格式不符合Y-M-D H:m:s"]);
//                [self.commandDelegate sendPluginResult:[CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsString:@"日期，格式不符合Y-M-D H:m:s"] callbackId:command.callbackId];
//            }
//        }
//    }
//    
//    if ([selected length] > 0)
//    {
//        NSDate *selectedDate = [dateFormatter dateFromString:selected];
//        if (selectedDate != nil){
//            [timePick defaultSel:selectedDate];
//        }
//    }
    
}

- (void)confirmBusinessPwd:(CDVInvokedUrlCommand *)command
{
    self.confirmPwdCall = command.callbackId;
    
//    if ([YCOAuth isOAuth]){
//         [self.commandDelegate sendPluginResult:[CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsString:@"true"] callbackId:_confirmPwdCall];
//    }else{
//        [self showConfirm];
//    }
}
-(void)showConfirm
{
//    ConfirmPwdViewController *confirmPwd = [[ConfirmPwdViewController alloc] init];
//    _confirmPwd = confirmPwd;
//    _confirmPwd.errorCount = [[[NSUserDefaults standardUserDefaults] valueForKey:@"passwordErrorCount"] intValue];
//    confirmPwd.delegate = self;
//#ifdef IOS_DEVICE_PAD
//    self.popoverVC = [[NHPopoverViewController alloc] initWithController:confirmPwd contentSize:CGSizeMake(380, 250)];
//#else
//    self.popoverVC = [[NHPopoverViewController alloc] initWithController:confirmPwd contentSize:CGSizeMake(280, 200)];
//#endif
//    [_popoverVC show];
}
- (void)ecbEncrypt:(CDVInvokedUrlCommand *)command
{
//    NSString *value = [Utils encryptECBWithString:[command argumentAtIndex:0]];
//    [self.commandDelegate sendPluginResult:[CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsString:value] callbackId:command.callbackId];
}

- (void)saveTempCache:(CDVInvokedUrlCommand *)command
{
        id value = [command argumentAtIndex:1];
//        if (value)
//        {
//            [[(Old_CubeWebViewController *)self.viewController webTempCache] setObject:value forKey:[command argumentAtIndex:0]];
//        }
//        else
//        {
//            [[(Old_CubeWebViewController *)self.viewController webTempCache] removeObjectForKey:[command argumentAtIndex:0]];
//        }
    
//    [self.commandDelegate sendPluginResult:[CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsInt:1] callbackId:command.callbackId];
}

- (void)readTempCache:(CDVInvokedUrlCommand *)command
{
//    NSString *value =  [[(Old_CubeWebViewController *)self.viewController webTempCache] objectForKey:[command argumentAtIndex:0]];
//    [self.commandDelegate sendPluginResult:[CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsString:value] callbackId:command.callbackId];
}

- (void)cleanTempCache:(CDVInvokedUrlCommand *)command
{
//    [(Old_CubeWebViewController *)self.viewController setWebTempCache:nil];
    
}

- (void)rotateScreen:(CDVInvokedUrlCommand *)command
{
//    [(Old_CubeWebViewController *)self.viewController rotateScreen:[[command argumentAtIndex:0] intValue]];
    
}

- (void)addTipsToController:(CDVInvokedUrlCommand *)command
{
    NSString *keyName = [command argumentAtIndex:0];
    
    
    
}

- (void)themeColor:(CDVInvokedUrlCommand *)command
{
    
}

- (void)callPadLeftJS:(CDVInvokedUrlCommand *)command
{
//        [(CTWebView *)[(Old_CubeWebViewController *)self.viewController webView] evaluatingJavaScriptOnMain:[NSString stringWithFormat:@"%@();", [command argumentAtIndex:0]]];
//    [[(Old_CubeWebViewController *)self.viewController webView] stringByEvaluatingJavaScriptFromString:[NSString stringWithFormat:@"%@();", [command argumentAtIndex:0]]];
    [self.commandDelegate sendPluginResult:[CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsString:@""] callbackId:command.callbackId];
}


/**
 *  选择图片 从相册选取图片后可以进行移位、缩放、翻转操作
 *  @param callbackid 回调方法
 */
- (void)chooseCropPhotoToH5:(CDVInvokedUrlCommand *)command
{
    NSString *funCallback =  command.callbackId;
    
//    imagePicker = [[GSImagePickerModel alloc] init];
//    [imagePicker setViewController:self.viewController];
//    __weak id mySelf = self;
//    imagePicker.didFinishSelelctImageWithPathBlock  = ^(NSString *orgImagePath, NSString *thumImagePath){
//        imagePicker = nil;
//        NSLog(@"org image path: %@,  \nthum image path:%@", orgImagePath, thumImagePath);
//        
//        if (funCallback) {
//            NSDictionary *dic = @{@"pic" : thumImagePath ? thumImagePath : @"",
//                                  @"thumb" : orgImagePath ? orgImagePath : @""};
//            [[(BSLTools *)mySelf commandDelegate] sendPluginResult:[CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsString:[dic JSONString]] callbackId:command.callbackId];
////            [NSString stringWithFormat:@"'{\"pic\":\"%@\",\"thumb\":\"%@\"}'", thumImagePath, orgImagePath]
//        }
//        
//    };
//    [imagePicker show];
}

/**
 *  发送短信
 */
-(void)sendMessage:(CDVInvokedUrlCommand *)command
{
    NSString *tel =  [command argumentAtIndex:0];
    NSString *text =  [command argumentAtIndex:1];
    NSArray *array = [tel componentsSeparatedByString:@","];
    
//    if( [MFMessageComposeViewController canSendText] ){
//        MFMessageComposeViewController * controller = [[MFMessageComposeViewController alloc]init]; //autorelease];
//        controller.recipients = array;
//        controller.body = text;
//        controller.messageComposeDelegate = self;
//        [self.viewController presentViewController:controller animated:NO completion:nil];
////        [[[[controller viewControllers] lastObject] navigationItem] setTitle:@"测试短信"];//修改短信界面标题
//    }else{
//        LoginBiz *loginBiz = [[LoginBiz alloc]initWithTarget:self.viewController.view];
//        [loginBiz showToastWithTitle:@"" message:@"您的设备可能没有短信功能"];
//    }
    
//    self.messageViewController = nil;
//    self.messageViewController = [[MessageController alloc] initWithTel:array title:@"" message:text];
//    self.messageViewController.messageComposeResultBlock = ^(MessageComposeResult result){
//        NSLog(@"message send result: %d", result);
//    };
//    [self.messageViewController sendMessage:self.viewController];
    //    [self.viewController presentViewController:messageViewController animated:YES completion:nil];
    
}



/**
 *  当控件获取Focus时，调用原生接口
 *  @param scrollId
 *  @param scrollHeight
 */
-(void)postScrollHeightToTop:(CDVInvokedUrlCommand *)command
{
//    NSString *scrollId =  [command argumentAtIndex:0];
//    NSString *height =  [command argumentAtIndex:1];
//    //    AppDelegate.scrollId = scrollId;
//    //    AppDelegate.scrollToTopHeight = height;
//    AppShareData *shareData = [AppShareData sharedInstance];
//    shareData.scrollId = scrollId;
//    shareData.scrollToTopHeight = height;
    //    NSString *message = [NSString stringWithFormat:@"当控件Focus时，调用原生接口.高度：%@, ID:%@",height,scrollId];
    //    UIAlertView *alert = [[UIAlertView alpushloc] initWithTitle:@"测试" message:message delegate:nil cancelButtonTitle:@"OK" otherButtonTitles:nil, nil];
    //    [alert show];
}
#pragma mark - 微信支付
- (void)wechatPay:(CDVInvokedUrlCommand *)command{
//    NSString *type =  [command argumentAtIndex:0];
//    id jsonStr =  [command argumentAtIndex:1];
//    if ([jsonStr isKindOfClass:NSString.class]) {
//        jsonStr = [jsonStr objectFromJSONData];
//    }
//    if (![[UIApplication sharedApplication] canOpenURL:[NSURL URLWithString:@"wechat://"]]) {
//        ISAlertView *alertView = [[ISAlertView alloc]initWithTitle:@"温馨提示" message:@"您的手机尚未安装 微信, 安装后才能使用该功能。" delegate:nil cancelButtonTitle:@"确定" otherButtonTitles:nil];
//        [alertView show];
//    }else {
//        if ([type intValue] == 0) {
//            [(AppDelegate *)[UIApplication sharedApplication].delegate sendWeChatPay:jsonStr resultBlock:^(NSString *resultStr) {
//                [self.commandDelegate sendPluginResult:[CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsString:resultStr] callbackId:command.callbackId];
//            }];
//        }
//    }
}


//-(void)messageComposeViewController:(MFMessageComposeViewController *)controller didFinishWithResult:(MessageComposeResult)result
//{
//    [controller dismissViewControllerAnimated:NO completion:nil];//关键的一句   不能为YES
//    switch ( result ) {
//            
//        case MessageComposeResultCancelled:
//            //            [self alertWithTitle:@"提示信息" msg:@"发送取消"];
//            
//            break;
//        case MessageComposeResultFailed:// send failed
//            //            [self alertWithTitle:@"提示信息" msg:@"发送成功"];
//            break;
//        case MessageComposeResultSent:
//            //            [self alertWithTitle:@"提示信息" msg:@"发送失败"];
//            break;
//        default:
//            break;
//    }
//    NSLog(@"result: %d",result);
//    //    if (self.messageComposeResultBlock != nil) {
//    //        self.messageComposeResultBlock(result);
//    //    }
//    //    self.messageComposeResultBlock = nil;
//    //    [self dismissViewControllerAnimated:NO completion:nil];
//}



#pragma mark - scanner

//- (void)killScanningObserver
//{
//    [[NSNotificationCenter defaultCenter] removeObserver:self name:SCAN_JOB_FINISHED object:nil];
//}

- (void)scanBarcode:(CDVInvokedUrlCommand *)command
{
//    _scanbarcodeCall = command.callbackId;
//    _isConsecutiveScanning = [[command argumentAtIndex:1 withDefault:nil andClass:[NSNumber class]] boolValue];
//    
//    ScannerViewController *scannerVC = nil;
//    scannerVC = [[ScannerViewController alloc] init];
//    self.scannerVC = scannerVC;
//    self.scannerVC.delegate = self;
//    self.scannerVC.isConsecutiveScanning = _isConsecutiveScanning;
//    [self.viewController presentViewController:self.scannerVC animated:YES completion:nil];
}

- (void)sendScanningResults:(CDVInvokedUrlCommand *)command
{
//    if (_isConsecutiveScanning) {
//        [[NSNotificationCenter defaultCenter] removeObserver:self name:SCAN_JOB_FINISHED object:nil];
//    }
//    NSString *msg = [[command arguments] count] ? [command argumentAtIndex:0 withDefault:nil andClass:[NSString class]] : @"";
//    NSDictionary *scanningResultsDic = [[NSDictionary alloc] initWithObjectsAndKeys:msg,@"msg", nil];
//    [[NSNotificationCenter defaultCenter] postNotificationName:SCANNING_RESULTS_RETURN object:nil userInfo:scanningResultsDic];
}

//- (void)scanJobFinished:(NSNotification*)notification
//{
//    [[NSNotificationCenter defaultCenter] removeObserver:self name:SCAN_JOB_FINISHED object:nil];
//    if (noti == nil || noti.length == 0) {
//    }
//    else {
//        noti = nil;
//    }
//    noti = [NSString stringWithFormat:@"%@",[notification.userInfo objectForKey:@"scannedCode"]];
//    [self performSelector:@selector(reRegisterScanJob) withObject:nil afterDelay:.1];//to fix bugs in iOS6
//}

//- (void)reRegisterScanJob
//{
//    [[NSNotificationCenter defaultCenter] addObserver:self selector:@selector(scanJobFinished:) name:SCAN_JOB_FINISHED object:nil];
//    [self sendBarCode:noti isCancelled:NO];
//}

#pragma mark - ScannerDelegate

- (BOOL)sendBarCode:(NSString *)scannedBarcode isCancelled:(BOOL)isCancelled
{
    if (scannedBarcode == nil || scannedBarcode.length==0) {
        scannedBarcode =@"";
    }
    
    NSDictionary *dic = nil;
    if (isCancelled) {
        dic = [NSDictionary dictionaryWithObjectsAndKeys:
               [NSNumber numberWithBool:YES],@"cancelled",
               @"format",@"format",
               scannedBarcode,@"text", nil];
    }
    else {
        dic = [NSDictionary dictionaryWithObjectsAndKeys:
               [NSNumber numberWithBool:NO],@"cancelled",
               @"format",@"format",
               scannedBarcode,@"text", nil];
    }
    
//    NSString *returnString=[dic JSONString];
//    if (_scanbarcodeCall.length>0)
//    {
//        [self.commandDelegate sendPluginResult:[CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsString:returnString] callbackId:_scanbarcodeCall];
//    }
//    /**** 【扫一扫】扫描会员卡页，会员卡二维码不正确或识别不出时，直接在扫一扫页弹提示，无需退出扫一扫页 */
//    
//    if ((_isConsecutiveScanning && isCancelled) || !_isConsecutiveScanning)
//    {
//        [self.scannerVC dismissViewControllerAnimated:YES completion:^{
//            self.scannerVC.delegate = nil;
//            self.scannerVC = nil;
//        }];
//        return YES;
//    }
    return NO;

}

#pragma mark - ISAlertViewDelegate

- (void)isAlertView:(UIView *)alertView didDismissWithButtonIndex:(NSInteger)buttonIndex
{
    NSString *callback = nil;
    for (NSString *keyName in _dialogs)
    {
        if ([_dialogs objectForKey:keyName] == alertView)
        {
            callback = keyName;
            break;
        }
    }
    
    if (callback)
    {
        [_dialogs removeObjectForKey:callback];
//        IConsoleLog([NSString stringWithFormat:@"%@(%ld)", callback, (long)buttonIndex]);
        [self.commandDelegate sendPluginResult:[CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsInt:(int)buttonIndex] callbackId:callback];
    }
}

#pragma mark - UINavigationControllerDelegate

/**
 * 适配选择专卖店和添加专卖店会没有设置偏移导致状态栏不兼容问题
 * 不能直接改对应的VC，因为VC显示在TabBar中不存在状态栏问题
 */
- (void)navigationController:(UINavigationController *)navigationController willShowViewController:(UIViewController *)viewController animated:(BOOL)animated
{
#ifdef __IPHONE_7_0
    if ([[UIDevice currentDevice].systemVersion floatValue] >= 7)
    {
        if ([viewController.view viewWithTag:kHeadBgViewTag]) // 判断是否已经调整过
            return;
        
        for (UIView *view in viewController.view.subviews)
        {
            // 判断是否是专卖店信息的scrllView，不能设置它的大小会导致有20像素空白
            if ([view isKindOfClass:[UIScrollView class]])
                continue;
            if (view.superview == viewController.view)
            {
                CGRect vF = view.frame;
                vF.origin.y += 20;
                view.frame = vF;
            }
        }
        // 添加状态栏底部黑色视图
        UIView *headBgView = [[UIView alloc] initWithFrame:CGRectMake(0, 0, viewController.view.frame.size.width, 20)];
        headBgView.backgroundColor = [UIColor blackColor];
        headBgView.tag = kHeadBgViewTag;
        [viewController.view addSubview:headBgView];
    }
#endif
}

#pragma mark - UpdateAlertViewDelegate

- (void)updateAlertView:(UIView *)alertView didDismissWithButtonIndex:(NSInteger)buttonIndex
{
    if(buttonIndex == 0)
    {
//        BaiduMobStat* statTracker = [BaiduMobStat defaultStat];
//        [statTracker logEvent:@"升级" eventLabel:[[NSUserDefaults standardUserDefaults] valueForKey:@"dealerNo"]];
//        [[UIApplication sharedApplication] openURL:[NSURL URLWithString:[TipsCacheManager sharedManager].app_store_url]];
    }
}

#pragma mark - TimeActionSheetDelegate

//- (void)time:(TimeActionSheet *)time selDate:(NSDate *)selDate
//{
//    CDVInvokedUrlCommand *command = [time.userInfo objectForKey:kPickUserInfoKey];
//    NSString *callback = command.callbackId;
//    NSString *strTime = @"";
//    if (selDate && callback)
//    {
//        NSDateFormatter *dateFormatter = [[NSDateFormatter alloc] init];
//        [dateFormatter setDateFormat:kTimePickerCallbackFromatStr];
//        strTime = [dateFormatter stringFromDate:selDate];
//        [self.commandDelegate sendPluginResult:[CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsString:strTime] callbackId:callback];
//    }
//    
//    [time dismiss];
//}
//
//- (void)didDismissTimePick:(TimeActionSheet *)time
//{
//    self.timePick = nil;
//}

#pragma mark - ConfirmPwdViewControllerDelegate

//-(void)requirLogout
//{
//    //退出
//    HomePageViewController *homePageVC = [AppDelegate getDelegate].homeViewController;
//    [homePageVC backToLoginPage];
//}
//- (void)confirmPwd:(ConfirmPwdViewController *)confirmPwd result:(BOOL)isPass
//{
//    [_popoverVC dismiss];
//    if ([_confirmPwdCall length] > 0)
//    {
//        [self.commandDelegate sendPluginResult:[CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsString:isPass ? @"true" : @"false"] callbackId:_confirmPwdCall];
//        self.confirmPwdCall = nil;
//    }
//    self.popoverVC = nil;
//}
//- (void)modifyPwdWithConfirmPwd:(ConfirmPwdViewController *)confirmPwd
//{
//    [_popoverVC dismiss];
//    _popoverVC = nil;
//    GetPasswordViewController *getPwdVC = [[GetPasswordViewController alloc] init];
//    getPwdVC.title = @"忘记e帆网密码";
//    getPwdVC.getPasswordType = GetPasswordTypeGbssPwd;
//    getPwdVC.hideCardNumber = YES;
//    getPwdVC.delegate = self;
//    getPwdVC.modalTransitionStyle = UIModalTransitionStyleCrossDissolve;
//#ifdef IOS_DEVICE_PAD
//    UINavigationController *nc = [[UINavigationController alloc] initWithRootViewController:getPwdVC];
//    nc.navigationBarHidden = YES;
//    forgetPwdController = [[NHPopoverViewController alloc] initWithController:nc contentSize:CGSizeMake(480, 446)] ;
//    forgetPwdController.delegate = self;
//    [forgetPwdController showWithCloseBtn:YES];
//#else
//    [self.viewController presentModalViewController:getPwdVC animated:YES];
//#endif
//}
//-(void)getPassword:(GetPasswordViewController *)getPassword status:(BOOL)isModifySuccess
//{
//    if (!isModifySuccess) {
//#ifdef IOS_DEVICE_PAD
//        if (forgetPwdController)
//        {
//            [forgetPwdController dismiss];
//            forgetPwdController = nil;
//        }
//#else
//        [self.viewController dismissModalViewControllerAnimated:YES];
//#endif
//        [self showConfirm];
//    }else{//修改密码成功需退出重新登陆
//        [_popoverVC dismiss];
//        _popoverVC = nil;
//        //退出
//        HomePageViewController *homePageVC = [AppDelegate getDelegate].homeViewController;
//        [homePageVC backToLoginPage];
//    }
//}
//- (void)didDismissNHPopover:(NHPopoverViewController *)popoverController
//{
//    if (forgetPwdController) {
//        [forgetPwdController dismiss];
//        forgetPwdController = nil;
//    }
//}
#pragma mark -- shareSDK
- (void)checkAppInstall:(CDVInvokedUrlCommand *)command{
    int openType = [[command argumentAtIndex:0] intValue];
    NSURL *url = nil;
    BOOL isInstall = false;
    if (openType == 2) {
        //wechat
        url = [NSURL URLWithString:@"wechat://"];
    }
    else if(openType == 1){
        // qq
        url = [NSURL URLWithString:@"mqq://"];
    }
    else if(openType == 3){
        //新浪微博
        url = [NSURL URLWithString:@"sinaweibo://"];
    }
    if (url && [[UIApplication sharedApplication] canOpenURL:url]) {
        isInstall = true;
    }
    [self.commandDelegate sendPluginResult:[CDVPluginResult resultWithStatus:CDVCommandStatus_OK
                                                               messageAsBool:isInstall]
                                callbackId:command.callbackId];
}
-(void)share2WX:(CDVInvokedUrlCommand *)command
{
    NSString* title=[command argumentAtIndex:0];
    NSString* message=[command argumentAtIndex:1];
    NSString* url=[command argumentAtIndex:2];
    NSString* imgUrl=[command argumentAtIndex:3];
    NSString* musicUrl=[command argumentAtIndex:4];
    int type= [[command argumentAtIndex:5] intValue];
    NSString *contentId=[command argumentAtIndex:6];
    [self sharewithTitle:title shareList:nil content:message url:url imageUrl:imgUrl
                musicUrl:musicUrl type:type contentId:contentId callBack:command];
    
}
- (void)shareContent:(CDVInvokedUrlCommand *)command{
    NSArray *shareList = [command argumentAtIndex:0];
    NSString *title=[command argumentAtIndex:1];
    NSString *message=[command argumentAtIndex:2];
    NSString *url=[command argumentAtIndex:3];
    NSString *imgUrl=[command argumentAtIndex:4];
    NSString *musicUrl=[command argumentAtIndex:5];
    int type= [[command argumentAtIndex:6] intValue];
    NSString *contentId=[command argumentAtIndex:7];
    [self sharewithTitle:title shareList:shareList content:message url:url imageUrl:imgUrl
                musicUrl:musicUrl type:type contentId:contentId callBack:command];
}
-(void)sharewithTitle:(NSString*)title shareList:(NSArray *)shareList content:(NSString*)message url:(NSString*)url imageUrl:(NSString*)imageUrl musicUrl:musicUrl type:(int)type contentId:(NSString*)contentId callBack:(CDVInvokedUrlCommand *)sCallBack{

//    id<ISSCAttachment> image = nil;
//    if ([imageUrl length]) {
//        /**
//         *  有带图片地址的，先要判断是本地的还是远程图片
//         */
//        if ([[imageUrl lowercaseString] rangeOfString:@"http"].location != NSNotFound) {
//            image = [ShareSDK imageWithUrl:imageUrl];
//        }
//        else{
//            image = [ShareSDK imageWithPath:imageUrl];
//        }
//    }else{
//  
//          [self sharewithTitle:title shareList:shareList content:message url:url image:nil musicUrl:musicUrl type:type  contentId:contentId callBack:sCallBack];
//        return;
//    }
//    
//    /**
//     *  如果图片有带后缀
//     */
//    NSString *isPath = [imageUrl pathExtension];
//    if (imageUrl == nil || ([isPath length])) {
//        [self sharewithTitle:title shareList:shareList content:message url:url image:image musicUrl:musicUrl type:type  contentId:contentId callBack:sCallBack];
//    }else{
//        /**
//         *  图片地址是远程的，并没有带后缀
//         */
//        [image loadCustomImages:^{
//            NSString *miniType = [[imageUrl pathExtension] length] ?[image mimeType] : [[image data] stringMimeTypeFromData];
//            NSString *fileName = [NSString stringWithFormat:@"%.0f.",[[NSDate date] timeIntervalSince1970]];
//            fileName = [[imageUrl pathExtension] length] ? [imageUrl pathExtension] : [fileName stringByAppendingString:[[miniType pathComponents] lastObject]];
//            
//            id<ISSCAttachment> imageNew = [ShareSDK imageWithData:[image data]
//                                                         fileName:fileName
//                                                         mimeType:miniType];
//            [self sharewithTitle:title shareList:shareList content:message url:url image:imageNew musicUrl:musicUrl type:type contentId:contentId callBack:sCallBack];
//        } faultHandler:^(NSError *error) {
//            IConsoleLog(@"%@",error);
//            [[(Old_CubeWebViewController *)self.viewController baseBiz]
//             showToastWithTitle:@"温馨提示"
//             message:@"获取图片资源失败，请重试!"
//             duration:2];
//        }];
//    }
}
//-(void)sharewithTitle:(NSString*)title shareList:(NSArray *)shareList content:(NSString*)message url:(NSString*)url image:(id<ISSCAttachment>)image musicUrl:musicUrl type:(int)type contentId:(NSString*)contentId callBack:(CDVInvokedUrlCommand *)sCallBack
//{
//    
//    static BOOL isTheOnly = YES;
//    if (!isTheOnly) return;
//    isTheOnly = NO;
//    dispatch_after(dispatch_time(DISPATCH_TIME_NOW, (int64_t)(1 * NSEC_PER_SEC)), dispatch_get_main_queue(), ^{
//        isTheOnly = YES;
//    });
//    
//    
//    id<ISSContent> publishContent = [ShareSDK content:message
//                                       defaultContent:@"分享"
//                                                image:image
//                                                title:title
//                                                  url:url
//                                          description:@""
//                                            mediaType:type];
//    id<ISSContainer> container =  [ShareSDK container];
//    //    id<ISSPlatformApp> platformapp = [ShareSDK getClientWithType:ShareTypeWeixiSession];
//    // 验证参数
//    
//    id<ISSAuthOptions> authOptions = [ShareSDK authOptionsWithAutoAuth:YES
//                                                         allowCallback:NO
//#ifdef IOS_DEVICE_PAD
//                                                         authViewStyle:SSAuthViewStyleModal
//#else
//                                                         authViewStyle:SSAuthViewStyleFullScreenPopup
//#endif
//                                                          viewDelegate:nil
//                                               authManagerViewDelegate:nil];
//    
//    [container setIPhoneContainerWithViewController:self.viewController];
//#ifdef IOS_DEVICE_PAD
//    UIView *padview= [[UIView alloc] initWithFrame:CGRectMake(0, 0, 300, 10)];
//    [self.viewController.view addSubview:padview];
//    padview.center = (CGPoint){
//        CGRectGetMinX([self.webView frame]) + CGRectGetWidth([self.webView frame])/2,
//        CGRectGetHeight(self.viewController.view.frame) + CGRectGetHeight([padview frame])/2};
//    [container setIPadContainerWithView:padview arrowDirect:UIPopoverArrowDirectionAny];
//#endif
//    NSMutableArray *arrs = [NSMutableArray array];
//    if (shareList) {
//        NSDictionary *dict = @{@"0" : SHARE_TYPE_NUMBER(ShareTypeAny),//全部
//                               @"1" : SHARE_TYPE_NUMBER(ShareTypeWeixiSession),//微信
//                               @"2" : SHARE_TYPE_NUMBER(ShareTypeWeixiTimeline),//微信朋友圈
//                               @"3" : SHARE_TYPE_NUMBER(ShareTypeWeixiFav),//微信收藏
//                               @"4" : SHARE_TYPE_NUMBER(ShareTypeQQSpace),//QQ空间
//                               @"5" : SHARE_TYPE_NUMBER(ShareTypeQQ),//QQ
//                               @"6" : SHARE_TYPE_NUMBER(ShareTypeSinaWeibo),//新浪微博
//                               @"7" : SHARE_TYPE_NUMBER(ShareTypeSMS),//短信
//                               @"8" : SHARE_TYPE_NUMBER(ShareTypeSMS)};//彩信
//        if ([shareList indexOfObject:@"0"] != NSNotFound || [shareList indexOfObject:@(0)] != NSNotFound) {
//            shareList = @[@1,@2,@3,@4,@5,@6,@7];
//        }
//        for (id obj in shareList) {
//            NSNumber *value = dict[[obj description]];
//            if(value && [arrs indexOfObject:value] == NSNotFound)[arrs addObject:value];
//        }
//    }
//    
//    [ShareSDK showShareActionSheet:container
//                         shareList:[arrs count] ? arrs : nil
//                           content:publishContent
//                     statusBarTips:YES
//                       authOptions:authOptions
//                      shareOptions:nil
//                            result:^(ShareType type, SSResponseState state, id<ISSPlatformShareInfo> statusInfo, id<ICMErrorInfo> error, BOOL end)
//     {
//#ifdef IOS_DEVICE_PAD
//         [padview removeFromSuperview];
//#endif
//         NSDictionary *shareTypeD =
//         @{@(ShareTypeWeixiSession) : @"wx",//微信
//           @(ShareTypeWeixiTimeline) : @"wxm",//微信朋友圈
//           @(ShareTypeWeixiFav) : @"wxf",//微信收藏
//           @(ShareTypeTencentWeibo) : @"qwb",//腾讯微博
//           @(ShareTypeSinaWeibo) : @"wb",//新浪微博
//           @(ShareTypeQQSpace) : @"qzone",//QQ空间
//           @(ShareTypeQQ) : @"qq",/** QQ */
//           @(ShareTypeSMS) : @"SMS"/**短信*/};
//         NSDictionary *shareChanelDetail=
//         @{@"wx":@"微信好友",
//           @"wxm":@"微信朋友圈",
//           @"wxf":@"微信收藏",
//           @"qwb":@"腾讯微博",
//           @"wb":@"新浪微博",
//           @"qzone":@"QQ空间",
//           @"qq":@"QQ",
//           @"SMS":@"短信"};
//         
//         NSString *shareTypeStr = shareTypeD[@(type)];
//         NSString *succes = nil;
//         CDVInvokedUrlCommand *callBack = sCallBack;
//
//         if (state == SSResponseStateBegan){
//            [[NVStatisticsService sharedInstance] trackEvent:@"分享" action:@"点击" label:shareChanelDetail[shareTypeStr] value:contentId];
//             callBack = nil;
//             if([url length]){
//                 if ([url rangeOfString:@"+"].location != NSNotFound)  {
//                     [url stringByReplacingOccurrencesOfString:@"+"
//                                                    withString:[@"&f=" stringByAppendingString:shareTypeStr]];
//                     [publishContent setUrl:url];
//                 }
//                 if (type == ShareTypeSinaWeibo || type == ShareTypeSMS) {
//                     NSString *message = [publishContent content];
//                     message = [message stringByAppendingString:[publishContent url]];
//                     [publishContent setContent:message];
//                     [publishContent setUrl:nil];
//                     [publishContent setTitle:nil];
//                 }
//             }
//             /**
//              *  当分享短信,图片强制置为nil
//              */
//             if ([shareList indexOfObject:@"7"] != NSNotFound && type == ShareTypeSMS) {
//                 [publishContent setImage:nil];
//             }
//         }else if (state == SSResponseStateSuccess){
////             if([shareTypeStr isEqualToString:@"wb"]||[shareTypeStr isEqualToString:@"wxm"]){
////              BaseBiz *baseBiz = [(Old_CubeWebViewController *)self.viewController baseBiz];
////                 [baseBiz showToastWithTitle:nil message:@"分享成功"];
////             }else if ([shareTypeStr isEqualToString:@"wxf"]) {
////                     BaseBiz *baseBiz = [(Old_CubeWebViewController *)self.viewController baseBiz];
////                 [baseBiz showToastWithTitle:nil message:@"收藏成功"];
////            }
//             succes = @"true";
//         }
//         else if (state == SSResponseStateFail){
//             succes = @"false";
//         }else if(state == SSResponseStateCancel) {
//             [[NVStatisticsService sharedInstance] trackEvent:@"分享" action:@"点击" label:@"取消" value:@""];
//             callBack = nil;
//         }else{
//             callBack = nil;
//             
//         }
//         IConsoleLog(@"share result: %@->%@",succes,[error errorDescription]);
//         if (callBack) {
//             CDVPluginResult *result =                                      [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsString:[@[succes,error ? [error errorDescription] : @"",shareTypeStr ? shareTypeStr : @""] JSONString]];
//             [self.commandDelegate sendPluginResult:result
//                                         callbackId:sCallBack.callbackId];
//         }
//     }];
//    
//}

-(void)closeCTImage{
//    [_popoverVC dismiss];
//    _popoverVC = nil;
}

-(void)sendGeoInfo2Server
{
    if([CLLocationManager locationServicesEnabled])
    {
        if(!locationManager){
            locationManager = [[CLLocationManager alloc] init];
            [locationManager setDelegate:self ];
            locationManager.distanceFilter=1000.0f;
            locationManager.desiredAccuracy = kCLLocationAccuracyBest;
            if (IS_OS_8_OR_LATER) {
                [locationManager requestWhenInUseAuthorization];
            }
        }
        
        [locationManager startUpdatingLocation]; // 开始定位
    }
    else
    {
        UIAlertView *alertView  = [[UIAlertView alloc]initWithTitle:nil message:@"没有给应用开启定位服务" delegate:nil cancelButtonTitle:@"确定" otherButtonTitles:nil ];
        [alertView show];
    }
}
// 定位成功时调用
- (void)locationManager:(CLLocationManager *)manager
    didUpdateToLocation:(CLLocation *)newLocation
           fromLocation:(CLLocation *)oldLocation
{
    CLLocationCoordinate2D mylocation = newLocation.coordinate;//手机GPS
    NSUserDefaults *defaults = [NSUserDefaults standardUserDefaults];
    
    CLGeocoder *geocoder = [[CLGeocoder alloc] init];
    [geocoder reverseGeocodeLocation: newLocation completionHandler:^(NSArray *array, NSError *error) {
        if (array.count > 0) {
            
            CLPlacemark *placemark = [array objectAtIndex:0];
            NSString *position=placemark.name;
            //NSString *position=[NSString stringWithFormat:@"%@%@%@%@%@",placemark.locality,placemark.addressDictionary,placemark.subAdministrativeArea,placemark.thoroughfare,placemark.subThoroughfare];
            [defaults setObject:position forKey:@"User.position"];
            
        }
    }];
    float longitude = mylocation.longitude;
    float latitude = mylocation.latitude;
//    CDVPluginResult *result = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK
//                                                messageAsString:[@[[NSNumber numberWithFloat:longitude],[NSNumber numberWithFloat:latitude]] JSONString]];
//    [self.commandDelegate sendPluginResult:result callbackId:self.getLocationCommand.callbackId];
    self.getLocationCommand = nil;
    [locationManager stopUpdatingLocation]; // 结束定位
    
    
}
// 定位失败时调用
- (void)locationManager:(CLLocationManager *)manager
       didFailWithError:(NSError *)error {
//    CDVPluginResult *result = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK
//                                                messageAsString:[@[[NSNumber numberWithFloat:0.0],[NSNumber numberWithFloat:0.0]] JSONString]];
//    [self.commandDelegate sendPluginResult:result callbackId:self.getLocationCommand.callbackId];
//    self.getLocationCommand = nil;
}

/**
 *  获取经纬度
 *  @param 回调函数名称
 */
-(void)getLocation:(CDVInvokedUrlCommand*)command{
    _getLocationCall = command.callbackId;
    if (_getLocationCall.length>0)
    {
        //开启定位
        self.getLocationCommand = command;
        [self sendGeoInfo2Server];
    }
    
}

/**
 *  拍照
 *  @param 回调函数名称
 */
-(void)takePhoto:(CDVInvokedUrlCommand*)command{
    _takePhotoCall = command.callbackId;
    if (_takePhotoCall.length>0)
    {
        if ([[command arguments] count]) {
            self.thumbScale = [[command argumentAtIndex:0 withDefault:@(1) andClass:NSNumber.class] floatValue];
            self.isBase64Result = [[command argumentAtIndex:1 withDefault:@(NO) andClass:NSNumber.class] boolValue];
        }
        
        [self openCamera];
    }
}
-(void)openCamera{
    // 跳转到相机
    UIImagePickerController *imagePickerController = [[UIImagePickerController alloc] init];
    
    imagePickerController.delegate = self;
    
    imagePickerController.allowsEditing = YES;
    
    imagePickerController.sourceType = UIImagePickerControllerSourceTypeCamera;
    
    
    [self.viewController presentViewController:imagePickerController animated:YES completion:^{}];
}

#pragma mark - image picker delegte
- (void)imagePickerController:(UIImagePickerController *)picker didFinishPickingMediaWithInfo:(NSDictionary *)info
{
    [picker dismissViewControllerAnimated:YES completion:^{}];
    
    UIImage *image= [info objectForKey:UIImagePickerControllerOriginalImage];
    image = [self fixOrientation:image];
    
    NSString *filename=[NSString stringWithFormat:@"inforeport_photo_%@.jpg",[self generateTimestamp]];
    if (self.isBase64Result) {
        NSData *data = UIImageJPEGRepresentation(image, self.thumbScale ? self.thumbScale : 1);
        [self.commandDelegate sendPluginResult:[CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsString:[data base64Encoding]] callbackId:_takePhotoCall];
        self.isBase64Result  = NO;
    }else{
        [self saveImage:image withName:filename];
    }
    
}
/**
 *  解决拍照后图片旋屏的问题 2015/12/15 Suycity
 */
- (UIImage *)fixOrientation:(UIImage *)aImage {
    
    // No-op if the orientation is already correct
    if (aImage.imageOrientation == UIImageOrientationUp)
        return aImage;
    
    // We need to calculate the proper transformation to make the image upright.
    // We do it in 2 steps: Rotate if Left/Right/Down, and then flip if Mirrored.
    CGAffineTransform transform = CGAffineTransformIdentity;
    
    switch (aImage.imageOrientation) {
        case UIImageOrientationDown:
        case UIImageOrientationDownMirrored:
            transform = CGAffineTransformTranslate(transform, aImage.size.width, aImage.size.height);
            transform = CGAffineTransformRotate(transform, M_PI);
            break;
            
        case UIImageOrientationLeft:
        case UIImageOrientationLeftMirrored:
            transform = CGAffineTransformTranslate(transform, aImage.size.width, 0);
            transform = CGAffineTransformRotate(transform, M_PI_2);
            break;
            
        case UIImageOrientationRight:
        case UIImageOrientationRightMirrored:
            transform = CGAffineTransformTranslate(transform, 0, aImage.size.height);
            transform = CGAffineTransformRotate(transform, -M_PI_2);
            break;
        default:
            break;
    }
    
    switch (aImage.imageOrientation) {
        case UIImageOrientationUpMirrored:
        case UIImageOrientationDownMirrored:
            transform = CGAffineTransformTranslate(transform, aImage.size.width, 0);
            transform = CGAffineTransformScale(transform, -1, 1);
            break;
            
        case UIImageOrientationLeftMirrored:
        case UIImageOrientationRightMirrored:
            transform = CGAffineTransformTranslate(transform, aImage.size.height, 0);
            transform = CGAffineTransformScale(transform, -1, 1);
            break;
        default:
            break;
    }
    
    // Now we draw the underlying CGImage into a new context, applying the transform
    // calculated above.
    CGContextRef ctx = CGBitmapContextCreate(NULL, aImage.size.width, aImage.size.height,
                                             CGImageGetBitsPerComponent(aImage.CGImage), 0,
                                             CGImageGetColorSpace(aImage.CGImage),
                                             CGImageGetBitmapInfo(aImage.CGImage));
    CGContextConcatCTM(ctx, transform);
    switch (aImage.imageOrientation) {
        case UIImageOrientationLeft:
        case UIImageOrientationLeftMirrored:
        case UIImageOrientationRight:
        case UIImageOrientationRightMirrored:
            // Grr...
            CGContextDrawImage(ctx, CGRectMake(0,0,aImage.size.height,aImage.size.width), aImage.CGImage);
            break;
            
        default:
            CGContextDrawImage(ctx, CGRectMake(0,0,aImage.size.width,aImage.size.height), aImage.CGImage);
            break;
    }
    
    // And now we just create a new UIImage from the drawing context
    CGImageRef cgimg = CGBitmapContextCreateImage(ctx);
    UIImage *img = [UIImage imageWithCGImage:cgimg];
    CGContextRelease(ctx);
    CGImageRelease(cgimg);
    return img;
}
- (void)imagePickerControllerDidCancel:(UIImagePickerController *)picker
{
    [self.viewController dismissViewControllerAnimated:YES completion:^{}];
}

#pragma mark - Save image to Sanbox
- (void) saveImage:(UIImage *)currentImage withName:(NSString *)imageName{
    [self saveImage:currentImage withName:imageName scale:0.5];
}
- (void) saveImage:(UIImage *)currentImage withName:(NSString *)imageName scale:(CGFloat)scale
{
    
    NSData *imageData = UIImageJPEGRepresentation(currentImage, scale);
    
    NSError* err = nil;
    NSFileManager* fileMgr = [[NSFileManager alloc] init]; // recommended by apple (vs [NSFileManager defaultManager]) to be threadsafe
    // generate unique file name
    NSString* filePath;
    if(![fileMgr fileExistsAtPath:CAMERA_PHOTO_CACHE_LOCATION]){
        [fileMgr createDirectoryAtPath:CAMERA_PHOTO_CACHE_LOCATION withIntermediateDirectories:YES attributes:nil error:nil];
    }
    
    int i = 1;
    do {
        filePath = [NSString stringWithFormat:@"%@/%03d.png", CAMERA_PHOTO_CACHE_LOCATION, i++];
    } while ([fileMgr fileExistsAtPath:filePath]);
    
    // save file
    if ([imageData writeToFile:filePath options:NSAtomicWrite error:&err]&&[fileMgr fileExistsAtPath:filePath]) {
      
            [self.commandDelegate sendPluginResult:[CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsString:filePath] callbackId:_takePhotoCall];
    }
    
}
- (NSString *)generateTimestamp{
    return [NSString stringWithFormat:@"%ld", time(NULL)];
}
#pragma mark - Open WeChat And QQ Copy Message
/**
 *  打开微信，或者qq，并复制内容到剪贴板
 *  @param Msg 复制的内容
 *  @param openType 打开的类型 0是微信 1是qq
 */
- (void)openAppAndCopyMsg:(CDVInvokedUrlCommand *)command{
    int openType = [[command argumentAtIndex:1] intValue];
    [[UIPasteboard generalPasteboard] setString:[command argumentAtIndex:0]];
    
//    BaseBiz *baseBiz = [(Old_CubeWebViewController *)self.viewController baseBiz];
//    __block NSURL *url = nil;
//    if (openType == 0) {
//        //wechat
//        url = [NSURL URLWithString:@"wechat://"];
//    }
//    else if(openType == 1){
//        // qq
//        url = [NSURL URLWithString:@"mqq://"];
//    }
//    else{
//        [baseBiz showToastWithTitle:@"Error" message:@"未知异常！" duration:2];
//        return;
//    }
//    
//    if (![[UIApplication sharedApplication] canOpenURL:url]) {
//        ISAlertView *alertView = [[ISAlertView alloc]initWithTitle:@"温馨提示" message:@"您的手机尚未安装 QQ/微信, 安装后才能使用该功能。" delegate:nil cancelButtonTitle:@"确定" otherButtonTitles:nil];
//        [alertView show];
//    }else{
//        [baseBiz showToastWithTitle:@"温馨提示" message:@"已成功复制顾客姓名到剪贴板" duration:2];
//        dispatch_after(dispatch_time(DISPATCH_TIME_NOW, (int64_t)(2 * NSEC_PER_SEC)), dispatch_get_main_queue(), ^{
//            dispatch_async(dispatch_get_main_queue(), ^{
//                [[UIApplication sharedApplication] openURL:url];
//            });
//        });
//    }
}
#pragma mari - 上传
- (void)uploadDataParam:(NSArray *)uploadParam Param:(NSDictionary *)param uploadUrl:(NSString *)uploadURl callBackBlock:(void(^)(NSString *responseString))callbackBlock{
    
//    FormDataRequest *request = [[FormDataRequest alloc] initWithURL:[NSURL URLWithString:uploadURl]];
//    
//    
//    for (NSDictionary *dict in uploadParam) {
//        NSString *filePath = dict[@"bsl_upload_filePath"];
//        NSString *fileKey = dict[@"bsl_upload_fileKey"];
//        NSString *contentType = dict[@"bsl_upload_ContentType"];
//        NSData *data = [NSData dataWithContentsOfFile:filePath];
//        if(![data length]){
//            data = UIImagePNGRepresentation([UIImage imageNamed:filePath]);
//        }
//        [request setData:data withFileName:[filePath lastPathComponent]
//          andContentType:contentType forKey:fileKey];
//    }
//
//    for (NSString *key in param) {
//        [request setPostValue:param[key] forKey:key];
//    }
//
//    __weak FormDataRequest *requestWeak = request;
//    [request setFailedBlock:^{
//        IConsoleLog(@"%@",requestWeak.error);
//        if (callbackBlock) {
//            callbackBlock([requestWeak.error description]);
//        }
//    }];
//    
//    [request setCompletionBlock:^{
//        IConsoleLog(@"%@",requestWeak.responseString);
//        if (callbackBlock) {
//            callbackBlock(requestWeak.responseString);
//        }
//    }];
//    [request addRequestHeader:@"Accept" value:@"application/json"];
//    [request addRequestHeader:@"X-Requested-With" value:@"XMLHttpRequest"];
//    [request startAsynchronous];
    
}

- (void)uploadData:(CDVInvokedUrlCommand*)command index:(NSInteger)index responseArray:(NSArray *)array{
    id ParamJson = [command argumentAtIndex:1];
    if ([ParamJson isKindOfClass:NSString.class]) {
//        ParamJson = [(NSString *)ParamJson objectFromJSONString];
    }
    NSString *urlStr = [command argumentAtIndex:2];
    if ([ParamJson count] > index) {
        NSMutableDictionary *dict = [NSMutableDictionary dictionaryWithDictionary:ParamJson[index]];
        NSString *filePath = dict[@"bsl_upload_filePath"];
        NSString *fileKey = dict[@"bsl_upload_fileKey"];
        NSString *contentType = dict[@"bsl_upload_ContentType"];
        [dict removeObjectForKey:@"bsl_upload_filePath"];
        [dict removeObjectForKey:@"bsl_upload_fileKey"];
        [dict removeObjectForKey:@"bsl_upload_ContentType"];
        NSDictionary *paramJson = [NSDictionary dictionaryWithDictionary:dict];
        if (!contentType) {
            contentType = @"application/octet-stream";
        }
        if (filePath) {
            [self uploadDataParam:@[@{@"bsl_upload_filePath" : filePath,
                                      @"bsl_upload_fileKey" : fileKey ? fileKey : @"FileKey",
                                      @"bsl_upload_ContentType" : contentType}]
                            Param:paramJson uploadUrl:urlStr callBackBlock:^(NSString *responseString)
             {
                 NSMutableArray *responses = [NSMutableArray arrayWithArray:array];
                 [responses addObject:responseString];
                 
                 if (index >= [ParamJson count] - 1) {
//                     CDVPluginResult *result=[CDVPluginResult resultWithStatus:CDVCommandStatus_OK
//                                                                messageAsString:[responses JSONString]];
//                     [self.commandDelegate sendPluginResult:result callbackId:command.callbackId];
                 }
                 else{
                     [self uploadData:command index:index + 1 responseArray:responses];
                 }
             }];
        }
        else{
            CDVPluginResult *result=[CDVPluginResult resultWithStatus:CDVCommandStatus_OK
                                                      messageAsString:@"bsl_upload_filePath不能为null"];
            [self.commandDelegate sendPluginResult:result callbackId:command.callbackId];
        }
    }
}
- (void)uploadData:(CDVInvokedUrlCommand*)command{
    
    int uploadType = [[command argumentAtIndex:0] intValue];
    id ParamJson = [command argumentAtIndex:1];
    if ([ParamJson isKindOfClass:NSString.class]) {
//        ParamJson = [(NSString *)ParamJson objectFromJSONString];
    }
    NSString *urlStr = [command argumentAtIndex:2];

    if (uploadType == 0 ) {
        [self uploadData:command index:0 responseArray:nil];
    }
    else{
        
        NSMutableDictionary *paramDic = [NSMutableDictionary dictionary];
        NSMutableArray *uploads = [NSMutableArray array];
        for (NSDictionary *dic in ParamJson) {
            
            NSMutableDictionary *dict = [NSMutableDictionary dictionaryWithDictionary:dic];
#ifdef DEBUG
//            [dict addEntriesFromDictionary:[HttpClientComponent commonParam][0]];
#endif
            NSString *filePath = dict[@"bsl_upload_filePath"];
            NSString *fileKey = dict[@"bsl_upload_fileKey"];
            NSString *contentType = dict[@"bsl_upload_ContentType"];
            [dict removeObjectForKey:@"bsl_upload_filePath"];
            [dict removeObjectForKey:@"bsl_upload_fileKey"];
            [dict removeObjectForKey:@"bsl_upload_ContentType"];
            if (filePath) {
                [uploads addObject:@{@"bsl_upload_filePath" : filePath,
                                     @"bsl_upload_fileKey" : fileKey ? fileKey : @"FileType",
                                     @"bsl_upload_ContentType" : contentType ? contentType : @"application/octet-stream"}];
            }
            [paramDic addEntriesFromDictionary:dict];
        }
        [self uploadDataParam:uploads Param:paramDic uploadUrl:urlStr callBackBlock:^(NSString *responseString)
         {
//             CDVPluginResult *result = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK
//                                                         messageAsString:[@[responseString] JSONString]];
//             [self.commandDelegate sendPluginResult:result callbackId:command.callbackId];
         }];
    }
}
- (void)uploadPhoto:(CDVInvokedUrlCommand*)command{
    NSString *filePath = [command argumentAtIndex:0];
    NSString *photoType = [command argumentAtIndex:1];
    
//    NSDictionary *privateParama = [HttpClientComponent commonParam][0];
//    NSString *privateStr = [Utils URLParamWithDict:privateParama];
//    NSString *urlStr = [NSString stringWithFormat:@"%@/gbss-bupm/front/gbss-mobile-newBusiness/dealer/uploadPhotoFile?%@",URL_ROOT,privateStr];
//    
//    [self uploadDataParam:@[@{@"bsl_upload_filePath" : filePath,
//                              @"bsl_upload_fileKey" : @"photoFile",
//                              @"bsl_upload_ContentType" : [NSString stringWithFormat:@"image/%@",[filePath pathExtension]]}]
//                    Param:@{@"photoType" : photoType} uploadUrl:urlStr callBackBlock:^(NSString *responseString)
//     {
//         NSDictionary *dic = [responseString objectFromJSONString];
//         CDVPluginResult *result = nil;
//         if ([dic count]) {
//             NSDictionary *returnObject = (dic[@"returnObject"])[0];
//             result = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsString:[@[returnObject[@"message"],returnObject[@"photoId"],returnObject[@"monoDbId"]] JSONString]] ;
//         }
//         else if(responseString){
//             result = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsString:[@[responseString,@"",@""] JSONString]];
//         }
//         [self.commandDelegate sendPluginResult:result callbackId:command.callbackId];
//     }];
}
#pragma mark - 七牛上传
/**
 *  七牛上传
 *  @param filePath json字符串（数组）本地文件路径串
 *  @param uploadPath json字符串（数组）七牛路路经串
 *  @param tokenUrl 字符串 获取token的url
 *  @param sCallBack 字符串 回调函数名称
 */
-(void)uploadFileByByte:(CDVInvokedUrlCommand*)command{
//    __block NSArray *fileArray=[command argumentAtIndex:0];
//    __block NSArray *keyArray=[command argumentAtIndex:1];
//    NSString *tokenUrl=[command argumentAtIndex:2];
//    id paramJson = [command argumentAtIndex:3];
//    if (paramJson) {
//        if ([paramJson isKindOfClass:[NSString class]]) {
//            paramJson = [paramJson objectFromJSONString];
//        }
//        if (![paramJson isKindOfClass:[NSDictionary class]]) {
//            paramJson = nil;
//        }
//    }
//    _uploadByQiniuCall= command.callbackId;
//    
//    tokenUrl=[NSString stringWithFormat:@"%@%@",URL_ROOT,tokenUrl];
////    __block NSArray *fileArray =[self toArrayOrNSDictionary:
////                                 [filePath dataUsingEncoding:NSUTF8StringEncoding]];
////    __block NSArray *keyArray = [self toArrayOrNSDictionary:
////                                 [uploadPath dataUsingEncoding:NSUTF8StringEncoding]];
//    HttpClientComponent *httpClientComponent = [[HttpClientComponent alloc] init];
//    BaseBiz *baseBiz = [(Old_CubeWebViewController *)self.viewController baseBiz];
//    
//    [httpClientComponent sendGETRequestWithUrl:tokenUrl requestParam:nil finishBlock:^{
//        NSMutableDictionary *responseDictionary = [[httpClientComponent responseString] objectFromJSONString];
//        NSMutableDictionary *responseDictionary1=[responseDictionary objectForKey:@"returnObject"];
//        NSString *token=[responseDictionary1 objectForKey:@"uploadToken"];
//        
//        [[self appDelegate] checkNetwork:^{
//            [self QNUploadFileArray:fileArray KeyArray:keyArray token:token flag:0 paramJson:paramJson];
//        }];
//    } failBlock:^{
//        [baseBiz stopBlockAnimation];
//        [baseBiz showToastWithTitle:@"温馨提示" message:@"网络出错请重试！" duration:2];
//    }];
}
- (void)QNUploadFileArray:(NSArray *)fileArray KeyArray:(NSArray *)keyArray token:(NSString *)token flag:(int)flag  paramJson:(NSDictionary *)paramJson{
    if (flag >= [fileArray count])  return;
    
//    __block NSString *fileStr = fileArray[flag];
//    __block NSString *keyStr = keyArray[flag];
//    __block NSError *error = nil;
//    __block BOOL isShowToast = YES;
//    if ([Utils convertNull:paramJson[@"isShowToast"]]) {
//        isShowToast = [[Utils convertNull:paramJson[@"isShowToast"]] boolValue];
//    }
//    __block BOOL isMultipleCallBack = [[Utils convertNull:paramJson[@"isMultipleCallBack"]] boolValue];
//    
//    QNFileRecorder *fileRecorder = [QNFileRecorder fileRecorderWithFolder:[NSTemporaryDirectory() stringByAppendingString:@"qiniuUploadCache"] error:&error];
//    QNUploadManager *upManager = [QNUploadManager sharedInstanceWithRecorder:fileRecorder recorderKeyGenerator:nil];
//    BaseBiz *baseBiz = [(Old_CubeWebViewController *)self.viewController baseBiz];
//    if(isShowToast)[baseBiz startBlockAnimationWithMsg:[NSString stringWithFormat:@"请稍后,%d/%d...",flag + 1,(int)[fileArray count]]];
//    QNUploadOption *uploadOption = [[QNUploadOption alloc]
//                                    initWithMime:[NSString stringWithFormat:@"image/%@",[fileStr pathExtension]]
//                                    progressHandler:nil params:nil checkCrc:NO
//                                    cancellationSignal:nil];
//    
//    [self putQNUploadManager:upManager File:fileStr key:keyStr token:token complete:^(QNResponseInfo *info, NSString *key, NSDictionary *resp) {
//        if (info.ok && flag + 1 < [fileArray count]) {
//            //成功的请求
////            [[NSFileManager defaultManager] removeItemAtPath:fileStr error:&error];
//            [self QNUploadFileArray:fileArray KeyArray:keyArray token:token flag:flag + 1 paramJson:paramJson];
//        }
//        else{
//            //失败的请求
//            if(isShowToast)[baseBiz stopBlockAnimation];
//            if (!info.ok) {
//                dispatch_async(dispatch_get_main_queue(), ^{
//                    if(isShowToast)[baseBiz showToastWithTitle:@"温馨提示" message:@"上传失败！" duration:2];
//                });
//            }
//            else if (info.ok && flag + 1 == [fileArray count]){
//                if (!isMultipleCallBack) {
//                    [self.commandDelegate sendPluginResult:[CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsBool:YES] callbackId:_uploadByQiniuCall];
//                }
//            }
//        }
//        if (isMultipleCallBack) {
//            CDVPluginResult *result = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsArray:@[key,info.ok?@"true":@"flase"]];
//            [result setKeepCallbackAsBool:NO];
//            [self.commandDelegate sendPluginResult:result callbackId:_uploadByQiniuCall];
//        }
//    } option:uploadOption];
    /**
     
     QNUploadOption *uploadOption = [[QNUploadOption alloc]
     initWithMime:nil
     progressHandler:^(NSString *key, float percent) { }
     params:nil checkCrc:NO
     cancellationSignal:^BOOL{
     NSLogD(@"失败！！！！！");
     [baseBiz stopBlockAnimation];
     return NO;
     }];
    for(int i=0;i<fileArray.count;i++){
        UIImage *img=[UIImage imageWithContentsOfFile:[fileArray objectAtIndex:i]];
        NSData *imgData = UIImageJPEGRepresentation(img,1);
        [upManager putData:imgData key:[keyArray objectAtIndex:i] token:token complete: ^(QNResponseInfo *info, NSString *key, NSDictionary *resp) {
            flag ++;
            [baseBiz startBlockAnimationWithMsg:[NSString stringWithFormat:@"请稍后,%d/%d...",flag,(int)[fileArray count]]];
            
            if (flag == fileArray.count) {
                [baseBiz stopBlockAnimation];
                [self.webView evaluatingJavaScriptOnMain:[NSString stringWithFormat:@"%@()", _uploadByQiniuCall]];
            }
            
        } option:uploadOption];
    }
     */
}
//- (void)putQNUploadManager:(QNUploadManager *)uManager
//                      File:(NSString *)file
//                       key:(NSString *)key
//                     token:(NSString *)token
//                  complete:(QNUpCompletionHandler)completionHandler
//                    option:(QNUploadOption *)option{
//    [uManager putFile:file key:key token:token complete:completionHandler option:option];
//    
//}
//
//- (AppDelegate *)appDelegate{
//    return (AppDelegate *)[UIApplication sharedApplication].delegate;
//}

// 将JSON串转化为字典或者数组
- (id)toArrayOrNSDictionary:(NSData *)jsonData{
    NSError *error = nil;
    id jsonObject = [NSJSONSerialization JSONObjectWithData:jsonData
                                                    options:NSJSONReadingAllowFragments
                                                      error: &error];
    
    if (jsonObject != nil &&error == nil){
        return jsonObject;
    }else{
        // 解析错误
        return nil;
    }
    
}
#pragma mark - photobrowser代理方法
//- (UIImage *)photoBrowser:(HZPhotoBrowser *)browser placeholderImageForIndex:(NSInteger)index
//{
////    UIButton *btn = [[UIButton alloc] init];
////    
////    //让图片不变形，以适应按钮宽高，按钮中图片部分内容可能看不到
////    btn.imageView.contentMode = UIViewContentModeScaleAspectFill;
////    btn.clipsToBounds = YES;
//    
////    if ([imageURL hasPrefix:@"http"]) {
////        [btn sd_setImageWithURL:[NSURL URLWithString:imageURL] forState:UIControlStateNormal placeholderImage:[UIImage imageNamed:@"whiteplaceholder"]];
////    }else if ([imageURL hasPrefix:@"file"]){
////        [btn  setImage:[UIImage imageWithContentsOfFile:imageURL] forState:UIControlStateNormal];
////    }else {
//////        [btn setImage:<#(nullable UIImage *)#> forState:UIControlStateNormal]
////    }
//    
//    HZPhotoItemModel *item= self.photoItemArray[index];
//    if ([item.thumbnail_pic hasPrefix:@"file"]) {
//      return  [UIImage  imageWithContentsOfFile:[[item.thumbnail_pic componentsSeparatedByString:@"file:///"] lastObject]];
//    }
////
//    if (_urlType==2) {
//        NSString *imageURL=[self.photoItemArray[index] thumbnail_pic];
//        NSData *_decodedImageData   = [[NSData alloc] initWithBase64Encoding:imageURL];
//        
//       return  [UIImage imageWithData:_decodedImageData];
//    }
//    CIColor *color = [CIColor colorWithCGColor:[UIColor blackColor].CGColor];
//    CIImage *ciImage = [CIImage imageWithColor:color];
//    //只返回个默认图，
//    return  [UIImage imageWithCIImage:ciImage];
//   
//}
//
//- (NSURL *)photoBrowser:(HZPhotoBrowser *)browser highQualityImageURLForIndex:(NSInteger)index
//{
//    
//    NSString *urlStr = [[self.photoItemArray[index] thumbnail_pic] stringByReplacingOccurrencesOfString:@"thumbnail" withString:@"bmiddle"];
//    return [NSURL URLWithString:urlStr];
//}
-(void)saveTGCCookie:(CDVInvokedUrlCommand*)command{
    
//    [[CommonTools sharedInstance] saveTGCCookie:command.arguments[0]];
    
}
-(void)getUserInfo:(CDVInvokedUrlCommand*)command{
//    [[CommonTools sharedInstance] getUserInfo:command.arguments[0] Success:^(NSDictionary *aDictionary) {
//        CDVPluginResult *result = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsString:[aDictionary JSONString]];
//        [self.commandDelegate sendPluginResult:result callbackId:command.callbackId];
//    }];
}
-(void)addObserverForUserInfo:(CDVInvokedUrlCommand*)command{
    __weak BSLTools *weakSelf = self;
//    __block NSString *callbackId = command.callbackId;
//    
//    if (self.addObserverForUserInfoBlock) {
//        [[CommonTools sharedInstance] removeObserverForUserInfo:self.addObserverForUserInfoBlock];
//        self.addObserverForUserInfoBlock = nil;
//    }
//    
//    self.addObserverForUserInfoBlock = ^(NSString *aString) {
//        CDVPluginResult *result = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsInt:[aString intValue]];
//        [result setKeepCallbackAsBool:YES];
//        [weakSelf.commandDelegate sendPluginResult:result callbackId:callbackId];
//    };
//    [[CommonTools sharedInstance] addObserverForUserInfo:self.addObserverForUserInfoBlock];
}
-(void)addObserverForCloseWebView:(CDVInvokedUrlCommand*)command{
    __weak BSLTools *weakSelf = self;
    __block NSString *callbackId = command.callbackId;
    
//    if (self.addObserverForCloseWebViewBlock) {
//        [[CommonTools sharedInstance] removeObserverForCloseWebView:self.addObserverForCloseWebViewBlock];
//        self.addObserverForCloseWebViewBlock = nil;
//    }
//    
//    self.addObserverForCloseWebViewBlock = ^(NSString *aString) {
//        CDVPluginResult *result = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsString:aString];
//        [result setKeepCallbackAsBool:YES];
//        [weakSelf.commandDelegate sendPluginResult:result callbackId:callbackId];
//    };
//    [[CommonTools sharedInstance] addObserverForCloseWebView:self.addObserverForCloseWebViewBlock];
}

@end
