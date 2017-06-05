import { ISquareupAddress } from './i-squareup-address';

export class ISquareupLocation {
  id?: string; // The location's unique ID.
  name?: string; // The location's name.
  address?: ISquareupAddress; // The location's physical address.
  timezone?: string; // The IANA Timezone Database identifier for the location's timezone.
  capabilities?: ISquareupLocationCapability[]; // Indicates which Square features are enabled for the location.
                                               // See LocationCapability for possible values.
}

export type ISquareupLocationCapability =
  "CREDIT_CARD_PROCESSING"
;
