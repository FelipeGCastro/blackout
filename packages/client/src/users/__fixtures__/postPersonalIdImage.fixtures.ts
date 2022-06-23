import join from 'proper-url-join';
import moxios from 'moxios';
import type { PostPersonalIdImageResponse } from '../types';

export default {
  success: (params: {
    userId: number;
    response: PostPersonalIdImageResponse;
  }): void => {
    moxios.stubRequest(
      join('/api/account/v1/users/', params.userId, 'personalIds/images'),
      {
        response: params.response,
        status: 200,
      },
    );
  },
  failure: (params: { userId: number }): void => {
    moxios.stubRequest(
      join('/api/account/v1/users/', params.userId, 'personalIds/images'),
      {
        response: 'stub error',
        status: 404,
      },
    );
  },
};
