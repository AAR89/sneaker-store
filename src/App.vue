<script setup>
import { ref, watch, provide, computed } from 'vue';

import HeaderComponent from './components/HeaderComponent.vue';
import DrawerComponent from './components/DrawerComponent.vue';

const cart = ref([]);

const drawerOpen = ref(false);

const selectedSize = ref('');
const handleSelectSize = (size) => {
  selectedSize.value = size;
  console.log(selectedSize.value); //   closeDrawer();
};

const sizeSelection = (event) => {
  selectedSize.value.unshift(event.target.value);
  console.log(selectedSize.value);
};

provide('selectedSize', selectedSize);
provide('handleSelectSize', handleSelectSize);

const totalPrice = computed(() => cart.value.reduce((acc, item) => acc + item.price, 0));
const vatPrice = computed(() => Math.round((totalPrice.value * 5) / 100));

//Корзина начало

const addToCart = (items) => {
  cart.value.push(items);
  items.isAdded = true;
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

const itemsArr = [
  { size: 38.5, isClicked: false },
  { size: 39, isClicked: false },
  { size: 39.5, isClicked: false },
  { size: 40, isClicked: false },
  { size: 40.5, isClicked: false },
  { size: 41, isClicked: false },
  { size: 41.5, isClicked: false },
  { size: 42, isClicked: false },
  { size: 42.5, isClicked: false },
  { size: 43, isClicked: false },
  { size: 43.5, isClicked: false },
  { size: 44, isClicked: false },
  { size: 44.5, isClicked: false },
  { size: 45, isClicked: false },
  { size: 45.5, isClicked: false },
  { size: 46, isClicked: false },
  { size: 46.5, isClicked: false },
  { size: 47, isClicked: false },
  { size: 47.5, isClicked: false },
  { size: 48, isClicked: false },
  { size: 48.5, isClicked: false }
];

provide('cart', {
  cart,
  totalPrice,
  closeDrawer,
  openDrawer,
  addToCart,
  removeFromCart,
  itemsArr
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
        <RouterView
          v-model="selectedSize"
          @change="sizeSelection"
          :openModalDrawer="openModalDrawer"
        />
      </div>
    </div>
  </div>
</template>

<style scoped></style>
