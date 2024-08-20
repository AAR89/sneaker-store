<script setup>
import { inject, provide, ref } from 'vue';
defineProps({
  // items: Array
});

const { itemsArr, addToCart, removeFromCart } = inject('cart');
const openModalDrawer = inject('openModalDrawer');
const onClickAddPlus = inject('onClickAddPlus');
const items = inject('items');

const selectedSize = ref('');
const handleSelectSize = (item) => {
  selectedSize.value = event;
  // item.isClicked = true;
  console.log(selectedSize.value);
  // console.log(item.isClicked);
  // console.log(item);
};

const arr = [
  { sizes: [38.5, 39, 39.5, 40, 40.5, 41, 41.5, 42, 42.5, 43, 43.5, 44, 44.5, 45, 45.5, 46] }
];

provide('selectedSize', selectedSize);
</script>

<template>
  <div>
    <!-- <div @click="openModalDrawer" class="fixed top-0 left-0 h-full w-full bg-black z-10 opacity-90"> -->
    <div
      class="bg-lime-500 shadow-xl w-full h-auto fixed bottom-0 left-0 z-20 p-4 !opacity-100 max-md: w-full mb-0 rounded-none"
    >
      <div class="flex flex-col flex-wrap align-center max-md:text-center">
        <div class="flex justify-between">
          <p class="text-black mb-4 mt-2 text-xl font-bold">Выберите размер</p>
          <button @click="openModalDrawer">Закрыть</button>
        </div>
        <ul class="flex justify-left gap-2 flex-wrap w-full h-auto max-md:justify-center">
          <li
            class="flex justify-center align-center text-gray-500 cursor-pointer relative bg-white border border-slate-100 w-11 h-11 rounded-full p-2 cursor-pointer transition active:bg-emerald-200 active:text-white hover:-translate-y-2 hover:shadow-xl"
            v-for="item in arr[0].sizes"
            :key="item"
            @click="handleSelectSize(items)"
          >
            {{ item }}
          </li>
        </ul>
        <button class="text-black" @click="onClickAddPlus(item)">Добавить в корзину</button>
      </div>
    </div>
    <!-- </div> -->
  </div>
</template>
