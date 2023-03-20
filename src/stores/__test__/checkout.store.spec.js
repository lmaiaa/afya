import { describe, it, expect, beforeEach } from 'vitest';
import { setActivePinia, createPinia } from 'pinia';
import { useCheckout } from '@/stores/checkout.store'; // <-- !!

describe('Checkout Store Test', () => {
  let store = null;
  const mock = {
    id: 1,
    storeId: 'string',
    title: 'string',
    description: 'string',
    caption: 'string',
    fullPrice: 100,
    discountAmmount: 10,
    discountPercentage: 0.1,
    periodLabel: 'string',
    period: 'string',
    discountCouponCode: null,
    order: 2,
    priority: 1,
    gateway: 'string',
    splittable: false,
    installments: 1,
    acceptsCoupon: false,
  };

  beforeEach(() => {
    setActivePinia(createPinia());
    store = useCheckout();
  });

  it('initializes with correct values', () => {
    expect(store.offer).toEqual(null);
    expect(store.offerSelected).toEqual(null);
    expect(store.subscription).toEqual(null);
  });
  it('test select offer', async () => {
    store.selectOffer(mock);
    expect(store.offerSelected).toEqual(mock);
  });
});
