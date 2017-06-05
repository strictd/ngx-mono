
import { ISquareupMoney } from './i-squareup-money';

export class ISquareupRefund {
  id?: string; // The refund's unique ID.
  location_id?: string; // The ID of the refund's associated location.
  transaction_id?: string; // The ID of the transaction that the refunded tender is part of.
  tender_id?: string; // The ID of the refunded tender.
  created_at?: string; // The time when the refund was created, in RFC 3339 format.
  reason?: string; // The reason for the refund being issued.
  amount_money?: ISquareupMoney; // The amount of money refunded to the buyer.
  status?: ISquareupRefundStatus; // The current status of the refund (PENDING, APPROVED, REJECTED, or FAILED).
  processing_fee_money?: ISquareupMoney; // The amount of Square processing fee money refunded to the merchant.
}

export enum ISquareupRefundStatus {
  PENDING, // The refund is pending.
  APPROVED, // The refund has been approved by Square.
  REJECTED, // The refund has been rejected by Square.
  FAILED, // The refund failed.
}
