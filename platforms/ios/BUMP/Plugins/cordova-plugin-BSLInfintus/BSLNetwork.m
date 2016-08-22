//
//  Network.m
//  bsl
//
//  Created by FanFrank on 14/11/6.
//
//

#import "BSLNetwork.h"
//#import "HomePageViewController.h"
//#import "Reachability.h"
//#import "NetworkCacheManager.h"
#import <AddressBook/AddressBook.h>

#define kRequestCommandKey @"kRequestCommandKey"

@interface BSLNetwork ()
{
    CDVInvokedUrlCommand *_uploadContactsCommand;
    NSString* _tmpErrorInfo;
}

@property (nonatomic, retain) NSMutableArray *requests;

@end

@implementation BSLNetwork

- (void)dealloc
{
//    for (HttpClientComponent *component in _requests){
//        [component abort];
//    }
    [[NSNotificationCenter defaultCenter] removeObserver:self];
}

#pragma mark - GetOrSet

- (NSMutableArray *)requests
{
//    if (!_requests)
//    {
//        self.requests = [NSMutableArray array];
//    }
//    return _requests;
    return nil;
}

#pragma mark - Web methods

- (void)get:(CDVInvokedUrlCommand *)command
{
    
//        if ([[command argumentAtIndex:2 withDefault:nil andClass:[NSNumber class]] boolValue])
//        {
//            NSString *responseData = [[NetworkCacheManager sharedManager] getRespWithURL:[command argumentAtIndex:0] requestBody:@""];
//            // 存在缓存数据时直接返回
//            if (responseData)
//            {
//                [self.commandDelegate sendPluginResult:[CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsArray:@[responseData,@200]] callbackId:command.callbackId];
//                return;
//            }
//        }
//        HttpClientComponent *httpCompoent = [[HttpClientComponent alloc] init];
//        httpCompoent.delegate = self;
//        [self.requests addObject:httpCompoent];
//        httpCompoent.userInfo = [NSDictionary dictionaryWithObject:command forKey:kRequestCommandKey];
//        [httpCompoent sendRequestWithUrl:[command argumentAtIndex:0]
//                            requestParam:[command argumentAtIndex:1 withDefault:nil andClass:[NSDictionary class]]
//                                  target:self
//                requestDidFinishSelector:@selector(requestFinished:)
//                  requestDidFailSelector:@selector(requestFailed:)
//                             finishBlock:nil failBlock:nil isPost:NO commonParam:YES];
    
}

- (void)post:(CDVInvokedUrlCommand *)command
{
    
        _tmpErrorInfo = nil;
//        HttpClientComponent *httpCompoent = [[HttpClientComponent alloc] init];
//        httpCompoent.delegate = self;
//        [self.requests addObject:httpCompoent];
//        httpCompoent.userInfo = [NSDictionary dictionaryWithObject:command forKey:kRequestCommandKey];
//        [httpCompoent sendRequestWithUrl:[command argumentAtIndex:0]
//                            requestParam:[command argumentAtIndex:1 withDefault:nil andClass:[NSDictionary class]]
//                                  target:self
//                requestDidFinishSelector:@selector(requestFinished:)
//                  requestDidFailSelector:@selector(requestFailed:)
//                             finishBlock:nil failBlock:^(void){
//                                 NSUserDefaults *cache=[NSUserDefaults standardUserDefaults];
//                                 _tmpErrorInfo = [cache valueForKey:@"errorcache"];
//                             } isPost:YES commonParam:YES];
    
}
-(void)showLastNetworkErrorInfo:(CDVInvokedUrlCommand *)command
{
//    NSString* error=[command checkParamType:@[[NSString class]]];
//    if (!error) {
//        UIAlertView* alert= [[UIAlertView alloc] initWithTitle:@"错误信息" message:_tmpErrorInfo?_tmpErrorInfo:@"没有错误信息" delegate:nil cancelButtonTitle:@"确定" otherButtonTitles:nil, nil];
//        [alert show];
//    }
//    [iConsole show];
}
- (void)checkNetState:(CDVInvokedUrlCommand *)command
{
//    [self.commandDelegate sendPluginResult:[CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsInt:[[Reachability reachabilityForInternetConnection] currentReachabilityStatus]] callbackId:command.callbackId];
//    return [NSNumber numberWithInt:[[Reachability reachabilityForInternetConnection] currentReachabilityStatus]];
}

