<script setup>
defineProps({
  id: Number,
  imageUrl: String,
  title: String,
  price: Number,
  isFavorite: Boolean,
  isAdded: Boolean,
  onClickAdd: Function,
  onClickFavorite: Function
});
</script>

<template>
  <div
    class="relative bg-white border border-slate-100 rounded-3xl p-8 cursor-pointer transition hover:-translate-y-2 hover:shadow-xl"
  >
    <img
      :src="!isFavorite ? '/sneaker-store/logos/like-1.svg' : '/sneaker-store/logos/like-2.svg'"
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
      </div>
      <img
        @click="onClickAdd"
        :src="!isAdded ? '/sneaker-store/logos/plus.svg' : '/sneaker-store/logos/checked.svg'"
        alt="Plus logo"
      />
    </div>
  </div>
</template>
