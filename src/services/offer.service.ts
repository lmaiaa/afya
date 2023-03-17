import { OfferResponse } from '@/types/offer.types';
import api from '@/utils/api.instance';

const offerURL = '/offer';

export function getOffer() {
  return api.get<never, OfferResponse>(`${offerURL}`);
}
