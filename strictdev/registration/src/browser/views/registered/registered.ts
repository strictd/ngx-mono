import { Component, AfterViewInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { RegistrationService } from '../../../providers/registration-service';

// declare const SqPaymentForm;

@Component({
  selector: 'registered-component',
  templateUrl: './registered.html',
  styleUrls: [ './registered.sass' ]
})

export class RegisteredComponent implements AfterViewInit {
  service: RegistrationService;

  info: any;
  shortid: string;
  amount: string;

  applicationId = ''; // Squareup Application ID

  paymentForm: any;
  paidUp: boolean;
  hasCardErrors: string[];
  processingPayment: boolean;
  processingSuccess: boolean;
  findingAccount: boolean;
  hasAccount: boolean;
  noAccountFound: boolean;

  constructor(_service: RegistrationService, _route: ActivatedRoute) {
    this.service = _service;

    window['cardNonceResponseReceived'] = this.cardNonceResponseReceived.bind(this);
    _route.params.subscribe(params => {
      const id = params['id'] || '';
      this.runInit(id);
    });
  }

  ngAfterViewInit() {

  }

  runInit(id: string) {
    this.findingAccount = true;
    this.shortid = id;
    this.service.getRegistration(id).subscribe((data: any) => {
      this.findingAccount = false;

      if (data.length) {
        this.info = data;
        this.hasAccount = true;

        this.paidUp = this.info.paid || false;
        if (!this.paidUp) { this.loadPaymentForm(); }
      } else {
        this.cleanProcessing();
        this.info = null;
        this.paidUp = false;
        this.hasAccount = false;
        this.noAccountFound = true;
      }
    }, err => {
      this.findingAccount = false;

      this.hasAccount = false;
      this.noAccountFound = true;
      console.log('Error', err);
    });
  }

  cleanProcessing() {
    this.hasCardErrors = null;
    this.processingPayment = false;
    this.processingSuccess = false;
  }

  // This function is called when a buyer clicks the Submit button on the webpage
  // to charge their card.
  requestCardNonce(event) {
    if (this.processingPayment) { return; }
    // This prevents the Submit button from submitting its associated form.
    // Instead, clicking the Submit button should tell the SqPaymentForm to generate
    // a card nonce, which the next line does.
    event.preventDefault();

    this.cleanProcessing();
    this.processingPayment = true;
    this.paymentForm.requestCardNonce();
  }

  cardNonceResponseReceived(errors, nonce, _cardData) {
    if (errors) {
      this.processingPayment = false;
      this.hasCardErrors = errors.map(e => e.message);
    } else {
      this.hasCardErrors = null;

      this.service.runPayment(nonce, this.shortid, this.amount).subscribe(result => {
        this.processingPayment = false;
        const status = result.status || '';
        const proc_errors = result.errors || [];

        if (status === 200) {
          this.paymentForm.destroy();
          this.processingSuccess = true;
          this.paidUp = true;
        } else {
          this.hasCardErrors = proc_errors.map(p => p.detail);
        }
      }, err => {
        this.hasCardErrors = [err.message];
      });

    }
  }

  loadPaymentForm() {
    /*
    this.paymentForm = new SqPaymentForm({
      applicationId: this.applicationId,
      inputClass: 'sq-input',
      inputStyles: [
        {
          fontSize: '15px'
        }
      ],
      cardNumber: {
        elementId: 'sq-card-number',
        placeholder: '•••• •••• •••• ••••'
      },
      cvv: {
        elementId: 'sq-cvv',
        placeholder: 'CVV'
      },
      expirationDate: {
        elementId: 'sq-expiration-date',
        placeholder: 'MM/YY'
      },
      postalCode: {
        elementId: 'sq-postal-code'
      },
      callbacks: {

        // Called when the SqPaymentForm completes a request to generate a card
        // nonce, even if the request failed because of an error.
        cardNonceResponseReceived: window['cardNonceResponseReceived'],

        unsupportedBrowserDetected: function() {
          // Fill in this callback to alert buyers when their browser is not supported.
          alert('Sorry, your browser is not supported for purchasing.');
        },

        // Fill in these cases to respond to various events that can occur while a
        // buyer is using the payment form.
        inputEventReceived: function(inputEvent) {
          switch (inputEvent.eventType) {
            case 'focusClassAdded':
              // Handle as desired
              break;
            case 'focusClassRemoved':
              // Handle as desired
              break;
            case 'errorClassAdded':
              // Handle as desired
              break;
            case 'errorClassRemoved':
              // Handle as desired
              break;
            case 'cardBrandChanged':
              // Handle as desired
              break;
            case 'postalCodeChanged':
              // Handle as desired
              break;
          }
        },

        paymentFormLoaded: function() {
          // Fill in this callback to perform actions after the payment form is
          // done loading (such as setting the postal code field programmatically).
          // this.paymentForm.setPostalCode('94103');
        }
      }
    });

    this.paymentForm.build();
    */
  }
}
