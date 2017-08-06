/**
 * @fileoverview This file is generated by the Angular template compiler.
 * Do not edit.
 * @suppress {suspiciousCode,uselessCode,missingProperties,missingOverride}
 */
 /* tslint:disable */


import * as i0 from '@angular/core';
import * as i1 from '@angular/common';
import * as i2 from './RouteModal';
import * as i3 from '@angular/router';
const styles_RouteModal:any[] = ([] as any[]);
export const RenderType_RouteModal:i0.RendererType2 = i0.ɵcrt({encapsulation:2,styles:styles_RouteModal,
    data:{}});
function View_RouteModal_3(_l:any):i0.ɵViewDefinition {
  return i0.ɵvid(0,[(_l()(),i0.ɵeld(0,(null as any),(null as any),2,'button',[['class',
      'close'],['data-dismiss','modal'],['type','button']],[[1,'aria-label',0]],[[(null as any),
      'click']],(_v,en,$event) => {
    var ad:boolean = true;
    var _co:any = _v.component;
    if (('click' === en)) {
      const pd_0:any = ((<any>_co.close()) !== false);
      ad = (pd_0 && ad);
    }
    return ad;
  },(null as any),(null as any))),(_l()(),i0.ɵeld(0,(null as any),(null as any),1,
      'span',[['aria-hidden','true']],(null as any),(null as any),(null as any),(null as any),
      (null as any))),(_l()(),i0.ɵted((null as any),['×']))],(null as any),(_ck,_v) => {
    var _co:any = _v.component;
    const currVal_0:any = (_co.cancelButtonLabel || 'Close');
    _ck(_v,0,0,currVal_0);
  });
}
function View_RouteModal_4(_l:any):i0.ɵViewDefinition {
  return i0.ɵvid(0,[(_l()(),i0.ɵeld(0,(null as any),(null as any),1,'h4',[['class',
      'modal-title']],(null as any),(null as any),(null as any),(null as any),(null as any))),
      (_l()(),i0.ɵted((null as any),['','']))],(null as any),(_ck,_v) => {
    var _co:any = _v.component;
    const currVal_0:any = _co.title;
    _ck(_v,1,0,currVal_0);
  });
}
function View_RouteModal_2(_l:any):i0.ɵViewDefinition {
  return i0.ɵvid(0,[(_l()(),i0.ɵeld(0,(null as any),(null as any),9,'div',[['class',
      'modal-header']],(null as any),(null as any),(null as any),(null as any),(null as any))),
      (_l()(),i0.ɵted((null as any),['\n                '])),(_l()(),i0.ɵand(16777216,
          (null as any),(null as any),1,(null as any),View_RouteModal_3)),i0.ɵdid(16384,
          (null as any),0,i1.NgIf,[i0.ViewContainerRef,i0.TemplateRef],{ngIf:[0,'ngIf']},
          (null as any)),(_l()(),i0.ɵted((null as any),['\n                '])),(_l()(),
          i0.ɵand(16777216,(null as any),(null as any),1,(null as any),View_RouteModal_4)),
      i0.ɵdid(16384,(null as any),0,i1.NgIf,[i0.ViewContainerRef,i0.TemplateRef],{ngIf:[0,
          'ngIf']},(null as any)),(_l()(),i0.ɵted((null as any),['\n                '])),
      i0.ɵncd((null as any),0),(_l()(),i0.ɵted((null as any),['\n            ']))],
      (_ck,_v) => {
        var _co:any = _v.component;
        const currVal_0:boolean = !_co.hideCloseButton;
        _ck(_v,3,0,currVal_0);
        const currVal_1:any = _co.title;
        _ck(_v,6,0,currVal_1);
      },(null as any));
}
function View_RouteModal_5(_l:any):i0.ɵViewDefinition {
  return i0.ɵvid(0,[(_l()(),i0.ɵeld(0,(null as any),(null as any),3,'div',[['class',
      'modal-body']],(null as any),(null as any),(null as any),(null as any),(null as any))),
      (_l()(),i0.ɵted((null as any),['\n                '])),i0.ɵncd((null as any),
          1),(_l()(),i0.ɵted((null as any),['\n            ']))],(null as any),(null as any));
}
function View_RouteModal_7(_l:any):i0.ɵViewDefinition {
  return i0.ɵvid(0,[(_l()(),i0.ɵeld(0,(null as any),(null as any),1,'button',[['class',
      'btn btn-default'],['data-dismiss','modal'],['type','button']],(null as any),
      [[(null as any),'click']],(_v,en,$event) => {
        var ad:boolean = true;
        var _co:any = _v.component;
        if (('click' === en)) {
          const pd_0:any = ((<any>_co.close()) !== false);
          ad = (pd_0 && ad);
        }
        return ad;
      },(null as any),(null as any))),(_l()(),i0.ɵted((null as any),['','']))],(null as any),
      (_ck,_v) => {
        var _co:any = _v.component;
        const currVal_0:any = _co.cancelButtonLabel;
        _ck(_v,1,0,currVal_0);
      });
}
function View_RouteModal_8(_l:any):i0.ɵViewDefinition {
  return i0.ɵvid(0,[(_l()(),i0.ɵeld(0,(null as any),(null as any),1,'button',[['class',
      'btn btn-primary'],['type','button']],(null as any),[[(null as any),'click']],
      (_v,en,$event) => {
        var ad:boolean = true;
        var _co:any = _v.component;
        if (('click' === en)) {
          const pd_0:any = ((<any>_co.onSubmit.emit((undefined as any))) !== false);
          ad = (pd_0 && ad);
        }
        return ad;
      },(null as any),(null as any))),(_l()(),i0.ɵted((null as any),['','']))],(null as any),
      (_ck,_v) => {
        var _co:any = _v.component;
        const currVal_0:any = _co.submitButtonLabel;
        _ck(_v,1,0,currVal_0);
      });
}
function View_RouteModal_6(_l:any):i0.ɵViewDefinition {
  return i0.ɵvid(0,[(_l()(),i0.ɵeld(0,(null as any),(null as any),9,'div',[['class',
      'modal-footer']],(null as any),(null as any),(null as any),(null as any),(null as any))),
      (_l()(),i0.ɵted((null as any),['\n                '])),i0.ɵncd((null as any),
          2),(_l()(),i0.ɵted((null as any),['\n                '])),(_l()(),i0.ɵand(16777216,
          (null as any),(null as any),1,(null as any),View_RouteModal_7)),i0.ɵdid(16384,
          (null as any),0,i1.NgIf,[i0.ViewContainerRef,i0.TemplateRef],{ngIf:[0,'ngIf']},
          (null as any)),(_l()(),i0.ɵted((null as any),['\n                '])),(_l()(),
          i0.ɵand(16777216,(null as any),(null as any),1,(null as any),View_RouteModal_8)),
      i0.ɵdid(16384,(null as any),0,i1.NgIf,[i0.ViewContainerRef,i0.TemplateRef],{ngIf:[0,
          'ngIf']},(null as any)),(_l()(),i0.ɵted((null as any),['\n            ']))],
      (_ck,_v) => {
        var _co:any = _v.component;
        const currVal_0:any = _co.cancelButtonLabel;
        _ck(_v,5,0,currVal_0);
        const currVal_1:any = _co.submitButtonLabel;
        _ck(_v,8,0,currVal_1);
      },(null as any));
}
function View_RouteModal_1(_l:any):i0.ɵViewDefinition {
  return i0.ɵvid(0,[(_l()(),i0.ɵeld(0,(null as any),(null as any),10,'div',[['class',
      'modal-content'],['tabindex','0']],(null as any),(null as any),(null as any),
      (null as any),(null as any))),(_l()(),i0.ɵted((null as any),['\n            '])),
      (_l()(),i0.ɵand(16777216,(null as any),(null as any),1,(null as any),View_RouteModal_2)),
      i0.ɵdid(16384,(null as any),0,i1.NgIf,[i0.ViewContainerRef,i0.TemplateRef],{ngIf:[0,
          'ngIf']},(null as any)),(_l()(),i0.ɵted((null as any),['\n            '])),
      (_l()(),i0.ɵand(16777216,(null as any),(null as any),1,(null as any),View_RouteModal_5)),
      i0.ɵdid(16384,(null as any),0,i1.NgIf,[i0.ViewContainerRef,i0.TemplateRef],{ngIf:[0,
          'ngIf']},(null as any)),(_l()(),i0.ɵted((null as any),['\n            '])),
      (_l()(),i0.ɵand(16777216,(null as any),(null as any),1,(null as any),View_RouteModal_6)),
      i0.ɵdid(16384,(null as any),0,i1.NgIf,[i0.ViewContainerRef,i0.TemplateRef],{ngIf:[0,
          'ngIf']},(null as any)),(_l()(),i0.ɵted((null as any),['\n        ']))],
      (_ck,_v) => {
        var _co:any = _v.component;
        const currVal_0:any = _co.showHeader;
        _ck(_v,3,0,currVal_0);
        const currVal_1:any = _co.showBody;
        _ck(_v,6,0,currVal_1);
        const currVal_2:any = _co.showFooter;
        _ck(_v,9,0,currVal_2);
      },(null as any));
}
export function View_RouteModal_0(_l:any):i0.ɵViewDefinition {
  return i0.ɵvid(0,[i0.ɵqud(402653184,1,{modalRoot:0}),(_l()(),i0.ɵted((null as any),
      ['\n'])),(_l()(),i0.ɵeld(0,[[1,0],['modalRoot',1]],(null as any),11,'div',[['class',
      'modal route-modal'],['role','dialog'],['tabindex','-1']],(null as any),[[(null as any),
      'keydown.esc'],[(null as any),'click']],(_v,en,$event) => {
    var ad:boolean = true;
    var _co:i2.RouteModal = _v.component;
    if (('keydown.esc' === en)) {
      const pd_0:any = ((<any>(_co.closeOnEscape? _co.close(): 0)) !== false);
      ad = (pd_0 && ad);
    }
    if (('click' === en)) {
      const pd_1:any = ((<any>(_co.closeOnOutsideClick? _co.close(): 0)) !== false);
      ad = (pd_1 && ad);
    }
    return ad;
  },(null as any),(null as any))),i0.ɵdid(278528,(null as any),0,i1.NgClass,[i0.IterableDiffers,
      i0.KeyValueDiffers,i0.ElementRef,i0.Renderer],{klass:[0,'klass'],ngClass:[1,
      'ngClass']},(null as any)),i0.ɵpod({in:0,fade:1}),i0.ɵdid(278528,(null as any),
      0,i1.NgStyle,[i0.KeyValueDiffers,i0.ElementRef,i0.Renderer],{ngStyle:[0,'ngStyle']},
      (null as any)),i0.ɵpod({display:0}),(_l()(),i0.ɵted((null as any),['\n    '])),
      (_l()(),i0.ɵeld(0,(null as any),(null as any),4,'div',([] as any[]),[[8,'className',
          0]],[[(null as any),'click']],(_v,en,$event) => {
        var ad:boolean = true;
        var _co:i2.RouteModal = _v.component;
        if (('click' === en)) {
          const pd_0:any = ((<any>_co.preventClosing($event)) !== false);
          ad = (pd_0 && ad);
        }
        return ad;
      },(null as any),(null as any))),(_l()(),i0.ɵted((null as any),['\n        '])),
      (_l()(),i0.ɵand(16777216,(null as any),(null as any),1,(null as any),View_RouteModal_1)),
      i0.ɵdid(16384,(null as any),0,i1.NgIf,[i0.ViewContainerRef,i0.TemplateRef],{ngIf:[0,
          'ngIf']},(null as any)),(_l()(),i0.ɵted((null as any),['\n    '])),(_l()(),
          i0.ɵted((null as any),['\n'])),(_l()(),i0.ɵted((null as any),['\n']))],(_ck,
      _v) => {
    var _co:i2.RouteModal = _v.component;
    const currVal_0:any = 'modal route-modal';
    const currVal_1:any = _ck(_v,4,0,_co.isOpened,_co.isOpened);
    _ck(_v,3,0,currVal_0,currVal_1);
    const currVal_2:any = _ck(_v,6,0,(_co.isOpened? 'block': 'none'));
    _ck(_v,5,0,currVal_2);
    const currVal_4:any = _co.isOpened;
    _ck(_v,11,0,currVal_4);
  },(_ck,_v) => {
    var _co:i2.RouteModal = _v.component;
    const currVal_3:any = ('modal-dialog ' + _co.modalClass);
    _ck(_v,8,0,currVal_3);
  });
}
export function View_RouteModal_Host_0(_l:any):i0.ɵViewDefinition {
  return i0.ɵvid(0,[(_l()(),i0.ɵeld(0,(null as any),(null as any),1,'route-modal',
      ([] as any[]),(null as any),(null as any),(null as any),View_RouteModal_0,RenderType_RouteModal)),
      i0.ɵdid(245760,(null as any),0,i2.RouteModal,[i3.Router,i3.ActivatedRoute],(null as any),
          (null as any))],(_ck,_v) => {
    _ck(_v,1,0);
  },(null as any));
}
export const RouteModalNgFactory:i0.ComponentFactory<i2.RouteModal> = i0.ɵccf('route-modal',
    i2.RouteModal,View_RouteModal_Host_0,{cancelUrl:'cancelUrl',cancelUrlExtras:'cancelUrlExtras',
        modalClass:'modalClass',closeOnEscape:'closeOnEscape',closeOnOutsideClick:'closeOnOutsideClick',
        title:'title',hideCloseButton:'hideCloseButton',cancelButtonLabel:'cancelButtonLabel',
        submitButtonLabel:'submitButtonLabel',showHeader:'showHeader',showBody:'showBody',
        showFooter:'showFooter'},{onOpen:'onOpen',onClose:'onClose',onSubmit:'onSubmit'},
    ['modal-header','modal-content','modal-footer']);
