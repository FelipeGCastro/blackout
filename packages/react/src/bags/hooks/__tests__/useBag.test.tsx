import { cleanup, renderHook } from '@testing-library/react';
import { mockBagId, mockBagItemId, mockState } from 'tests/__fixtures__/bags';
import { mockProductId } from 'tests/__fixtures__/products/ids.fixtures';
import { mockStore } from '../../../../tests/helpers';
import { Provider } from 'react-redux';
import React, { FC, ReactElement } from 'react';
import useBag from '../useBag';

jest.mock('@farfetch/blackout-redux', () => ({
  ...jest.requireActual('@farfetch/blackout-redux'),
  addBagItem: jest.fn(() => ({ type: 'add-bag-item' })),
  updateBagItem: jest.fn(() => ({ type: 'update-bag-item' })),
  fetchBag: jest.fn(() => ({ type: 'fetch' })),
  resetBag: jest.fn(() => ({ type: 'reset' })),
}));

const mockDispatch = jest.fn();

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useDispatch: () => mockDispatch,
}));

const withStore =
  (state = mockState): FC<{ children: ReactElement }> =>
  (props): ReactElement => {
    return <Provider store={mockStore(state)} {...props} />;
  };

describe('useBag', () => {
  beforeEach(jest.clearAllMocks);
  afterEach(cleanup);

  it('should return values correctly with initial state', () => {
    const {
      result: { current },
    } = renderHook(() => useBag(), {
      wrapper: withStore(),
    });

    expect(current).toStrictEqual({
      error: undefined,
      isLoading: false,
      isFetched: true,
      data: {
        bagSummary: {
          currency: 'USD',
          currencySymbol: '$',
          dateCreated: '/Date(1534759345364)/',
          dateUpdated: '/Date(1562573175001)/',
          formattedGrandTotal: '$381.62',
          formattedSubTotalAmount: '$371.62',
          formattedSubTotalAmountExclTaxes: '$371.62',
          formattedTotalDiscount: '$0',
          formattedTotalShippingFee: '$10',
          formattedTotalTaxes: '$0',
          grandTotal: 381.62,
          subTotalAmount: 371.62,
          subTotalAmountExclTaxes: 371.62,
          taxType: 'DDP',
          totalDiscount: 0,
          totalShippingFee: 10,
          totalTaxes: 0,
        },
        count: 7,
        isEmpty: false,
        items: expect.any(Array),
        id: mockBagId,
      },
      actions: {
        fetch: expect.any(Function),
        reset: expect.any(Function),
        addItem: expect.any(Function),
        updateItem: expect.any(Function),
        removeItem: expect.any(Function),
      },
    });
  });

  it('should render as empty', () => {
    const {
      result: {
        current: {
          isFetched,
          data: { isEmpty },
        },
      },
    } = renderHook(() => useBag(), {
      wrapper: withStore({
        ...mockState,
        bag: {
          ...mockState.bag,
          result: {
            ...mockState.bag.result,
            count: 0,
            items: [],
          },
          items: {
            ...mockState.bag.items,
            ids: [],
          },
        },
      }),
    });

    expect(isEmpty).toBe(true);
    expect(isFetched).toBe(true);
  });

  it('should render in loading state due to the loading status', () => {
    const {
      result: {
        current: { isLoading },
      },
    } = renderHook(() => useBag(), {
      wrapper: withStore({
        ...mockState,
        bag: {
          ...mockState.bag,
          isLoading: true,
        },
      }),
    });

    expect(isLoading).toBe(true);
  });

  it("should not render in loading state while it doesn't begin fetching", () => {
    const {
      result: {
        current: { isLoading },
      },
    } = renderHook(() => useBag(), {
      wrapper: withStore({
        ...mockState,
        bag: {
          ...mockState.bag,
          error: undefined,
          result: {},
        },
      }),
    });

    expect(isLoading).toBe(false);
  });

  describe('actions', () => {
    it('should call `fetch` action if `enableAutoFetch` option is true', () => {
      const {
        result: {
          current: {
            actions: { fetch },
          },
        },
      } = renderHook(() => useBag({ enableAutoFetch: true }), {
        wrapper: withStore(),
      });

      fetch('123');

      expect(mockDispatch).toHaveBeenCalledWith({ type: 'fetch' });
    });

    it('should not call `fetch` action if `enableAutoFetch` option is false', () => {
      const {
        result: {
          current: {
            actions: { fetch },
          },
        },
      } = renderHook(() => useBag(), {
        wrapper: withStore(),
      });

      fetch('123');

      expect(mockDispatch).not.toHaveBeenCalledWith();
    });

    it('should call `addBagItem` action', () => {
      const {
        result: {
          current: {
            actions: { addItem },
          },
        },
      } = renderHook(() => useBag(), {
        wrapper: withStore(),
      });

      addItem(mockProductId, { quantity: 1, sizeId: 1 });

      expect(mockDispatch).toHaveBeenCalledWith({ type: 'add-bag-item' });
    });

    it('should call `updateBagItem` action is product is not on bag', () => {
      const {
        result: {
          current: {
            actions: { updateItem },
          },
        },
      } = renderHook(() => useBag(), {
        wrapper: withStore(),
      });

      updateItem(mockBagItemId, { quantity: 2, sizeId: 2 });

      expect(mockDispatch).toHaveBeenCalledWith({ type: 'add-bag-item' });
    });

    it('should call `resetBag` action', () => {
      const {
        result: {
          current: {
            actions: { reset },
          },
        },
      } = renderHook(() => useBag(), {
        wrapper: withStore(),
      });

      reset();

      expect(mockDispatch).toHaveBeenCalledWith({ type: 'reset' });
    });
  });
});
