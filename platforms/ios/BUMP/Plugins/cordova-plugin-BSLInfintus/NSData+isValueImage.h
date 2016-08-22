//
//  NSData+isValueImage.h
//  GbssApps-IOS
//
//  Created by Suycity on 15/12/23.
//
//

#import <Foundation/Foundation.h>

@interface NSData (isValidCategoty)

- (NSString *)stringMimeTypeFromData;

/**
 *  检查png图片的完整星
 *
 *  @param data data description
 *
 *  @return return value description
 */
+ (BOOL)isPNGValid:(NSData *)data;

+ (BOOL)isGIFValid:(NSData *)data;

/**
 *  检查Jpeg图片的完整星
 *
 *  @param data data description
 *
 *  @return return value description
 */
+ (BOOL)isJPEGValid:(NSData *)jpeg;
@end
