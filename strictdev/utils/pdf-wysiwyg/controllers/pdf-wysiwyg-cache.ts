'use strict';


/*
  'saveMethod': 'historical', // or 'overwrite',
  'pdf_wysiwyg': {
    'forms': 'dev_dsm.pdf_wysiwyg_forms',
    'versions': 'dev_dsm.pdf_wysiwyg_versions',
    'data': 'dev_dsm.pdf_wysiwyg_data',
    'schema': PdfWysiwyg,
    'db': STRICTDEV
  }
*/

export function getForms(source: any, form?: string): Promise<any> {
  const k = source.db.knex(source.forms);
  if (form) { k.where('id', form); } else { k.select('id'); }
  return k;
}

export function getVersions(source: any, form: string, version?: string): Promise<any> {
  const k = source.db.knex(source.versions).where('form', form);
  if (version) {
    k.where('id', version);
  } else { k.select('id', 'form'); }
  return k;
}


export function exportForms(source: any, body: any, form: string, version: string): Promise<any> {
  const k = source.db.knex(source.versions).returning('id');
  if (version !== '' && body.data) {
    k.where('form', form).andWhere('id', version).update({data: JSON.stringify(body.data)});
  } else if (version !== '') {
    k.where('form', form).andWhere('id', version).update(null);
  } else if (body.data) {
    k.insert({form: form, data: JSON.stringify(body.data)});
  } else {
    k.insert({form: form, data: null});
  }
  return k;
}

export function setActive(source: any, form: string, version: string): Promise<any> {
  return source.db.knex(source.forms).where('id', form).update('active_version', version);
}

export function removeVersion(source: any, form: string, version: string): Promise<any> {
  return source.db.knex(source.data).where('version', version).then(exist => {
    if (!exist[0]) {
      return source.db.knex(source.versions).where('form', form).andWhere('id', version).del();
    } else { return exist; }
  });
}

export function deactivateVersion(source: any, form: string, version: string): Promise<any> {
  return source.db.knex(source.forms).update('active_version', null).where('id', form).andWhere('active_version', version);
}

export function saveInputData(source: any, version: string, data: any, data_id: string, saveMethod: string): Promise<any> {
  if (data_id && saveMethod === 'overwrite') {
    return this.updateData(source, data_id, data);
  } else {
    return this.insertData(source, version, data);
  }
}

export function insertData(source: any, version: string, data: any): Promise<any> {
  return source.db.knex(source.data).returning('id').
        insert({ version: version, data: JSON.stringify(data) });
}

export function updateData(source: any, id: number, data: any): Promise<any> {
  return source.db.knex(source.data).update({data: JSON.stringify(data)}).where('id', id);
}

export function getData(source: any, data_id: string, version?: string): Promise<any> {
  const k = source.db.knex(source.data).where('id', data_id);
  if (version) { k.andWhere('version', version); }
  return k;
}
