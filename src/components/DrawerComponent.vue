<script setup>
import { inject } from 'vue';
import CartListItemComp from './CartListItemComp.vue';
import DrawerHeadComp from './DrawerHeadComp.vue';
const { closeDrawer } = inject('cart');
</script>

<template>
  <div>
    <div
      @click="closeDrawer"
      class="fixed top-0 left-0 h-full w-full bg-black z-10 opacity-70"
    ></div>
    <div class="bg-white w-96 h-full fixed right-0 top-0 z-20 p-8 max-md:w-full">
      <DrawerHeadComp />
      <CartListItemComp />

      <div class="flex flex-col gap-4 mt-7">
        <div class="flex gap-2">
          <span>Итого:</span>
          <div class="flex-1 border-b border-dashed"></div>
          <b>12900 руб.</b>
        </div>

        <div class="flex gap-2">
          <span>Налог:</span>
          <div class="flex-1 border-b border-dashed"></div>
          <b>900 руб.</b>
        </div>

        <button
          disabled=""
          class="mt-4 bg-lime-500 w-full rounded-xl py-3 text-white transition disabled:bg-slate-400 hover:bg-lime-600 active:bg-lime-700 cursor-pointer"
        >
          Оформить заказ
        </button>
      </div>
    </div>
  </div>
</template>