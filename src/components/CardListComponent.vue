<script setup>
import CardComponent from './CardComponent.vue';
defineProps({
  items: Array
});

const emit = defineEmits(['addToFavorite', 'addToCart']);
</script>

<template>
  <div class="mt-10">
    <div class="grid lg:grid-cols-4 gap-5 max-md:grid-cols-1 max-lg:grid-cols-2">
      <CardComponent
        v-for="item in items"
        :key="item.id"
        :id="item.id"
        :title="item.title"
        :price="item.price"
        :imageUrl="item.imageUrl"
        :onClickAdd="() => emit('addToCart', item)"
        :onClickFavorite="() => emit('addToFavorite', item)"
        :isFavorite="item.isFavorite"
        :isAdded="item.isAdded"
      />
    </div>
  </div>
</template>
