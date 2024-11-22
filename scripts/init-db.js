import Database from 'better-sqlite3';

const SQLITE_PATH = process.env.SQLITE_PATH;

console.log(SQLITE_PATH);

export const db = new Database(SQLITE_PATH, {
  readonly: false,
  fileMustExist: false,
  verbose: console.log,
});

// create table
db.exec(`
  create table if not exists constituents (
    email text not null unique,
    name text not null,
    address text not null
  )
`);

// seed the database with some data
const insert = db.prepare(`
  insert into constituents (email, name, address)
  values (:email, :name, :address)
`);

const constituents = [
  { email: 'cyan@gmail.com', name: 'Cyan', address: '123 Doma Street' },
  { email: 'sabin@yahoo.com', name: 'Sabin', address: '456 Figaro Drive' },
  { email: 'terra@protonmail.com', name: 'Terra', address: '12 Esper Ln' },
  { email: 'me@kevinfiol.com', name: 'Kevin', address: '52 Sunrise Blvd' },
  { email: 'george@usa.gov', name: 'George', address: '13 Colonies Virginia' },
];

const transaction = db.transaction(() => {
  for (const constituent of constituents) {
    insert.run(constituent);
  }
});

try {
  transaction();
} catch (e) {
  console.log('Database already initialized.');
}
