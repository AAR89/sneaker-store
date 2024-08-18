<script setup>
import { ref, watch, provide, computed, inject } from 'vue';

import HeaderComponent from './components/HeaderComponent.vue';
import DrawerComponent from './components/DrawerComponent.vue';
import MyModal from './components/MyModal.vue';

const cart = ref([]);

const drawerOpen = ref(false);

const selectedSize = ref(inject('selectedSize'));

const sizeSelection = (event) => {
  selectedSize.value.unshift(event.target.value);
  console.log(selectedSize.value);
};

provide('selectedSize', selectedSize);

const totalPrice = computed(() => cart.value.reduce((acc, item) => acc + item.price, 0));
const vatPrice = computed(() => Math.round((totalPrice.value * 5) / 100));

//Корзина начало

const addToCart = (items) => {
  items.selectedSize = selectedSize.value;
  cart.value.push(items);
  items.isAdded = true;
  selectedSize.value = [];
  setTimeout(() => {
    items.isAdded = false;
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
    localStorage.setItem('cart', JSON.stringify(cart.value));
  },
  { deep: true }
);

const itemsArr = [
  { size: 38.5, clicked: false },
  { size: 39, clicked: false },
  { size: 39.5, clicked: false },
  { size: 40, clicked: false },
  { size: 40.5, clicked: false },
  { size: 41, clicked: false },
  { size: 41.5, clicked: false },
  { size: 42, clicked: false },
  { size: 42.5, clicked: false },
  { size: 43, clicked: false },
  { size: 43.5, clicked: false },
  { size: 44, clicked: false },
  { size: 44.5, clicked: false },
  { size: 45, clicked: false },
  { size: 45.5, clicked: false },
  { size: 46, clicked: false },
  { size: 46.5, clicked: false },
  { size: 47, clicked: false },
  { size: 47.5, clicked: false },
  { size: 48, clicked: false },
  { size: 48.5, clicked: false }
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

const modalDrawer = ref(false);

const openModalDrawer = () => {
  modalDrawer.value = !modalDrawer.value;
  console.log(modalDrawer.value);
};

provide('openModalDrawer', openModalDrawer);

//Корзина конец
</script>

<template>
  <div>
    <MyModal v-show="modalDrawer" />

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
