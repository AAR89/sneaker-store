<script setup>
import axios from 'axios';
import { onMounted, ref, watch, reactive, inject } from 'vue';

import CardListComponent from '@/components/CardListComponent.vue';

const items = ref([]);
const filters = reactive({
  sortBy: 'title',
  searchQuery: ''
});

const { addToCart, removeFromCart, cart } = inject('cart');

const onClickAddPlus = (item) => {
  if (!item.isAdded) {
    addToCart(item);
  } else {
    removeFromCart(item);
  }
};

const addToFavorite = async (item) => {
  try {
    if (!item.isFavorite) {
      const obj = {
        item_id: item.id
      };
      item.isFavorite = true;

      const { data } = await axios.post(`https://8e61f9ea046fe2d1.mokky.dev/favorites`, obj);

      item.favoriteId = data.id;
      fetchFavorites();
    } else {
      item.isFavorite = false;
      await axios.delete(`https://8e61f9ea046fe2d1.mokky.dev/favorites/${item.favoriteId}`);
      item.favoriteId = null;
      fetchFavorites();
    }
  } catch (err) {
    console.log(err);
  }
};

const fetchFavorites = async () => {
  try {
    const { data: favorites } = await axios.get(`https://8e61f9ea046fe2d1.mokky.dev/favorites`);
    items.value = items.value.map((item) => {
      const favorite = favorites.find((favorite) => favorite.item_id === item.id);

      if (!favorite) {
        return item;
      }

      return {
        ...item,
        isFavorite: true,
        favoriteId: favorite.id
      };
    });
  } catch (err) {
    console.log(err);
  }
};

const fetchItems = async () => {
  try {
    const params = {
      sortBy: filters.sortBy
    };

    if (filters.searchQuery) {
      params.title = `*${filters.searchQuery}*`;
    }

    const { data } = await axios.get(`https://8e61f9ea046fe2d1.mokky.dev/items`, { params });
    items.value = data.map((obj) => ({
      ...obj,
      isFavorite: false,
      isAdded: false,
      favoriteId: null
    }));
  } catch (err) {
    console.log(err);
  }
};

onMounted(async () => {
  const localCart = localStorage.getItem('cart');
  cart.value = localCart ? JSON.parse(localCart) : [];

  await fetchItems();
  await fetchFavorites();

  items.value = items.value.map((item) => ({
    ...item,
    isAdded: cart.value.some((cartItem) => cartItem.id === item.id)
  }));
});

watch(cart, () => {
  items.value = items.value.map((item) => ({
    ...item,
    isAdded: false
  }));
});

const favorites = ref([]);
watch(filters, fetchItems);

onMounted(async () => {
  try {
    const { data } = await axios.get(
      'https://8e61f9ea046fe2d1.mokky.dev/favorites?_relations=items'
    );
    favorites.value = data.map((obj) => ({
      ...obj.item,
      isFavorite: true,
      favoriteId: obj.id,
      isAdded: cart.value.some((cartItem) => cartItem.id === obj.item.id)
    }));
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

    <CardListComponent
      :items="favorites"
      is-favorites
      @add-to-favorite="addToFavorite"
      @add-to-cart="onClickAddPlus"
    />
  </div>
</template>
