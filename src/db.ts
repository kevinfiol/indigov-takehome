import Database from 'better-sqlite3';
import { isValidDate } from './utils';
import type { Constituent } from './types';

const SQLITE_PATH = process.env.SQLITE_PATH || 'indigov.db';

export const db = new Database(SQLITE_PATH, {
  readonly: false,
  fileMustExist: true,
});

// use WAL mode
db.exec('pragma journal_mode = WAL');

export function getConstituents({ begin = '', end = '' } = {}) {
  let data: Constituent[] = [];
  let error = undefined;

  try {
    let query = `
      select rowid as id, *
      from constituents
      where 1=1
    `;

    const params = [];

    if (isValidDate(begin)) {
      query += ' and signup_time >= ?';
      params.push(begin);
    }

    if (isValidDate(end)) {
      query += ' and signup_time <= ?';
      params.push(end);
    }

    const select = db.prepare(query);
    data = select.all(params) as Constituent[];
  } catch (e) {
    error = e;
  }

  return { data, error };
}

export function insertConstituent(params: Omit<Constituent, 'id'>) {
  const signupTime = new Date().toISOString();
  const data: Constituent[] = [];
  let error = undefined;

  try {
    const insert = db.prepare(`
      insert into constituents (email, name, address, signup_time)
      values (:email, :name, :address, :signupTime)
      on conflict(email) do update set
        name = excluded.name,
        address = excluded.address
      returning rowid as id, *
    `);

    const result = insert.get({ ...params, signupTime }) as Constituent;
    if (result) data.push(result);
  } catch (e) {
    error = e;
  }

  return { data, error };
}
