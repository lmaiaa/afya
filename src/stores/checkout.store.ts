import { defineStore } from 'pinia';
import { getOffer } from '@/services/offer.service';
import { ref } from 'vue';
import { OfferResponse } from '@/types/offer.types';
export const useCheckout = defineStore('checkout', () => {
  const offer = ref<OfferResponse[] | null>(null);
  const offerSelected = ref<OfferResponse | null>(null);
  async function fetchOffer() {
    const offerResponse = await getOffer();
    offer.value = offerResponse;
    offerSelected.value = offerResponse[0];
  }
  function selectOffer(offer: OfferResponse | null) {
    if (!offer) return;
    offerSelected.value = offer;
  }
  return { fetchOffer, selectOffer, offer, offerSelected };
});
