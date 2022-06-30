import * as checkoutClient from '..';
import { deliveryBundleId, id, upgradeId } from 'tests/__fixtures__/checkout';
import client from '../../helpers/client';
import fixtures from '../__fixtures__/patchCheckoutOrderDeliveryBundleUpgrades.fixtures';
import mswServer from '../../../tests/mswServer';
import type { PatchCheckoutOrderDeliveryBundleUpgradesData } from '../types';

describe('patchCheckoutOrderDeliveryBundleUpgrades', () => {
  beforeEach(() => jest.clearAllMocks());

  const spy = jest.spyOn(client, 'patch');
  const expectedConfig = undefined;
  const data: Array<PatchCheckoutOrderDeliveryBundleUpgradesData> = [
    {
      op: 'replace',
      path: '/0/isSelected',
      value: 'true',
    },
    {
      op: 'test',
      path: '/0/id',
      value: upgradeId,
    },
  ];
  const urlToBeCalled = `/checkout/v1/orders/${id}/deliveryBundles/${deliveryBundleId}/upgrades`;

  it('should handle a client request successfully', async () => {
    mswServer.use(fixtures.success());

    expect.assertions(2);
    await expect(
      checkoutClient.patchCheckoutOrderDeliveryBundleUpgrades(
        id,
        deliveryBundleId,
        data,
      ),
    ).resolves.toBe(204);
    expect(spy).toHaveBeenCalledWith(urlToBeCalled, data, expectedConfig);
  });

  it('should receive a client request error', async () => {
    mswServer.use(fixtures.failure());

    expect.assertions(2);
    await expect(
      checkoutClient.patchCheckoutOrderDeliveryBundleUpgrades(
        id,
        deliveryBundleId,
        data,
      ),
    ).rejects.toMatchSnapshot();
    expect(spy).toHaveBeenCalledWith(urlToBeCalled, data, expectedConfig);
  });
});
