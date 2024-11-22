import { Hono } from 'hono';
import { logger } from 'hono/logger';
import { serve } from '@hono/node-server';
import { serveStatic } from '@hono/node-server/serve-static';
import * as db from './db';

const PORT = Number(process.env.PORT) || 8080;

const app = new Hono();

app.use(logger());
app.use('/*', serveStatic({ root: 'src/static/' }));

app.get('/constituents', (c) => {
  const { data, error } = db.getAllConstituents();

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

serve({ fetch: app.fetch, port: PORT });
