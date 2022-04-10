import {ICanvasRectangleObject} from '../types';

export default function rectangleCollisionDetectionY(
  canvasRectangleObjectOne: ICanvasRectangleObject,
  canvasRectangleObjectTwo: ICanvasRectangleObject,
): boolean {
  const canvasObjectOneBottomEdge = canvasRectangleObjectOne.position.y + canvasRectangleObjectOne.height;

  const canvasObjectTwoTopEdge = canvasRectangleObjectTwo.position.y;

  const canvasObjectOneBottomEdgeWithVelocityY = canvasObjectOneBottomEdge + canvasRectangleObjectOne.velocity.y;

  if (canvasObjectOneBottomEdge <= canvasObjectTwoTopEdge
    && canvasObjectOneBottomEdgeWithVelocityY >= canvasObjectTwoTopEdge) {
    return true;
  }
  return false;
}
