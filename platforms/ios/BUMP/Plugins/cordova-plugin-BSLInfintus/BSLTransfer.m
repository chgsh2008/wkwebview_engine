//
//  Transfer.m
//  Infinitus
//
//  Created by Frank Fan on 14-8-14.
//  Copyright (c) 2014年 zhangli. All rights reserved.
//

#import "BSLTransfer.h"
//#import "Old_CubeWebViewController.h"
//#import <iConsole/iConsole.h>
//#import "TipsCacheManager.h"
//#import "HomePageViewController.h"
//#import "CookieManager.h"
//#import "TipsCacheManager.h"
//#import "FileUtil.h"
//#import "Old_CubeModule.h"
//#import "Function.h"
//#import "Old_CubeWebViewController.h"
//#import "CTBaseRootViewController.h"
//#import "HomeViewController.h"
//#import "LogoutBiz.h"
//#import "AppDelegate.h"
//#import "FastPayViewController.h"
//#import "NVStatisticsService.h"

@interface BSLTransfer()
{
//    NHPopoverViewController *_popoverLoginVC;
//    NHPopoverViewController *_popoverPickContact;
}

//@property (nonatomic, retain) LoginViewController *loginVC;
@property (nonatomic, retain) NSString *loginCall;
@property (nonatomic, retain) NSString *fastPayCall;
@property (nonatomic, retain) NSString *pickContactCall;
@property (nonatomic, retain) NSString *modulPath;
//@property (nonatomic, retain) PeopleAddressPicker *addressPicker;

@end

@implementation BSLTransfer

- (void)dealloc
{
//    [_popoverLoginVC dismiss];
//    [_popoverPickContact dismiss];
}

#pragma mark - Public methods

