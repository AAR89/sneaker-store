<script setup>
import axios from 'axios';
import { onMounted, ref, watch, reactive, inject, provide } from 'vue';
import debounce from 'lodash.debounce';

import CardListComponent from '@/components/CardListComponent.vue';

const items = ref([]);
const filters = reactive({
  sortBy: 'title',
  searchQuery: ''
});

const { addToCart, removeFromCart, cart } = inject('cart');
provide('items', items);

const onClickAddPlus = (item) => {
  if (!item.isAdded) {
    addToCart(item);
  } else {
    removeFromCart(item);
  }
};

const onChangeSelect = (event) => {
  filters.sortBy = event.target.value;
};

const onChangeSearchInput = debounce((event) => {
  filters.searchQuery = event.target.value;
}, 450);

const addToFavorite = async (item) => {
  try {
    if (!item.isFavorite) {
      const obj = {
        item_id: item.id
      };
      item.isFavorite = true;

      const { data } = await axios.post(`https://8e61f9ea046fe2d1.mokky.dev/favorites`, obj);

      item.favoriteId = data.id;
    } else {
      item.isFavorite = false;
      await axios.delete(`https://8e61f9ea046fe2d1.mokky.dev/favorites/${item.favoriteId}`);
      item.favoriteId = null;
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

watch(filters, fetchItems);
</script>

<template>
  <div>
    <div class="flex justify-between items-center max-md:flex-col">
      <h2 class="text-3xl font-bold mb-8 max-md:text-2xl">Все кроссовки</h2>

      <div class="flex text-gray-500 gap-4 max-lg:flex-col">
        <select
          @change="onChangeSelect"
          class="py-2 px-3 border rounded-md outline-none"
          name="select-product"
          id="1"
        >
          <option value="name">По названию</option>
          <option value="price">По цене (сначала дешевле)</option>
          <option value="-price">По цене (сначала дороже)</option>
        </select>
        <div class="relative">
          <img class="absolute left-4 top-3" src="/search.svg" alt="" />
          <input
            @input="onChangeSearchInput"
            class="border rounded-md py-2 pl-11 pr-4 outline-none focus:border-gray-400 transition"
            type="text"
            placeholder="Поиск..."
          />
        </div>
      </div>
    </div>
    <CardListComponent
      :items="items"
      @add-to-favorite="addToFavorite"
      @add-to-cart="onClickAddPlus"
    />
  </div>
</template>
