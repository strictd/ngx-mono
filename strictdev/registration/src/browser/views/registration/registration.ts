import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'registration-component',
  template: `<template-component #templateView *ngIf="showTemplate">
               <event-info></event-info>
               <form-component></form-component>
             </template-component>
             <form-component *ngIf="!showTemplate"></form-component>`
})

export class RegistrationComponent implements OnInit {
  activatedRoute: ActivatedRoute;
  showTemplate = false;

  constructor(_activatedRoute: ActivatedRoute) {
    this.activatedRoute = _activatedRoute;
  }

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe((params: Params) => this.showTemplate = !(Object.keys(params).indexOf('frame') > -1));
  }
}
