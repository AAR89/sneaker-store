<script setup>
import { onMounted, ref, watch } from 'vue';
import axios from 'axios';

import HeaderComponent from './components/HeaderComponent.vue';
import CardListComponent from './components/CardListComponent.vue';
import DrawerComponent from './components/DrawerComponent.vue';

const items = ref([]);

const sortBy = ref('');
const searchQuery = ref('');

const onChangeSelect = (event) => {
  sortBy.value = event.target.value;
};

onMounted(async () => {
  try {
    const { data } = await axios.get('https://8e61f9ea046fe2d1.mokky.dev/items');
    items.value = data;
  } catch (err) {
    console.log(err);
  }
});

watch(sortBy, async () => {
  try {
    const { data } = await axios.get(
      'https://8e61f9ea046fe2d1.mokky.dev/items?sortBy=' + sortBy.value
    );
    items.value = data;
  } catch (err) {
    console.log(err);
  }
});
</script>

<template>
  <div>
    <!-- <DrawerComponent /> -->
    <div class="bg-white w-4/5 m-auto rounded-xl shadow-xl mt-14">
      <HeaderComponent />
      <div class="p-10">
        <div class="flex justify-between items-center">
          <h2 class="text-3xl font-bold mb-8">Все кроссовки</h2>

          <div class="flex gap-4">
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
                class="border rounded-md py-2 pl-11 pr-4 outline-none focus:border-gray-400 transition"
                type="text"
                placeholder="Поиск..."
              />
            </div>
          </div>
        </div>
        <CardListComponent :items="items" />
      </div>
    </div>
  </div>
</template>

<style scoped></style>
