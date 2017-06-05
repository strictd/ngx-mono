import { IUserPermissions } from './permissions';
export class IProfileJWT {
  id: number;
  name: string;
  location: number;
  store: string;
  exp: number;
  iat: number;
  permissions: IUserPermissions;
}
