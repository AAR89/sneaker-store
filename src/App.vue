<script setup>
import HeaderComponent from './components/HeaderComponent.vue'
import CardComponent from './components/CardComponent.vue'
</script>

<template>
  <div class="bg-white w-4/5 m-auto rounded-xl shadow-xl mt-14">
    <HeaderComponent />

    <div class="p-10">
      <h2 class="text-3xl font-bold mb-8">Все кроссовки</h2>
      <div class="grid grid-cols-4 gap-5">
        <CardComponent />
        <CardComponent />
        <CardComponent />
        <CardComponent />
        <CardComponent />
        <CardComponent />
        <CardComponent />
        <CardComponent />
      </div>
    </div>
  </div>
</template>

<style scoped></style>
