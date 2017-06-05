import { Request } from 'express';
import { IProfileJWT } from '../../config/models/i-profile-jwt';

export class ILogin {
  username: string;
  password: string;
}
export class ILoginResponse {
  _body: string;
  headers: any;
  ok: boolean;
  status: number;
  statusText: string;
  type: number;
  url: string;
}
export class ILoginToken {
  id_token: string;
}
export class ILoginJWT {
  id: number;
  name: string;
}
export interface ILoginRequest extends Request {
  user: IProfileJWT;
}
