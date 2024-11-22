import Database from 'better-sqlite3';

const SQLITE_PATH = process.env.SQLITE_PATH || 'indigov.db';

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
    address text not null,
    signup_time text not null
  )
`);

// seed the database with some data
const insert = db.prepare(`
  insert into constituents (email, name, address, signup_time)
  values (:email, :name, :address, :signupTime)
`);

const constituents = [
  {
    email: 'cyan@gmail.com',
    name: 'Cyan',
    address: '123 Doma Street',
    signupTime: '2024-11-01',
  },
  {
    email: 'sabin@yahoo.com',
    name: 'Sabin',
    address: '456 Figaro Drive',
    signupTime: '2021-03-12',
  },
  {
    email: 'terra@protonmail.com',
    name: 'Terra',
    address: '12 Esper Ln',
    signupTime: '2017-06-05',
  },
  {
    email: 'me@kevinfiol.com',
    name: 'Kevin',
    address: '52 Sunrise Blvd',
    signupTime: '2024-11-02',
  },
  {
    email: 'george@usa.gov',
    name: 'George',
    address: '13 Colonies Virginia',
    signupTime: '2020-09-21',
  },
];

const transaction = db.transaction(() => {
  for (const constituent of constituents) {
    const signupTime = new Date(constituent.signupTime).toISOString();
    insert.run({ ...constituent, signupTime });
  }
});

try {
  transaction();
} catch (e) {
  console.log('Database already initialized.');
}
