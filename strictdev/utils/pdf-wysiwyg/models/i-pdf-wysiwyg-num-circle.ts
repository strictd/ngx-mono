// import { IPaperworkItem } from './i-paperwork-item';
import { ToolUtils } from '../providers/tool-utils';

export class IPdfWysiwygNumCircle {
  public x: number; // X mouse coord
  public y: number; // Y mouse coord
  public r: number; // Item Radius

  public pT: number;
  public pR: number;
  public pB: number;
  public pL: number;

  public stroke: number; // ctx.lineWidth
  public selected: boolean;
  public id: string;
  public fontsize: number;

  constructor(item) {
    this.x = item.x || ((item.x === 0) ? 0 : 5);
    this.y = item.y || ((item.y === 0) ? 0 : 5);
    this.r = item.r || ((item.r === 0) ? 0 : 20);

    this.pT = item.pT || 0;
    this.pR = item.pR || 0;
    this.pB = item.pB || 0;
    this.pL = item.pL || 0;

    this.stroke = item.stroke || ((item.stroke === 0) ? 0 : 3);
    this.selected = item.selected || false;
    this.id = item.id || 'X';

    ToolUtils.cleanCoords(this);
  }



  /**
   * Canvas Hooks
   */
  public draw(ctx, selected = false, _showInfo?: string) {
    const lineW = this.stroke || 1,

          x = this.x,
          y = this.y,
          r = this.r,
          nW = (this.r * 2) + lineW + this.pR + this.pL,
          nH = (this.r * 2) + lineW + this.pT + this.pB;


    if (selected) {
      ctx.strokeStyle = '#FF3333';
      ctx.fillStyle = 'rgba(255, 30, 30, 0.25)';
    } else {
      ctx.strokeStyle = '#33FF33';
      ctx.fillStyle = 'rgba(30, 255, 30, 0.25)';
    }

    ctx.lineWidth = 1;
    ctx.fillRect(x - r - this.pL, y - r - this.pT, nW, nH);
    ctx.strokeRect(x - r - this.pL, y - r - this.pT, nW, nH);

    ctx.beginPath();
    ctx.lineWidth = this.stroke;
    ctx.strokeStyle = 'red';
    ctx.arc(this.x, this.y, this.r, 0, 2 * Math.PI);
    ctx.stroke();
    ctx.font = '20px Georgia';
    ctx.fillStyle = 'red';
    ctx.textAlign = 'center';
    ctx.fillText(this.id, this.x, this.y + 10);

  }

  public hasCollision(x: number, y: number): boolean {
    const lineW = this.stroke || 1,

          left = this.x - this.r - (lineW / 2) - this.pL,
          right = this.x + this.r + lineW + this.pR,
          top = this.y - this.r - (lineW / 2) - this.pT,
          bottom = this.y + this.r + lineW + this.pB;

    return (right >= x && left <= x && bottom >= y && top <= y);
  }





  /**
   * Dragging Hooks
   */
/*
  public checkSwapBRTR(x: number, y: number): boolean {
    return (y < this.y);
  }
  public checkSwapBRBL(x: number, y: number): boolean {
    return (x < this.x);
  }
  public checkSwapTRBR(x: number, y: number): boolean {
    return (y > (this.y + this.h));
  }
  public checkSwapTRTL(x: number, y: number): boolean {
    return (x < this.x);
  }
  public checkSwapBLTL(x: number, y: number): boolean {
    return (y < this.y);
  }
  public checkSwapBLBR(x: number, y: number): boolean {
    return (x > (this.x + this.w));
  }
  public checkSwapTLBL(x: number, y: number): boolean {
    return (y > (this.y + this.h));
  }
  public checkSwapTLTR(x: number, y: number): boolean {
    return (x > (this.x + this.w));
  }



  public checkHandle_TL(x: number, y: number): boolean {
    if (ToolUtils.checkCloseEnough(x, this.x - (this.w / 2), this.w) &&
        ToolUtils.checkCloseEnough(y, this.y - (this.h / 2), this.h)
    ) { return true; }
  return false;
  }
  public checkHandle_TR(x: number, y: number): boolean {
    if (ToolUtils.checkCloseEnough(x, this.x + (this.w / 2), this.w) &&
        ToolUtils.checkCloseEnough(y, this.y - (this.h / 2), this.h)
    ) { return true; }
  return false;
  }
  public checkHandle_BL(x: number, y: number): boolean {
    if (ToolUtils.checkCloseEnough(x, this.x - (this.w / 2), this.w) &&
        ToolUtils.checkCloseEnough(y, this.y + (this.h / 2), this.h)
    ) { return true; }
  return false;
  }
  public checkHandle_BR(x: number, y: number): boolean {
    if (ToolUtils.checkCloseEnough(x, this.x + (this.w / 2), this.w) &&
        ToolUtils.checkCloseEnough(y, this.y + (this.h / 2), this.h)
    ) { return true; }
  return false;
  }



  public updateDragTL(x: number, y: number): any {
    this.w += (this.x - (this.w / 2)) - x;
    this.h += (this.y - (this.h / 2)) - y;
  }
  public updateDragTR(x: number, y: number): any {
    this.w = Math.abs((this.x - (this.w / 2) + this.pL) - x);
    this.h += (this.y - (this.h / 2)) - y;
  }
  public updateDragBL(x: number, y: number): any {
    this.w += (this.x - (this.w / 2) + this.pL) - x;
    this.h = Math.abs((this.y - (this.h / 2)) - y);
  }
  public updateDragBR(x: number, y: number): any {
    this.w = Math.abs((this.x - (this.w / 2)) - x);
    this.h = Math.abs((this.y - (this.h / 2)) - y);
  }
*/



  /**
   * PDF Hooks
   */
/*
  public writePDF(doc,convCalc) {
    if (!this.selected) { return; }

    const fX = ((((this.x + 1) / convCalc) / 96 ) * 72);
    const fY = ((((this.y + 1) / convCalc) / 96 ) * 72);
    const fW = (((this.w / convCalc) / 96 ) * 72);
    const fH = (((this.h / convCalc) / 96 ) * 72);

    const fTop = fY - (fH / 2) + topPadding;
    const fLeft = fX - (fW / 2);
    const fBottom = fTop + fH;
    const fRight = fLeft + fW;

    doc.lineWidth(this.stroke / 2);
    doc.moveTo(fLeft, fTop).lineTo(fRight, fBottom).stroke();
    doc.moveTo(fLeft, fBottom).lineTo(fRight, fTop).stroke();

  }
*/
}
