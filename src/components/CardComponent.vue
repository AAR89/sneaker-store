<script setup>
import { inject, ref } from 'vue';

defineProps({
  id: Number,
  imageUrl: String,
  title: String,
  price: Number,
  sizes: Array,
  isFavorite: Boolean,
  isAdded: Boolean,
  onClickAdd: Function,
  onClickFavorite: Function,
  modelValue: {
    type: Number,
    requigreen: true
  }
});

const handleSelectSize = inject('handleSelectSize');
let clearSelectedSize = inject('clearSelectedSize');

const modalDrawer = ref(false);
const openModalDrawer = () => {
  modalDrawer.value = !modalDrawer.value;
};

const activeEl = ref(0);

const modalDrawerFalse = () => {
  modalDrawer.value = false;
  activeEl.value = 0;
};
</script>

<template>
  <div>
    <div
      @mouseleave="
        clearSelectedSize();
        modalDrawerFalse();
      "
      class="flex flex-col relative bg-white border border-slate-100 rounded-3xl p-8 cursor-pointer transition hover:-translate-y-2 hover:shadow-xl"
    >
      <img
        v-show="onClickFavorite"
        :src="!isFavorite ? './like-1.svg' : './like-2.svg'"
        alt="Like 1 logo"
        class="absolute top-8 left-8 fill-black"
        @click="onClickFavorite"
      />
      <img :src="imageUrl" alt="Sneaker logo" class="h-5/6" />
      <p class="mt-2">{{ title }}</p>

      <div class="flex justify-between mt-2 items-end">
        <div class="flex gap-4 justify-center items-center">
          <div class="flex flex-col">
            <span class="text-slate-400">Цена:</span>
            <div class="flex justify-between gap-2 text-m">
              <b class="flex flex-nowrap">{{ price }} руб.</b>
              <b class="text-green-500" v-if="isAdded">Товар в корзине</b>
            </div>
          </div>
        </div>
        <img
          @click="openModalDrawer"
          :src="!isAdded ? './plus.svg' : './checked.svg'"
          alt="Plus logo"
        />
      </div>
      <div
        v-show="modalDrawer && !isAdded"
        class="flex flex-col flex-wrap align-center max-md:text-center"
      >
        <p class="text-slate-400 mb-4 mt-2">Выберите размер</p>
        <ul
          class="flex flex-wrap justify-center text-left gap-2 flex-wrap w-full h-auto max-md:justify-center"
        >
          <li
            v-for="size in sizes"
            :key="size.id"
            class="flex justify-center items-center text-gray-500 cursor-pointer relative border border-slate-100 w-10 h-10 rounded-full p-2 transition hover:-translate-y-2 hover:shadow-xl hover:border-green-500 choose_number"
            :class="{ 'choose_number-active': activeEl === size }"
            @click="
              handleSelectSize(size);
              activeEl = size;
            "
          >
            {{ size }}
          </li>
        </ul>
        <button
          class="mt-4 bg-green-500 w-full rounded-xl py-3 text-white transition disabled:bg-slate-400 hover:bg-green-600 active:bg-green-700 cursor-pointer"
          @click="
            onClickAdd();
            modalDrawerFalse();
          "
        >
          Добавить в корзину
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.choose_number-active {
  background-color: rgb(34 197 94);
  color: rgb(248 250 252);
}
</style>
