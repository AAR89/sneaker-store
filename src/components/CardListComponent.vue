<script setup>
import CardComponent from './CardComponent.vue';
defineProps({
  items: Array,
  isFavorites: Boolean
});

const emit = defineEmits(['addToFavorite', 'addToCart']);
</script>

<template>
  <div class="mt-10">
    <div class="grid lg:grid-cols-4 gap-5 max-md:grid-cols-1 max-lg:grid-cols-2" v-auto-animate>
      <CardComponent
        v-for="item in items"
        :key="item.id"
        :id="item.id"
        :title="item.title"
        :price="item.price"
        :sizes="item.sizes"
        :imageUrl="item.imageUrl"
        :onClickFavorite="() => emit('addToFavorite', item)"
        :onClickAdd="() => emit('addToCart', item)"
        :isFavorite="item.isFavorite"
        :isAdded="item.isAdded"
      />
    </div>
  </div>
</template>
