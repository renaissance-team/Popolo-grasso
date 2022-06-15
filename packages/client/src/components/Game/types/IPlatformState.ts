import {ICanvasRectangleObject} from './ICanvasRectangleObject';

export interface ICrystallObject {
  image: HTMLImageElement,
  width: number,
  height: number,
  score: number,
}
export interface IPlatformState extends ICanvasRectangleObject {
  playerOnThePlatform: boolean;
  crystall?: ICrystallObject & {
    offset: {
      x: number;
      y: number;
    };
  };
}
