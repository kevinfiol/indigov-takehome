import { Hono } from 'hono';
import { logger } from 'hono/logger';
import { serve } from '@hono/node-server';
import { serveStatic } from '@hono/node-server/serve-static';

const PORT = Number(process.env.PORT) || 8080;

const app = new Hono();

app.use(logger());
app.use('/*', serveStatic({ root: 'src/static/' }));

serve({ fetch: app.fetch, port: PORT });
