<script setup>
import { inject } from 'vue';

defineProps({
  title: String,
  description: String,
  imageUrl: String
});

const { closeDrawer } = inject('cart');
</script>

<template>
  <div class="flex flex-col items-center text-center w-72 mx-auto">
    <img class="w-20 h-20" :src="imageUrl" alt="Info image" />
    <h2 class="mt-4 text-2xl font-medium">{{ title }}</h2>
    <p class="text-gray-400 mt-2">{{ description }}</p>
    <button
      @click="closeDrawer"
      class="mt-4 bg-lime-500 w-full rounded-xl py-3 text-white transition disabled:bg-slate-400 hover:bg-lime-600 active:bg-lime-700 cursor-pointer"
    >
      <!-- <svg
        class="opacity-30 cursor-pointer rotate-180 fill-white hover:opacity-100 transition hover:-translate-x-1"
        width="16"
        height="14"
        viewBox="0 0 16 14"
        fill="white"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fill="white"
          d="M1 7H14.7143"
          stroke="black"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M8.71436 1L14.7144 7L8.71436 13"
          stroke="black"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg> -->
      Вернуться к заказам
    </button>
  </div>
</template>
