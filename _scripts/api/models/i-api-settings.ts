export class IAPISettings {
  http_server?: boolean;  
  http_ip?: string;
  http_port?: number;

  https_server?: boolean;
  https_ip?: string;
  https_port?: number;
  https_key?: string;
  https_cert?: string;

  show_sql?: boolean;

  use_cors?: boolean;
  whitelist?: string|string[];

  bodyparser_json?: any;
  bodyparser_urlencoded?: any;
  bodyparser_text?: any;

  jade?: boolean;
  jade_views?: string;

  logger?: string;

  compression?: boolean;

  session_secret?: string;
}
