<template>
  <div class="container-checkout">
    <div class="container-checkout__fields">
      <h4 class="container-checkout__fields__title">Estamos quase lá!</h4>
      <span class="container-checkout__fields__subtitle"
        >Insira seus dados de pagamento abaixo:</span
      >
      <img
        class="container-checkout__fields__payments"
        src="@/assets/formas-de-pagamento.png"
        width="215"
        height="50"
      />
      <FormFieldsPayment />
    </div>
    <div class="container-checkout__offer">
      <h4 class="container-checkout__offer__title">Confira o seu plano:</h4>
      <div class="container-checkout__offer__email">
        <span>fulano@cicrano.com.br</span>
      </div>
      <OfferSelect />
    </div>
    <VLoading v-if="loading" />
  </div>
</template>
<script setup lang="ts">
  import FormFieldsPayment from '@/components/Checkout/FormFieldsPayment.vue'
  import VLoading from '@/components/Shared/VLoading.vue'
  import OfferSelect from '@/components/Checkout/OfferSelect.vue'
  import { useAsyncAction } from '@/composables/use-async'
  import { useCheckout } from '@/stores/checkout.store'
  import { onMounted } from 'vue'

  const store = useCheckout()
  const { start: fetchOffer, loading } = useAsyncAction(() =>
    store.fetchOffer()
  )
  onMounted(async () => await fetchOffer())
</script>
<style lang="scss" scoped>
  .container-checkout {
    height: 100%;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: 1fr;
    @media (max-width: 800px) {
      grid-template-columns: 1fr;
      grid-template-rows: auto 1fr;
      &__offer {
        grid-row-start: 1;
        margin-bottom: 24px;
      }
    }

    &__fields,
    &__offer {
      display: flex;
      flex-direction: column;
      min-width: 350px;
      justify-self: center;
      padding: 0 24px;
      &__title,
      &__subtitle {
        margin-bottom: 8px;
      }
      &__payments {
        align-self: center;
        margin: 24px 0;
      }
      &__email {
        span {
          border: 1px solid #f4f3f6;
          border-radius: 12px;
          width: auto;
          padding: 0 8px;
          font-size: 12px;
        }
        margin-bottom: 12px;
      }
    }
  }
</style>
