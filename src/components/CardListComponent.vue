<script setup>
import CardComponent from './CardComponent.vue'
defineProps({
  items: Array
})

const onClickAdd = () => {
  console.log('Added')
}

const onClickFavorite = () => {
  console.log('Add to favorites')
}
</script>

<template>
  <div class="mt-10">
    <div class="grid grid-cols-4 gap-5">
      <CardComponent
        v-for="item in items"
        :key="item.id"
        :title="item.title"
        :price="item.price"
        :imageUrl="item.imageUrl"
        :onClickAdd="onClickAdd"
        :onClickFavorite="onClickFavorite"
      />
    </div>
  </div>
</template>
