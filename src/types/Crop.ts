export type Coordinate = Record<'x' | 'y', number>;
type Corner = 'bottomLeft' | 'bottomRight' | 'topRight' | 'topLeft';
export type RectangleCoordinates = Record<Corner, Coordinate>;
