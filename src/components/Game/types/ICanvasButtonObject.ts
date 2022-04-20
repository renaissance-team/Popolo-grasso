export interface ICanvasButtonObject {
  title: string,
  onClick:() => void,
  position: {
    x: number,
    y: number,
  },
  width: number,
  height: number,
}
