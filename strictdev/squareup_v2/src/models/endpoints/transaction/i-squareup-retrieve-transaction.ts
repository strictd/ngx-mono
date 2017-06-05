import { ISquareupError } from '../../i-squareup-error';
import { ISquareupSortOrder } from '../../i-squareup-sort-order';
import { ISquareupTransaction } from '../../i-squareup-transaction';

export class ISquareupRetrieveTransaction {
  location_id: string;
  transaction_id: string;
}

export class ISquareupRetrieveTransactionResponse {
  errors?: ISquareupError[];
  transaction?: ISquareupTransaction;
}
