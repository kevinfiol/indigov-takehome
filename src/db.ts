import Database from 'better-sqlite3';
import type { Constituent } from './types';

const SQLITE_PATH = process.env.SQLITE_PATH;

export const db = new Database(SQLITE_PATH, {
  readonly: false,
  fileMustExist: true,
});

// use WAL mode
db.exec('pragma journal_mode = WAL');

export function getAllConstituents() {
  let data: Constituent[] = [];
  let error = undefined;

  try {
    const select = db.prepare(`
      select rowid as id, *
      from constituents
    `);

    data = select.all() as Constituent[];
  } catch (e) {
    error = e;
  }

  return { data, error };
}

export function insertConstituent(params: Omit<Constituent, 'id'>) {
  const data: Constituent[] = [];
  let error = undefined;

  try {
    const insert = db.prepare(`
      insert into constituents (email, name, address)
      values (:email, :name, :address)
      on conflict(email) do update set
        name = excluded.name,
        address = excluded.address
      returning rowid as id, *
    `);

    const result = insert.get(params) as Constituent;
    if (result) data.push(result);
  } catch (e) {
    error = e;
  }

  return { data, error };
}
