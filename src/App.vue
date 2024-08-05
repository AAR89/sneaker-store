<script setup>
import { ref, watch, provide, computed } from 'vue';
import axios from 'axios';

import HeaderComponent from './components/HeaderComponent.vue';
import DrawerComponent from './components/DrawerComponent.vue';

const cart = ref([]);
const isCreatingOrder = ref(false);

const drawerOpen = ref(false);

const totalPrice = computed(() => cart.value.reduce((acc, item) => acc + item.price, 0));
const vatPrice = computed(() => Math.round((totalPrice.value * 5) / 100));
const cartIsEmpty = computed(() => cart.value.length === 0);

const cartButtonDisabled = computed(() => isCreatingOrder.value || cartIsEmpty.value);

//Корзина начало

const addToCart = (item) => {
  cart.value.push(item);
  item.isAdded = true;
};

const removeFromCart = (item) => {
  cart.value.splice(cart.value.indexOf(item), 1);
  item.isAdded = false;
};

const closeDrawer = () => {
  drawerOpen.value = false;
};

const openDrawer = () => {
  drawerOpen.value = true;
};

const createOrder = async () => {
  try {
    isCreatingOrder.value = true;
    const { data } = await axios.post('https://8e61f9ea046fe2d1.mokky.dev/orders', {
      items: cart.value,
      totalPrice: totalPrice.value
    });
    cart.value = [];

    return data;
  } catch (err) {
    console.log(err);
  } finally {
    isCreatingOrder.value = false;
  }
};

watch(
  cart,
  () => {
    localStorage.setItem('cart', JSON.stringify(cart.value));
  },
  { deep: true }
);

provide('cart', {
  cart,
  closeDrawer,
  openDrawer,
  addToCart,
  removeFromCart
});

//Корзина конец
</script>

<template>
  <div>
    <DrawerComponent
      v-if="drawerOpen"
      :total-price="totalPrice"
      :vat-price="vatPrice"
      @create-order="createOrder"
      :button-disabled="cartButtonDisabled"
    />
    <div
      class="bg-white flex flex-col w-4/5 m-auto rounded-xl shadow-xl mt-14 max-md:mt-4 w-11/12 justify-center"
    >
      <HeaderComponent :total-price="totalPrice" @open-drawer="openDrawer" />
      <div class="p-10">
        <RouterView />
      </div>
    </div>
  </div>
</template>

<style scoped></style>
