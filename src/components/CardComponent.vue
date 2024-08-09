<script setup>
import { provide } from 'vue';

defineProps({
  id: Number,
  imageUrl: String,
  title: String,
  price: Number,
  sizes: Array,
  isFavorite: Boolean,
  isAdded: Boolean,
  onClickAdd: Function,
  onClickFavorite: Function
});

let selected = '';
provide('selected', selected);
</script>

<template>
  <div
    class="relative bg-white border border-slate-100 rounded-3xl p-8 cursor-pointer transition hover:-translate-y-2 hover:shadow-xl"
  >
    <img
      v-show="onClickFavorite"
      :src="!isFavorite ? './like-1.svg' : './like-2.svg'"
      alt="Like 1 logo"
      class="absolute top-8 left-8 fill-black"
      @click="onClickFavorite"
    />
    <img :src="imageUrl" alt="Sneaker logo" />
    <p class="mt-2">{{ title }}</p>

    <div class="flex justify-between mt-5">
      <div class="flex flex-col">
        <span class="text-slate-400">Цена:</span>
        <b>{{ price }} руб.</b>
        <select name="sizes" id="sizes" v-model="selected">
          <option disabled value="">Размер</option>
          <option v-for="size in sizes" :key="size" :value="size">{{ size }}</option>
        </select>
      </div>
      <img
        v-show="onClickAdd"
        @click="onClickAdd"
        :src="!isAdded ? './plus.svg' : './checked.svg'"
        alt="Plus logo"
      />
    </div>
  </div>
</template>
