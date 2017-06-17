// import { IPaperworkItem } from './i-paperwork-item';
import { ToolUtils } from '../providers/tool-utils';

export class IPdfWysiwygTextbox {
  public x: number; // X mouse coord
  public y: number; // Y mouse coord
  public h: number; // Item Height
  public w: number; // Item Width

  public pT: number;
  public pR: number;
  public pB: number;
  public pL: number;

  private _txt: string;
  public set txt(t) { this._txt = t; }
  public get txt() {
    if (this.textTransform === 'uppercase') {
      return this._txt.toUpperCase();
    } else if (this.textTransform === 'lowercase') {
      return this._txt.toLowerCase();
    } else {
      return this._txt;
    }
  }
  public get val() {
    return { txt: this.txt };
  }
  public set val(v: any) {
    this.txt = v.txt;
  }

  public fontSize: number;
  public fontStyle: string;
  public maxlength: number;
  public options: any;
  public alignment: string;
  public spacing: number;
  public required: boolean;
  public textTransform?: string;
  public overflow?: string;
  public border?: string;
  public transform?: string;
  public boxShadow?: string;
  public shadeEntireArea?: boolean;

  constructor(item) {
    this.x = item.x || ((item.x === 0) ? 0 : 5);
    this.y = item.y || ((item.y === 0) ? 0 : 5);
    this.w = item.w || ((item.w === 0) ? 0 : 300);
    this.h = item.h || ((item.h === 0) ? 0 : 35);

    this.pT = item.pT || ((item.pT === 0) ? 0 : 0);
    this.pR = item.pR || ((item.pR === 0) ? 0 : 0);
    this.pB = item.pB || ((item.pB === 0) ? 0 : 0);
    this.pL = item.pL || ((item.pL === 0) ? 0 : 0);

    this.txt = item._txt || '';
    this.fontSize = item.fontSize || ((item.pL === 0) ? 0 : 15);
    this.fontStyle = item.fontStyle || 'Courier';
    this.options = item.options || {};
    this.alignment = item.alignment || 'left';
    this.spacing = item.spacing || 0;
    this.overflow = item.overflow || '';
    this.maxlength = item.maxlength || '';
    this.textTransform = item.textTransform || 'inherit';
    this.required = item.required || false;
    this.shadeEntireArea = item.shadeEntireArea || true;

    ToolUtils.cleanCoords(this);
  }



  /**
   * Canvas Hooks
   */
  public draw(ctx, selected = false, scale = 1, showInfo?: string) {
    // if (this.field !== void 0) { return; }
    const x = this.x * scale,
          y = this.y * scale,
          h = this.h * scale,
          w = this.w * scale;

    if (selected) {
      ctx.strokeStyle = '#FF3333';
      ctx.fillStyle = 'rgba(255, 30, 30, 0.25)';
    } else {
      ctx.strokeStyle = '#33FF33';
      ctx.fillStyle = 'rgba(30, 255, 30, 0.25)';
    }

    ctx.lineWidth = 1;
    ctx.fillRect(x, y, w, h);
    ctx.strokeRect(x, y, w, h);

    if (showInfo === 'coords') { this.writeCorners(ctx, scale);
    } else if (showInfo === 'text') { this.writeWords(ctx, scale);
    }

  }

  public hasCollision(x: number, y: number): boolean {
    const left = this.x,
          right = this.x + this.w,
          top = this.y,
          bottom = this.y + this.h;

    return (right >= x && left <= x && bottom >= y && top <= y);
  }




  /**
   * Dragging Hooks
   */
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

  public updateDragTL(x: number, y: number): void {
    this.w += this.x - x;
    this.h += this.y - y;
    this.x = x;
    this.y = y;
  }
  public updateDragTR(x: number, y: number): void {
    this.w = Math.abs(this.x - x);
    this.h += this.y - y;
    this.y = y;
  }
  public updateDragBL(x: number, y: number): void {
    this.w += this.x - x;
    this.h = Math.abs(this.y - y);
    this.x = x;
  }
  public updateDragBR(x: number, y: number): void {
    this.w = Math.abs(this.x - x);
    this.h = Math.abs(this.y - y);
  }



