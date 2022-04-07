import {ICanvasRectangleObject} from '../types';

export default function rectangleCollisionDetectionX(
  canvasRectangleObjectOne: ICanvasRectangleObject,
  canvasRectangleObjectTwo: ICanvasRectangleObject,
): boolean {
  const canvasObjectOneRightEdge = canvasRectangleObjectOne.position.x + canvasRectangleObjectOne.width;

  const canvasObjectTwoRightEdge = canvasRectangleObjectTwo.position.x + canvasRectangleObjectTwo.width;

  const canvasObjectOneLeftEdge = canvasRectangleObjectOne.position.x;

  const canvasObjectTwoLeftEdge = canvasRectangleObjectTwo.position.x;

  if (canvasObjectOneRightEdge >= canvasObjectTwoLeftEdge
    && canvasObjectOneLeftEdge <= canvasObjectTwoRightEdge) {
    return true;
  }
  return false;
}