- (void)uploadContacts:(CDVInvokedUrlCommand *)command
{
//    ABAddressBookRef addressBook;
//    if ([[UIDevice currentDevice].systemVersion floatValue] >= 6)
//    {
//        CFErrorRef error = nil;
//        addressBook = ABAddressBookCreateWithOptions(NULL,&error);
//        ABAddressBookRequestAccessWithCompletion(addressBook, ^(bool granted, CFErrorRef error)
//        {
//            // callback can occur in background, address book must be accessed on thread it was created on
//            dispatch_async(dispatch_get_main_queue(), ^{
//                if (error)
//                {
//                    IConsoleLog(@"通讯录导入出错，%@", error);
////                    [self.webView evaluatingJavaScriptOnMain:[NSString stringWithFormat:@"%@('通讯录导入出错，请重试！',500)", [command argumentAtIndex:0]]];
////                    [self.webView stringByEvaluatingJavaScriptFromString:[NSString stringWithFormat:@"%@('通讯录导入出错，请重试！',500)", [command argumentAtIndex:0]]];
//                    [self.commandDelegate sendPluginResult:[CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsArray:@[@"通讯录导入出错，请重试！",@500]] callbackId:command.callbackId];
//                }
//                else if (!granted)
//                {
//                    IConsoleLog(@"未授权访问通讯录！");
////                    [self.webView evaluatingJavaScriptOnMain:[NSString stringWithFormat:@"%@('未授权访问通讯录，请到设置开启通讯录访问权限！',-403)", [command argumentAtIndex:0]]];
////                    [self.webView stringByEvaluatingJavaScriptFromString:[NSString stringWithFormat:@"%@('未授权访问通讯录，请到设置开启通讯录访问权限！',-403)", [command argumentAtIndex:0]]];
//                    [self.commandDelegate sendPluginResult:[CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsArray:@[@"未授权访问通讯录，请到设置开启通讯录访问权限！",@-403]] callbackId:command.callbackId];
//                }
//                else
//                {
////                    NSMutableDictionary *result = AddressBookUpdatedBSL(addressBook, nil, (__bridge void *)(self));
//                    NSMutableDictionary *result = ReadAddressBookUpdatedBSL(addressBook, nil, (__bridge void*)(self));
//                    CFRelease(addressBook);
//                    if (result == nil || result.count <= 0) {
//                        IConsoleLog(@"通讯录为空");
//                        NSLog(@"%@",[NSString stringWithFormat:@"%@('您的通讯录为空！',0)", [command argumentAtIndex:0]]);
////                        [self.webView stringByEvaluatingJavaScriptFromString:[NSString stringWithFormat:@"%@('您的通讯录为空！',0)", [command argumentAtIndex:0]]];
//                        [self.commandDelegate sendPluginResult:[CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsArray:@[@"您的通讯录为空！",@0]] callbackId:command.callbackId];
//                    }else{
//                        [self handleUploadContacts:command params:result];
//                    }
//                }
//            });
//        });
//    }
//    else
//    {
//        // iOS 4/5
//        addressBook = ABAddressBookCreate();
////        NSMutableDictionary *result = AddressBookUpdatedBSL(addressBook, NULL, (__bridge void *)(self));
//        NSMutableDictionary *result = ReadAddressBookUpdatedBSL(addressBook, NULL, (__bridge void *)(self));
//        CFRelease(addressBook);
//        
//        [self handleUploadContacts:command params:result];
//    }
}
- (void)handleUploadContacts:(CDVInvokedUrlCommand *)command params:(NSDictionary *)params
{
//    CDVInvokedUrlCommand *requestCommand = [[CDVInvokedUrlCommand alloc] initWithArguments:nil arguments:@[URL_SAVE_CUSTOM_INFO, params, [command argumentAtIndex:0]] className:command.className methodName:command.methodName];
//    CDVInvokedUrlCommand *requestCommand = [[CDVInvokedUrlCommand alloc] initWithArguments:@[URL_SAVE_CUSTOM_INFO, params] callbackId:command.callbackId className:command.className methodName:command.methodName];
//    _uploadContactsCommand = requestCommand;
//    [self post:requestCommand];
}

