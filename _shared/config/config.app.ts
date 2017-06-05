import { Injectable, OnDestroy } from '@angular/core';

@Injectable()
export class ConfigApp implements OnDestroy {
  private _madameService = 'http://localhost:3080/';
  private _madameSocket = 'localhost:3080';

  private _curHistoryLength = 0;
  private _historyHandicap = 1;

  static setCookie(cname: string, cvalue: string, exdays: number) {
    const d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    const expires = `expires=${d.toUTCString()}`;
    document.cookie = `${cname}=${cvalue};${expires};path=/`;
  }

  static getCookie(cname: string) {
    const name = `${cname}=`;
    const decodedCookie = decodeURIComponent(document.cookie);
    const ca = decodedCookie.split(';');
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) === ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) === 0) {
        return c.substring(name.length, c.length);
      }
    }
    return '';
  }

  static isLocalStorageNameSupported() {
    const testKey = 'test';
    try {
      localStorage.setItem(testKey, '1');
      localStorage.removeItem(testKey);
      return true;
    } catch (error) {
      return false;
    }
  }

  constructor() { }

  ngOnDestroy() {

  }

  madameService(): string { return this._madameService; }
  madameSocket(): string { return this._madameSocket; }

  isPopupWindow(window: Window) {
    if (window.opener) {
      return true; // Popup Window
    } else if (window.top !== window.self) {
      return true; // IFramed
    }
    return false;
  }
  setStateParams() {
    if (window.history.length < this._curHistoryLength) {
      this._historyHandicap += this._curHistoryLength - window.history.length + 1;
    } else if (window.history.length === this._curHistoryLength) {
      this._historyHandicap += 1;
    }
    this._curHistoryLength = window.history.length;
  }
  getStateParams() {
    const state: any = {};
    state.id = this._curHistoryLength + this._historyHandicap;
    return state;
  }

  popup(u: string, w: number, h: number) {
    this.popupWindow(u, w, h);
  }

  popupWindow(u: string, w: number, h: number) {
    const popupwindow = window.open(u, '', `top=10,left=10,height=${h},width=${w},
        toolbar=0,location=0,directories=0,resizable=1,status=0,menubar=0,
        scrollbars=1`);
    popupwindow.focus();
  }

  popupTab(u: string) {
    window.open(u, '_blank');
  }

}
