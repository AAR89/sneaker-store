<script setup>
import { provide, ref } from 'vue';
import MyModal from './MyModal.vue';

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

const modalDrawer = ref(false);

const openModalDrawer = () => {
  modalDrawer.value = !modalDrawer.value;
  console.log('open');
};

provide('openModalDrawer', openModalDrawer);
</script>

<template>
  <!-- @mouseleave="selectedSize = ''" -->
  <div>
    <MyModal v-show="modalDrawer" :items="items" />

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
      <img :src="imageUrl" alt="Sneaker logo" class="h-5/6" />
      <p class="mt-2">{{ title }}</p>

      <div class="flex justify-between mt-5 items-center">
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
    </div>
  </div>
</template>
