# indigov take home

Problem:
> Indigov is a constituent management system that allows elected officials to manage their constituency.
A newly elected official is planning on holding a town hall meeting and is setting up a digital tablet to
collect contact information from constituents that would like to sign up to the official’s newsletter on a
tablet at the door. The email addresses, names, and address information about the constituents would
be submitted to Indigov for storage. The official already has about 500 constituents in their database,
and it is very important to them that any duplicates are merged during the contact gathering process.

## Running the application

Node v22 is required.

```bash
# install dependencies
npm install

# (optional) create an .env file
cp .env.example .env

# init the SQLite DB
npm run init:db

# run the application
npm run start
```

## Accessing the application

The frontend will be accessible at `localhost:8080` by default; the port can be configured in `.env`.

The following API endpoints will be accessible:
```
# returns all constituents in JSON
GET /constituents

# returns a CSV of constituents
GET /constituents/export
```

The CSV endpoint can be filtered using the `begin` and `end` query parameters.

For example, `/constituents/export?begin=2018-01-01&end=2021-12-12` will return all constituents with signup times between January 1st, 2018 and December 12th, 2021.

## Development

Currently, the server and frontend use separate dev scripts.

```bash
# typecheck the server
npm run check

# start server in dev mode
npm run dev

# build frontend and watch for changes
npm run client:dev
```