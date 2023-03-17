<template>
  <div class="container-checkout">
    <div class="container-checkout__fields">
      <h4>Estamos quase lá!</h4>
      <span>Insira seus dados de pagamento abaixo:</span>
      <img src="@/assets/bandeiras-cartoes.png" width="215" height="24" />
      <section class="container-checkout__fields__form">
        <FormFieldsPayment />
      </section>
    </div>
    <div class="container-checkout__offer">
      <h4>Confira o seu plano:</h4>
      <span>fulano@cicrano.com.br</span>
      <section class="container-checkout__offer__list">
        <OfferSelect />
      </section>
    </div>
  </div>
</template>
<script setup lang="ts">
import FormFieldsPayment from '@/components/FormFieldsPayment.vue';
import OfferSelect from '@/components/OfferSelect.vue';
</script>
<style lang="scss">
.selecao {
  display: flex;
}
.desciptions {
  display: flex;
  flex-direction: column;
}
.container-checkout {
  height: 100%;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: 1fr;
  &__fields,
  &__offer {
    display: flex;
    flex-direction: column;
    min-width: 350px;
    justify-self: center;
  }
}
</style>
