export interface SubscriptionPayload {
  couponCode: string | null;
  creditCardCPF: string;
  creditCardCVV: string;
  creditCardExpirationDate: string;
  creditCardHolder: string;
  creditCardNumber: string;
  gateway: string;
  installments: number;
  offerId: number;
  userId: number;
}
export interface SubscriptionResponse extends SubscriptionPayload {
  id: number;
}
