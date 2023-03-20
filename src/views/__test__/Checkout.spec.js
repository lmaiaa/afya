import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest';
import { createTestingPinia } from '@pinia/testing';
import { shallowMount } from '@vue/test-utils';
import Checkout from '@/views/Checkout.vue';

describe('Checkout View Test', () => {
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

  let wrapper = null;

  beforeEach(() => {
    wrapper = shallowMount(Checkout, {
      global: {
        plugins: [
          createTestingPinia({
            createSpy: vi.fn,
            initialState: {
              offer: [mock],
            },
          }),
        ],
      },
    });
  });
  afterEach(() => {
    wrapper.unmount();
  });
});