- (void)returnBack:(CDVInvokedUrlCommand *)command
{
    BOOL bIsGoView = [[command argumentAtIndex:0 withDefault:nil andClass:[NSNumber class]] boolValue];
    NSString *sFun = [command argumentAtIndex:1 withDefault:nil andClass:[NSString class]];
    id oParam = [command argumentAtIndex:2];
    if ([oParam isKindOfClass:NSArray.class] || [oParam isKindOfClass:NSDictionary.class]) {
//        oParam = [oParam JSONString];
    }
    else if (![oParam isKindOfClass:[NSString class]]){
        oParam = [oParam description];
    }
    
  

//    UIViewController *VC=self.viewController;
//    if([VC isKindOfClass:[Old_CubeWebViewController class]]){
//        Old_CubeWebViewController *web = (Old_CubeWebViewController *)VC;
//        [[NVStatisticsService sharedInstance] trackEvent:[web getMyTitle] action:@"点击" label:@"返回" value:0];
//    }
    
    // 判断是否是返回到上一个Web视图
//    if (bIsGoView || [self.webView canGoBack] == NO)
//    {
//        //         判断返回时是否需要调用上一个视图Web页面函数
//        if (sFun)
//        {
//            //CubeWebViewController *parentVC = ((CubeWebViewController *)self.viewController);
//            NSArray *webs = self.viewController.navigationController.viewControllers;
//            for (int i=0;i<webs.count;i++) {
//                UIViewController *VC=[webs objectAtIndex:i];
//                if([VC isKindOfClass:[Old_CubeWebViewController class]]){
//                    Old_CubeWebViewController *web = (Old_CubeWebViewController *)VC;
//                    NSString *url=web.startPage;
//                    if ([url isEqualToString:[(Old_CubeWebViewController *)self.viewController startPage]] && (i >= 1)) {
//                        
//                        UIViewController *upVC = [webs objectAtIndex:i-1];
//                        
//                        if([upVC isKindOfClass:[Old_CubeWebViewController class]]){
//                            Old_CubeWebViewController *upWeb = (Old_CubeWebViewController *)upVC;
//                            [upWeb.webView stringByEvaluatingJavaScriptFromString:[NSString stringWithFormat:@"%@('%@')", sFun, oParam]];
//                            //                            [self.commandDelegate sendPluginResult:[CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsString:oParam] callbackId:command.callbackId];
//                        }else if([upVC isKindOfClass:[CTBaseRootViewController class]]){
//                            CTBaseRootViewController *upWeb = (CTBaseRootViewController *)upVC;
//                            if ([upWeb.currentController isKindOfClass:[HomeViewController class]]) {//官网适配
//                                
//                                HomeViewController *homeController=(HomeViewController*)upWeb.currentController;
//                                [homeController.webViewController.webView stringByEvaluatingJavaScriptFromString:[NSString stringWithFormat:@"%@(%@)", sFun, oParam]];
//                            }
//                            //                            [upWeb.webView stringByEvaluatingJavaScriptFromString:[NSString stringWithFormat:@"%@(%@)", sFun, oParam]];
//                        }
//                        
//                        break;
//                    }
//                    
//                }
//            }
//        }
//       
//       
//        [(Old_CubeWebViewController *)self.viewController dismissViewController];
//        
//        
//    }
//    // 否则调用webView的goBack后退页面
//    else
//    {
//        [self.webView goBack];
//        if (sFun)
//        {
//            [(Old_CubeWebViewController *)self.viewController setDidFinishPreloadBlock:^(){
//                [((Old_CubeWebViewController *)self.viewController).webView stringByEvaluatingJavaScriptFromString:[NSString stringWithFormat:@"%@(%@)", sFun,oParam]];
//                //                [self.commandDelegate sendPluginResult:[CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsString:oParam] callbackId:command.callbackId];
//            }];
//        }
//    }
}
/**
 *  1. OpenPageWithTitle 只有四个参数的， 用新框架调用
 *     (sUrl,"",JSON.stringify({'rotation' : 0}),sTitle)
 *  2. OpenPageWithTitle 只有四个参数的， 用老框架调用
 *     (sUrl,sInitFun,oInitParam,sTitle)
 *  3. OpenPageWithTitle 五个参数, 新老框架一起
 *     (sUrl,sInitFun,oInitParam,sTitle,JSON.stringify({'rotation' : 0}))
 *
 *  @param command
 */
- (void)openPage:(CDVInvokedUrlCommand *)command
{
//    [[TipsCacheManager sharedManager].homePageViewController openPage:command parentVC:[(Old_CubeWebViewController *)self.viewController parentVC]];
    NSArray *array = [command arguments];
    NSString *sUrl = array[0];
    NSMutableDictionary *dictJson = [NSMutableDictionary dictionary];
//    [dictJson setObject:sUrl forKey:OpenPage_URL];
//    if ([array count] > 1) {
//        [dictJson setObject:array[1] forKey:OpenPage_InitFun];
//    }
//    if ([array count] > 2) {
//        [dictJson setObject:array[2] forKey:OpenPage_InitParam];
//    }
//    if ([array count] > 3) {
//        [dictJson setObject:array[3] forKey:OpenPage_Title];
//    }
//    if ([array count] > 4) {
//        [dictJson setObject:array[4] forKey:OpenPage_NavInfo];
//    }
//    [[TipsCacheManager sharedManager].homePageViewController openWebPage:dictJson parentVC:[(Old_CubeWebViewController *)self.viewController parentVC]];
}

/**
 *  4. OpenPage 两个参数 (url,sFlag)
 *  5. OpenPage 三个参数 (url,sFlag,jNavInfo)
 *
 *  @param command
 */
