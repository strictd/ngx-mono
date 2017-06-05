import { Observer } from 'rxjs/Observer';

export class IServerInfo {
  url: string;
  host?: string;
  cookie?: string;
}
export class IServerList {
  [index: string]: IServerInfo;
}

export class IHeaderInfo {
  key: string;
  val: string;
}
export class IHeaderList {
  [index: string]: IHeaderInfo;
}

export class IMadameQuery {
  method: string;
  url: string;
  data?: any;
  query_string?: any;
  server?: string;
  headers?: IHeaderList;
}

export class IMadameQue {
  query: IMadameQuery;
  observer: Observer<any>;
  running?: boolean;
  error?: string;
}
