import { defineStore } from 'pinia';
import { getOffer } from '@/services/offer.service';
import { ref } from 'vue';
import { OfferResponse } from '@/types/offer.types';
import {
  SubscriptionPayload,
  SubscriptionResponse,
} from '@/types/subscription.types';
import {
  createSubscription,
  getSubscription,
} from '@/services/subscription.service';
export const useCheckout = defineStore('checkout', () => {
  const offer = ref<OfferResponse[] | null>(null);
  const offerSelected = ref<OfferResponse | null>(null);
  const subscription = ref<SubscriptionResponse | null>(null);

  async function fetchOffer() {
    const offerResponse = await getOffer();
    offer.value = offerResponse;
    offerSelected.value = offerResponse[0];
  }
  function selectOffer(offer: OfferResponse | null) {
    if (!offer) return;
    offerSelected.value = offer;
  }
  async function sendSubscription(
    userData: Omit<SubscriptionPayload, 'offerId'>
  ) {
    if (!offerSelected.value) return;
    const fullPayload: SubscriptionPayload = {
      ...userData,
      offerId: offerSelected.value.id,
    };
    const subscriptionResponse = await createSubscription(fullPayload);
    subscription.value = subscriptionResponse;
    return subscriptionResponse;
  }
  async function fetchSubscription() {
    const subscriptionResponse = await getSubscription();
    subscription.value = subscriptionResponse;
    return subscriptionResponse;
  }
  return {
    fetchOffer,
    selectOffer,
    sendSubscription,
    fetchSubscription,
    subscription,
    offer,
    offerSelected,
  };
});
