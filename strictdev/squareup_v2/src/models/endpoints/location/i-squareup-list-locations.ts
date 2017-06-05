import { ISquareupError } from '../../i-squareup-error';
import { ISquareupLocation } from '../../i-squareup-location';

export class ISquareupListLocationsResponse {
  errors?: ISquareupError[];
  locations?: ISquareupLocation[];
}
