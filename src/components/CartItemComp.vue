<script setup>
const emit = defineEmits('onClickRemove');

defineProps({
  id: Number,
  imageUrl: String,
  title: String,
  price: Number,
  selectedSize: String
});
</script>

<template>
  <div class="flex items-center gap-4 border border-slate-200 p-4 rounded-xl">
    <img class="w-16 h-16" :src="imageUrl" :alt="title" />

    <div class="flex flex-col flex-1">
      <p>{{ title }}</p>
      <div class="flex justify-between mt-2 gap-5 items-center">
        <b class="flex-1">{{ price }} руб.</b>
        <p class="text-slate-500">{{ selectedSize }}</p>
        <img
          @click="emit('onClickRemove')"
          class="opacity-40 cursor-pointer transition hover:opacity-100"
          src="/close.svg"
          alt="Close button"
        />
      </div>
    </div>
  </div>
</template>
