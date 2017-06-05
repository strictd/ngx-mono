import { ISquareupMoney } from './i-squareup-money';
import { ISquareupOrder } from './i-squareup-order';

export class ISquareupCreateOrderRequest {
  idempotency_key: string; // A value you specify that uniquely identifies this order among orders you've created.
                           // If you're unsure whether a particular order was created successfully, you can reattempt it with the same idempotency key without worrying about creating duplicate orders.
                           // See Idempotency keys for more information.
  order: ISquareupOrder; // The order to be created.
}

export class ISquareupCreateOrderRequestLineItem {
  name: string; // The name of the line item. This value cannot exceed 500 characters.
  quantity: string; // The quantity to purchase, as a string representation of a number. Currently, only integer values are supported.
  base_price_money: ISquareupMoney; // The base price for a single unit of the line item's associated variation. If a line item represents a Custom Amount instead of a particular product, this field indicates that amount.
}

export class ISquareupCreateOrderRequestOrder {
  reference_id: string; // An optional ID you can associate with the order for your own purposes (such as to associate the order with an entity ID in your own database).
                        // This value cannot exceed 40 characters.
  line_items: ISquareupCreateOrderRequestLineItem[]; // The line items to associate with this order.
                                            // Each line item represents a different product (or a custom monetary amount) to include in a purchase.
}
