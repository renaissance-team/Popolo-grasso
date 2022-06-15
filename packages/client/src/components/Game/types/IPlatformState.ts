import {ICanvasRectangleObject} from './ICanvasRectangleObject';

export interface IPlatformState extends ICanvasRectangleObject {
  playerOnThePlatform: boolean;
  crystall?: {
    offset: {
      x: number;
      y: number;
    };
    width: number,
    height: number,
  };
}
