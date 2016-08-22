//
//  BSLCatStatistical.m
//  GbssApps-IOS
//
//  Created by james on 16/6/28.
//
//

#import "BSLCatStatistical.h"
//#import "NVMonitorCenter.h"
//#import "CatCrashReport.h"
//#import "NVLogger.h"
//#import "NVStatisticsService.h"
@interface BSLCatStatistical()
@property (nonatomic,strong) NSMutableDictionary *dic;


@end

@implementation BSLCatStatistical

-(void)analytics:(CDVInvokedUrlCommand*)command{
//    "category": "",//String 分类，按主要页面即业务分，如index代表主页
//    "action": "",//String 动作，一般命名规则为category_actionName，如index_search
//    "label": "",//String 可阅读的标签，如名字等。一般是离散的值，用于统计出现频率
//    "value": 0,//int 非离散值，用于统计平均值。如列表点击位置，消费价格等
//    "extras": ["",""],//Array 额外信息，如request_id。以key1, value1, key2, value2提供
//    NSDictionary *arguDic;
//    if (command.arguments.count==0) {
//        return;
//        
//    }
//    if (command.arguments.count==1&&[command.arguments[0] isKindOfClass:[NSDictionary class]]) {
//       arguDic =command.arguments[0];
//        
//    }else if(command.arguments.count==1&&[command.arguments[0] isKindOfClass:[NSString class]]){
//       arguDic =[command.arguments[0] objectFromJSONString];
//    }
//    
//    NSString *event= [arguDic[@"category"] isKindOfClass:[NSString class]]?arguDic[@"category"]:@"";
//    NSString *action= [arguDic[@"action"] isKindOfClass:[NSString class]]?arguDic[@"action"]:@"";
//    NSString *label= [arguDic[@"label"] isKindOfClass:[NSString class]]?arguDic[@"label"]:@"";
//    NSString* value;
//    if ([arguDic[@"value"] isKindOfClass:[NSString class]]) {
//        value= arguDic[@"value"];
//    }else if([arguDic[@"value"] isKindOfClass:[NSNull class]]){
//        value=@"";
//    }else{
//        value=[NSString stringWithFormat:@"%ld",[arguDic[@"value"] integerValue]];
//    }
////    NSString*  message=[NSString stringWithCString:[[arguDic JSONString] cStringUsingEncoding:NSUTF8StringEncoding] encoding:NSNonLossyASCIIStringEncoding];
////     IConsoleLog(@"BSLCatStatistical:%@",message);
////    IConsoleLog(@"BSLCatStatistical:%@",arguDic);
//    if ([arguDic[@"extras"] isKindOfClass:[NSArray class]]&&arguDic.count>0) {
//        [[NVStatisticsService sharedInstance] trackEvent:event action:action label:label value:value extras:arguDic[@"extras"]];
//        
//    }else{
//        [[NVStatisticsService sharedInstance] trackEvent:event action:action label:label value:value extras:nil];
//    }

}
-(void)crashed:(CDVInvokedUrlCommand*)command{
     NSString *reasonStr;
  
//    if (command.arguments.count==1&&[command.arguments[0] isKindOfClass:[NSDictionary class]]) {
//        reasonStr =[command.arguments[0] JSONString];
//        
//    }else if(command.arguments.count==1&&[command.arguments[0] isKindOfClass:[NSString class]]){
//        reasonStr =command.arguments[0];
//    }else{
//        return;
//    }
//    IConsoleLog(@"BSLCatStatistical_crashed: %@", reasonStr);
//    CatCrashReport *catCrashReport= [CatCrashReport shareInstance];
//    NSMutableString *reportString=[@"" mutableCopy];
//    NSMutableDictionary *commonDic=[catCrashReport getCommonParaWithCrahReson:reasonStr];
//    [commonDic setObject:@"h5" forKey:@"platform"];
//    
//    NSArray *keys = [commonDic allKeys];
//    if (keys.count > 0) {
//        for (int i = 0; i < keys.count; i++) {
//            NSObject *key = keys[i];
//            NSObject *value = [commonDic objectForKey:key];
//            [reportString appendFormat:@"%@=%@\n",key,value];
//        }
//    }
//    [reportString appendFormat:@"\n"];
//    
//    [reportString appendFormat:@"crashReason=%@\n\n",reasonStr];
//
//    
//    [commonDic setValue:reportString forKey:@"crashContent"];
//    NSString *uploadStr = [commonDic JSONString];
//    
//    NSError *error;
//    NSString *crashDirectory = [catCrashReport crashStoreDirectory];
//    if (![[NSFileManager defaultManager] fileExistsAtPath:crashDirectory]) {
//        [[NSFileManager defaultManager] createDirectoryAtPath:crashDirectory withIntermediateDirectories:YES attributes:nil error:nil];
//    }
//    NSString *fullPath = [crashDirectory stringByAppendingPathComponent:@"crashdata.crash"];
//    BOOL success = [uploadStr writeToFile:fullPath atomically:YES encoding:NSUTF8StringEncoding error:&error];
//    if (!success) {
//        NSLog(@"crashlog write file fail:%@",error);
//    }
//    __weak CatCrashReport* weak_catCrashReport=catCrashReport;
//    dispatch_async(dispatch_get_global_queue(0, 0), ^{
//        [weak_catCrashReport  reportAppCrash:uploadStr];
//    });

}
-(void)monitor:(CDVInvokedUrlCommand*)command{
    NSDictionary *arguDic;
    if (command.arguments.count==0) {
        return;
        
    }
//    if (command.arguments.count==1&&[command.arguments[0] isKindOfClass:[NSDictionary class]]) {
//        arguDic =command.arguments[0];
//        
//    }else if(command.arguments.count==1&&[command.arguments[0] isKindOfClass:[NSString class]]){
//        arguDic =[command.arguments[0] objectFromJSONString];
//    }
//    IConsoleLog(@"BSLCatStatistical_CATmonitor: %@", arguDic);
//    NSString *url= [arguDic[@"url"] isKindOfClass:[NSString class]]?arguDic[@"url"]:@"";
//    int code= [arguDic[@"action"] intValue];
//    int requestBytes= [arguDic[@"requestBytes"] intValue];
//    int responseBytes= [arguDic[@"responseBytes"] intValue];
//    int responseTime= [arguDic[@"responseTime"] intValue];
//    [[NVMonitorCenter defaultCenter] pvWithCommand:url network:0  code:code route:3 tunnel:0 requestBytes:requestBytes responseBytes:responseBytes responseTime:responseTime ip:nil uploadPercent:100 ];
    
}


@end
