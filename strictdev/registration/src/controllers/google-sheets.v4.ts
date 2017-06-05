import { waterfall } from 'async';

import { GoogleRequests } from '../../../utils/google_api/controllers/google_api';
const gReq = new GoogleRequests();

const caseSensitive = process.env.SHORTID_CASESENSITIVE || false;
      sheet_id = process.env.GOOGLE_API_SHEET || '';

export function setRegistrationSheet(id: string) {
  sheet_id = id;
}
export function getRegistrationCounts() {
  return gReq.getRange(
    sheet_id,
    'counts!B1:D',
    'ROWS'
  ).then((data: string) => {
    const resp = JSON.parse(data);
    if (resp.error) { return Promise.reject(resp.error); }
    return Promise.resolve(resp.values);
  });
}


export function getRegistrationQuery(i: number, val: string) {

  return new Promise((resolve, reject) => {
    gReq.batchGetRange(
      sheet_id,
      ['A2:2', 'A3:ZZ']
    ).then(resp => {
      const data = JSON.parse(resp);
      const header = data.valueRanges[0].values[0];
      let matched = [];
      const ret = [];

      data.valueRanges.shift();
      data.valueRanges.map(r => {
        if (caseSensitive) {
          matched = matched.concat(r.values.filter(d => d[i] === val));
        } else {
          matched = matched.concat(r.values.filter(d => d[i].toUpperCase() === val.toUpperCase()));
        }
      });

      matched.slice(-1).map(m => {
        const r: any = {};
        const hLen = header.length;

        for (let h = 0; h < hLen; h++) {
          const newVar = header[h].replace(' ', '_').toLowerCase();
          r[newVar] = m[h];
        }

        r.paid = (r.paid === 'Yes') ? true : false;
        ret.push( pick(r, ['paid', 'shortid', 'first_name']) );
      });
      
      resolve(ret);
    }).catch(e => reject(e));
  });
}

export function addRegistration(registration: any) {
  const regData: any = Object.assign({}, registration);

  const values = [];
  values.push('=IF(SUMPRODUCT(EXACT(payments!A:A, INDIRECT("B"&row()))), "Yes", "No")');
  values.push(regData.shortid);
  Object.keys(regData).filter(d => (d !== 'shortid' && d !== 'recaptcha')).map(d => values.push(regData[d]));

  return gReq.appendRow(
    sheet_id,
    'A3',
    { values: [values] }
  );

}

export function setPaidByShortId(shortid: string, transaction: any) {
  const trans_id = transaction.id || '',
        location_id = transaction.location_id || '',
        created_at = transaction.created_at || '',
        product = transaction.product || '',
        tenders = transaction.tenders || [];
  ;

  const values = [];

  // Actual Tender Records
  tenders.map(t => {
    const t_id = t.id || '',
          t_location_id = t.location_id || '',
          t_transaction_id = t.transaction_id || '',
          t_created_at = t.created_at || '',
          note = t.note || '',
          amount_money = t.amount_money || {},
          amount = amount_money.amount || '',
          currency = amount_money.currency || '',
          type = t.type || '',
          card_details = t.card_details || {},
          card_status = card_details.status || '',
          card_entry_method = card_details.entry_method || '',
          card_details_card = card_details.card || {},
          card_details_brand = card_details_card.card_brand || '',
          card_details_last_4 = card_details_card.last_4 || ''
    ;

    values.push([
      shortid,
      `${(parseInt(amount, 10) / 100).toFixed(2)} ${currency}`,
      card_status,
      product,
      `${type}, ${card_details_brand}`,
      card_details_last_4,
      t_id,
      trans_id,
      t_location_id,
      t_created_at,
      note,
      card_entry_method,
      Date().toString()
    ]);
  });

  return gReq.appendRow(
    sheet_id,
    'payments!A2',
    { values: values }
  );
}

function pick(_this, arr) {
  const obj = {};
  arr.forEach(function(key){
      obj[key] = _this[key];
  });
  return obj;
};

