<script setup>
import { inject, ref } from 'vue';

const props = defineProps({
  items: Array
});

const open = ref(false);

const { cart, totalPrice, closeDrawer, openDrawer, addToCart, removeFromCart } = inject('cart');
const { selectedSize } = inject('selectedSize');

const handleSelectSize = (size) => {
  selectedSize.value = size;
  closeDrawer();
};
</script>

<template>
  <div>
    <button class="text-black" @click="open = true">Открыть модальное окно</button>
    <div v-show="open">
      <div
        @click="open = false"
        class="flex justify-center fixed top-0 left-0 h-full w-full bg-black z-10 opacity-70"
      ></div>
      <div
        class="bg-white rounded-xl shadow-xl w-full h-auto fixed bottom-0 mb-5 z-20 p-4 max-md: w-full mb-0 rounded-none"
      >
        <div class="flex flex-col flex-wrap align-center max-md:text-center">
          <p class="text-black mb-4 mt-2">Выберите размер</p>
          <ul class="flex justify-left gap-2 flex-wrap w-full h-auto max-md:justify-center">
            <li
              class="flex justify-center align-center relative bg-white border border-slate-100 w-11 h-11 rounded-full p-2 cursor-pointer transition hover:-translate-y-2 hover:shadow-xl"
              v-for="item in props.items"
              :key="item.id"
            >
              {{ item }}
            </li>
          </ul>
          <button class="text-black" @click="open = false">Закрыть</button>
        </div>
      </div>
    </div>
  </div>
</template>
