import { ISquareupError } from '../../i-squareup-error';
import { ISquareupSortOrder } from '../../i-squareup-sort-order';
import { ISquareupRefund } from '../../i-squareup-refund';

export class ISquareupListRefunds {
  location_id: string;
  begin_time?: string;
  end_time?: string;
  sort_order?: ISquareupSortOrder;
  cursor?: string;
}

export class ISquareupListRefundsResponse {
  errors?: ISquareupError[];
  refunds?: ISquareupRefund;
  cursor?: string;
}
