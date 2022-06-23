import { getProgramMembershipStatements } from '..';
import {
  membershipId,
  mockResponseProgramMembershipStatement,
  programId,
} from 'tests/__fixtures__/loyalty';
import client from '../../helpers/client';
import fixtures from '../__fixtures__/getProgramMembershipStatements.fixtures';
import moxios from 'moxios';

const expectedConfig = undefined;

beforeEach(() => {
  moxios.install(client);
  jest.clearAllMocks();
});

afterEach(() => moxios.uninstall(client));

describe('getProgramMembershipStatements', () => {
  const spy = jest.spyOn(client, 'get');
  const apiPath = `/loyalty/v1/programs/${programId}/memberships/${membershipId}/statements?initialDate=2017-07-20`;
  const query = { initialDate: '2017-07-20' };

  it('should handle a client request successfully', async () => {
    fixtures.success({
      programId,
      membershipId,
      query,
      response: [mockResponseProgramMembershipStatement],
    });

    expect.assertions(2);
    await expect(
      getProgramMembershipStatements(programId, membershipId, query),
    ).resolves.toContain(mockResponseProgramMembershipStatement);
    expect(spy).toHaveBeenCalledWith(apiPath, expectedConfig);
  });

  it('should receive a client request error', async () => {
    const spy = jest.spyOn(client, 'get');

    fixtures.failure({ programId, membershipId, query });

    expect.assertions(2);
    await expect(
      getProgramMembershipStatements(programId, membershipId, query),
    ).rejects.toMatchSnapshot();
    expect(spy).toHaveBeenCalledWith(apiPath, expectedConfig);
  });
});
