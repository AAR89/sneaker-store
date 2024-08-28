<script setup>
defineProps({
  totalPrice: Number
});

const emit = defineEmits('openDrawer');
</script>

<template>
  <header
    class="bg-white flex justify-between items-center rounded-t-lg border-b border-slate-200 px-10 py-8 sticky inset-0 z-[1] bg-opacity-1 max-md:flex-col gap-4"
  >
    <RouterLink to="/sneaker-store/">
      <div class="flex items-center gap-4">
        <img src="/logo.png" alt="Logo" class="w-20" />
        <div>
          <h2 class="text-xl font-bold uppercase">KICKS CREW</h2>
          <p class="text-slate-400">Магазин кроссовок</p>
        </div>
      </div>
    </RouterLink>

    <ul class="flex items-center gap-10 max-md:flex-col mt-0 gap-2">
      <li
        @click="() => emit('openDrawer')"
        class="flex items-center gap-3 text-gray-500 cursor-pointer hover:text-black"
      >
        <img src="/cart.svg" alt="Cart" />
        <b>{{ totalPrice }} руб.</b>
      </li>

      <RouterLink to="/sneaker-store/favorites">
        <li class="flex items-center gap-3 text-gray-500 cursor-pointer hover:text-black">
          <img src="/heart.svg" alt="Cart" />
          <span>Закладки</span>
        </li>
      </RouterLink>

      <RouterLink to="/sneaker-store/profile">
        <li class="flex items-center gap-3 text-gray-500 cursor-pointer hover:text-black">
          <img src="/profile.svg" alt="Cart" />
          <span>Профиль</span>
        </li>
      </RouterLink>
    </ul>
  </header>
</template>
