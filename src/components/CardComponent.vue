<script setup>
import { ref } from 'vue';

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

let selectSize = ref('');

function sizeSelection(event) {
  selectSize.value = event.target.value;
  console.log('select =', selectSize.value);
}
</script>

<template>
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

    <div class="flex justify-between mt-5">
      <div class="flex gap-8">
        <div class="flex flex-col">
          <span class="text-slate-400">Цена:</span>
          <b>{{ price }} руб.</b>
        </div>
        <select @click="sizeSelection" name="sizes" id="sizes" v-model="selectSize">
          <option disabled value="">Размер</option>
          <option v-for="size in sizes" :key="size" :value="size">{{ size }}</option>
        </select>
      </div>

      <img
        v-show="selectSize"
        @click="onClickAdd"
        :src="!isAdded ? './plus.svg' : './checked.svg'"
        alt="Plus logo"
      />
    </div>
  </div>
</template>
