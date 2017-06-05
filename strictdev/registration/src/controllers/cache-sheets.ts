import { waterfall } from 'async';

let registrations = {};

export function getRegistrationCounts() {
  return Promise.resolve(Object.keys(registrations).length);
}

export function getRegistrationQuery(i: number, val: string) {
  console.log(val);
  return new Promise((resolve, reject) => {
    if (registrations.hasOwnProperty(val)) {
      resolve(registrations[val]);
    } else { reject('not found'); }
  });
}

export function addRegistration(registration: any) {
  const regData: any = Object.assign({}, registration);
  
  const values = [];
  Object.keys(regData).filter(d => (d !== 'shortid' && d !== 'recaptcha')).map(d => values.push(regData[d]));

  registrations[regData.shortid] = values;

  console.log(registrations)
  return Promise.resolve(registrations[regData.shortid]);
}

