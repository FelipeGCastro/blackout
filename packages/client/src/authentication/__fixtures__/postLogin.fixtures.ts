import moxios from 'moxios';
import type { LoginResponse } from '../types';

export default {
  success: (params: { response: LoginResponse }): void => {
    moxios.stubRequest('/api/legacy/v1/account/login', {
      response: params.response,
      status: 200,
    });
  },
  failure: (): void => {
    moxios.stubRequest('/api/legacy/v1/account/login', {
      response: 'stub error',
      status: 404,
    });
  },
};
