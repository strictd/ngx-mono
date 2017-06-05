import { Type } from 'class-transformer';

export class IRegistrationCount {

  @Type(() => IRegistrationCountTotals)
  male: IRegistrationCountTotals;

  @Type(() => IRegistrationCountTotals)
  female: IRegistrationCountTotals;
}

export class IRegistrationCountTotals {
  age_group: number;
  total: number;
}
