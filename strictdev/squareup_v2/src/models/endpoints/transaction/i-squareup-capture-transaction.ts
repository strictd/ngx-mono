import { ISquareupError } from '../../i-squareup-error';

export class ISquareupCaptureTransaction {
  location_id: string;
  transaction_id: string;
}

export class ISquareupCaptureTransactionResponse {
  errors?: ISquareupError[];
}