/** 读取通讯录信息 */
NSMutableDictionary* AddressBookUpdatedBSL(ABAddressBookRef addressBook, CFDictionaryRef info, void *context)
{
    NSMutableDictionary *result = [NSMutableDictionary dictionary];
    
    ABAddressBookRevert(addressBook);
    CFArrayRef people = ABAddressBookCopyArrayOfAllPeople(addressBook);
    
    for (CFIndex i = 0; i < CFArrayGetCount(people); ++i)
    {
        ABRecordRef groupRec = (ABRecordRef)CFArrayGetValueAtIndex(people, i);
        NSString *lastName = (__bridge NSString *)ABRecordCopyValue(groupRec, kABPersonLastNameProperty);
        NSString *firstName = (__bridge NSString *)ABRecordCopyValue(groupRec, kABPersonFirstNameProperty);
        ABMultiValueRef phones = (ABMultiValueRef) ABRecordCopyValue(groupRec, kABPersonPhoneProperty);
        NSString *phone = (__bridge NSString *)ABMultiValueCopyValueAtIndex(phones, 0);
        NSLog(@"first name: %@, last name: %@, phone: %@", firstName, lastName, phone);
        // 拼接用户姓名
        NSString *fullName = @"";
        if (firstName)
        {
            fullName = firstName;
            if (lastName)
            {
//                fullName = [NSString stringWithFormat:@"%@ %@", firstName, lastName];//西方姓名读取
                fullName = [NSString stringWithFormat:@"%@ %@", lastName, firstName];//东方姓名读取
            }
        }
        else if (lastName)
        {
            fullName = lastName;
        }
        // 移除电话号码多余符号
        if (phone)
        {
            phone = [phone stringByReplacingOccurrencesOfString:@" " withString:@""]; // 中文空格
            phone = [phone stringByReplacingOccurrencesOfString:@" " withString:@""];
            phone = [phone stringByReplacingOccurrencesOfString:@"(" withString:@""];
            phone = [phone stringByReplacingOccurrencesOfString:@")" withString:@""];
            phone = [phone stringByReplacingOccurrencesOfString:@"-" withString:@""];
        }
        else
        {
            phone = @"";
        }
        [result setObject:fullName forKey:[NSString stringWithFormat:@"customerInfoVo[%ld].fullName", i]];
        [result setObject:fullName forKey:[NSString stringWithFormat:@"customerInfoVo[%ld].firstName", i]];
        [result setObject:phone forKey:[NSString stringWithFormat:@"customerInfoVo[%ld].mobile", i]];
        CFRelease(phones);
    }
    CFRelease(people);
    
    return result;
};


NSMutableDictionary* ReadAddressBookUpdatedBSL(ABAddressBookRef addressBook, CFDictionaryRef info, void *context)
{
    NSMutableDictionary *result = [NSMutableDictionary dictionary];
    
    ABAddressBookRevert(addressBook);
    CFArrayRef people = ABAddressBookCopyArrayOfAllPeople(addressBook);
    NSMutableArray *allPhonesArray = [NSMutableArray array];
    NSInteger index = 0;
    for (CFIndex i = 0; i < CFArrayGetCount(people); ++i)
    {
        ABRecordRef groupRec = (ABRecordRef)CFArrayGetValueAtIndex(people, i);
        NSString *lastName = (__bridge NSString *)ABRecordCopyValue(groupRec, kABPersonLastNameProperty);
        NSString *firstName = (__bridge NSString *)ABRecordCopyValue(groupRec, kABPersonFirstNameProperty);
        ABMultiValueRef phones = (ABMultiValueRef) ABRecordCopyValue(groupRec, kABPersonPhoneProperty);
        NSInteger count = ABMultiValueGetCount(phones);
        NSMutableArray *phoneArray = [NSMutableArray array];
        for (NSInteger p = 0; p < count; p++) {
            NSString *phone = (__bridge NSString *)ABMultiValueCopyValueAtIndex(phones, p);
            // 移除电话号码多余符号
            if (phone)
            {
                phone = [phone stringByReplacingOccurrencesOfString:@" " withString:@""]; // 中文空格
                phone = [phone stringByReplacingOccurrencesOfString:@" " withString:@""];
                phone = [phone stringByReplacingOccurrencesOfString:@"(" withString:@""];
                phone = [phone stringByReplacingOccurrencesOfString:@")" withString:@""];
                phone = [phone stringByReplacingOccurrencesOfString:@"-" withString:@""];
            }
            else
            {
                phone = @"";
            }
//            [phoneArray addObject:phone];
            // 拼接用户姓名
            NSString *fullName = @"";
            if (firstName)
            {
                fullName = firstName;
                if (lastName)
                {
//                fullName = [NSString stringWithFormat:@"%@ %@", firstName, lastName];//西方姓名读取
                    fullName = [NSString stringWithFormat:@"%@ %@", lastName, firstName];//东方姓名读取
                }
            }
            else if (lastName)
            {
                fullName = lastName;
            }
            
//            NSLog(@"before add, first: %@, last: %@, phone: %@", firstName, lastName, phone);
            //首先判断当前联系人中的电话是否有重复
            if (![phoneArray containsObject:phone]) {
                [phoneArray addObject:phone];
                
                NSDictionary *dictTemp = [NSDictionary dictionaryWithObjectsAndKeys:fullName, @"FullName", phone, @"Phone", nil];
                BOOL isExistPhone = NO;
                BOOL isExistName = NO;
                NSInteger sameNameCount = 0;
                
                //判断和其它人的电话会不会重复
                for (int j = 0; j < allPhonesArray.count; j++) {
                    NSDictionary *userDict = [allPhonesArray objectAtIndex:j];
                    if ([[userDict objectForKey:@"Phone"] isEqualToString:phone]) {
                        isExistPhone = YES;
                    }
                    if ([[userDict objectForKey:@"FullName"] isEqualToString:fullName]) {
                        isExistName = YES;
                        sameNameCount++;
                    }
                }
                //判断有没电话重复
                if (!isExistPhone) {
                    BOOL isCanAdd = YES;
                    //判断有没联系人重复
                    if (isExistName) {
                        //寻找这个同名人有多少电话了，如果不够3个，则可以加入当前电话
                        if (sameNameCount>=3) {
                            isCanAdd = NO;
                        }
                    }
                    
                    if (isCanAdd) {
//                        NSLog(@"after add, first: %@, last: %@, phone: %@", firstName, lastName, phone);
                        [allPhonesArray addObject:dictTemp];
                        [result setObject:fullName forKey:[NSString stringWithFormat:@"customerInfoVo[%ld].fullName", (long)index]];
                        [result setObject:fullName forKey:[NSString stringWithFormat:@"customerInfoVo[%ld].firstName", (long)index]];
                        [result setObject:phone forKey:[NSString stringWithFormat:@"customerInfoVo[%ld].mobile", (long)index]];
                        
                        index++;
                    }
                    
                }
                
            }
            
        }
        
        CFRelease(phones);
    }
    CFRelease(people);
    
    return result;
};


