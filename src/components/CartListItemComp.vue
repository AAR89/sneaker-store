<script setup>
import { inject } from 'vue';
import CartItemComp from './CartItemComp.vue';

const { cart, removeFromCart } = inject('cart');
</script>

<template>
  <div v-auto-animate class="flex flex-col flex-1 gap-4">
    <CartItemComp
      v-for="item in cart"
      :key="item.id"
      :title="item.title"
      :price="item.price"
      :selected-size="item.selectedSize"
      :image-url="item.imageUrl"
      @on-click-remove="() => removeFromCart(item)"
    />
  </div>
</template>
