<script setup>
import { inject } from 'vue';
import CartItemComp from './CartItemComp.vue';

const { cart, removeFromCart } = inject('cart');
//get selectedSizes from local storage

const selectedSizes = JSON.parse(localStorage.getItem('selectedSizes')) || [];
</script>

<template>
  <div v-auto-animate class="flex flex-col flex-1 gap-4">
    <CartItemComp
      v-for="(item, index) in cart"
      :key="item.id"
      :title="item.title"
      :selected-size="selectedSizes[index]"
      :price="item.price"
      :image-url="item.imageUrl"
      @on-click-remove="() => removeFromCart(item)"
    />
  </div>
</template>
