namespace DbHelper {
  'use strict';

  export function upsert(data, table, db) {
    // Needed to build declared insert columns as well as insert and update placeholders
    const arrFields = Object.keys(data);
    // Holds all the data for insert and update placeholders. Has to be duplicated in order to fill both sets of placeholders.
    let arrData = arrFields.map(key => data[key]);
    arrData = arrData.concat(arrFields.map(key => [key, data[key]]).reduce((a, b) => a.concat(b)));

    // Declared and Placeholder columns that can be injected into query
    const columnsStr = arrFields.join(',');
    const insertPlaceholdersStr = arrFields.map(key => '?').join(',');
    const updatePlaceholderStr  = arrFields.map(key => `?? = ?`).join(',');

    const query =
        (`INSERT INTO ${table} (${columnsStr})
        values(${insertPlaceholdersStr})
        ON DUPLICATE KEY UPDATE ${updatePlaceholderStr};`).replace(/\n/gm, '');

    // Execute query using passed params
    return db.knex.raw(query, arrData);
  }

  export function strip(data, sent) {
    const arrData = Object.keys(data);
    const arrSent = Object.keys(sent);
    const ret = {};

    for (let i = 0; i < arrData.length; i++) {
      const dataVar = arrData[i];
      if (arrSent.indexOf(dataVar) > -1) { ret[dataVar] = data[dataVar]; }
    }

    return ret;
  }

  export function remapBody(body, remapModel = {}, dir = 'output') {
    const newBody = {};
    Object.keys(body).map(k => newBody[remap(k, remapModel, 'o')] = body[k]);
    return newBody;
  }

  export function remap(k, remapModel = {}, dir = 'input') {
    if (dir === 'output' || dir === 'o') {
      const iKey = Object.keys(remapModel).find(key => remapModel[key] === k);
      if (iKey) { return iKey; }
    } else {
      if (remapModel.hasOwnProperty(k)) { return remapModel[k]; }
    }
    return k;
  }

  export function keysToLower(obj) {
    let key;
    const keys = Object.keys(obj);
    const nLen = keys.length;
    const newobj = {};
    for (let n = 0; n < nLen; n++) {
      key = keys[n];
      newobj[key.toLowerCase()] = obj[key];
    }
    return newobj;
  }

  export function splitOrderByQueryString(queryString) {
    const ordSplit = [];
    if (queryString.includes(',')) { // has comma separeted query
      queryString.split(',').map(va => {
        ordSplit.push(va.split(' '));
      });
    } else {
      ordSplit.push(queryString.split(' '));
    }
    return ordSplit;
  }
}
export = DbHelper;
