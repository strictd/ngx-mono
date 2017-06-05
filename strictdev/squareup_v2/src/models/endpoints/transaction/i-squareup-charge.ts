// import { Type } from "class-transformer";
import { ISquareupAddress } from '../../i-squareup-address';
import { ISquareupError } from '../../i-squareup-error';
import { ISquareupMoney } from '../../i-squareup-money';
import { ISquareupTransaction } from '../../i-squareup-transaction';

export class ISquareupCharge {
  idempotency_key: string;
  amount_money: ISquareupMoney;
  card_nonce: string;

  customer_card_id?: string;
  delay_capture?: boolean;
  reference_id?: string;
  note?: string;
  customer_id?: string;

//  @Type(() => ISquareupAddress)
  billing_address?: ISquareupAddress;

//  @Type(() => ISquareupAddress)
  shipping_address?: ISquareupAddress;

  buyer_email_address?: string;
}

export class ISquareupChargeResponse {
  errors?: ISquareupError[];
  transaction?: ISquareupTransaction;
}