-(void)openNewPage:(CDVInvokedUrlCommand*)command
{
    NSString *sUrl = [command argumentAtIndex:0];
    // 防治重复打开
    if(![sUrl isEqual:_modulPath]){
        _modulPath=sUrl;
        [self initTimer];
        
//        if(!sUrl||[sUrl isEqualToString:@""]){
//            NSArray *webs=[TipsCacheManager sharedManager].homePageViewController.navigationController.viewControllers;
//            for(int i=0;i<webs.count;i++){
//                UIViewController *VC = [webs objectAtIndex:i];
//                if([VC isKindOfClass:[Old_CubeWebViewController class]]){
//                    [[TipsCacheManager sharedManager].homePageViewController.navigationController popToViewController:[webs objectAtIndex:i-1] animated:YES];
//                    break;
//                }
//            }
//        }else{
////            [[TipsCacheManager sharedManager].homePageViewController
////             openPage:command
////             parentVC:(Old_CubeWebViewController *)self.viewController];
//            NSArray *array = [command arguments];
//            NSString *sUrl = array[0];
//            NSMutableDictionary *dictJson = [NSMutableDictionary dictionary];
//            [dictJson setObject:sUrl forKey:OpenPage_URL];
//            if ([array count] > 1) {
//                [dictJson setObject:array[1] forKey:OpenPage_Flag];
//            }
//            if ([array count] > 2) {
//                [dictJson setObject:array[2] forKey:OpenPage_NavInfo];
//            }
//            [[TipsCacheManager sharedManager].homePageViewController openWebPage:dictJson parentVC:(Old_CubeWebViewController *)self.viewController];
//        }
    }
}

/**
 *  打开一个视图
 *  合并旧有的openPageWithTitle和openPage方法
 *
 *  @param command  json对象，
 *  {
 *   url：string 类型，HTML页面在线或本地地址
 *   sInitFun：string 类型，打开新页面调用页面的JS 参数可选
 *   oInitParam：object 类型，调用函数传的参数 参数可选
 *   sTitle：string 类型，页面的标题
 *   sFlag:Boolean 类型 打开新页面时是否删除中间webview true删除 false不删
 *   jNavInfo：Json类型，原生用到的参数{'rotation':1,'navigationBar':1,'returnView':1,'gotoneturl':true} ,跟菜单参数设置一致
 *  }
 */
-(void)openWebPage:(CDVInvokedUrlCommand *)command
{
    NSDictionary *params = [command argumentAtIndex:0];
    NSString *strParams = [command argumentAtIndex:0];
    if (strParams != nil && [strParams isKindOfClass:[NSString class]]) {
        NSError *error = nil;
        params = [NSJSONSerialization JSONObjectWithData: [strParams dataUsingEncoding:NSUTF8StringEncoding]
                                                                   options: NSJSONReadingMutableContainers
                                                                     error: &error];
    }
//    if (params != nil && [params isKindOfClass:[NSDictionary class]] && params.count > 0) {
//        NSString *url = [params objectForKey:OpenPage_URL];
//        if(!url||[url isEqualToString:@""]){
//            NSArray *webs=[TipsCacheManager sharedManager].homePageViewController.navigationController.viewControllers;
//            for(int i=0;i<webs.count;i++){
//                UIViewController *VC = [webs objectAtIndex:i];
//                if([VC isKindOfClass:[Old_CubeWebViewController class]]){
//                    [[TipsCacheManager sharedManager].homePageViewController.navigationController popToViewController:[webs objectAtIndex:i-1] animated:YES];
//                    break;
//                }
//            }
//        }else{
//            [[TipsCacheManager sharedManager].homePageViewController openWebPage:params parentVC:(Old_CubeWebViewController *)self.viewController];
//        }
//        
//    }
}


