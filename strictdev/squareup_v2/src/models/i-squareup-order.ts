import { Type } from 'class-transformer';

import { ISquareupMoney } from './i-squareup-money';

export class ISquareupOrder {
  id?: string; // The order's unique ID.
              // This value is not present if the order was not created with the CreateOrder endpoint.
  location_id?: string; // The ID of the merchant location this order is associated with.
  reference_id?: string; // A client specified identifier to associate an entity in another system with this order.
  line_items?: ISquareupOrderLineItem[]; // The line items included in the order. Every order has at least one line item.
  total_money?: ISquareupMoney; // The total amount of money to collect for the order.
}

export class ISquareupOrderLineItem {
  id?: string; // The line item's ID, unique only within this order.
  name?: string; // The name of the line item.
  quantity?: string; // The quantity of the product to purchase. Currently, this string must have an integer value.
  base_price_money?: ISquareupMoney; // The base price for a single unit of the line item's associated variation.
                                    // If a line item represents a Custom Amount instead of a particular product, this field indicates that amount.
  total_money?: ISquareupMoney; // The total amount of money to collect for this line item.
}
