export default class Player {
  public X: number; // 4.4 fixed point (map cell.position inside cell)
  public Y: number; // same as X
  public Angle: number; // 0-359, later will be 0-511

  public c: object;    // canvas context

  // public constructor(ctx: object) {
  //   this.c = ctx;
  // }

  public getAngle(): number {
    return this.Angle;
  }

  public Draw(): string {
    const ARROW_SIZE = 16;

    // center of field of view vector
    let angle = this.Angle;
    this.c.beginPath();
    this.c.strokeStyle = 'red';
    this.c.moveTo(this.X, this.Y);
    this.c.lineTo(
      this.X + ARROW_SIZE * Math.cos((angle * Math.PI) / 180),
      this.Y + ARROW_SIZE * Math.sin((angle * Math.PI) / 180)
    );
    this.c.stroke();
    this.c.closePath();

    // start of field of view vector
    angle = this.Angle - 30;
    this.c.beginPath();
    this.c.strokeStyle = 'black';
    this.c.moveTo(this.X, this.Y);
    this.c.lineTo(
      this.X + ARROW_SIZE * 2 * Math.cos((angle * Math.PI) / 180),
      this.Y + ARROW_SIZE * 2 * Math.sin((angle * Math.PI) / 180)
    );
    this.c.stroke();
    this.c.closePath();

    // end of field of view vector
    angle = this.Angle + 30;
    this.c.beginPath();
    this.c.strokeStyle = 'black';
    this.c.moveTo(this.X, this.Y);
    this.c.lineTo(
      this.X + ARROW_SIZE * 2 * Math.cos((angle * Math.PI) / 180),
      this.Y + ARROW_SIZE * 2 * Math.sin((angle * Math.PI) / 180)
    );
    this.c.stroke();
    this.c.closePath();

    //c.strokeRect(this.X, this.Y, 100 * Math.sin((this.Angle * Math.PI) / 180), 100);
    this.c.strokeRect(this.X, this.Y, 1, 1);
  }
}
