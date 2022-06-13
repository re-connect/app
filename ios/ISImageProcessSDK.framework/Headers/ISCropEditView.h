//
//  ISCropEditView.h
//  ISImageProcessSDK
//
//  Created by Simon Liu on 17/3/13.
//  Copyright © 2017年 xzliu. All rights reserved.
//

#import <UIKit/UIKit.h>

@class ISCropEditView;

@protocol ISCropEditViewDelegate <NSObject>

@optional

- (void) cropEditViewTouchDidBegin:(ISCropEditView *) cropEditView;//trigger when touch begin
- (void) cropEditViewTouchDidEnd:(ISCropEditView *) cropEditView;//trigger when touch end

@end

@interface ISCropEditView : UIView

@property (nonatomic, assign) CGRect border;
@property (nonatomic, strong) UIImage *originImage;
@property (nonatomic, weak) id<ISCropEditViewDelegate> delegate;

- (id) initWithFrame:(CGRect) frame//the frame of the view
              border:(CGRect) border//the max border of the view
         originImage:(UIImage *) originImage//the image you want to crop
            delegate:(id<ISCropEditViewDelegate>) delegate;//the delegate

- (void) setupPointViewWithNormalLineColor:(UIColor *) normalLineColor//default is greenColor
                            errorLineColor:(UIColor *) errorLineColor//default is redColor
                            pointFillColor:(UIColor *) pointFillColor//default is whiteColor
                          pointStrokeColor:(UIColor *) pointStrokeColor;//default is greenColor

- (void) setPointBounds:(NSArray *) pointsArray//set the crop pointViews position
        withOriginPoint:(BOOL) withOriginPoint;//if set to YES, will transform to fit the crop edit view

- (void) selectAll;//select full rect

- (NSArray *) pointsinCropEditView;//points that you move in the crop edit view

- (NSArray *) pointsTransformedInImage;//points that transform to image size

- (BOOL) canCrop;//return if the points is valid

@end
