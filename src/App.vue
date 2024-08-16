<script setup>
import { ref, watch, provide, computed } from 'vue';

import HeaderComponent from './components/HeaderComponent.vue';
import DrawerComponent from './components/DrawerComponent.vue';

const cart = ref([]);

const drawerOpen = ref(false);

const selectedSize = ref([]);

const sizeSelection = (event) => {
  selectedSize.value.push(event.target.value);
  console.log('currentSize = ', selectedSize.value);
};

provide('selectedSize', selectedSize);

const totalPrice = computed(() => cart.value.reduce((acc, item) => acc + item.price, 0));
const vatPrice = computed(() => Math.round((totalPrice.value * 5) / 100));

//Корзина начало

const addToCart = (item) => {
  item.selectedSize = selectedSize.value;
  item.isAdded = true;
  cart.value.push(item);
  selectedSize.value = [];
  setTimeout(() => {
    item.isAdded = false;
  }, 3000);
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

watch(
  cart,
  () => {
    cart.value.selectedSize = selectedSize.value;
    console.log('cart.value.selectedSize=', cart.value.selectedSize);
    console.log('cart.value=', cart.value);
    localStorage.setItem('cart', JSON.stringify(cart.value));
  },
  { deep: true }
);

provide('cart', {
  cart,
  totalPrice,
  closeDrawer,
  openDrawer,
  addToCart,
  removeFromCart,
  selectedSize
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
      @sizeSelection="sizeSelection"
    />
    <div
      class="bg-white flex flex-col w-4/5 m-auto rounded-xl shadow-xl mt-14 max-md:mt-4 mb-4 w-[95%] justify-center"
    >
      <HeaderComponent :total-price="totalPrice" @open-drawer="openDrawer" />
      <div class="p-10">
        <RouterView v-model="selectedSize" @change="sizeSelection" />
      </div>
    </div>
  </div>
</template>

<style scoped></style>
