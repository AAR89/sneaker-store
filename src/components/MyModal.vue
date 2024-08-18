<script setup>
import { inject, ref } from 'vue';

const { addToCart, itemsArr } = inject('cart');

const selectedSize = ref('');
const handleSelectSize = (size) => {
  selectedSize.value = size;
  console.log(selectedSize.value); //   closeDrawer();
};
const openModalDrawer = inject('openModalDrawer');
</script>

<template>
  <div>
    <!-- <button class="text-black" @click="modalDrawer = true">Открыть модальное окно</button> -->
    <div>
      <div
        @click="openModalDrawer"
        class="flex justify-center fixed top-0 left-0 h-full w-full bg-black z-10 opacity-70"
      ></div>
      <div
        class="bg-white rounded-xl shadow-xl w-full h-auto fixed bottom-0 mb-5 z-20 p-4 max-md: w-full mb-0 rounded-none"
      >
        <div class="flex flex-col flex-wrap align-center max-md:text-center">
          <p class="text-black mb-4 mt-2 text-xl font-bold">Выберите размер</p>
          <ul class="flex justify-left gap-2 flex-wrap w-full h-auto max-md:justify-center">
            <li
              class="flex justify-center align-center text-gray-500 cursor-pointer relative bg-white border border-slate-100 w-11 h-11 rounded-full p-2 cursor-pointer transition hover:-translate-y-2 hover:shadow-xl"
              v-for="(item, index) in itemsArr"
              :key="item.id"
              @click="handleSelectSize(itemsArr[index].size)"
              :class="{
                'border-red-500': itemsArr[index].clicked,
                'text-red-500': itemsArr[index].clicked
              }"
            >
              {{ itemsArr[index].size }}
            </li>
          </ul>
          <button class="text-black" @click="addToCart">Добавить в корзину</button>
        </div>
      </div>
    </div>
  </div>
</template>
