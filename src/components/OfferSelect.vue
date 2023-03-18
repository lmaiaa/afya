<template>
  <div class="container-checkout__offer__list">
    <div
      class="container-checkout__offer__list__offer"
      v-for="offer in offers"
      :key="offer.id"
    >
      <div class="container-checkout__offer__list__offer__descriptions">
        <span
          class="container-checkout__offer__list__offer__descriptions__title"
          >{{ offer.title }} | {{ offer.description }}</span
        >
        <div
          class="container-checkout__offer__list__offer__descriptions__box-price"
        >
          <span
            class="container-checkout__offer__list__offer__descriptions__price"
            >De
            {{
              moneyFormatter(offer.fullPrice, {
                locale: 'pt-BR',
                currency: 'BRL',
              })
            }}
            | Por
            {{
              moneyFormatter(offer.fullPrice - offer.discountAmmount, {
                locale: 'pt-BR',
                currency: 'BRL',
              })
            }}
          </span>
          <span
            class="container-checkout__offer__list__offer__descriptions__tag-discount"
            >-{{ offer.discountPercentage * 100 }}%</span
          >
        </div>
        <span
          class="container-checkout__offer__list__offer__descriptions__price-installment"
        >
          {{ offer.installments }}x de
          {{
            moneyFormatter(
              (offer.fullPrice - offer.discountAmmount) / offer.installments,
              {
                locale: 'pt-BR',
                currency: 'BRL',
              }
            )
          }}/{{ offer.periodLabel }}
        </span>
      </div>
      <input v-model="offerIdSelected" type="radio" :value="offer.id" />
    </div>
  </div>
</template>
<script setup lang="ts">
import { useCheckout } from '@/stores/checkout.store';
import { computed } from 'vue';
import { moneyFormatter } from '@/utils/formatters.util';

const store = useCheckout();

const offers = computed(() => store.offer);
const offerIdSelected = computed({
  get() {
    return store.offerSelected?.id;
  },
  set(val) {
    return store.selectOffer(
      offers.value?.find((offer) => offer.id === val) ?? null
    );
  },
});
</script>
<style lang="scss" scoped>
.container-checkout__offer__list {
  display: flex;
  flex-direction: column;
  gap: 12px;
  min-width: 330px;
  &__offer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    border: 1px solid #191847;
    padding: 20px;
    border-radius: 15px;

    &__descriptions {
      display: flex;
      flex-direction: column;
      &__title {
        font-size: 14px;
        font-weight: 700;
        color: #191847;
      }
      &__box-price {
        display: flex;
        gap: 12px;
      }
      &__price {
        font-size: 12px;
        color: #191847;
      }
      &__tag-discount {
        background-color: #f5850b;
        border-radius: 9px;
        width: 40px;
        font-size: 10px;
        color: #ffffff;
        text-align: center;
      }
      &__price-installment {
        color: #f5850b;
        font-size: 10px;
      }
    }
  }
}
</style>
