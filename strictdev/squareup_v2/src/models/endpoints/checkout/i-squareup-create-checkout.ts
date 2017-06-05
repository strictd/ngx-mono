import { ISquareupAddress } from '../../isquareup-address';
import { ISquareupCreateORderRequestOrder } from '../../i-squareup-create-order-request';

export class ISquareupCreateCheckout {
  location_id: string;
  idempotency_key: string;
  order: CreateOrderRequestOrder; // The order including line items to be checked out.
  ask_for_shipping_address: boolean; // If true, Square Checkout will collect shipping information on your behalf and store that information with the transaction information in your Square Dashboard.
                                    // Default is false.
  merchant_support_email: string; // The email address to display on the Square Checkout confirmation page and confirmation email that the buyer can use to contact the merchant.
                                  // If this value is not set, the confirmation page and email will display the primary email address associated with the merchant's Square account.
                                  // Default is unset.
  pre_populate_buyer_email: string; // If provided, the buyer's email is pre-populated on the checkout page as an editable text field.
                                    // Default is unset.
  pre_populate_shipping_address: ISquareupAddress; // If provided, the buyer's shipping info is pre-populated on the checkout page as editable text fields.
                                                  // Default is unset.
  redirect_url: string; // The URL to redirect to after checkout is completed with checkoutId, Square's orderId, transactionId, and referenceId appended as URL parameters. For example, if the provided redirect_url is http://www.example.com/order-complete, a successful transaction redirects the customer to:
                        // http://www.example.com/order-complete?checkoutId=xxxxxx&orderId=xxxxxx&referenceId=xxxxxx&transactionId=xxxxxx
                        // If you do not provide a redirect URL, Square Checkout will display an order confirmation page on your behalf; however Square strongly recommends that you provide a redirect URL so you can verify the transaction results and finalize the order through your existing/normal confirmation workflow.
                        // Default is unset.
}
