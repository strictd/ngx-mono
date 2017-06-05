import { Component, ViewChild, AfterViewInit, OnDestroy, ChangeDetectorRef } from '@angular/core';

import { LoginCmd } from '../../providers/login-service';

import { Observer } from 'rxjs/Observer';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'login-modal',
  template: `Modal Login!`
  /*template: `<ng-modal style="z-index: 2000;" #ModalLogin
      [hideCloseButton]="false"
      [closeOnEscape]="true"
      [closeOnOutsideClick]="true"
      [showHeader]="false"
      [showFooter]="false"
  >
    <modal-content>
      <login-component #Login [isModal]="true"></login-component>
    </modal-content>
  </ng-modal>`*/
})


export class LoginModal implements AfterViewInit, OnDestroy {
  @ViewChild('ModalLogin') ModalLogin: any;
  @ViewChild('Login') Login: any;

  localForceLogin: Subscription;
  cdr: ChangeDetectorRef;

  constructor(_cdr: ChangeDetectorRef) {
    this.cdr = _cdr;

    this.localForceLogin = LoginCmd._forceLoginObservable.subscribe(
      (authGuardObserver: Observer<boolean>) => {

        this.Login.resizeForModalLogin();
        this.ModalLogin.open(authGuardObserver);
        const closeSub = this.ModalLogin.onClose.subscribe(() => {
          authGuardObserver.complete();
          closeSub.unsubscribe();
        });
      }
    );
  }

  ngAfterViewInit() {
    // Modal Login window open default
    this.ModalLogin.onOpen.subscribe((args: any) => {
      const _ob = args[0];

      const loginSub = this.Login.onSubmit.subscribe((res: any) => {
        _ob.next(res);
        _ob.complete();
        this.ModalLogin.close(res);
        this.cdr.detectChanges();
      });


      // Routine when modal window closes
      const closeSub = this.ModalLogin.onClose.subscribe((successfulLogin: any) => {
        this.Login.returnToOriginalSize(); // Reset original window size,
                                           // may have expanded to fit login

        if (!successfulLogin ||
            !successfulLogin.length ||
            !successfulLogin[0]
        ) {
          // Needs more Auth
          // this.processNeedMoreAuthSub(true);
        }

        _ob.next('closed');
        _ob.complete();

        // Cleanup subscriptions from modal window
        loginSub.unsubscribe();
        closeSub.unsubscribe();

      });

    });
  }

  ngOnDestroy() {
    try { this.ModalLogin.close(); } catch (e) { }

    this.localForceLogin.unsubscribe();
  }

}