  /**
   * PDF Hooks
   */
  public writePDF(doc, scale = 1) {
    const x = this.x * scale,
          y = this.y * scale,
          w = this.w * scale,
          pL = this.pL * scale,
          pR = this.pR * scale,
          pT = this.pT * scale,
          fontSize = this.fontSize * scale,
          spacing = this.spacing * scale;
          
    let opts: any = { width: w - pL - pR };
    if (this.options) { opts = Object.assign({}, opts, this.options); }
    opts.align = this.alignment;

    if (this.spacing) {
      opts.characterSpacing = spacing;
    }

    const txt = ToolUtils.trimString(doc, 'pdf', this.txt, w - pL - pR);

    let font = this.fontStyle;
    if (font === 'Times') { font += '-Roman'; }

    doc.font(font);
    doc.fontSize(fontSize);
    doc.text(txt, x + pL, y + pT + (fontSize / 4), opts);
  }




  /**
   * Private Class Functions
   */
  private writeCorners(ctx, scale = 1) {
    const x = this.x * scale,
          y = this.y * scale,
          h = this.h * scale,
          w = this.w * scale;

    ctx.font = '8px Arial';
    ctx.textAlign = 'left';
    ctx.fillStyle = '#000000';
    ctx.fillText(`${x}, ${y}`, x + 5, y + 10);
    ctx.fillText(`${x}, ${y + h}`, x + 5, (y + h) - 2);

    ctx.textAlign = 'right';
    ctx.fillText(`${x + w}, ${y}`, (x + w) - 2, y + 10);
    ctx.fillText(`${x + w}, ${y + h}`, (x + w) - 2, (y + h) - 2);

    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(`${w} x ${h}`, (w / 2) + x, (h / 2) + y);
  }

  private writeWords(ctx, scale = 1) {
    // const txt = this.txt || '';
    const x = this.x * scale,
          y = this.y * scale,
          // h = this.h * scale,
          w = this.w * scale,
          pL = this.pL * scale,
          pR = this.pR * scale,
          pT = this.pT * scale,
          // pB = this.pB * scale,
          fontSize = this.fontSize * scale,
          spacing = this.spacing * scale;


    // Default Left alignment
    let writeX = x + pL;
    const writeY = y + pT; // + fontSize;

    if (this.alignment === 'center') {
      writeX = x + (w / 2) + pL;
    } else if (this.alignment === 'right') {
      writeX = x + w - pR;
    }

    ctx.lineBreak = false;
    ctx.ellipsis = true;

    let font = this.fontStyle;
    if (font === 'Times') { font += '-Roman'; }
    ctx.font = `${fontSize}px ${font}`;

    ctx.textAlign = this.alignment;
    ctx.fillStyle = '#000000';
    ctx.textBaseline = 'top';

    const txt = ToolUtils.trimString(ctx, 'canvas', this.txt, w - pL - pR, (this.alignment === 'right'));

    // ctx.fillText(ToolUtils.trimString(ctx, 'canvas', this.txt, w - pL - pR, (this.alignment === 'right')), writeX, writeY);
    if (this.spacing) {
      this.fillTextWithSpacing(ctx, txt, writeX, writeY, spacing);
    } else {
      ctx.fillText(txt, writeX, writeY);
    }
  }

  private fillTextWithSpacing(ctx, txt, x, y, spacing) {
    // Start at position (X, Y).
    // Measure wAll, the width of the entire string using measureText()
    let wAll = ctx.measureText(txt).width;

    do {
      // Remove the first character from the string
      const char = txt.substr(0, 1);
      txt = txt.substr(1);
      let wShorter = 0;

      // Print the first character at position (X, Y) using fillText()
      ctx.fillText(char, x, y);

      // Measure wShorter, the width of the resulting shorter string using measureText().
      if (txt === '') {
        wShorter = 0;
      } else {
        wShorter = ctx.measureText(txt).width;
      }

      // Subtract the width of the shorter string from the width of the entire string, giving the kerned width of the character, wChar = wAll - wShorter
      const wChar = wAll - wShorter;

      // Increment X by wChar + spacing
      x += wChar + spacing;

      // wAll = wShorter
      wAll = wShorter;

    // Repeat from step 3
    } while (txt !== '');
  }
}
