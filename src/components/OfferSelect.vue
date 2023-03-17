<template>
  <div class="field" v-for="offer in mock" :key="offer.id">
    <div class="selecao">
      <div class="desciptions">
        <span>{{ offer.title }} | {{ offer.description }}</span>
        <span
          >De R${{ offer.fullPrice }} | Por R${{
            (offer.fullPrice - offer.discountAmmount)
              .toFixed(2)
              .split('.')
              .join(',')
          }}
          <span>-{{ offer.discountPercentage * 100 }}%</span>
        </span>
        <span>
          {{ offer.installments }}x de R${{
            ((offer.fullPrice - offer.discountAmmount) / offer.installments)
              .toFixed(2)
              .split('.')
              .join(',')
          }}/{{ offer.periodLabel }}
        </span>
      </div>
      <input v-model="offerSelect" type="radio" :value="offer.id" />
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue';

const mock = [
  {
    id: 32,
    storeId: 'anual_parcelado_iugu',
    title: 'Premium Anual',
    description: 'Parcelado',
    caption: '7 Dias Grátis',
    fullPrice: 600,
    discountAmmount: 60,
    discountPercentage: 0.1,
    periodLabel: 'mês',
    period: 'annually',
    discountCouponCode: null,
    order: 1,
    priority: 1,
    gateway: 'iugu',
    splittable: true,
    installments: 12,
    acceptsCoupon: true,
  },
  {
    id: 33,
    storeId: 'anual_a_vista_iugu',
    title: 'Premium Anual',
    description: 'À Vista',
    caption: '7 Dias Grátis',
    fullPrice: 7200,
    discountAmmount: 720,
    discountPercentage: 0.1,
    periodLabel: 'ano',
    period: 'annually',
    discountCouponCode: null,
    order: 2,
    priority: 2,
    gateway: 'iugu',
    splittable: false,
    installments: 1,
    acceptsCoupon: true,
  },
];
const offerSelect = ref(mock[0].id);
</script>
