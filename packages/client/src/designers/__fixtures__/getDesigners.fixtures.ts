import { rest, RestHandler } from 'msw';
import type { Designers } from '../types';

const path = '/api/legacy/v1/designers';

export default {
  success: (response: Designers): RestHandler =>
    rest.get(path, async (_, res, ctx) =>
      res(ctx.status(200), ctx.json(response)),
    ),
  failure: (): RestHandler =>
    rest.get(path, async (_, res, ctx) =>
      res(ctx.status(404), ctx.json({ message: 'stub error' })),
    ),
};