/**
 *  监听检测网络状态
 *
 *  @param command
 */
-(void)checkNetworkChanging:(CDVInvokedUrlCommand *)command
{
//    [[NSNotificationCenter defaultCenter] addObserverForName:NETWORK_CHANGED_NOTIFICATION object:nil queue:nil usingBlock:^(NSNotification *note){
//        NSDictionary *dictUserInfo = note.userInfo;
//        NSString *value = [dictUserInfo objectForKey:@"NetworkStatus"];
//        
//        CDVPluginResult *result = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsString:value];
//        [result setKeepCallbackAsBool:YES];
//        [self.commandDelegate sendPluginResult:result callbackId:command.callbackId];
//    }];
}


#pragma mark - HttpClientComponentDelegate

//- (void)requestFinished:(HttpClientComponent *)component
//{
//    // 判断302统一处理页面踢出
//    if (component.responseStatusCode != 302)
//    {
//        CDVInvokedUrlCommand *command = [component.userInfo objectForKey:kRequestCommandKey];
//        if (command)
//        {
//            // 判断是否需要缓存
//            if ([[command argumentAtIndex:2 withDefault:nil andClass:[NSNumber class]] boolValue])
//            {
//                NSDictionary *reponseDict = [component.responseString objectFromJSONString];
//                if ([[reponseDict objectForKey:@"success"] boolValue])
//                {
//                    [[NetworkCacheManager sharedManager] putCacheWithURL:[command argumentAtIndex:0] requestBody:@"" response:component.responseString responseTime:[[NSDate date] timeIntervalSince1970]*1000];
//                }
//            }
//            
//            if (_uploadContactsCommand != command)
//            {
//                NSArray *array=[[NSArray alloc ]initWithObjects:component.responseString,[NSString stringWithFormat:@"%d",component.responseStatusCode],nil];
//                CDVPluginResult* result=  [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsArray:array];
//                [self.commandDelegate sendPluginResult:result callbackId:command.callbackId];
//            }else{
//                _uploadContactsCommand = nil;  
//                [self.commandDelegate sendPluginResult:[CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsArray:@[[NSString stringWithFormat:@"%d",component.responseStatusCode],component.responseString]] callbackId:command.callbackId];
//            }
//        }
//    }else{
//        [[ShareAppDelegate homeViewController] pushUserInvalidTip:2];
//    }
//}
//
//
//- (void)requestFailed:(HttpClientComponent *)component
//{
//    // 判断302统一处理页面踢出
//    if (component.responseStatusCode != 302)
//    {
//        CDVInvokedUrlCommand *command = [component.userInfo objectForKey:kRequestCommandKey];
//        if (command)
//        {
//            NSInteger code = component.error.code;
//            NSString *errorMsg = component.error.localizedDescription;
//            if ([@"A connection failure occurred" isEqualToString:errorMsg])
//            {
//                code = -101;
//                errorMsg = @"网络连接异常，请稍后再试！";
//            }
//            if (_uploadContactsCommand != command){
//                [self.commandDelegate sendPluginResult:[CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsArray:@[errorMsg,[NSString stringWithFormat:@"%ld",(long)code]]] callbackId:command.callbackId];
//            }else{
//                _uploadContactsCommand = nil;
//                [self.commandDelegate sendPluginResult:[CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsArray:@[[NSString stringWithFormat:@"%ld",(long)code],errorMsg]] callbackId:command.callbackId];
//            }
//        }
//    }
//    else
//    {
//        [[ShareAppDelegate homeViewController] pushUserInvalidTip:2];
//    }
//}

@end
