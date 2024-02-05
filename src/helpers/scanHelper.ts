import { RectangleCoordinates } from '../types/Crop';

const viewXCoordinateToImageCoordinate = (value: number, imageWidth: number): number => (value / 100) * imageWidth;

const viewYCoordinateToImageCoordinate = (value: number, imageHeight: number): number => (value / 100) * imageHeight;

export const getInitialCropCoordinates = (width: number, height: number): RectangleCoordinates => ({
  bottomLeft: {
    x: viewXCoordinateToImageCoordinate(10, width),
    y: viewYCoordinateToImageCoordinate(90, height),
  },
  bottomRight: {
    x: viewXCoordinateToImageCoordinate(90, width),
    y: viewYCoordinateToImageCoordinate(90, height),
  },
  topRight: {
    x: viewXCoordinateToImageCoordinate(90, width),
    y: viewYCoordinateToImageCoordinate(10, height),
  },
  topLeft: {
    x: viewXCoordinateToImageCoordinate(10, width),
    y: viewYCoordinateToImageCoordinate(10, height),
  },
});
