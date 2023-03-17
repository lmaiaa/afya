import {
  SubscriptionPayload,
  SubscriptionResponse,
} from '@/types/subscription.types';
import api from '@/utils/api.instance';

const subscriptionURL = '/subscription';

export function createSubscription(subscription: SubscriptionPayload) {
  return api.post<never, SubscriptionResponse>(
    `${subscriptionURL}`,
    subscription
  );
}
