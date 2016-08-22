//
//  NSData+isValueImage.m
//  GbssApps-IOS
//
//  Created by Suycity on 15/12/23.
//
//

#import "NSData+isValueImage.h"

@implementation NSData (isValidCategoty)

- (NSString *)stringMimeTypeFromData{
    if ([NSData isPNGValid:self]) {
        return @"image/png";
    }
    else if ([NSData isJPEGValid:self]){
        return @"image/jpeg";
    }
    else if ([NSData isGIFValid:self]){
        return @"image/gif";
    }
    return @"application/octet-stream";
}

/**
 *  检查png图片的完整星
 *
 *  @param data data description
 *
 *  @return return value description
 */
+ (BOOL)isPNGValid:(NSData *)data
{
    BOOL val = YES;
    
    if ([data length] < 4)
        val = NO;
    
    const unsigned char * bytes = (const unsigned char *)[data bytes];
    
    if (bytes[0] != 0x89 || bytes[1] != 0x50)
        val = NO;
    if (bytes[[data length] - 2] != 0x60 ||
        bytes[[data length] - 1] != 0x82)
        val = NO;
    
    return val;
}
+ (BOOL)isGIFValid:(NSData *)data
{
    BOOL val = YES;
    
    if ([data length] < 4)
        val = NO;
    
    const unsigned char * bytes = (const unsigned char *)[data bytes];
    
    if (bytes[0] != 'G'
        || bytes[1] != 'I'
        || bytes[2] != 'F'
        || bytes[3] != '8')
        val = NO;
    if (bytes[[data length] - 2] != 'l' ||
        bytes[[data length] - 1] != '>')
        val = NO;
    
    return val;
}
/**
 *  检查Jpeg图片的完整星
 *
 *  @param data data description
 *
 *  @return return value description
 */
+ (BOOL)isJPEGValid:(NSData *)jpeg
{
    BOOL val = YES;
    if ([jpeg length] < 4)
        val = NO;
    
    const unsigned char * bytes = (const unsigned char *)[jpeg bytes];
    
    if (bytes[0] != 0xFF || bytes[1] != 0xD8) val = NO;
    
    if (bytes[[jpeg length] - 2] != 0xFF ||
        
        bytes[[jpeg length] - 1] != 0xD9) val = NO;
    
    /**
     *  图片完整
     */
    return val;
}
@end


