import { get as unirest_get, post as unirest_post } from 'unirest';

import urlJoin = require('url-join');

const squareup_base_url = process.env.SQUARE_BASE_URL || '';
const square_access_token = process.env.SQUARE_ACCESS_TOKEN || '';

export function getSquareup(path: string[]): Promise<any> {
  let url = squareup_base_url;
  path.map(p => url = urlJoin(url, p));
  console.log('Location get url: ' + url);

  return new Promise(res => {
    unirest_get(url).
    headers({
      'Authorization': 'Bearer ' + square_access_token,
      'Accept': 'application/json'
    }).
    end(response => res(response.body));
  });
}

export function postSquareup(path: string[], request_body: any): Promise<any> {
  let url = squareup_base_url;
  path.map(p => url = urlJoin(url, p));
  console.log('Location post url: ' + url);

  return new Promise(res => {
    unirest_post(url).
    headers({
      'Authorization': 'Bearer ' + square_access_token,
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }).
    send(request_body).
    end(response => res(response.body));
  });
}
