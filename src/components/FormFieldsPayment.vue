<template>
  <form>
    <div class="container-checkout__fields__form__card-number">
      <label class="label">Número do cartão</label>
      <div class="control">
        <input
          name="cardNumber"
          v-model="options.cardNumber.value"
          class="input"
          type="text"
          placeholder="0000 0000 0000 0000"
          v-maska:[options.cardNumber]
        />
      </div>
    </div>
    <div class="container-checkout__fields__form__fields-card-number">
      <label class="label">Validade</label>
      <div class="control">
        <input
          v-model="options.creditCardExpirationDate.value"
          name="cardNumber"
          class="input"
          type="text"
          placeholder="MM/AA"
          v-maska:[options.creditCardExpirationDate]
        />
      </div>
      <label class="label">CVV</label>
      <div class="control">
        <input
          name="creditCardCVV"
          v-model="options.creditCardCVV.value"
          class="input"
          type="text"
          placeholder="000"
          v-maska:[options.creditCardCVV]
        />
      </div>
    </div>
    <div class="container-checkout__fields__form__full-name">
      <label class="label">Nome impresso no cartão</label>
      <div class="control">
        <input
          name="fullName"
          v-model="options.fullName.value"
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
          v-model="options.cpf.value"
          class="input"
          type="text"
          placeholder="000.000.000-00"
          v-maska:[options.cpf]
        />
      </div>
    </div>
    <div class="container-checkout__fields__form__discount-coupon">
      <label class="label">Cupom</label>
      <div class="control">
        <input
          name="cpf"
          v-model="options.discountCouponCode.value"
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
          <select v-model="options.installments.value">
            <option disabled value="">Selecionar</option>
            <option
              v-for="option in [
                { value: '1', text: '1x' },
                { value: '2', text: '2x' },
              ]"
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
import { ref, reactive } from 'vue';

const options = reactive({
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
