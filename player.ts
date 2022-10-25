export default class Player {
  public X: number; // 4.4 fixed point (map cell.position inside cell)
  public Y: number; // same as X
  public Angle: number; // 0-359, later will be 0-511
  public AngleStep: number;

  public constructor(x, y, angle, angleStep) {
    this.X = x;
    this.Y = y;
    this.Angle = angle;
    this.AngleStep = angleStep;
  }

  public getAngle(): number {
    return this.Angle;
  }

  public setAngle(angle: number): void {
    if (angle >= 360) angle = 0;
    if (angle < 0) angle = 360 - this.AngleStep;
    this.Angle = angle;
  }
}
