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
    required: true
  }
});

// const modalDrawer = inject('modalDrawer');
// const openModalDrawer = inject('openModalDrawer');

const handleSelectSize = inject('handleSelectSize');

const modalDrawer = ref(false);
const openModalDrawer = () => {
  modalDrawer.value = !modalDrawer.value;
  console.log(modalDrawer.value);
};

const modalDrawerFalse = () => {
  modalDrawer.value = false;
};
</script>

<template>
  <!-- @mouseleave="selectedSize = ''" -->
  <div>
    <div
      class="flex flex-col relative bg-white border border-slate-100 rounded-3xl p-8 cursor-pointer transition hover:-translate-y-2 hover:shadow-xl"
    >
      <img
        v-show="onClickFavorite"
        :src="!isFavorite ? './like-1.svg' : './like-2.svg'"
        alt="Like 1 logo"
        class="absolute top-8 left-8 fill-black"
        @click="onClickFavorite"
      />
      <img :src="imageUrl" alt="Sneaker logo" class="h-50" />
      <p class="mt-2 h-5">{{ title }}</p>

      <div class="flex justify-between mt-7 items-center">
        <div class="flex gap-4 justify-center items-center">
          <div class="flex flex-col">
            <span class="text-slate-400">Цена:</span>
            <b>{{ price }} руб.</b>
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
        <p class="text-black mb-4 mt-2 text-xl font-bold">Выберите размер</p>
        <ul class="flex justify-left gap-2 flex-wrap w-full h-auto max-md:justify-center">
          <li
            class="flex justify-center align-center text-gray-500 cursor-pointer relative bg-white border border-slate-100 w-11 h-11 rounded-full p-2 cursor-pointer transition hover:-translate-y-2 hover:shadow-xl"
            v-for="item in sizes"
            :key="item.id"
            @click="handleSelectSize(item)"
            :class="{
              'border-2 border-blue-400': selectedSize === item,
              'text-blue-400': selectedSize === item
            }"
          >
            {{ item }}
          </li>
        </ul>
        <button
          class="text-black"
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
