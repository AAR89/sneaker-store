<script setup>
import CardComponent from './CardComponent.vue';
defineProps({
  items: Array
});

const emit = defineEmits(['addToFavorite']);

const onClickAdd = () => {
  console.log('Added');
};
</script>

<template>
  <div class="mt-10">
    <div class="grid grid-cols-4 gap-5">
      <CardComponent
        v-for="item in items"
        :key="item.id"
        :id="item.id"
        :title="item.title"
        :price="item.price"
        :imageUrl="item.imageUrl"
        :onClickAdd="onClickAdd"
        :onClickFavorite="() => emit('addToFavorite', item)"
        :isFavorite="item.isFavorite"
      />
    </div>
  </div>
</template>
