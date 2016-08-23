//
//  NSFileManager+Extra.m
//  MobileBrick
//
//  Created by Justin Yip on 5/4/12.
//  Copyright (c) 2012 __MyCompanyName__. All rights reserved.
//

#import "NSFileManager+Extra.h"


@implementation NSFileManager (Extra)

//应用文档根目录
+ (NSURL *)applicationDocumentsDirectory
{
//    NSURL *url =[[[NSFileManager defaultManager] URLsForDirectory:NSCachesDirectory inDomains:NSUserDomainMask] lastObject];
    // add by arvin.chou DOCUMENT目录
//    return [[[NSFileManager defaultManager] URLsForDirectory:NSDocumentDirectory inDomains:NSUserDomainMask] lastObject];
    // add by arvin.chou 将根目录指向LIBRARY/CACHE目录
//    return [[[NSFileManager defaultManager] URLsForDirectory:NSCachesDirectory inDomains:NSUserDomainMask] lastObject];
    
    return [[[NSFileManager defaultManager] URLsForDirectory:NSDocumentDirectory inDomains:NSUserDomainMask] lastObject];
    
}

//应用运行时的www目录
+ (NSURL *)wwwRuntimeDirectory
{
    return [[self applicationDocumentsDirectory] URLByAppendingPathComponent:@"www" isDirectory:YES];
}

//应用安装里的预装模块目录
+ (NSURL *)preInstallModelsDirectory
{
    return [[[NSBundle mainBundle] bundleURL] URLByAppendingPathComponent:@"PreInstallModels" isDirectory:YES];
}

//应用安装包里的www目录
+ (NSURL *)wwwBundleDirectory
{
    return [[[NSBundle mainBundle] bundleURL] URLByAppendingPathComponent:@"www" isDirectory:YES];
}

//应用运行时Library/Cahse下的www目录
+ (NSURL *)wwwRuntimeCahseDirectory
{
    NSURL *cashe = [[[NSFileManager defaultManager] URLsForDirectory:NSCachesDirectory inDomains:NSUserDomainMask] lastObject];
    cashe = [cashe URLByAppendingPathComponent:@"www" isDirectory:YES];
    
    return cashe;
}

/**
 *  获取Documents目录
 */
+(NSURL *)getDocumentDirectory
{
    return [[[NSFileManager defaultManager] URLsForDirectory:NSCachesDirectory inDomains:NSUserDomainMask] lastObject];
}

/**
 *  获取Library目录
 */
+(NSURL *)getLibraryDirectory
{
    return [[[NSFileManager defaultManager] URLsForDirectory:NSLibraryDirectory inDomains:NSUserDomainMask] lastObject];
}

/**
 *  获取Cashe目录
 */
+(NSURL *)getCahseDirectory
{
    return [[[NSFileManager defaultManager] URLsForDirectory:NSCachesDirectory inDomains:NSUserDomainMask] lastObject];
}


/**
 *  应用运行时Documents下的www目录
 */
//+ (NSURL *)wwwRuntimeDocumentDirectory
//{
//    NSURL *documentsDirectory =[[[NSFileManager defaultManager] URLsForDirectory:NSDocumentDirectory inDomains:NSUserDomainMask] lastObject];
//    documentsDirectory = [documentsDirectory URLByAppendingPathComponent:@"www" isDirectory:YES];
//    
//    return documentsDirectory;
//}


- (BOOL)copyFolderAtURL:(NSURL *)srcURL toURL:(NSURL *)dstURL error:(NSError **)error
{
    return [self copyFolderAtPath:[srcURL path] toPath:[dstURL path] error:error];
}
             
- (BOOL)copyFolderAtPath:(NSString *)srcPath toPath:(NSString *)dstPath error:(NSError **)aError
{    
    BOOL result = YES;
    NSError *error = nil;
    
    NSArray *contents = [self contentsOfDirectoryAtPath:srcPath error:&error];
    for (NSString *subfile in contents) {
        NSString *fullSrc = [srcPath stringByAppendingPathComponent:subfile];
        NSString *fullDst = [dstPath stringByAppendingPathComponent:subfile];
        
        BOOL srcItem_isDirectory = NO;
        BOOL srcItem_exists = [self fileExistsAtPath:fullSrc isDirectory:&srcItem_isDirectory];
        
        if (srcItem_exists && srcItem_isDirectory) {//目录
            
            result = [self createDirectoryAtPath:fullDst withIntermediateDirectories:NO attributes:nil error:&error];
            if (!result) {
                NSLog(@"创建目录失败,%@\n,[%@]", error, fullDst);
                break;
            }
            
            result = [self copyFolderAtPath:fullSrc toPath:fullDst error:&error];
            if (NO == result) {
                NSLog(@"复制目录[%@]失败导致复制目录[%@]失败\n%@", fullSrc, srcPath, error);
                break;
            }
        } else if (srcItem_exists) {//文件
            
            result = [self copyItemAtPath:fullSrc toPath:fullDst error:&error];
            if (NO == result) {
                NSLog(@"复制文件失败,%@,[%@]", error, fullSrc);
                break;
            }
        }
    }
    
   

    return error == nil;
}

- (BOOL)replaceFolderAtPath:(NSString *)srcPath toPath:(NSString *)dstPath error:(NSError **)aError
{
    BOOL result = YES;
    NSError *error = nil;
    
    NSArray *contents = [self contentsOfDirectoryAtPath:srcPath error:&error];
    for (NSString *subfile in contents) {
        NSString *fullSrc = [srcPath stringByAppendingPathComponent:subfile];
        NSString *fullDst = [dstPath stringByAppendingPathComponent:subfile];
        
        BOOL srcItem_exists = [self fileExistsAtPath:fullSrc];
        if (srcItem_exists) {//文件
            
            BOOL dstItem_exists = [self fileExistsAtPath:fullDst];
            if (dstItem_exists) { // 目标文件存在时删除
                [self removeItemAtPath:fullDst error:nil];
            }
            result = [self copyItemAtPath:fullSrc toPath:fullDst error:&error];
            if (NO == result) {
                NSLog(@"复制文件失败,%@,[%@]", error, fullSrc);
                break;
            }
        }
    }
    
    return error == nil;
}

//- (BOOL)removeFolderAtPath:(NSString *)srcPath error:(NSError **)aError
//{
//    BOOL result = YES;
//    NSError *error = nil;
//    
//    NSArray *contents = [self contentsOfDirectoryAtPath:srcPath error:&error];
//    
//    [[NSFileManager defaultManager]removeItemAtPath:srcPath error:&error];
//    
////    for (NSString *subfile in contents) {
////        NSString *fullSrc = [srcPath stringByAppendingPathComponent:subfile];
////        
////        BOOL srcItem_isDirectory = NO;
////        BOOL srcItem_exists = [self fileExistsAtPath:fullSrc isDirectory:&srcItem_isDirectory];
////        
////        if (srcItem_exists && srcItem_isDirectory) {//目录
////            
//            result = [self removeFolderAtPath:srcPath error:&error];
//            if (!result) {
//                NSLog(@"删除目录失败,%@\n,[%@]", error, srcPath);
//            }
////        } else if (srcItem_exists) {//文件
////            
////            result = [self removeItemAtPath:fullSrc error:&error];
////            if (NO == result) {
////                NSLog(@"复制文件失败,%@,[%@]", error, fullSrc);
////                break;
////            }
////        }
////
////    }
//    
//    *aError = error;
//    return error == nil;
//}

@end
