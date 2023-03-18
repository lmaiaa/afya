<template>
  <form class="container-checkout__fields__form">
    <div class="container-checkout__fields__form__card-number">
      <label class="label">Número do cartão</label>
      <div class="control">
        <input
          name="cardNumber"
          v-model="form.cardNumber.value"
          class="input"
          type="text"
          placeholder="0000 0000 0000 0000"
          v-maska:[form.cardNumber]
        />
      </div>
    </div>
    <div class="container-checkout__fields__form__fields-card-number">
      <div
        class="container-checkout__fields__form__fields-card-number__expiration-date"
      >
        <label class="label">Validade</label>
        <div class="control">
          <input
            v-model="form.creditCardExpirationDate.value"
            name="cardNumber"
            class="input"
            type="text"
            placeholder="MM/AA"
            v-maska:[form.creditCardExpirationDate]
          />
        </div>
      </div>
      <div class="container-checkout__fields__form__fields-card-number__cvv">
        <label class="label">CVV</label>
        <div class="control">
          <input
            name="creditCardCVV"
            v-model="form.creditCardCVV.value"
            class="input"
            type="text"
            placeholder="000"
            v-maska:[form.creditCardCVV]
          />
        </div>
      </div>
    </div>
    <div class="container-checkout__fields__form__full-name">
      <label class="label">Nome impresso no cartão</label>
      <div class="control">
        <input
          name="fullName"
          v-model="form.fullName.value"
          class="input"
          type="text"
          placeholder="Seu nome"
        />
      </div>
    </div>
    <div class="container-checkout__fields__form__cpf">
      <label class="label">CPF</label>
      <div class="control">
        <input
          name="cpf"
          v-model="form.cpf.value"
          class="input"
          type="text"
          placeholder="000.000.000-00"
          v-maska:[form.cpf]
        />
      </div>
    </div>
    <div class="container-checkout__fields__form__discount-coupon">
      <label class="label">Cupom</label>
      <div class="control">
        <input
          name="cpf"
          v-model="form.discountCouponCode.value"
          class="input"
          type="text"
          placeholder="Insira aqui"
        />
      </div>
    </div>
    <div class="container-checkout__fields__form__installments">
      <label class="label">Número de parcelas</label>
      <div class="control">
        <div class="select">
          <select v-model="form.installments.value">
            <option disabled selected hidden value="">Selecionar</option>
            <option
              v-for="option in installmentsByOffers"
              v-bind:value="option.value"
            >
              {{ option.text }}
            </option>
          </select>
        </div>
      </div>
    </div>
    <div class="container-checkout__fields__form__submit">
      <div class="control">
        <button>Finalizar pagamento</button>
      </div>
    </div>
  </form>
</template>
<script setup lang="ts">
import { reactive, computed } from 'vue';
import { useCheckout } from '@/stores/checkout.store';
import { moneyFormatter } from '@/utils/formatters.util';

const store = useCheckout();

const installmentsByOffers = computed(() => {
  const instalments = [];

  if (store.offerSelected && store.offerSelected.installments) {
    const totalInstallments = store.offerSelected.installments;
    for (let i = 1; i <= totalInstallments; i++) {
      const installmentPrice = moneyFormatter(
        (store.offerSelected.fullPrice - store.offerSelected.discountAmmount) /
          i,
        {
          locale: 'pt-BR',
          currency: 'BRL',
        }
      );
      instalments.push({
        value: i,
        text: `${i}x de ${installmentPrice}`,
      });
    }
  }
  return instalments;
});

const form = reactive({
  cardNumber: {
    mask: '#### #### #### ####',
    value: '',
  },
  creditCardExpirationDate: {
    mask: '##/##',
    value: '',
  },
  creditCardCVV: {
    mask: '###',
    value: '',
  },
  fullName: {
    value: '',
  },
  cpf: {
    mask: '###.###.###-##',
    value: '',
  },
  discountCouponCode: {
    value: '',
  },
  installments: {
    value: '',
  },
});
</script>
<style lang="scss" scoped>
.container-checkout__fields__form {
  display: flex;
  flex-direction: column;
  gap: 24px;
  &__fields-card-number {
    display: flex;
    gap: 24px;
  }
  &__submit {
    margin-bottom: 12px;
  }
}
</style>
