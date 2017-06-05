import { Type } from 'class-transformer';

import { ISquareupCard } from './i-squareup-card';
import { ISquareupMoney } from './i-squareup-money';

export class ISquareupTender {
  id?: string; // The tender's unique ID.
  location_id?: string; // The ID of the transaction's associated location.
  transaction_id?: string; // The ID of the tender's associated transaction.
  created_at?: string; // The time when the tender was created, in RFC 3339 format.
  note?: string; // An optional note associated with the tender at the time of payment.
  amount_money?: ISquareupMoney; // The amount of the tender.
  processing_fee_money?: ISquareupMoney; // The amount of any Square processing fees applied to the tender.
                              // This field is not immediately populated when a new transaction is created.
                              // It is usually available after about ten seconds.
  customer_id?: string; // If the tender is associated with a customer or represents a customer's card on file, this is the ID of the associated customer.
  type?: string; // The type of tender, such as CARD or CASH.
  card_details?: ISquareupTenderCardDetails; // The details of the card tender.
                                  // This value is present only if the value of type is CARD.
  cash_details?: ISquareupTenderCashDetails; // The details of the cash tender.
                                  // This value is present only if the value of type is CASH.
}

export class ISquareupTenderCashDetails { // Represents additional details of a tender with type CARD or SQUARE_GIFT_CARD
  buyer_tendered_money?: ISquareupMoney; // The total amount of cash provided by the buyer, before change is given.
  change_back_money?: ISquareupMoney; // The amount of change returned to the buyer.
}

export class ISquareupTenderCardDetails { // Represents additional details of a tender with type CARD or SQUARE_GIFT_CARD
  status?: string; // The credit card payment's current state (such as AUTHORIZED or CAPTURED). See TenderCardDetailsStatus for possible values.
  card?: ISquareupCard; // The credit card's non-confidential details.
  entry_method?: string; // The method used to enter the card's details for the transaction.
}

export enum ISquareupTenderEntryMoethod {
  SWIPED, // The card was swiped through a Square reader or Square stand.
  KEYED, // The card information was keyed manually into Square Register or a Square-hosted web form.
  EMV, // The card was processed via EMV with a Square reader.
  ON_FILE, // The buyer's card details were already on file with Square.
  CONTACTLESS // The card was processed via a contactless (i.e., NFC) transaction with a Square reader.
}

export enum ISquareupTenderCardDetailsStatus {
  AUTHORIZED, // The card transaction has been authorized but not yet captured.
  CAPTURED, // The card transaction was authorized and subsequently captured (i.e., completed).
  VOIDED, // The card transaction was authorized and subsequently voided (i.e., canceled).
  FAILED // The card transaction failed.
}

export enum ISquareupTenderType {
  CARD, // A credit card.
  CASH, // Cash.
  THIRD_PARTY_CARD, // A credit card processed with a card processor other than Square.
                    // This value applies only to merchants in countries where Square does not yet provide card processing.
  SQUARE_GIFT_CARD, // A Square gift card.
  NO_SALE, // This tender represents the register being opened for a "no sale" event.
  OTHER, // A form of tender that does not match any other value.
}
