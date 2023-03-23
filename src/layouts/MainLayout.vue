<template>
  <div class="container-layout">
    <header class="container-layout__header">
      <svg-icon
        type="mdi"
        :path="mdiChevronLeft"
        class="container-layout__header__icon-back"
        style="cursor: pointer"
        @click="$route.path !== '/' ? $router.back() : null"
      ></svg-icon>
      <img
        src="@/assets/logo.png"
        class="container-layout__header__logo"
        width="40"
        height="30"
      />
    </header>
    <main class="container-layout__main">
      <RouterView />
    </main>
  </div>
</template>

<script setup lang="ts">
  import { RouterView } from 'vue-router'
  import SvgIcon from '@jamescoyle/vue-icon'
  import { mdiChevronLeft } from '@mdi/js'
</script>
<style lang="scss">
  .container-layout {
    width: 100%;
    height: 100vh;
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: 1fr 10fr;
    &__header {
      width: 100%;
      background-color: #fff;
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      grid-template-rows: 1fr;
      align-items: center;
      &__icon-back {
        margin-left: 24px;
      }
      &__logo {
        justify-self: center;
      }
    }
    &__main {
      overflow-x: hidden;
    }
  }
</style>
