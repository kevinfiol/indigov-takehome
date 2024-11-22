# indigov take home

Problem:
> Indigov is a constituent management system that allows elected officials to manage their constituency.
A newly elected official is planning on holding a town hall meeting and is setting up a digital tablet to
collect contact information from constituents that would like to sign up to the official’s newsletter on a
tablet at the door. The email addresses, names, and address information about the constituents would
be submitted to Indigov for storage. The official already has about 500 constituents in their database,
and it is very important to them that any duplicates are merged during the contact gathering process.

## Running the application

```bash
# init the SQLite DB
npm run db:init

# (optional) create an .env file
cp .env.example .env

# run the application
npm run start
```

## Development

Currently, the server and frontend use separate dev scripts.

```bash
# typecheck the source
npm run check

# start server in dev mode
npm run dev

# build frontend and watch for changes
npm run client:dev
```