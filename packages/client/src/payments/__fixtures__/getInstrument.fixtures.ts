import { rest, RestHandler } from 'msw';
import type { Instrument } from '../types';

const path = '/api/payment/v1/intents/:id/instruments/:instrumentId';

const fixtures = {
  success: (response: Instrument): RestHandler =>
    rest.get(path, async (_req, res, ctx) =>
      res(ctx.status(200), ctx.json(response)),
    ),
  failure: (): RestHandler =>
    rest.get(path, async (_req, res, ctx) =>
      res(ctx.status(404), ctx.json({ message: 'stub error' })),
    ),
};

export default fixtures;