- (void)closePage:(CDVInvokedUrlCommand *)command{
    NSArray *arguments = [command arguments];
    
    NSString *callbackStr = arguments[0];
    callbackStr = [callbackStr stringByReplacingOccurrencesOfString:@"[" withString:@""];
    callbackStr = [callbackStr stringByReplacingOccurrencesOfString:@"]" withString:@""];
    callbackStr = [callbackStr stringByReplacingOccurrencesOfString:@"'" withString:@""];
    
    
    NSArray *array = [callbackStr componentsSeparatedByString:@","];
    
//    UIViewController *controller = [TipsCacheManager sharedManager].homePageViewController;
//    
//    NSArray *childs = controller.navigationController.childViewControllers;
//    for (int i = (int)([childs count] - 1) ; i >= 0 ; i --) {
//        Old_CubeWebViewController *web = (Old_CubeWebViewController *)childs[i];
//        if ([web isKindOfClass:[Old_CubeWebViewController class]]) {
//            NSString *urlStr = [web.webView.request.URL absoluteString];
//            if ([urlStr rangeOfString:array[0]].location != NSNotFound) {
//                [controller.navigationController popToViewController:controller animated:NO];
//                [controller.navigationController pushViewController:web animated:NO];
//                return;
//            }
//        }
//    }
}
-(void)initTimer
{
    //时间间隔
    NSTimeInterval timeInterval =3.0 ;
    //定时器
    [NSTimer scheduledTimerWithTimeInterval:timeInterval
                                     target:self
                                   selector:@selector(clearModulPath)
                                   userInfo:nil
                                    repeats:NO];
}
-(void)clearModulPath{
    _modulPath=nil;
}


-(void)gotoBusinessQuery:(CDVInvokedUrlCommand*)command
{
    NSString* cubeid= [command argumentAtIndex:0];
//    [(Old_CubeWebViewController *)self.viewController dismissViewController];
//    [[TipsCacheManager sharedManager].homePageViewController openCubeWebViewVCWithCode:cubeid];
}


- (void)loadPageWithUrl:(CDVInvokedUrlCommand *)command
{
//        NSURL *url = [NSURL URLWithString:[command argumentAtIndex:0]];
//        if (url)
//        {
//            NSMutableURLRequest *request = [NSMutableURLRequest requestWithURL:url];
//            // 设置gbss cookie fanlanjun 14/11/12
//            CookieManager *manager = [CookieManager sharedManager];
//            NSDictionary * headers = [NSHTTPCookie requestHeaderFieldsWithCookies:manager.cookies];
//            [request setAllHTTPHeaderFields:headers];
//            [self.webView loadRequest:request];
//        }
//        else
//        {
////            [iConsole log:[command getErrorStr:CTStatusCodeIllegalArgument msg:@"加载的页面地址不合法，请检查！"]];
//            IConsoleLog(@"加载的页面地址不合法，请检查！");
//        }
    
}

- (void)logoutByUserInvalid:(CDVInvokedUrlCommand *)command
{
    /*************** wnh 20160504 ******************/
//    [iConsole log:@"<%@:%@:%d> Not implement", NSStringFromClass([self class]), NSStringFromSelector(_cmd), __LINE__];
//    ISAlertView *alertView = [[ISAlertView alloc] initWithTitle:@"温馨提示" message:@"为了您的账户安全，请重新登录" delegate:self cancelButtonTitle:@"好的" otherButtonTitles:nil];
//    alertView.tag = 1000;
//    [alertView show];
//    HomePageViewController *homePageVC = [AppDelegate getDelegate].homeViewController;
//    [homePageVC clickOuthanle];
    /********************** end ********************/
}
//- (void)isAlertView:(UIView *)alertView didDismissWithButtonIndex:(NSInteger)buttonIndex{
//    if (alertView.tag == 1000) {
//        HomePageViewController *homePageVC = [AppDelegate getDelegate].homeViewController;
//        
//        [homePageVC backToLoginPage];
//    }
//}

- (void)goHome:(CDVInvokedUrlCommand *)command
{
//    TipsCacheManager *manager = [TipsCacheManager sharedManager];
//    [manager.homePageViewController goHomePage];
}

- (void)setNaviBar:(CDVInvokedUrlCommand *)command
{
    
}

