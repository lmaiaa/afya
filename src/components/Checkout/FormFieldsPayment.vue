<template>
  <form
    ref="formCheckout"
    class="container-checkout__fields__form"
    @submit.prevent="subscribe($event)"
  >
    <div class="container-checkout__fields__form__card-number">
      <VInput
        label="Número do cartão"
        class="input"
        type="text"
        placeholder="0000 0000 0000 0000"
        :maskOptions="cardNumber"
        v-model="cardNumber.value"
        :messageError="cardNumber.messageError"
      />
    </div>
    <div class="container-checkout__fields__form__fields-card-number">
      <div
        class="container-checkout__fields__form__fields-card-number__expiration-date"
      >
        <VInput
          label="Validade"
          v-model="creditCardExpirationDate.value"
          name="creditCardExpirationDate"
          class="input"
          type="text"
          placeholder="MM/AA"
          :maskOptions="creditCardExpirationDate"
          :messageError="creditCardExpirationDate.messageError"
        />
      </div>
      <div class="container-checkout__fields__form__fields-card-number__cvv">
        <VInput
          label="CVV"
          v-model="creditCardCVV.value"
          name="creditCardCVV"
          class="input"
          type="text"
          placeholder="000"
          :maskOptions="creditCardCVV"
        />
      </div>
    </div>
    <div class="container-checkout__fields__form__full-name">
      <VInput
        label="Nome impresso no cartão"
        v-model="fullName"
        name="fullName"
        class="input"
        type="text"
        placeholder="Seu nome"
      />
    </div>
    <div class="container-checkout__fields__form__cpf">
      <VInput
        label="CPF"
        name="cpf"
        v-model="cpf.value"
        class="input"
        type="text"
        placeholder="000.000.000-00"
        :maskOptions="cpf"
        :messageError="cpf.messageError"
      />
    </div>
    <div class="container-checkout__fields__form__discount-coupon">
      <VInput
        label="Cupom"
        name="discountCouponCode"
        v-model="discountCouponCode"
        class="input"
        type="text"
        placeholder="Insira aqui"
      />
    </div>
    <div class="container-checkout__fields__form__installments">
      <label class="label">Número de parcelas</label>
      <div class="select">
        <select v-model="installments">
          <option disabled selected hidden :value="0">Selecionar</option>
          <option
            v-for="option in installmentsByOffers"
            v-bind:value="option.value"
          >
            {{ option.text }}
          </option>
        </select>
      </div>
    </div>
    <div class="alert-error" v-if="messageErrorSubscribe">
      <span>{{ messageErrorSubscribe }}</span>
    </div>
    <div class="container-checkout__fields__form__submit">
      <div class="control">
        <button>Finalizar pagamento</button>
      </div>
    </div>
  </form>
  <Loading v-if="loading" />
</template>
<script setup lang="ts">
import { reactive, computed, watch, ref } from 'vue';
import { useCheckout } from '@/stores/checkout.store';
import { moneyFormatter } from '@/utils/formatters.util';
import { SubscriptionPayload } from '@/types/subscription.types';
import { MaskaDetail } from 'maska';
import { useRouter } from 'vue-router';
import { useAsyncAction } from '@/composables/use-async';
import Loading from '../Shared/Loading.vue';
import VInput from '../Shared/VInput.vue';
import {
  validateCpf,
  validateCardNumber,
  validDateExpire,
} from '@/utils/form-validations.util';

interface DataFormValidate {
  mask: string;
  value: string;
  messageError: string;
  unmasked?: string;
}
const store = useCheckout();
const router = useRouter();
const { start: sendSubscription, loading } = useAsyncAction(
  (partialPayload: Omit<SubscriptionPayload, 'offerId'>) =>
    store.sendSubscription(partialPayload)
);
const messageErrorSubscribe = ref('');
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
const cpf = reactive({
  mask: '###.###.###-##',
  onMaska: (detail: MaskaDetail) => (cpf.unmasked = detail.unmasked),
  unmasked: '',
  value: '',
  messageError: '',
});
const cardNumber = reactive({
  mask: '#### #### #### ####',
  onMaska: (detail: MaskaDetail) => (cardNumber.unmasked = detail.unmasked),
  unmasked: '',
  value: '',
  messageError: '',
});
const creditCardExpirationDate = reactive({
  mask: '##/##',
  value: '',
  messageError: '',
});
const creditCardCVV = reactive({
  mask: '###',
  value: '',
});
const fullName = ref('');
const discountCouponCode = ref('');
const installments = ref(0);

function validateField(val: DataFormValidate, validation: Function) {
  const dataToValidate = val.unmasked ? val.unmasked : val.value;
  const validatePassed = validation(dataToValidate);
  if (typeof validatePassed === 'object' && val.value.length > 0) {
    return (val.messageError = validatePassed[0]);
  }
  if (typeof validatePassed === 'string' && val.value.length > 0) {
    return (val.messageError = validatePassed);
  }
  return (val.messageError = '');
}

watch(cpf, () => {
  validateField(cpf, validateCpf);
});
watch(cardNumber, () => {
  validateField(cardNumber, validateCardNumber);
});
watch(creditCardExpirationDate, () => {
  validateField(creditCardExpirationDate, validDateExpire);
});
async function subscribe(e: Event) {
  e.preventDefault();
  loading.value = true;
  const fieldsRequired: Omit<
    SubscriptionPayload,
    'offerId' | 'couponCode' | 'gateway' | 'userId'
  > = {
    creditCardNumber: cardNumber.unmasked,
    creditCardExpirationDate: creditCardExpirationDate.value,
    creditCardCVV: creditCardCVV.value,
    creditCardHolder: fullName.value,
    creditCardCPF: cpf.unmasked,
    installments: installments.value,
  };
  const validPayload = !Object.values(fieldsRequired).includes('' || 0);

  if (validPayload) {
    const partialPayload: Omit<SubscriptionPayload, 'offerId'> = {
      ...fieldsRequired,
      couponCode: discountCouponCode.value,
      gateway: 'iugu',
      userId: 1,
    };

    const response = await sendSubscription(partialPayload);
    if (response) router.push(`/resume/${response.id}`);
    loading.value = false;
  } else {
    messageErrorSubscribe.value = 'Preencha todos os campos';
    loading.value = false;
  }
}
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
  .alert-error {
    display: flex;
    justify-content: center;
    background: #d43232;
    border-radius: 5px;
    color: white;
  }
}
</style>
