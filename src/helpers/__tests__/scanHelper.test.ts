import { getInitialCropCoordinates } from '../scanHelper';

describe('getInitialCropCoordinates', (): void => {
  it('Should return a 100 unit based initial coordinates if image is a 100px square', (): void => {
    const imageWidth = 100;
    const imageHeight = 100;
    const imageCoordinates = getInitialCropCoordinates(imageWidth, imageHeight);

    expect(imageCoordinates.bottomLeft.x).toEqual(10);
    expect(imageCoordinates.bottomLeft.y).toEqual(90);
    expect(imageCoordinates.bottomRight.x).toEqual(90);
    expect(imageCoordinates.bottomRight.y).toEqual(90);
    expect(imageCoordinates.topLeft.x).toEqual(10);
    expect(imageCoordinates.topLeft.y).toEqual(10);
    expect(imageCoordinates.topRight.x).toEqual(90);
    expect(imageCoordinates.topRight.y).toEqual(10);
  });

  it('Should return a rectangle unit based initial coordinates if image is not square', (): void => {
    const imageWidth = 50;
    const imageHeight = 100;
    const imageCoordinates = getInitialCropCoordinates(imageWidth, imageHeight);

    expect(imageCoordinates.bottomLeft.x).toEqual(5);
    expect(imageCoordinates.bottomLeft.y).toEqual(90);
    expect(imageCoordinates.bottomRight.x).toEqual(45);
    expect(imageCoordinates.bottomRight.y).toEqual(90);
    expect(imageCoordinates.topLeft.x).toEqual(5);
    expect(imageCoordinates.topLeft.y).toEqual(10);
    expect(imageCoordinates.topRight.x).toEqual(45);
    expect(imageCoordinates.topRight.y).toEqual(10);
  });
});
