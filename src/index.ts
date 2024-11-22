import { Hono } from 'hono';
import { logger } from 'hono/logger';
import { serve } from '@hono/node-server';
import { serveStatic } from '@hono/node-server/serve-static';
import CSV from 'papaparse';
import * as db from './db';

const PORT = Number(process.env.PORT) || 8080;

const app = new Hono();

app.use(logger());
app.use('/*', serveStatic({ root: 'src/static/' }));

app.get('/constituents', (c) => {
  const { data, error } = db.getConstituents();

  if (error) {
    console.error(error);
    c.status(500);

    return c.json({
      data,
      error: 'Error retrieving constituents',
    });
  }

  return c.json({ data });
});

app.post('/constituents', async (c) => {
  const form = await c.req.formData();

  const email = (form.get('email') as string).trim();
  const name = (form.get('name') as string).trim();
  const address = (form.get('address') as string).trim();

  const { data, error } = db.insertConstituent({ email, name, address });

  if (error) {
    console.error(error);
    c.status(500);

    return c.json({
      data,
      error: 'Unable to insert or update constituent',
    });
  }

  return c.json({ data });
});

app.get('/constituents/export', (c) => {
  const begin = c.req.query('begin') || '';
  const end = c.req.query('end') || '';

  const { data, error } = db.getConstituents({ begin, end });

  if (error) {
    console.error(error);
    c.status(500);

    return c.json({
      data,
      error: 'Error exporting CSV',
    });
  }

  const csv = CSV.unparse(data);
  c.header('Content-Type', 'text/csv');
  return c.text(csv);
});

const server = serve({ fetch: app.fetch, port: PORT });

server.on('listening', () => {
  console.log(`Running on http://localhost:${PORT}`);
});
