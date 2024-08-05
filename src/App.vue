<script setup>
import { onMounted, ref, watch, reactive, provide, computed } from 'vue';
import axios from 'axios';

import HeaderComponent from './components/HeaderComponent.vue';
import CardListComponent from './components/CardListComponent.vue';
import DrawerComponent from './components/DrawerComponent.vue';

const items = ref([]);
const cart = ref([]);
const isCreatingOrder = ref(false);

const drawerOpen = ref(false);

const totalPrice = computed(() => cart.value.reduce((acc, item) => acc + item.price, 0));
const vatPrice = computed(() => Math.round((totalPrice.value * 5) / 100));
const cartIsEmpty = computed(() => cart.value.length === 0);

const cartButtonDisabled = computed(() => isCreatingOrder.value || cartIsEmpty.value);

const closeDrawer = () => {
  drawerOpen.value = false;
};

const openDrawer = () => {
  drawerOpen.value = true;
};

const filters = reactive({
  sortBy: 'title',
  searchQuery: ''
});

const addToCart = (item) => {
  cart.value.push(item);
  item.isAdded = true;
};

const removeFromCart = (item) => {
  cart.value.splice(cart.value.indexOf(item), 1);
  item.isAdded = false;
};

const createOrder = async () => {
  try {
    isCreatingOrder.value = true;
    const { data } = await axios.post('https://8e61f9ea046fe2d1.mokky.dev/orders', {
      items: cart.value,
      totalPrice: totalPrice.value
    });
    cart.value = [];

    return data;
  } catch (err) {
    console.log(err);
  } finally {
    isCreatingOrder.value = false;
  }
};

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

const onChangeSearchInput = (event) => {
  filters.searchQuery = event.target.value;
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

const fetchFavorites = async () => {
  try {
    const { data: favorites } = await axios.get(`https://8e61f9ea046fe2d1.mokky.dev/favorites`);
    items.value = items.value.map((item) => {
      const favorite = favorites.find((favorite) => favorite.parentId === item.id);

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

const addToFavorite = async (item) => {
  try {
    if (!item.isFavorite) {
      const obj = {
        parentId: item.id
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

watch(filters, fetchItems);

watch(cart, () => {
  items.value = items.value.map((item) => ({
    ...item,
    isAdded: false
  }));
});

watch(
  cart,
  () => {
    localStorage.setItem('cart', JSON.stringify(cart.value));
  },
  { deep: true }
);

// watch(
//   cart,
//   () => {
//     localStorage.setItem('cart', JSON.stringify(cart.value))
//   },
//   { deep: true }
// )

provide('cart', {
  cart,
  closeDrawer,
  openDrawer,
  addToCart,
  removeFromCart
});
</script>

<template>
  <div>
    <DrawerComponent
      v-if="drawerOpen"
      :total-price="totalPrice"
      :vat-price="vatPrice"
      @create-order="createOrder"
      :button-disabled="cartButtonDisabled"
    />
    <div
      class="bg-white flex flex-col w-4/5 m-auto rounded-xl shadow-xl mt-14 max-md:mt-4 w-11/12 justify-center"
    >
      <HeaderComponent :total-price="totalPrice" @open-drawer="openDrawer" />
      <div class="p-10">
        <div class="flex justify-between items-center max-md:flex-col">
          <h2 class="text-3xl font-bold mb-8 max-md:text-2xl">Все кроссовки</h2>

          <div class="flex text-gray-500 gap-4 max-lg:flex-col">
            <!-- v-model="filters.sortBy" -->
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
              <!-- v-model.lazy="filters.searchQuery" -->
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
    </div>
  </div>
</template>

<style scoped></style>
