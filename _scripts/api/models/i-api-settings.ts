export class IAPISettings {
  ip: string;
  port: number;
  http_server?: boolean;

  ssl_ip?: string;
  ssl_port?: number;
  ssl_server?: boolean;
  ssl_key?: string;
  ssl_cert?: string;

  show_sql?: boolean;

  use_cors?: boolean;
  whitelist?: string|string[];

  bodyparser_json?: any;
  bodyparser_urlencoded?: any;
  bodyparser_text?: any;

  jade?: boolean;
  jade_views?: string;

  logger?: boolean;

  compression?: boolean;
}
