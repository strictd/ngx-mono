// import { plainToClass } from 'class-transformer';

import { Injectable, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { MadameService } from '../../../../_shared/madame/madame-service';

@Injectable()
export class RegistrationService implements OnInit {
  madame: MadameService;
  runningLogin = false;
  auth2: any;

  constructor(
    _madame: MadameService
  ) {
    this.madame = _madame;
  }

  ngOnInit() {

  }

  addRegistration(info: any): Observable<any[]> {
    return this.madame.post('registration.json', info, 'registration').
    map(d => d.json());
  }

  getRegistration(id: string): Observable<any[]> {
    return this.madame.get('registration/' + encodeURIComponent(id) + '.json', 'registration').
    map(d => d.json());
  }

  getRegistrationCount(): Observable<any[]> {
    return this.madame.get('registration/counts.json', 'registration').
    map(d => d.json());
  }

  runPayment(nonce: string, shortid: string, amount: string): Observable<any> {
    return this.madame.post('registration/payment.json', {nonce: nonce, shortid: shortid, amount: amount}, 'registration').
    map(d => { return { status: d.status, data: d.json() }; });
  }
}

