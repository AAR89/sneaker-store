<script setup>
import HeaderComponent from './components/HeaderComponent.vue'
import CardListComponent from './components/CardListComponent.vue'
import DrawerComponent from './components/DrawerComponent.vue'
</script>

<template>
  <div>
    <!-- <DrawerComponent /> -->
    <div class="bg-white w-4/5 m-auto rounded-xl shadow-xl mt-14">
      <HeaderComponent />
      <div class="p-10">
        <h2 class="text-3xl font-bold mb-8">Все кроссовки</h2>
        <CardListComponent />
      </div>
    </div>
  </div>
</template>

<style scoped></style>
