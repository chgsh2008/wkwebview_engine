//
//  Database.m
//  bsl
//
//  Created by FanFrank on 14/11/7.
//
//

#import "BSLDatabase.h"
//#import "DBUtilities.h"
//#import "JSONKit.h"

@interface BSLDatabase()
{
//    DBUtilities *dbUtil;
//    FMDatabase  *db;
}


@end

@implementation BSLDatabase

- (id)init
{
//    if ((self = [super init]))
//    {
//        dbUtil = [DBUtilities sharedDBManage];
//        db     = dbUtil.db;
//    }
//    return self;
    return nil;
}

- (void)querySql:(CDVInvokedUrlCommand *)command
{
//        NSMutableArray *items = [[NSMutableArray alloc] init];
//        
//        FMResultSet *rs = [db executeQuery:[command argumentAtIndex:0] withArgumentsInArray:[command argumentAtIndex:1 withDefault:nil andClass:[NSArray class]]];
//        while (rs.next)
//        {
//            NSMutableDictionary *item = [NSMutableDictionary dictionary];
//            int columnCount = rs.columnCount;
//            for (int i = 0; i < columnCount; ++i)
//            {
//                [item setObject:[rs objectForColumnIndex:i] forKey:[rs columnNameForIndex:i]];
//            }
//            [items addObject:item];
//        }
//        [rs close];
//        if([db hadError])
//        {
//            IConsoleLog(@"query Err %d: %@", [db lastErrorCode], [db lastErrorMessage]);
//        }
//
//    CDVPluginResult* pluginResult;
//    if ([db hadError]) {
//        pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_ERROR messageAsString:[NSString stringWithFormat:@"query Err %d: %@", [db lastErrorCode], [db lastErrorMessage]]];
//    } else {
//        pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsString:[items JSONString]];
//    }
//    [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
//        return [items JSONString];
    
}

- (void)executeSql:(CDVInvokedUrlCommand *)command
{
//    CDVPluginResult* pluginResult;
//        [db executeUpdate:[command argumentAtIndex:0] withArgumentsInArray:[command argumentAtIndex:1 withDefault:nil andClass:[NSArray class]]];
//        if(![db hadError])
//        {
//            pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsInt:1];
////            return [NSNumber numberWithBool:YES];
//        }
//        else
//        {
////            pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsInt:0];
//            pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_ERROR messageAsInt:0];
//            IConsoleLog(@"query Err %d: %@", [db lastErrorCode], [db lastErrorMessage]);
//        }
//    
//    [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
//    return [NSNumber numberWithBool:NO];
}

@end
