import {ICanvasRectangleObject} from './ICanvasRectangleObject';

export interface IPlayerState extends ICanvasRectangleObject {
  score: number,
  onTheBasePlatform: boolean,
  onThePlatform: boolean,
  frame: number,
  sprites: {
    currentSprite: HTMLImageElement,
    walkRightSprite: HTMLImageElement,
    walkLeftSprite: HTMLImageElement,
    standLeftSprite: HTMLImageElement,
    standRightSprite: HTMLImageElement,
  }
}
