<template>
  <div class="resume">
    <div class="resume__container">
      <svg-icon type="mdi" :path="mdiCheckCircleOutline" size="60"></svg-icon>
      <h4 class="resume__container__title">Parabéns!</h4>
      <span class="resume__container__subtitle"
        >Sua assinatura foi realizada com sucesso.</span
      >
      <div class="resume__container__card">
        <div class="resume__container__card__distac">
          <span class="resume__container__card__distac__icon">
            <svg-icon type="mdi" :path="mdiStarOutline" size="18"></svg-icon>
          </span>
          <div
            class="resume__container__card__distac__price"
            v-if="offers && subscription"
          >
            <span>{{ offers[0].title }} | {{ offers[0].description }}</span>
            <span class="resume__container__card__distac__price__values"
              >{{
                moneyFormatter(
                  offers[0].fullPrice - offers[0].discountAmmount,
                  {
                    locale: 'pt-BR',
                    currency: 'BRL',
                  }
                )
              }}
              | {{ subscription.installments }}x
              {{
                moneyFormatter(
                  (offers[0].fullPrice - offers[0].discountAmmount) /
                    subscription.installments,
                  {
                    locale: 'pt-BR',
                    currency: 'BRL',
                  }
                )
              }}</span
            >
          </div>
        </div>
        <div class="resume__container__card__info">
          <span class="resume__container__card__info__label">E-mail</span>
          <span>fulano@cicrano.com.br</span>
        </div>
        <div class="resume__container__card__info" v-if="subscription">
          <span class="resume__container__card__info__label">CPF</span>
          <span>{{ maskCPF.masked(subscription.creditCardCPF) }}</span>
        </div>
      </div>
      <RouterLink to="/" style="margin: 24px 0"
        >Gerenciar assinatura</RouterLink
      >
      <button @click="$router.push('/')" style="margin: 24px 0">
        IR PARA A HOME
      </button>
    </div>
    <Loading v-if="loadingSubscription || loadingOffer" />
  </div>
</template>
<script setup lang="ts">
import { useAsyncAction } from '@/composables/use-async';
import SvgIcon from '@jamescoyle/vue-icon';
import { mdiCheckCircleOutline, mdiStarOutline } from '@mdi/js';
import { useCheckout } from '@/stores/checkout.store';
import { onMounted, computed } from 'vue';
import Loading from '@/components/Shared/Loading.vue';
import { moneyFormatter } from '@/utils/formatters.util';
import { Mask } from 'maska';

const maskCPF = new Mask({ mask: '###.###.###-##' });

const store = useCheckout();
const { start: fetchSubscription, loading: loadingSubscription } =
  useAsyncAction(() => store.fetchSubscription());
const { start: fetchOffer, loading: loadingOffer } = useAsyncAction(() =>
  store.fetchOffer()
);
const subscription = computed(() => store.subscription);
const offers = computed(() => store.offer);
const offerSubscribe = computed(() =>
  offers.value?.find((offer) => offer.id === subscription.value?.offerId)
); //Visto que o mock da response está vindo com ID diferente, esse find nunca encontrará nada.
//Para apresentar os dados na tela pegarei o primeiro item da lista de ofertas.

onMounted(async () => {
  if (!subscription.value) await fetchSubscription();
  if (!offers.value) await fetchOffer();
});
</script>
<style lang="scss" scoped>
.resume {
  display: flex;
  justify-content: center;
  &__container {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 64px 32px;
    &__title {
      color: #191847;
      margin-top: 16px;
    }
    &__subtitle {
      color: #c9c5d4;
      max-width: 195px;
      text-align: center;
      margin-top: 16px;
    }
    &__card {
      margin: 56px 0;
      box-shadow: 0px 4px 20px 0px #0000000d;
      border-radius: 15px;
      min-width: 345px;
      width: auto;
      padding: 16px;
      display: flex;
      flex-direction: column;
      gap: 16px;
      &__distac {
        background-color: #f4f3f6;
        padding: 16px;
        border-radius: 15px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        &__icon {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background-color: #e1dee8;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        &__price {
          display: flex;
          flex-direction: column;
          align-items: center;
          span {
            color: #191847;
          }
          &__values {
            font-size: 14px;
          }
        }
      }
      &__info {
        display: flex;
        justify-content: space-between;
        padding: 0 16px;
        span {
          font-size: 14px;
        }
        &__label {
          color: #c9c5d4;
        }
      }
    }
  }
}
</style>
