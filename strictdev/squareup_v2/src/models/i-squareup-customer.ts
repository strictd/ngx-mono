import { ISquareupAddress } from './i-squareup-address';
import { ISquareupCard } from './i-squareup-card';

export class ISquareupCustomer {
  id?: string; // The customer's unique ID.
  created_at?: string; // The time when the customer was created, in RFC 3339 format.
  updated_at?: string; // The time when the customer was last updated, in RFC 3339 format.
  cards?: ISquareupCard[]; // The non-confidential details of the customer's cards on file.
  given_name?: string; // The customer's given (i.e., first) name.
  family_name?: string; // The customer's family (i.e., last) name.
  nickname?: string; // The customer's nickname.
  company_name?: string; // The name of the customer's company.
  email_address?: string; // The customer's email address.
  address?: ISquareupAddress; // The customer's physical address.
  phone_number?: string; // The customer's phone number.
  reference_id?: string; // A second ID you can set to associate the customer with an entity in another system.
  note?: string; // A note to associate with the customer.
  preferences?: ISquareupCustomerPreferences; // The customer's preferences.
  groups?: ISquareupCustomerGroupInfo[]; // The groups the customer belongs to.
}

export class ISquareupCustomerGroupInfo {
  id?: string; // The ID of the customer group.
  name?: string; // The name of the customer group.
}

export class ISquareupCustomerPreferences {
  email_unsubscribed?: boolean; // The customer has unsubscribed from receiving marketing campaign emails.
}
