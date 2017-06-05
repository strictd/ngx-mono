import { plainToClass } from 'class-transformer';
import { getSquareup } from './http-requests';
import { ISquareupListLocationsResponse } from '../models/endpoints/location/i-squareup-list-locations';
import { ISquareupLocation, ISquareupLocationCapability } from '../models/i-squareup-location'

export function listLocations(): Promise<ISquareupLocation[]> {
  return getSquareup(['locations']).then((response: ISquareupLocation) => {
    const resp = plainToClass(ISquareupListLocationsResponse, response);
    return Promise.resolve(resp.locations);
  });
}

export function findLocationCapability(locations: ISquareupLocation[], capability: ISquareupLocationCapability) {
  for (let i = locations.length - 1; i >= 0; i--) {
    if (locations[i].capabilities.indexOf(capability) > -1) {
      return locations[i];
    }
  }
}
