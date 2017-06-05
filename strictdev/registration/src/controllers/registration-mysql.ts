import { generate } from 'shortid';
import { IRegistration } from '../models/i-registration';

const source: any;
export function setSource(_source: any) {
  source = _source;
}

export function addRegistration(data: IRegistration) {
  return source.db.knex(source.tableRegistration).insert(data);
}

export function getRegistrationById(id: number) {
  return source.db.knex(source.tableRegistration).where('id', id);
}
export function getRegistrationByShortId(id: string) {
  return source.db.knex(source.tableRegistration).where('shortid', id);
}

export function setPaidByShortId(id: string) {
  return source.db.knex(source.tableRegistration).update('paid', 1).where('shortid', 'REGEXP', id);
}

export function getRegistrationCounts(gender: string) {
  return source.db.knex(source.tableRegistration).select(
    source.db.knex.raw('count(dob) as total'),
    source.db.knex.raw(`CASE
WHEN gender = '${gender}' AND STR_TO_DATE(dob, '%m/%d/%Y') BETWEEN (DATE_SUB(CURDATE(), INTERVAL 10 YEAR)) AND (DATE_SUB(CURDATE(), INTERVAL 0 YEAR)) THEN 1
WHEN gender = '${gender}' AND STR_TO_DATE(dob, '%m/%d/%Y') BETWEEN (DATE_SUB(CURDATE(), INTERVAL 20 YEAR)) AND (DATE_SUB(CURDATE(), INTERVAL 11 YEAR)) THEN 11
WHEN gender = '${gender}' AND STR_TO_DATE(dob, '%m/%d/%Y') BETWEEN (DATE_SUB(CURDATE(), INTERVAL 30 YEAR)) AND (DATE_SUB(CURDATE(), INTERVAL 21 YEAR)) THEN 21
WHEN gender = '${gender}' AND STR_TO_DATE(dob, '%m/%d/%Y') BETWEEN (DATE_SUB(CURDATE(), INTERVAL 40 YEAR)) AND (DATE_SUB(CURDATE(), INTERVAL 31 YEAR)) THEN 31
WHEN gender = '${gender}' AND STR_TO_DATE(dob, '%m/%d/%Y') BETWEEN (DATE_SUB(CURDATE(), INTERVAL 50 YEAR)) AND (DATE_SUB(CURDATE(), INTERVAL 41 YEAR)) THEN 41
WHEN gender = '${gender}' AND STR_TO_DATE(dob, '%m/%d/%Y') BETWEEN (DATE_SUB(CURDATE(), INTERVAL 60 YEAR)) AND (DATE_SUB(CURDATE(), INTERVAL 51 YEAR)) THEN 51
WHEN gender = '${gender}' AND STR_TO_DATE(dob, '%m/%d/%Y') BETWEEN (DATE_SUB(CURDATE(), INTERVAL 70 YEAR)) AND (DATE_SUB(CURDATE(), INTERVAL 61 YEAR)) THEN 61
WHEN gender = '${gender}' AND STR_TO_DATE(dob, '%m/%d/%Y') BETWEEN (DATE_SUB(CURDATE(), INTERVAL 80 YEAR)) AND (DATE_SUB(CURDATE(), INTERVAL 71 YEAR)) THEN 71
WHEN gender = '${gender}' AND STR_TO_DATE(dob, '%m/%d/%Y') BETWEEN (DATE_SUB(CURDATE(), INTERVAL 90 YEAR)) AND (DATE_SUB(CURDATE(), INTERVAL 81 YEAR)) THEN 81
WHEN gender = '${gender}' AND STR_TO_DATE(dob, '%m/%d/%Y') BETWEEN (DATE_SUB(CURDATE(), INTERVAL 200 YEAR)) AND (DATE_SUB(CURDATE(), INTERVAL 91 YEAR)) THEN 91
END AS age_group`)
  ).where('dob', '!=', '').where('gender', '!=', '').groupBy('age_group');
}