- (void)login:(CDVInvokedUrlCommand *)command
{
        // 已经登录直接返回登录成功
//        if ([TipsCacheManager sharedManager].homePageViewController.loginUserInfo)
//        {
//            [self.commandDelegate sendPluginResult:[CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsInt:1] callbackId:command.callbackId];
//            return;
//        }
////    [command argumentAtIndex:0];
//        self.loginCall = command.callbackId;
//        
//        LoginViewController *loginVC = [[LoginViewController alloc] initWithNibName:@"LoginViewController" bundle:nil];
//        self.loginVC = loginVC;
//        loginVC.delegate = self;
//        
//#ifdef IOS_DEVICE_PAD
//        UINavigationController *nc = [[UINavigationController alloc] initWithRootViewController:loginVC];
//        nc.navigationBarHidden = YES;
//        NHPopoverViewController *popoverVC = [[NHPopoverViewController alloc] initWithController:nc contentSize:CGSizeMake(470, 470)];
//        _popoverLoginVC = popoverVC;
//        popoverVC.tag = -109;
//        popoverVC.delegate = self;
//        [popoverVC showWithCloseBtn:YES];
//#else
//        [self.viewController presentModalViewController:loginVC animated:YES];
//#endif
    
}

- (void)openPayPage:(CDVInvokedUrlCommand *)command
{
    if (_fastPayCall)
        return;
    
//        self.fastPayCall = command.callbackId;
//        
//        FastPayViewController *viewController = [[FastPayViewController alloc] init];
//        viewController.delegate = self;
//        
//        viewController.countdown = [[command argumentAtIndex:1] intValue];
//        [viewController loadPayPage:[command argumentAtIndex:0]];
//        [self.viewController presentModalViewController:viewController animated:YES];
    
}

- (void)loadSplitWebViewRequest:(CDVInvokedUrlCommand *)command
{
        //        NSString *filePath = [NSString stringWithFormat:@"%@/www/%@", [FileUtil getCachePath], [command argumentAtIndex:0]];
        //统一使用runtime directory
//        NSString *wwwPath = [[NSFileManager wwwRuntimeDirectory] path];
//        NSString *filePath = [NSString stringWithFormat:@"%@/%@",wwwPath, [command argumentAtIndex:0]];
//        NSURLRequest *request = [NSURLRequest requestWithURL:[NSURL URLWithString:filePath]];
//        [(Old_CubeWebViewController *)self.viewController loadSplitWebViewRequest:request];
    
}
- (void)openSplitView:(CDVInvokedUrlCommand *)command{

//    [(Old_CubeWebViewController *)self.viewController openSplitView:[[command argumentAtIndex:0] boolValue]];
//    [self.commandDelegate sendPluginResult:[CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsInt:1] callbackId:command.callbackId];
}
-(void)reloadLeftRequest:(CDVInvokedUrlCommand *)command{
#ifdef IOS_DEVICE_PAD
    NSString *errorStr = [command argumentAtIndex:0 withDefault:nil andClass:[NSString class]];
    NSString *sFun = [command argumentAtIndex:1 withDefault:nil andClass:[NSString class]];
    id oParam = [command argumentAtIndex:2];
    if ([oParam isKindOfClass:NSArray.class] || [oParam isKindOfClass:NSDictionary.class]) {
        oParam = [oParam JSONString];
    }
    else if (![oParam isKindOfClass:[NSString class]]){
        oParam = [oParam description];
    }
    BOOL shouldNotReload=NO;//默认需要reload
    if ([[command argumentAtIndex:3] isKindOfClass:[NSString class]] ) {
        shouldNotReload=[[[command argumentAtIndex:3] lowercaseString]  isEqualToString:@"false"];
    }
    if (shouldNotReload&&sFun&&[self.viewController.parentViewController isKindOfClass:[Old_CubeWebViewController class]]) {//不需要重刷新
        Old_CubeWebViewController *oldParentController=(Old_CubeWebViewController*)self.viewController.parentViewController;
        [oldParentController.webView stringByEvaluatingJavaScriptFromString:[NSString stringWithFormat:@"%@(%@)", sFun, oParam]];
        
        return;
    }
    
    
    if ([errorStr isKindOfClass:[NSString class]]&&errorStr.length>0)
    {
      //统一使用runtime directory
        NSString *wwwPath = [[NSFileManager wwwRuntimeDirectory] path];
        NSString *filePath = [NSString stringWithFormat:@"%@/%@",wwwPath, [command argumentAtIndex:0]];
        if ([self.viewController.parentViewController isKindOfClass:[Old_CubeWebViewController class]]) {
            Old_CubeWebViewController *oldParentController=(Old_CubeWebViewController*)self.viewController.parentViewController;
            [oldParentController.webView loadRequest:[NSURLRequest requestWithURL:[NSURL URLWithString:filePath]]];
            if (sFun) {
                __weak Old_CubeWebViewController* weakOldParentController=oldParentController;
                oldParentController.didFinishPreloadBlock=^{
                     [weakOldParentController.webView stringByEvaluatingJavaScriptFromString:[NSString stringWithFormat:@"%@(%@)", sFun, oParam]];
                };
                
            }
        }
        
    }else{
        if ([self.viewController.parentViewController isKindOfClass:[Old_CubeWebViewController class]]) {
            Old_CubeWebViewController *oldParentController=(Old_CubeWebViewController*)self.viewController.parentViewController;
            [oldParentController.webView loadRequest:[NSURLRequest requestWithURL:[NSURL URLWithString:oldParentController.startPage]]];
            if (sFun) {
                __weak Old_CubeWebViewController* weakOldParentController=oldParentController;
                oldParentController.didFinishPreloadBlock=^{
                    [weakOldParentController.webView stringByEvaluatingJavaScriptFromString:[NSString stringWithFormat:@"%@(%@)", sFun, oParam]];
                };
                
            }
        }
        
    }
#endif
    
}

