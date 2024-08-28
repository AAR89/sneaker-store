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
      class="flex items-center justify-center gap-3 mt-4 bg-green-500 w-auto rounded-xl py-3 px-6 text-white transition disabled:bg-slate-400 hover:bg-green-600 active:bg-green-700 cursor-pointer"
    >
      <svg
        class="cursor-pointer rotate-180 hover:transition hover:-translate-x-1"
        width="16"
        height="14"
        viewBox="0 0 16 14"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fill="white"
          d="M1 7H14.7143"
          stroke="white"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M8.71436 1L14.7144 7L8.71436 13"
          stroke="white"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
      Вернуться к заказам
    </button>
  </div>
</template>
