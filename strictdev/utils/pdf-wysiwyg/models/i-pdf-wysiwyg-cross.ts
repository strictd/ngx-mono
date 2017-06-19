// import { IPaperworkItem } from './i-paperwork-item';
import { ToolUtils } from '../providers/tool-utils';

export class IPdfWysiwygCross {
  public x: number; // X mouse coord
  public y: number; // Y mouse coord
  public h: number; // Item Height
  public w: number; // Item Width

  public pT: number;
  public pR: number;
  public pB: number;
  public pL: number;

  public stroke: number; // ctx.lineWidth
  public selected: boolean;

  public get val() {
    return { selected: this.selected };
  }
  public set val(v: any) {
    this.selected = v.selected;
  }

  constructor(item) {
    this.x = item.x || ((item.x === 0) ? 0 : 5);
    this.y = item.y || ((item.y === 0) ? 0 : 5);
    this.w = item.w || ((item.w === 0) ? 0 : 15);
    this.h = item.h || ((item.h === 0) ? 0 : 15);

    this.pT = item.pT || ((item.pT === 0) ? 0 : 5);
    this.pR = item.pR || ((item.pR === 0) ? 0 : 5);
    this.pB = item.pB || ((item.pB === 0) ? 0 : 5);
    this.pL = item.pL || ((item.pL === 0) ? 0 : 5);

    this.stroke = item.stroke || ((item.stroke === 0) ? 0 : 3);
    this.selected = item.selected || false;

    ToolUtils.cleanCoords(this);
  }



  /**
   * Canvas Hooks
   */
  public draw(ctx, selected = false, scale = 1, _showInfo?: string) {
    const x = this.x * scale,
          y = this.y * scale,
          h = this.h * scale,
          w = this.w * scale,
          pR = this.pR * scale,
          pL = this.pL * scale,
          pT = this.pT * scale,
          pB = this.pB * scale,

          stroke = this.stroke * scale,

          halfW = (w / 2),
          halfH = (h / 2),
          lineW = stroke || 1,

          nX = x - halfW - (lineW / 2),
          nY = y - halfH - (lineW / 2),
          nW = w + lineW + pR + pL,
          nH = h + lineW + pT + pB;


    if (selected) {
      ctx.strokeStyle = '#FF3333';
      ctx.fillStyle = 'rgba(255, 30, 30, 0.25)';
    } else {
      ctx.strokeStyle = '#33FF33';
      ctx.fillStyle = 'rgba(30, 255, 30, 0.25)';
    }

    ctx.lineWidth = 1;
    ctx.fillRect(nX - pL, nY - pT, nW, nH);
    ctx.strokeRect(nX - pL, nY - pT, nW, nH);

    if (this.selected) {
      ctx.lineWidth = lineW;
      ctx.beginPath();
      ctx.moveTo(x - halfW, y - halfH);
      ctx.lineTo(x + halfW, y + halfH);
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(x + halfW, y - halfH);
      ctx.lineTo(x - halfW, y + halfH);
      ctx.stroke();
    }

  }

  public hasCollision(x: number, y: number): boolean {
    const halfW = (this.w / 2),
          halfH = (this.h / 2),
          lineW = this.stroke || 1,

          left = this.x - halfW - (lineW / 2) - this.pL,
          right = left + this.w + lineW + this.pR + this.pL,
          top = this.y - halfH - (lineW / 2) - this.pT,
          bottom = top + this.h + lineW + this.pT + this.pB;

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




  /**
   * PDF Hooks
   */
  public writePDF(doc, scale) {
    const x = this.x * scale,
          y = this.y * scale,
          h = this.h * scale,
          w = this.w * scale,
          stroke = this.stroke * scale;

    if (!this.selected) { return; }

    const fTop = y - (h / 2);
    const fLeft = x - (w / 2);
    const fBottom = fTop + h;
    const fRight = fLeft + w;

    doc.lineWidth(stroke);
    doc.moveTo(fLeft, fTop).lineTo(fRight, fBottom).stroke();
    doc.moveTo(fLeft, fBottom).lineTo(fRight, fTop).stroke();

  }
}