//# sourceMappingURL=data:application/json;base64,eyJmaWxlIjoiQzovVXNlcnMvU3BlZWRlci9Eb2N1bWVudHMvbmd4LWZ1Y2svX3NoYXJlZC9uZzItbW9kYWwvUm91dGVNb2RhbC5uZ2ZhY3RvcnkudHMiLCJ2ZXJzaW9uIjozLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJuZzovLy9DOi9Vc2Vycy9TcGVlZGVyL0RvY3VtZW50cy9uZ3gtZnVjay9fc2hhcmVkL25nMi1tb2RhbC9Sb3V0ZU1vZGFsLnRzIiwibmc6Ly8vQzovVXNlcnMvU3BlZWRlci9Eb2N1bWVudHMvbmd4LWZ1Y2svX3NoYXJlZC9uZzItbW9kYWwvUm91dGVNb2RhbC50cy5Sb3V0ZU1vZGFsLmh0bWwiLCJuZzovLy9DOi9Vc2Vycy9TcGVlZGVyL0RvY3VtZW50cy9uZ3gtZnVjay9fc2hhcmVkL25nMi1tb2RhbC9Sb3V0ZU1vZGFsLnRzLlJvdXRlTW9kYWxfSG9zdC5odG1sIl0sInNvdXJjZXNDb250ZW50IjpbIiAiLCJcbjxkaXYgY2xhc3M9XCJtb2RhbCByb3V0ZS1tb2RhbFwiXG4gICAgIHRhYmluZGV4PVwiLTFcIlxuICAgICByb2xlPVwiZGlhbG9nXCJcbiAgICAgI21vZGFsUm9vdFxuICAgICAoa2V5ZG93bi5lc2MpPVwiY2xvc2VPbkVzY2FwZSA/IGNsb3NlKCkgOiAwXCJcbiAgICAgW25nQ2xhc3NdPVwieyBpbjogaXNPcGVuZWQsIGZhZGU6IGlzT3BlbmVkIH1cIlxuICAgICBbbmdTdHlsZV09XCJ7IGRpc3BsYXk6IGlzT3BlbmVkID8gJ2Jsb2NrJyA6ICdub25lJyB9XCJcbiAgICAgKGNsaWNrKT1cImNsb3NlT25PdXRzaWRlQ2xpY2sgPyBjbG9zZSgpIDogMFwiPlxuICAgIDxkaXYgW2NsYXNzXT1cIidtb2RhbC1kaWFsb2cgJyArIG1vZGFsQ2xhc3NcIiAoY2xpY2spPVwicHJldmVudENsb3NpbmcoJGV2ZW50KVwiPlxuICAgICAgICA8ZGl2IGNsYXNzPVwibW9kYWwtY29udGVudFwiIHRhYmluZGV4PVwiMFwiICpuZ0lmPVwiaXNPcGVuZWRcIj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJtb2RhbC1oZWFkZXJcIiAqbmdJZj1cInNob3dIZWFkZXJcIj5cbiAgICAgICAgICAgICAgICA8YnV0dG9uICpuZ0lmPVwiIWhpZGVDbG9zZUJ1dHRvblwiIHR5cGU9XCJidXR0b25cIiBjbGFzcz1cImNsb3NlXCIgZGF0YS1kaXNtaXNzPVwibW9kYWxcIiBbYXR0ci5hcmlhLWxhYmVsXT1cImNhbmNlbEJ1dHRvbkxhYmVsIHx8ICdDbG9zZSdcIiAoY2xpY2spPVwiY2xvc2UoKVwiPjxzcGFuIGFyaWEtaGlkZGVuPVwidHJ1ZVwiPiZ0aW1lczs8L3NwYW4+PC9idXR0b24+XG4gICAgICAgICAgICAgICAgPGg0IGNsYXNzPVwibW9kYWwtdGl0bGVcIiAqbmdJZj1cInRpdGxlXCI+e3sgdGl0bGUgfX08L2g0PlxuICAgICAgICAgICAgICAgIDxuZy1jb250ZW50IHNlbGVjdD1cIm1vZGFsLWhlYWRlclwiPjwvbmctY29udGVudD5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cIm1vZGFsLWJvZHlcIiAqbmdJZj1cInNob3dCb2R5XCI+XG4gICAgICAgICAgICAgICAgPG5nLWNvbnRlbnQgc2VsZWN0PVwibW9kYWwtY29udGVudFwiPjwvbmctY29udGVudD5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cIm1vZGFsLWZvb3RlclwiICpuZ0lmPVwic2hvd0Zvb3RlclwiPlxuICAgICAgICAgICAgICAgIDxuZy1jb250ZW50IHNlbGVjdD1cIm1vZGFsLWZvb3RlclwiPjwvbmctY29udGVudD5cbiAgICAgICAgICAgICAgICA8YnV0dG9uICpuZ0lmPVwiY2FuY2VsQnV0dG9uTGFiZWxcIiB0eXBlPVwiYnV0dG9uXCIgY2xhc3M9XCJidG4gYnRuLWRlZmF1bHRcIiBkYXRhLWRpc21pc3M9XCJtb2RhbFwiIChjbGljayk9XCJjbG9zZSgpXCI+e3sgY2FuY2VsQnV0dG9uTGFiZWwgfX08L2J1dHRvbj5cbiAgICAgICAgICAgICAgICA8YnV0dG9uICpuZ0lmPVwic3VibWl0QnV0dG9uTGFiZWxcIiB0eXBlPVwiYnV0dG9uXCIgY2xhc3M9XCJidG4gYnRuLXByaW1hcnlcIiAoY2xpY2spPVwib25TdWJtaXQuZW1pdCh1bmRlZmluZWQpXCI+e3sgc3VibWl0QnV0dG9uTGFiZWwgfX08L2J1dHRvbj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICA8L2Rpdj5cbjwvZGl2PlxuIiwiPHJvdXRlLW1vZGFsPjwvcm91dGUtbW9kYWw+Il0sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7Ozs7Ozs7OztvQkNZZ0I7TUFBQTtNQUFBO0lBQUE7SUFBQTtJQUFtSTtNQUFBO01BQUE7SUFBQTtJQUFuSTtFQUFBLGdDQUFxSjtNQUFBO01BQUEsZ0JBQXlCOztJQUE1RjtJQUFsRixXQUFrRixTQUFsRjs7OztvQkFDQTtNQUFBO01BQXNDOztJQUFBO0lBQUE7Ozs7b0JBRjFDO01BQUE7TUFBNkMsdURBQ3pDO1VBQUEsdUVBQUE7VUFBQTtVQUFBLGVBQXFNLHVEQUNyTTtpQkFBQTthQUFBO1VBQUEsd0JBQXNEO2FBQ3RELGtCQUErQzs7O1FBRnZDO1FBQVIsV0FBUSxTQUFSO1FBQ3dCO1FBQXhCLFdBQXdCLFNBQXhCOzs7O29CQUdKO01BQUE7TUFBeUMsOERBQ3JDO1VBQUEsR0FBZ0Q7OztvQkFJaEQ7TUFBQTtNQUFBO1FBQUE7UUFBQTtRQUE2RjtVQUFBO1VBQUE7UUFBQTtRQUE3RjtNQUFBLGdDQUErRzs7O1FBQUE7UUFBQTs7OztvQkFDL0c7TUFBQTtNQUFBO1FBQUE7UUFBQTtRQUF3RTtVQUFBO1VBQUE7UUFBQTtRQUF4RTtNQUFBLGdDQUEyRzs7O1FBQUE7UUFBQTs7OztvQkFIL0c7TUFBQTtNQUE2Qyw4REFDekM7VUFBQSxHQUErQyx1REFDL0M7VUFBQSx1RUFBQTtVQUFBO1VBQUEsZUFBK0ksdURBQy9JO2lCQUFBO2FBQUE7VUFBQSx3QkFBMkk7OztRQURuSTtRQUFSLFdBQVEsU0FBUjtRQUNRO1FBQVIsV0FBUSxTQUFSOzs7O29CQVpSO01BQUE7TUFBQSw4QkFBeUQ7TUFDckQ7YUFBQTtVQUFBLHdCQUlNO01BQ047YUFBQTtVQUFBLHdCQUVNO01BQ047YUFBQTtVQUFBLHdCQUlNOzs7UUFab0I7UUFBMUIsV0FBMEIsU0FBMUI7UUFLd0I7UUFBeEIsV0FBd0IsU0FBeEI7UUFHMEI7UUFBMUIsV0FBMEIsU0FBMUI7Ozs7dURBbkJaO01BQUEsU0FDQTtNQUFBO01BQUE7SUFBQTtJQUFBO0lBSUs7TUFBQTtNQUFBO0lBQUE7SUFHQTtNQUFBO01BQUE7SUFBQTtJQVBMO0VBQUEsdUNBQUE7a0RBQUE7TUFBQSxrQ0FLSyx1QkFMTDtNQUFBO01BQUEsc0JBTUssY0FDNEM7TUFDN0M7VUFBQTtRQUFBO1FBQUE7UUFBNEM7VUFBQTtVQUFBO1FBQUE7UUFBNUM7TUFBQSxnQ0FBNkU7TUFDekU7YUFBQTtVQUFBLHdCQWNNLDJDQUNKO2lCQUFBLHdCQUNKOzs7SUF6QkQ7SUFLQTtJQUxMLFdBQUssVUFLQSxTQUxMO0lBTUs7SUFOTCxXQU1LLFNBTkw7SUFTZ0Q7SUFBeEMsWUFBd0MsU0FBeEM7OztJQURDO0lBQUwsV0FBSyxTQUFMOzs7O29CQ1RKO01BQUE7YUFBQTtVQUFBO0lBQUE7Ozs7Ozs7OzsifQ==
