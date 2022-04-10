import {ICanvasRectangleObject} from './ICanvasRectangleObject';

export interface IPlayerState extends ICanvasRectangleObject {
  score: number,
  onTheBasePlatform: boolean,
}
