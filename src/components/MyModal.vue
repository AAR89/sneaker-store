<script setup>
import { ref } from 'vue';

const open = ref(false);
</script>

<template>
  <div>
    <button class="text-black" @click="open = true">Открыть модальное окно</button>
    <div
      v-show="open"
      @click="open = false"
      class="fixed top-0 left-0 h-full w-full bg-black z-10 opacity-70"
    >
      <div class="bg-white w-full h-auto fixed right-0 bottom-0 z-20 p-8 max-md:w-full">
        <div v-if="open">
          <p class="text-black">Привет из модального окна!</p>
          <button class="text-black" @click="open = false">Закрыть</button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.modal {
  position: fixed;
  z-index: 999;
  top: 20%;
  left: 50%;
  width: 300px;
  margin-left: -150px;
}
</style>
