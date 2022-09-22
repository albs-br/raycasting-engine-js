export default class Player {
  public X: number; // 4.4 fixed point (map cell.position inside cell)
  public Y: number; // same as X
  public Angle: number; // 0-359, later will be 0-511

  // public constructor(ctx: object) {
  //   this.c = ctx;
  // }

  public getAngle(): number {
    return this.Angle;
  }

  public setAngle(angle: number): void {
    if (angle >= 360) angle = 0;
    if (angle < 0) angle = 359;
    this.Angle = angle;
  }
}
