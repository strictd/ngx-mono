import { Type } from 'class-transformer';

import { ISquareupAddress } from './i-squareup-address';

export class ISquareupCard {
  id?: string; // The card's unique ID, if any.
  card_brand?: ISquareupCardBrand; // The card's brand (such as VISA). See CardBrand for all possible values.
  last_4?: string; // The last 4 digits of the card's number.
  exp_month?: number; // The month of the card's expiration date. This value is always between 1 and 12, inclusive.
  exp_year?: number; //The four-digit year of the card's expiration date.
  cardholder_name?: string; // The cardholder name. This value is present only if this object represents a customer's card on file.
  billing_address?: ISquareupAddress; //The card's billing address. This value is present only if this object represents a customer's card on file.
}

export type ISquareupCardBrand =
  "OTHER_BRAND"
  | "VISA"
  | "MASTERCARD"
  | "AMERICAN_EXPRESS"
  | "DISCOVER"
  | "DISCOVER_DINERS"
  | "JCB"
  | "CHINA_UNIONPAY"
  | "SQUARE_GIFT_CARD"
;
