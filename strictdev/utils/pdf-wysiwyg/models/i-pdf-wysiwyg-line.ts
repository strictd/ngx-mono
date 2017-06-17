// import { IPaperworkItem } from './i-paperwork-item';
import { ToolUtils } from '../providers/tool-utils';

export class IPdfWysiwygLine {
  public x: number; // X mouse coord
  public y: number; // Y mouse coord
  public h: number; // Item Height
  public w: number; // Item Width

  public stroke: number; // ctx.lineWidth

  constructor(item) {
    this.x = item.x || ((item.x === 0) ? 0 : 5);
    this.y = item.y || ((item.y === 0) ? 0 : 5);
    this.w = item.w || ((item.w === 0) ? 0 : 15);
    this.h = item.h || ((item.h === 0) ? 0 : 15);

    this.stroke = item.stroke || ((item.stroke === 0) ? 0 : 3);

    ToolUtils.cleanCoords(this);
  }



  /**
   * Canvas Hooks
   */
  public draw(ctx, selected = false, _showInfo?: string) {
    const lineW = this.stroke || 1,
          x = this.x,
          y = this.y,
          nX = this.w + this.x,
          nY = this.h + this.y;


    if (selected) {
      ctx.strokeStyle = '#FF3333';
      ctx.fillStyle = 'rgba(255, 30, 30, 0.25)';
    } else {
      ctx.strokeStyle = '#33FF33';
      ctx.fillStyle = 'rgba(30, 255, 30, 0.25)';
    }

/*    ctx.lineWidth = 1;
    ctx.fillRect(x, nY - this.pT, nW, nH);
    ctx.strokeRect(nX - this.pL, nY - this.pT, nW, nH);
*/

    ctx.lineWidth = lineW;
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(nX, nY);
    ctx.stroke();

  }

  public hasCollision(x: number, y: number): boolean {
    const halfW = (this.w / 2),
          halfH = (this.h / 2),
          lineW = this.stroke || 1,

          left = this.x - halfW - (lineW / 2),
          right = left + this.w + lineW,
          top = this.y - halfH - (lineW / 2),
          bottom = top + this.h + lineW;

    return (right >= x && left <= x && bottom >= y && top <= y);
  }





  /**
   * Dragging Hooks
   */
  public checkSwapBRTR(_x: number, y: number): boolean {
    return (y < this.y);
  }
  public checkSwapBRBL(x: number, _y: number): boolean {
    return (x < this.x);
  }
  public checkSwapTRBR(_x: number, y: number): boolean {
    return (y > (this.y + this.h));
  }
  public checkSwapTRTL(x: number, _y: number): boolean {
    return (x < this.x);
  }
  public checkSwapBLTL(_x: number, y: number): boolean {
    return (y < this.y);
  }
  public checkSwapBLBR(x: number, _y: number): boolean {
    return (x > (this.x + this.w));
  }
  public checkSwapTLBL(_x: number, y: number): boolean {
    return (y > (this.y + this.h));
  }
  public checkSwapTLTR(x: number, _y: number): boolean {
    return (x > (this.x + this.w));
  }



  public checkHandle_TL(x: number, y: number): boolean {
    if (ToolUtils.checkCloseEnough(x, this.x, this.w) &&
        ToolUtils.checkCloseEnough(y, this.y, this.h)
    ) { return true; }
  return false;
  }
  public checkHandle_TR(x: number, y: number): boolean {
    if (ToolUtils.checkCloseEnough(x, this.x + this.w, this.w) &&
        ToolUtils.checkCloseEnough(y, this.y, this.h)
    ) { return true; }
  return false;
  }
  public checkHandle_BL(x: number, y: number): boolean {
    if (ToolUtils.checkCloseEnough(x, this.x, this.w) &&
        ToolUtils.checkCloseEnough(y, this.y + this.h, this.h)
    ) { return true; }
  return false;
  }
  public checkHandle_BR(x: number, y: number): boolean {
    if (ToolUtils.checkCloseEnough(x, this.x + this.w, this.w) &&
        ToolUtils.checkCloseEnough(y, this.y + this.h, this.h)
    ) { return true; }
  return false;
  }



  public updateDragTL(x: number, y: number): any {
    this.w += (this.x - (this.w / 2)) - x;
    this.h += (this.y - (this.h / 2)) - y;
  }
  public updateDragTR(x: number, y: number): any {
    this.w = Math.abs((this.x - (this.w / 2)) - x);
    this.h += (this.y - (this.h / 2)) - y;
  }
  public updateDragBL(x: number, y: number): any {
    this.w += (this.x - (this.w / 2)) - x;
    this.h = Math.abs((this.y - (this.h / 2)) - y);
  }
  public updateDragBR(x: number, y: number): any {
    this.w = Math.abs((this.x - (this.w / 2)) - x);
    this.h = Math.abs((this.y - (this.h / 2)) - y);
  }




  /**
   * PDF Hooks
   */
  public writePDF(doc, convCalc) {
    const fX = ((((this.x + 1) / convCalc) / 96 ) * 72);
    const fY = ((((this.y + 1) / convCalc) / 96 ) * 72);
    const fW = (((this.w / convCalc) / 96 ) * 72);
    const fH = (((this.h / convCalc) / 96 ) * 72);

    const fTop = fY - (fH / 2);
    const fLeft = fX - (fW / 2);
    const fBottom = fTop + fH;
    const fRight = fLeft + fW;

    doc.lineWidth(this.stroke / 2);
    doc.moveTo(fLeft, fTop).lineTo(fRight, fBottom).stroke();
    doc.moveTo(fLeft, fBottom).lineTo(fRight, fTop).stroke();

  }
}
