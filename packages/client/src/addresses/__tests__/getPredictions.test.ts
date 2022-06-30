import { getPredictions } from '..';
import { mockPredictionsResponse } from 'tests/__fixtures__/addresses';
import client from '../../helpers/client';
import fixtures from '../__fixtures__/getPredictions.fixtures';
import mswServer from '../../../tests/mswServer';

describe('getPredictions', () => {
  const text = 'dummy%20text';
  const query = { countries: 'US', sampleSize: 10, sessionToken: '12132' };
  const spy = jest.spyOn(client, 'get');
  const expectedConfig = undefined;

  beforeEach(() => jest.clearAllMocks());

  it('should handle a client request successfully when receiving a query param', async () => {
    mswServer.use(fixtures.success(mockPredictionsResponse));

    expect.assertions(2);

    await expect(getPredictions(text, query)).resolves.toStrictEqual(
      mockPredictionsResponse,
    );
    expect(spy).toHaveBeenCalledWith(
      `/account/v1/addressesprediction/${text}?countries=US&sampleSize=10&sessionToken=12132`,
      expectedConfig,
    );
  });

  it('should handle a client request successfully when not receiving a query param', async () => {
    mswServer.use(fixtures.success(mockPredictionsResponse));

    expect.assertions(2);

    await expect(getPredictions(text)).resolves.toStrictEqual(
      mockPredictionsResponse,
    );

    expect(spy).toHaveBeenCalledWith(
      `/account/v1/addressesprediction/${text}`,
      expectedConfig,
    );
  });

  it('should receive a client request error', async () => {
    mswServer.use(fixtures.failure());

    expect.assertions(2);

    await expect(getPredictions(text, query)).rejects.toMatchSnapshot();

    expect(spy).toHaveBeenCalledWith(
      `/account/v1/addressesprediction/${text}?countries=US&sampleSize=10&sessionToken=12132`,
      expectedConfig,
    );
  });
});
