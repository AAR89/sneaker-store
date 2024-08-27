<script setup>
import { ref } from 'vue';

const userName = ref('Иван');

const handleClick = () => {
  userName.value = prompt('Введите новое имя:', userName.value);
};

const isLogin = ref(false);

const name = ref('');
const email = ref('');
const phone = ref('');
const password = ref('');
const drawRegistration = ref(false);

const login = () => {
  if (name.value === 'admin' && password.value === 'admin') {
    isLogin.value = true;
    name.value = '';
    password.value = '';
  } else if (phone.value === 'admin' && password.value === 'admin') {
    isLogin.value = true;
    name.value = 'Иван';
    phone.value = '+7 777 77-77-77';
    password.value = '';
  } else {
    alert('Неправильный login или пароль');
  }
};

const logout = () => {
  isLogin.value = false;
};

const openRegistration = () => {
  drawRegistration.value = true;
};

const closeRegistration = () => {
  drawRegistration.value = false;
};

const submitRegistration = () => {
  if (name.value && email.value && phone.value && password.value) {
    alert(`Данные успешно сохранены. Ваши данные: ${name.value}, ${email.value}, ${phone.value}`);
  } else {
    alert('Заполните все поля');
  }
};

const openPersonalPage = () => {
  if (
    name.value !== '' &&
    password.value !== '' &&
    email.value !== '' &&
    password.value !== '' &&
    password.value.length >= 6
  ) {
    alert('Вы успешно зарегистрированы!');
    isLogin.value = true;
  } else {
    alert('Заполните все поля и пароль должен быть не менее 6 символов');
  }
};
</script>

<template>
  <div>
    <div v-if="!isLogin">
      <form class="login flex flex-col items-start gap-2" @submit.prevent="login">
        <b>Добро пожаловать в <span class="uppercase">Sneaker shop</span></b>
        <div v-show="!drawRegistration">
          <p>
            Впервые здесь?
            <b
              class="cursor-pointer border-b-2 border-black hover:border-0 hover:text-lime-500"
              @click="openRegistration"
              >Зарегистрироваться</b
            >
          </p>
        </div>

        <div v-show="drawRegistration">
          <p>
            Уже есть аккаунт?
            <b
              class="cursor-pointer border-b-2 border-black hover:border-0 hover:text-lime-500"
              @click="closeRegistration"
              >Войти</b
            >
          </p>
        </div>

        <div class="flex flex-col mt-2 gap-3">
          <input
            v-show="drawRegistration"
            class="border rounded-md py-2 px-4 outline-none focus:border-gray-400 transition"
            required
            v-model="name"
            type="text"
            placeholder="Имя*"
          />
          <input
            class="border rounded-md py-2 px-4 outline-none focus:border-gray-400 transition"
            type="tel"
            v-model="phone"
            id="phone"
            name="phone"
            required
            placeholder="Телефон*"
          />
          <!-- pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}" -->
          <input
            v-show="drawRegistration"
            class="border rounded-md py-2 px-4 outline-none focus:border-gray-400 transition"
            required
            id="email"
            v-model="email"
            type="email"
            placeholder="Почта*"
          />
          <input
            class="border rounded-md py-2 px-4 outline-none focus:border-gray-400 transition"
            required
            v-model="password"
            type="password"
            placeholder="Пароль*"
          />
        </div>
        <hr />
        <button
          v-show="!drawRegistration"
          class="button w-44 border-solid border-2 border-lime-500 rounded-md p-2 text-lime-600 outline-none g-lime-500 rounded-xl transition disabled:bg-slate-400 hover:bg-lime-600 hover:text-white active:bg-lime-700"
          type="submit"
          @click="login"
        >
          Войти
        </button>

        <button
          v-show="drawRegistration"
          class="button w-44 border-solid border-2 border-lime-500 rounded-md p-2 text-lime-600 outline-none g-lime-500 rounded-xl transition disabled:bg-slate-400 hover:bg-lime-600 hover:text-white active:bg-lime-700"
          type="submit"
          @click="openPersonalPage"
        >
          Зарегистрироваться
        </button>
      </form>
    </div>

    <div v-else>
      <div>
        <h2 class="text-3xl font-bold">Личный кабинет</h2>

        <div class="flex items-center text-center mt-5 gap-3">
          <img src="/avatar.png" alt="Avatar" class="avatar w-20" />
          <p class="text-2xl font-bold max-md:text-2xl">{{ name }}</p>
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
            <p class="mt-1">{{ phone }}</p>
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
        <button
          class="button w-32 mt-5 border-solid border-2 border-red-500 rounded-md p-2 text-red-600 outline-none g-red-500 w-full rounded-xl transition disabled:bg-slate-400 hover:bg-red-600 hover:text-white active:bg-red-700"
          @click="logout"
        >
          Выйти
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.container {
  display: block;
  position: relative;
  padding-left: 2.25rem;
  margin-bottom: 0.75rem;
  margin-top: 0.25rem;
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
