//
//  ISImageProcessor.h
//  ISImageProcessSDK
//
//  Created by Simon Liu on 17/3/13.
//  Copyright © 2017年 xzliu. All rights reserved.
//

#import <Foundation/Foundation.h>
#import <ISOpenSDKFoundation/ISOpenSDKFoundation.h>
#import <UIKit/UIKit.h>

typedef NS_ENUM(NSInteger, ISImageEnhanceMode)
{
    ISImageEnhanceModeAuto = -1,
    ISImageEnhanceModeOriginal = 0,
    ISImageEnhanceModeNormal = 1,
    ISImageEnhanceModeMagicColor = 2,
    ISImageEnhanceModeBlackAndWhite = 3,
    ISImageEnhanceModeGray = 4,
    ISImageEnhanceModeNone = NSNotFound,
};

typedef void(^ConstructResourcesFinishHandler)(ISOpenSDKStatus status);
typedef void(^DetectImageFinishHandler)(NSArray *borderPointsArray);
typedef void(^RecognizeImageFinishHandler)(UIImage *resultImage);

@interface ISImageProcessor : NSObject

/**
 *  单例对象
 *
 *  @return 图像切边增强控制器单例
 *
 */
+ (ISImageProcessor *) defaultProcessor;

/**
 *  初始化SDK模块，验证appkey
 *
 *  @param appKey    申请获得的SDK，用于授权
 *  @param subAppKey 为扩展而留，当前请传空
 *  @param finishHandler SDK的授权状态，如果SDK未授权或者之前授权不成功，将不会返回边缘检测结果和识别结果
 *
 */
- (void) constructResourcesWithAppKey:(NSString *) appKey
                            subAppkey:(NSString *) subAppKey
                        finishHandler:(ConstructResourcesFinishHandler) finishHandler;

/**
 *  检测图像边缘
 *
 *  @param image : 需要检查的图像
 *  @param finishHandler : 返回具体坐标方位
 *
 *  @return SDK的授权状态，如果SDK未授权或者之前授权不成功，将不会返回边缘检测结果和识别结果
 *
 */
- (ISOpenSDKStatus) detectBorderWithImage:(UIImage *) image
                            finishHandler:(DetectImageFinishHandler) finishHandler;


/**
 *
 *  图像切边、增强处理
 *
 *  @param image ：需要进行切边的图像
 *  @param borderPoints ： 根据 ISCropEditView 中 pointsTransformedInImage 输出的坐标点为准
 *  @param maxSize ：最大边缘设置
 *  @param enhanceMode ： 是否需要进行增强处理，请参考ISImageEnhanceMode
 *  @param finishHandler ： 返回切边、增强后图像
 *
 *  @return SDK的授权状态，如果SDK未授权或者之前授权不成功，将不会返回边缘检测结果和识别结果
 *
 */
- (ISOpenSDKStatus) processImage:(UIImage *) image
                withBorderPoints:(NSArray *) borderPoints
                         maxSize:(CGFloat) size
                     enhanceMode:(ISImageEnhanceMode) enhanceMode
                   finishHandler:(RecognizeImageFinishHandler) finishHandler;

/**
 *  图像增强
 *  @param  proecessImage ： 需要增强图像
 *  @param  enhanceMode ： 增强模式，请参考ISImageEnhanceMode
 *  @param  finishHandler ： 返回增强后图像
 *
 *  @return SDK的授权状态，如果SDK未授权或者之前授权不成功，将不会返回边缘检测结果和识别结果
 *
 */
- (ISOpenSDKStatus )enhanceImage:(UIImage *)proecessImage
                     enhanceMode:(ISImageEnhanceMode )enhanceMode
                   finishHandler:(RecognizeImageFinishHandler) finishHandler;

/*
 * 释放SDK资源
 *
 */
- (void) destructResources;

@end
