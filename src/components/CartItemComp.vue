<script setup>
const emit = defineEmits('onClickRemove');

defineProps({
  id: Number,
  imageUrl: String,
  title: String,
  price: Number,
  sizes: String
});
</script>

<template>
  <div class="flex items-center gap-4 border border-slate-200 p-4 rounded-xl">
    <img class="w-16 h-16" :src="imageUrl" :alt="title" />

    <div class="flex flex-col flex-1">
      <p>{{ title }}</p>
      <div class="flex justify-between mt-2">
        <b class="flex-1">{{ price }} руб.</b>
        <p>{{ sizes }}</p>
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
