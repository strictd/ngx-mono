import { ISquareupError } from '../../i-squareup-error';
import { ISquareupMoney } from '../../i-squareup-money';

export class ISquareupCaptureTransaction {
  location_id: string; // The ID of the original transaction's associated location.
  transaction_id: string; // The ID of the original transaction that includes the tender to refund.

  idempotency_key: string; // A value you specify that uniquely identifies this refund among refunds you've created for the tender.
                            // If you're unsure whether a particular refund succeeded, you can reattempt it with the same idempotency key without worrying about duplicating the refund.
                            // See Idempotency keys for more information.
  tender_id: string; // The ID of the tender to refund.
                      // A Transaction has one or more tenders (i.e., methods of payment) associated with it, and you refund each tender separately with the Connect API.
  reason?: string; // A description of the reason for the refund.
                  // Default value: Refund via API
  amount_money: ISquareupMoney; // The amount of money to refund.
                      // Note that you specify the amount in the smallest denomination of the applicable currency. For example, US dollar amounts are specified in cents. See Working with monetary amounts for details.
                      // This amount cannot exceed the amount that was originally charged to the tender that corresponds to tender_id.
}

export class ISquareupCreateRefundResponse {
  errors?: ISquareupError[]; // Any errors that occurred during the request.
  refund?: Refund; // The created refund.
}
