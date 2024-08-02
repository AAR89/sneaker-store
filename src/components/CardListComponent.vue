<script setup>
import CardComponent from './CardComponent.vue'

const onClickAdd = () => {
  console.log('Added')
}

const onClickFavorite = () => {
  console.log('Add to favorites')
}
</script>

<template>
  <div class="grid grid-cols-4 gap-5">
    <CardComponent
      imageUrl="/sneakers/sneakers-1.jpg"
      title="Мужские Кроссовки Nike Blazer Mid Suede"
      :price="1285"
      :onClickAdd="onClickAdd"
      :onClickFavorite="onClickFavorite"
    />
  </div>
</template>
