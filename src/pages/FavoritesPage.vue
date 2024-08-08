<script setup>
import axios from 'axios';
import { onMounted, ref } from 'vue';
import CardListComponent from '@/components/CardListComponent.vue';

defineProps({
  items: Array
});

const favorites = ref([]);

onMounted(async () => {
  try {
    const { data } = await axios.get(
      'https://8e61f9ea046fe2d1.mokky.dev/favorites?_relations=items'
    );
    favorites.value = data.map((obj) => obj.item);
  } catch (err) {
    console.log(err);
  }
});
</script>

<template>
  <div>
    <h2 class="flex justify-start text-3xl font-bold mb-8 max-md:text-2xl max-md:justify-center">
      Мои закладки
    </h2>

    <CardListComponent :items="favorites" is-favorites />
    <!-- @add-to-cart="() => emit('addToCart', item)" 
    @add-to-favorite="addToFavorite" -->
  </div>
</template>
