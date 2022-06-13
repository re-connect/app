//
//  ISCropImageViewController.h
//  ISImageProcessSDK
//
//  Created by Simon Liu on 2017/7/24.
//  Copyright © 2017年 xzliu. All rights reserved.
//

#import <UIKit/UIKit.h>
#import <ISOpenSDKFoundation/ISOpenSDKFoundation.h>


@class ISCropImageViewController;
@protocol ISCropImageViewControllerDelegate <NSObject>

@optional
/*
 * 将图像切边增强后返回
 */
- (void) ISCropImageViewControllerDidFinishDewarpImage:(UIImage *) resultImage;
@end


typedef NS_ENUM(NSInteger, ISImageProcessEnhanceMode)
{
    ISImageProcessEnhanceModeAllMode = -2, //全部模式
    ISImageProcessEnhanceModeAuto = -1, //自动
    ISImageProcessEnhanceModeOriginal = 0, //原图
    ISImageProcessEnhanceModeNormal = 1, //增亮
    ISImageProcessEnhanceModeMagicColor = 2, //增强并锐化
    ISImageProcessEnhanceModeBlackAndWhite = 3, //黑白
    ISImageProcessEnhanceModeGray = 4, //灰度
    ISImageProcessEnhanceModeNone = NSNotFound,
};


typedef void(^ISCropImageRecognizeImageFinishHandler)(UIImage *resultImage);
typedef void(^ISCropImageSaveImageFinishHandler)(NSString *localPath);
typedef void(^ConstructResourcesFinishHandler)(ISOpenSDKStatus status);


@interface ISCropImageViewController : UIViewController

@property (nonatomic, weak) id <ISCropImageViewControllerDelegate> delegate;
@property (nonatomic, assign) BOOL debugMode;//开启debug log

/**
 * Init方法，设置控制器信息
 * @param navigationBarTintColorIS : 导航栏颜色
 * @param bottomToolBarColor : 底部工具栏颜色
 * @param navTitle : 标题
 * @param navTitleColor : 标题颜色
 */

- (instancetype ) initWithNavigationBarTintCorlor:(UIColor *)navigationBarTintColorIS
                               bottomToolBarColor:(UIColor *)bottomToolBarColor
                                  navigationTitle:(NSString *)navTitle
                             navigationTitleColor:(UIColor *)navTitleColor;

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
 *  检测图像边缘是否可以作为切边增强图片
 *
 *  @param image : 传入所需要进行处理图片
 *  @param enhanceMode : 对图像输出后模式选择，请参考ISCropImageEnhanceMode
 *  @param maxSize  ：最大边缘设置
 *  @return SDK的授权状态，如果SDK未授权或者之前授权不成功，将不会对图片进行切边处理
 *
 */
- (ISOpenSDKStatus) detectBorderWithCropImage:(UIImage *) image
                                  enhanceMode:(ISImageProcessEnhanceMode ) enhanceMode
                                      maxSize:(CGFloat) size;


/**
 *  自动打开相机进行拍照
 *
 *  @param enhanceMode : 对拍照图像输出后模式选择，请参考ISCropImageEnhanceMode
 *  @param maxSize  ：最大边缘设置
 *  @return SDK的授权状态，如果SDK未授权或者之前授权不成功，将不会对图片进行切边处理
 *
 */
- (ISOpenSDKStatus) takePictureEnhanceMode:(ISImageProcessEnhanceMode ) enhanceMode
                                   maxSize:(CGFloat) size;


/**
 *  保存图像方式
 *  @param localPath 输出将图像保存的到沙盒路径地址；沙盒目录分为：“Document、Cache、Libaray”，请根据自身要求将图像保存到不同目录下方；
 *
 *  @param imageName 保存图像名称，用于从沙盒中获取图像时候使用；
 *
 *  @return BOOL=YES（保存成功），BOOL=NO（保存失败）
 */
- (BOOL) saveImageLocalPath:(NSString *)localPath withImageName:(NSString *)imageName;


- (NSString *)getSDKVersion;

@end