- (void)pickContact:(CDVInvokedUrlCommand *)command
{
    if (!_pickContactCall)
    {
//        self.pickContactCall = command.callbackId;
//        PeopleAddressPicker *addressPicker = [[PeopleAddressPicker alloc] init];
//        addressPicker.delegate = self;
//        addressPicker.parentViewController = self.viewController;
//        self.addressPicker = addressPicker;
//        [addressPicker show];
        
    }
//    return;
//    
//        if (!_pickContactCall)
//        {
//            self.pickContactCall = command.callbackId;
//            AddressBookViewController *addressBookVC = [[AddressBookViewController alloc] initWithNibName:@"AddressBookViewController" bundle:nil];
//            addressBookVC.delegate = self;
//#ifdef IOS_DEVICE_PAD
//            NHPopoverViewController *popoverVC = [[NHPopoverViewController alloc] initWithController:addressBookVC contentSize:CGSizeMake(380, 366) autoClose:YES];
//            popoverVC.delegate = self;
//            _popoverPickContact = popoverVC;
//            [popoverVC setDissmissBlock:^{
//                self.pickContactCall = nil;
//            }];
//            [popoverVC show];
//#else
//            [self.viewController presentModalViewController:addressBookVC animated:YES];
//#endif
//        }
    
}

-(void)selectedTabItem:(CDVInvokedUrlCommand*)command
{
    id params = [command argumentAtIndex:0];
    if (params && [params isKindOfClass:[NSString class]]) {
//        params = [params objectFromJSONString];
    }
    
    if (params && [params isKindOfClass:[NSDictionary class]] && [params count] > 0) {
        
        NSArray *items = params[@"selectedItem"];
        if (![items isKindOfClass:[NSArray class]]) return;
        if (items == nil || items.count < 1) return;
        
//        int index = [[items firstObject] intValue];
//        [[TipsCacheManager sharedManager].ctTabBarController.tabBarView selectIndex:index];
//        if (items.count >= 2) {
//            NSDictionary *returnObject = [TipsCacheManager sharedManager].userDic[@"returnObject"];
//            NSString *returnObjectKey = nil;
//            NSString *codeKey = [items lastObject];
//            switch (index) {
//                case 0:
//                    returnObjectKey = @"menuDataMainPage";
//                    break;
//                case 1:
//                    returnObjectKey = @"menuDataEFan";
//                    break;
//                case 2:
//                    returnObjectKey = @"menuDataEln";
//                    break;
//                case 3:
//                    returnObjectKey = @"menuDataMy";
//                    break;
//                default:
//                    break;
//            }
//            NSArray *funArray = [Utils convertNull:returnObjectKey ?returnObject[returnObjectKey] : nil];
//            if ([funArray count]) {
//                NSArray *menuDataMy = [Utils convertNull:returnObject[returnObjectKey]];
//                Function *fun = nil;
//                for (NSDictionary *bupm in menuDataMy) {
//                    if ([[Utils convertNull:bupm[@"code"]] isEqualToString:codeKey]) {
//                        fun = [[Function alloc] initWithDict:bupm];
//                        break;
//                    }
//                }
//                /**目前只支持e帆网*/
//                if (index == 1) {
//                    HomePageViewController *hpv = [TipsCacheManager sharedManager].homePageViewController;
//                    if(fun){
//                        [hpv gotoModuleWithFun:fun viewController:hpv];
//                    }
//                }
//            }
//        }
    }
}

