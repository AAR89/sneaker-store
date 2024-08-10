<script setup>
import { ref, watch, provide, computed, onMounted, inject } from 'vue';

import firstChild from './components/firstChild.vue';
import secondChild from './components/secondChild.vue';
import HeaderComponent from './components/HeaderComponent.vue';
import DrawerComponent from './components/DrawerComponent.vue';

const cart = ref([]);

const drawerOpen = ref(false);

const totalPrice = computed(() => cart.value.reduce((acc, item) => acc + item.price, 0));
const vatPrice = computed(() => Math.round((totalPrice.value * 5) / 100));

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

watch(
  cart,
  () => {
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
  removeFromCart
});

//Корзина конец

const size = ref('[]');

const sizeSelection = (event) => {
  size.value = event.target.value;
  console.log(size.value);
};

provide('size', size);
</script>

<template>
  <div>
    <!-- <DrawerComponent
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
        <RouterView />
      </div>
    </div> -->
    <div class="flex flex-col w-[30%] gap-2 m-auto mt-2">
      {{ size }}
      <firstChild v-model="size" @change="sizeSelection"></firstChild>
      <secondChild :size="size" />
    </div>
  </div>
</template>

<style scoped></style>
