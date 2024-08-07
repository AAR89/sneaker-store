<script setup>
import { ref, computed, inject } from 'vue';
import axios from 'axios';
import CartListItemComp from './CartListItemComp.vue';
import DrawerHeadComp from './DrawerHeadComp.vue';
import InfoBlockComp from './InfoBlockComp.vue';

const props = defineProps({
  totalPrice: Number,
  vatPrice: Number
});

const { cart, closeDrawer } = inject('cart');

const isCreating = ref(false);
const orderId = ref(false);

const createOrder = async () => {
  try {
    isCreating.value = true;
    const { data } = await axios.post('https://8e61f9ea046fe2d1.mokky.dev/orders', {
      items: cart.value,
      totalPrice: props.totalPrice
    });
    cart.value = [];

    orderId.value = data.id;

    return data;
  } catch (err) {
    console.log(err);
  } finally {
    isCreating.value = false;
  }
};

const cartIsEmpty = computed(() => cart.value.length === 0);
const buttonDisabled = computed(() => isCreating.value || cartIsEmpty.value);
</script>

<template>
  <div>
    <div
      @click="closeDrawer"
      class="fixed top-0 left-0 h-full w-full bg-black z-10 opacity-70"
    ></div>
    <div class="bg-white w-96 h-full fixed right-0 top-0 z-20 p-8 max-md:w-full">
      <DrawerHeadComp />

      <div v-if="!totalPrice || orderId" class="flex h-full items-center">
        <InfoBlockComp
          v-if="!totalPrice && !orderId"
          image-url="package-icon.png"
          title="Корзина пуста"
          description="Добавьте хотя бы одну пару кроссовок, чтобы сделать заказ."
        />
        <InfoBlockComp
          v-if="orderId"
          image-url="order-success-icon.png"
          title="Заказ оформлен!"
          :description="`Ваш заказ #${orderId} скоро будет передан курьерской доставке.`"
        />
      </div>

      <div v-else>
        <CartListItemComp />

        <div class="flex flex-col gap-4 mt-7">
          <div class="flex gap-2">
            <span>Итого:</span>
            <div class="flex-1 border-b border-dashed"></div>
            <b>{{ totalPrice }} руб.</b>
          </div>

          <div class="flex gap-2">
            <span>Налог 5%:</span>
            <div class="flex-1 border-b border-dashed"></div>
            <b>{{ vatPrice }} руб.</b>
          </div>

          <button
            @click="createOrder"
            :disabled="buttonDisabled"
            class="mt-4 bg-lime-500 w-full rounded-xl py-3 text-white transition disabled:bg-slate-400 hover:bg-lime-600 active:bg-lime-700 cursor-pointer"
          >
            Оформить заказ
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