#pragma mark - NHPopoverViewControllerDelegate

- (void)loginCall:(BOOL)isLogin
{
//    if (_popoverLoginVC)
//    {
//        _popoverLoginVC = nil;
//    }
//    self.loginVC = nil;
    
    if ([_loginCall length] > 0)
    {
//        [self.webView evaluatingJavaScriptOnMain:[NSString stringWithFormat:@"%@(%d)", _loginCall, isLogin]];
//        [self.webView stringByEvaluatingJavaScriptFromString:[NSString stringWithFormat:@"%@(%d)", _loginCall, isLogin]];
        [self.commandDelegate sendPluginResult:[CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsInt:isLogin ? 1 : 0] callbackId:_loginCall];
        self.loginCall = nil;
    }
}

//- (void)didDismissNHPopover:(NHPopoverViewController *)popoverController
//{
//    if (_popoverLoginVC == popoverController)
//    {
//        [self loginCall:NO];
//        
//        if(popoverController.tag == -109) {
//            
//            BOOL isMustChangePasswd = [[NSUserDefaults standardUserDefaults] boolForKey:kIsMustChangePasswdKey];
//            if (isMustChangePasswd) {
//                
//                LogoutBiz *logoutBiz = [[LogoutBiz alloc] initWithTarget:nil];
//                [logoutBiz handleLogoutCompletion:^(id resp) {
//                    
//                } failedError:^(NSString *resultMsg) {
//                    
//                }];
//            }
//        }
//
//    }
//}

#pragma mark - LoginViewControllerDelegate

//- (void)loginSuccess:(LoginViewController *)loginViewController
//{
//    [_popoverLoginVC dismiss];
//    [self loginCall:YES];
//}

#pragma mark - FastPayViewControllerDelegate

