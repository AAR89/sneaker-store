<script setup>
import { ref } from 'vue';

const userName = ref('Иван');

const handleClick = () => {
  userName.value = prompt('Введите новое имя:', userName.value);
};
</script>

<template>
  <div>
    <h2 class="text-3xl font-bold">Личный кабинет</h2>

    <div class="flex items-center text-center mt-5 gap-3">
      <img src="/avatar.png" alt="Avatar" class="avatar w-20" />
      <p class="text-2xl font-bold max-md:text-2xl">{{ userName }}</p>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        fill="none"
        class="cursor-pointer"
        @click="handleClick"
      >
        <path
          fill="#BDBDCB"
          fill-rule="evenodd"
          d="M12.407.258a.89.89 0 0 1 1.253 0l2.08 2.08a.885.885 0 0 1 0 1.253l-1.627 1.626-3.332-3.333L12.407.258ZM0 12.665l9.83-9.83 3.333 3.333-9.83 9.83H0v-3.333Z"
          clip-rule="evenodd"
        />
      </svg>
    </div>

    <div class="flex gap-3 mt-5">
      <div class="flex flex-col">
        <p class="text-slate-500">Телефон</p>
        <p>+7 977 777-77-77</p>
      </div>
      <form class="flex flex-col">
        <p class="text-slate-500">Пол</p>
        <div class="flex gap-3 items-center">
          <label class="container"
            >Муж.
            <input type="radio" name="radio" />
            <span class="checkmark"></span>
          </label>
          <label class="container"
            >Жен.
            <input type="radio" name="radio" />
            <span class="checkmark"></span>
          </label>
        </div>
      </form>
    </div>
    <h2 class="text-slate-500">Сумма всех заказов</h2>
    <p class="text-3xl font-bold">12000 руб.</p>
  </div>
</template>

<style scoped>
.container {
  display: block;
  position: relative;
  padding-left: 35px;
  margin-bottom: 12px;
  cursor: pointer;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}

.container input {
  position: absolute;
  opacity: 0;
  cursor: pointer;
}

.checkmark {
  position: absolute;
  top: 0;
  left: 0;
  height: 25px;
  width: 25px;
  background-color: #eee;
  border-radius: 50%;
}

.container:hover input ~ .checkmark {
  background-color: #ccc;
}

.container input:checked ~ .checkmark {
  background-color: rgb(132 204 22);
}

.checkmark:after {
  content: '';
  position: absolute;
  display: none;
}

.container input:checked ~ .checkmark:after {
  display: block;
}

.container .checkmark:after {
  top: 9px;
  left: 9px;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: white;
}
</style>
