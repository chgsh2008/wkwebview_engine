//
//  NSFileManager+Extra.h
//  MobileBrick
//
//  Created by Justin Yip on 5/4/12.
//  Copyright (c) 2012 __MyCompanyName__. All rights reserved.
//

#import <Foundation/Foundation.h>

#define FS [NSFileManager defaultManager]

@interface NSFileManager (Extra)

+ (NSURL *)applicationDocumentsDirectory;
+ (NSURL *)wwwRuntimeDirectory;
+ (NSURL *)preInstallModelsDirectory;
+ (NSURL *)wwwBundleDirectory;

/**
 *  获取Documents目录
 */
+ (NSURL *)getDocumentDirectory;

/**
 *  获取Library目录
 */
+ (NSURL *)getLibraryDirectory;

/**
 *  获取Cashe目录
 */
+ (NSURL *)getCahseDirectory;


/**
 *  运行时目录，在Library/Cashe下的www目录
 */
+ (NSURL *)wwwRuntimeCahseDirectory;

/**
 * copy文件夹的内容到指定目录（使用时请注意子文件或文件夹必须不存在才能copy成功）
 */
- (BOOL)copyFolderAtURL:(NSURL *)srcURL toURL:(NSURL *)dstURL error:(NSError **)error;
/**
 * copy文件夹的内容到指定目录（使用时请注意子文件或文件夹必须不存在才能copy成功）
 */
- (BOOL)copyFolderAtPath:(NSString *)srcPath toPath:(NSString *)dstPath error:(NSError **)error;
//- (BOOL)removeFolderAtPath:(NSString *)srcPath error:(NSError **)aError;

/**
 * 替换指定目录的文件夹内容 fanlanjun 16/1/26
 */
- (BOOL)replaceFolderAtPath:(NSString *)srcPath toPath:(NSString *)dstPath error:(NSError **)aError;

@end
