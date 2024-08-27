<script setup>
import { ref, watch, provide, computed, inject } from 'vue';

import HeaderComponent from './components/HeaderComponent.vue';
import DrawerComponent from './components/DrawerComponent.vue';

const cart = ref([]);

const drawerOpen = ref(false);

const selectedSize = ref('');
const handleSelectSize = (size) => {
  selectedSize.value = size;
};

const sizeSelection = (event) => {
  selectedSize.value.unshift(event.target.value);
};

const totalPrice = computed(() => cart.value.reduce((acc, item) => acc + item.price, 0));
const vatPrice = computed(() => Math.round((totalPrice.value * 5) / 100));

//Корзина начало

const addToCart = (item) => {
  if (selectedSize.value.length === 0) {
    alert('Пожалуйста выберете размер');
    return;
  } else {
    item.selectedSize = selectedSize.value;
    cart.value.push(item);
    item.isAdded = true;
    selectedSize.value = [];
  }
};

const removeFromCart = (item) => {
  cart.value.splice(cart.value.indexOf(item), 1);
  item.isAdded = false;
};

const clearSelectedSize = () => {
  selectedSize.value = '';
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

const isLogin = inject('isLogin');

provide('cart', {
  cart,
  totalPrice,
  closeDrawer,
  openDrawer,
  addToCart,
  removeFromCart
});

provide('isLogin', isLogin);

provide('selectedSize', selectedSize);
provide('handleSelectSize', handleSelectSize);
provide('clearSelectedSize', clearSelectedSize);
// provide('modalDrawer', modalDrawer);

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
        <RouterView />
      </div>
    </div>
  </div>
</template>

<style scoped></style>