//- (void)didSuccessFastPay:(FastPayViewController *)fastPay
//{
//    NSString *result = [fastPay.resultDic JSONString];
//    [fastPay dismissModalViewControllerAnimated:YES];
//    
////    [self.webView evaluatingJavaScriptOnMain:[NSString stringWithFormat:@"%@(%@)", _fastPayCall, result]];
////    [self.webView stringByEvaluatingJavaScriptFromString:[NSString stringWithFormat:@"%@(%@)", _fastPayCall, result]];
//    [self.commandDelegate sendPluginResult:[CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsString:result] callbackId:_fastPayCall];
//    self.fastPayCall = nil;
//}
//
//- (void)didCancelFastPay:(FastPayViewController *)fastPay
//{
//    [fastPay dismissModalViewControllerAnimated:YES];
//    
////    [self.webView evaluatingJavaScriptOnMain:[NSString stringWithFormat:@"%@(null)", _fastPayCall]];
////    [self.webView stringByEvaluatingJavaScriptFromString:[NSString stringWithFormat:@"%@(null)", _fastPayCall]];
//    [self.commandDelegate sendPluginResult:[CDVPluginResult resultWithStatus:CDVCommandStatus_ERROR messageAsString:@""] callbackId:_fastPayCall];
//    self.fastPayCall = nil;
//}
//-(void)didSelectDialogWithButtonIndex:(int)index :(FastPayViewController *)fastPay
//{
//    if (index==0) {
//        //保存并退出
//        [fastPay dismissModalViewControllerAnimated:YES];
//        
////        [self.webView evaluatingJavaScriptOnMain:@"page.endBanlance(0)"];
//        [self.webView stringByEvaluatingJavaScriptFromString:@"page.endBanlance(0)"];
//        self.fastPayCall = nil;
//    }else if(index==1)
//    {
//        //删除并退出
//        [fastPay dismissModalViewControllerAnimated:YES];
//        
////        [self.webView evaluatingJavaScriptOnMain:@"page.endBanlance(1)"];
//        [self.webView stringByEvaluatingJavaScriptFromString:@"page.endBanlance(1)"];
//        self.fastPayCall = nil;
//    }
//}
-(void)payViewdidCountDown
{
//    [self.webView evaluatingJavaScriptOnMain:@"page.doGoBack()"];
//    [self.webView stringByEvaluatingJavaScriptFromString:@"page.doGoBack()"];
    self.fastPayCall = nil;
}

#pragma mark - PeopleAddressPickerDelegate

-(void)peopleAddressDidSelect:(NSString *)number
{
    if ([_pickContactCall length] > 0)
    {
        //        [self.webView evaluatingJavaScriptOnMain:[NSString stringWithFormat:@"%@('%@')", _pickContactCall, number]];
        //        [self.webView stringByEvaluatingJavaScriptFromString:[NSString stringWithFormat:@"%@('%@')", _pickContactCall, number]];
        [self.commandDelegate sendPluginResult:[CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsString:number] callbackId:_pickContactCall];
    }
    self.pickContactCall = nil;
}

-(void)peopleAddressDidCancel
{
    self.pickContactCall = nil;
}


#pragma mark - AddressBookViewControllerDelegate

//-(void)addressBookDidSelect:(AddressBookViewController *)viewController withNumber:(NSString *)number
//{
//    if ([_pickContactCall length] > 0)
//    {
////        [self.webView evaluatingJavaScriptOnMain:[NSString stringWithFormat:@"%@('%@')", _pickContactCall, number]];
////        [self.webView stringByEvaluatingJavaScriptFromString:[NSString stringWithFormat:@"%@('%@')", _pickContactCall, number]];
//        [self.commandDelegate sendPluginResult:[CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsString:number] callbackId:_pickContactCall];
//    }
//    self.pickContactCall = nil;
//#ifdef IOS_DEVICE_PAD
//    [_popoverPickContact dismiss];
//    _popoverPickContact = nil;
//#else
//    [viewController dismissModalViewControllerAnimated:YES];
//#endif
//}
//
//-(void)addressBookDidCancel:(AddressBookViewController *)viewController
//{
//    self.pickContactCall = nil;
//#ifdef IOS_DEVICE_PAD
//    [_popoverPickContact dismiss];
//    _popoverPickContact = nil;
//#else
//    [viewController dismissModalViewControllerAnimated:YES];
//#endif
//}

@end
