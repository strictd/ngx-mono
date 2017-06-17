import { Injectable, OnDestroy, EventEmitter } from '@angular/core';

// import { plainToClass } from 'class-transformer';
import { Subscription } from 'rxjs/Subscription';
import { MadameAuth } from '../../../../_shared/madame/madame-auth';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { series as async_series } from 'async';

import { IPdfWysiwygNumCircle } from '../models/i-pdf-wysiwyg-num-circle';
import { IPdfWysiwygItem } from '../models/i-pdf-wysiwyg-item';
import { IPdfWysiwygTextbox } from '../models/i-pdf-wysiwyg-textbox';
import { IPdfWysiwygCross } from '../models/i-pdf-wysiwyg-cross';
import { IPdfWysiwygLine } from '../models/i-pdf-wysiwyg-line';
import { IPdfWysiwygEllipse } from '../models/i-pdf-wysiwyg-ellipse';

@Injectable()
export class PdfWysiwygService implements OnDestroy {

  canvas: any;
  ctx: any;
  editable: boolean;
  ident: string;
  ver: string;
  data_id: string;
  new_data_id: string;
  cust_id: string;
  save = true;
  svg: string;
  set inchWidth(wid: number) { this.pixelWidth = (wid * 72); }
  get inchWidth() { return (this.pixelWidth / 72); }
  set inchHeight(hei: number) { this.pixelHeight = (hei * 72); }
  get inchHeight() { return (this.pixelHeight / 72); }
  pixelWidth = 1;
  pixelHeight = 1;
  viewScale = 1;
  pdfScale = 1;
  pdfLayout = 'portrait';
  drag = false;
  closeEnough = 10;
  dragTL = false;
  dragBL = false;
  dragTR = false;
  dragBR = false;
  dragWhole = false;
  isDrag = false;
  isDown = false;
  startX: number;
  startY: number;
  hasFocus = false;
  custLock = true;

  allItems: IPdfWysiwygItem[] = [];
  activeItem: IPdfWysiwygItem = null;
  // itemsUpdated: EventEmitter<IPdfWysiwygItem[]> = new EventEmitter();

  toolType = 'textbox';
  showInfo = 'text';
  displayMode = 'input'; // 'edit', 'input'

  fontSize = 15;
  itemChanged: EventEmitter<IPdfWysiwygItem>;
  changeSub: Subscription;

  _hooks = {
    pre_save: [],
    save: [],
    post_save: [],
    autopopulate: []
  };

  toolboxDefaults = {
    'num-circle': IPdfWysiwygNumCircle,
    'textbox': IPdfWysiwygTextbox,
    'cross': IPdfWysiwygCross,
    'line': IPdfWysiwygLine,
    'ellipse': IPdfWysiwygEllipse
  };

  madame: MadameAuth;


  constructor(_madame: MadameAuth) {
    this.madame = _madame;
    this.itemChanged = new EventEmitter();
    this.changeSub = this.itemChanged.subscribe(item => this.activeItem = item);
  }

  ngOnDestroy() {
    this.changeSub.unsubscribe();
  }


  public addHook(key, hook) {
    this._hooks[key].push(hook);
  }
  public runHooks(key: string): Promise<boolean> {
    return new Promise(resolve => {
      async_series(this._hooks[key], (err) => {
        if (err) {
          resolve(false);
        } else {
          resolve(true);
        }
      });
    });
  }


  public changeItem(item) {
    this.itemChanged.emit(item);
  }

  public parseDataset(data): IPdfWysiwygItem[] {
    const storageVersion = data || [];
    const sLen = storageVersion.length;
    const ret: IPdfWysiwygItem[] = [];

    for (let s = 0; s < sLen; s++) {
      const item = storageVersion[s];
      const tBox = this.getTBox(item.t) || false;
      if (!tBox) { continue; }
      item.obj = new tBox(item.obj);
      ret.push(new IPdfWysiwygItem(item));
    }

    return ret;
  }

  public loadDataset(data) {
    this.allItems = this.parseDataset(data);
    // const dataset = this.parseDataset(data);
    // this.itemsUpdated.emit(dataset);
  }

  public newItem(item: IPdfWysiwygItem): void {
    this.allItems.push(item);
    this.changeItem(item);
  }

  public createItem(x: number, y: number, t: string, w: number = null, h: number = null): void {
    const tBox = this.getTBox(t); // this.tookbolDefaults[t] || false;
    if (!tBox) { alert('Toolbox Item not installed correctly'); return; }

    const dItem = Object.assign({}, new tBox({}));
    dItem.x = x;
    dItem.y = y;
    dItem.w = w;
    dItem.h = h;

    this.newItem(new IPdfWysiwygItem({t: t, obj: new tBox(dItem)}));
  }

  public copyItem(item: IPdfWysiwygItem): void {
    const tBox = this.getTBox(item.t);
    const nItem = Object.assign({}, item.obj);
    const pdfItem = new IPdfWysiwygItem({t: item.t, obj: new tBox(nItem)});
    this.allItems.push(pdfItem);
    this.changeItem(pdfItem);
  }

  public removeItem(item: IPdfWysiwygItem) {
    if (item.id === this.activeItem.id) { this.changeItem(null); }
    this.allItems = this.allItems.filter(ele => ele.id !== item.id);
  }

  public clearItems() {
    this.allItems = [];
  }

  public showItems() {
    console.log(this.allItems);
  }

  public cleanItems() {
    const rLen = this.allItems.length;
    for (let r = 0; r < rLen; r++) {
      const item = this.allItems[r];
      if (typeof item.obj.clean === 'function') {
        item.obj.clean();
      }
    }
  }

  public clearDrag() {
    this.isDrag = this.dragTL = this.dragTR = this.dragBL = this.dragBR = this.dragWhole = false;
  }

  getTBox(t: string): any {
    const tBox = this.toolboxDefaults[t] || false;
    if (!tBox) { alert('Toolbox Item not installed correctly'); return; }
    return tBox;
  }

  saveFormVersion(data: any, form: string, version?: string): Observable<any> {
    let url = `pdf-wysiwyg/forms/${encodeURIComponent(form)}/versions`;
    if (version) { url += `/${encodeURIComponent(version)}`; }
    return this.madame.authPost(url, { data: data }).map((res: any) => res.json());
  }

  getForms(form?: string): Observable<any> {
    let url = 'pdf-wysiwyg/forms';
    if (form) { url += `/${encodeURIComponent(form)}`; }

    return this.madame.authGet(url).
        map((data: any) => data.json()).
        share();
  }

  getFormVersions(form: string, version?: string): Observable<any> {
    let url = `pdf-wysiwyg/forms/${encodeURIComponent(form)}/versions`;
    if (version) { url += `/${encodeURIComponent(version)}`; }

    return this.madame.authGet(url).
        map((data: any) => data.json()).
        share();
  }

  sendAction(form: string, version: string, action: string, data?: any): Observable<any> {
    return this.madame.authPost(`pdf-wysiwyg/forms/${encodeURIComponent(form)}/versions` +
              `/${encodeURIComponent(version)}/${encodeURIComponent(action)}`, { data: data })
              .map((res: any) => res.json());
  }

  public requiredInput(item): boolean {
    if (item.obj.required && item.obj.val.txt === '' || item.obj.val.txt === null) {
      const res = prompt(item.id.toUpperCase() + ' is required. Please put a response.');
      if (res !== null) {
        item.obj.val = { txt: res };
      } else { return false; }
    }
    return true;
  }
}
