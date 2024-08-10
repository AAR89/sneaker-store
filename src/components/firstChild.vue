<script setup>
import { ref } from 'vue';

defineProps({
  modelValue: {
    type: Number,
    required: true
  }
});

let select = ref('');

function sizeSelection(event) {
  select.value = event.target.value;
  console.log('select =', select.value);
}
</script>

<template>
  <div class="flex flex-col w-[30%] gap-2 mt-2">
    Fist child:
    {{ modelValue }}
    <label for="size">Select Size:</label>
    <select @click="sizeSelection" :value="select" v-model="select">
      <option value="1">Option 1</option>
      <option value="2">Option 2</option>
      <option value="3">Option 3</option>
    </select>
    <slot></slot>
  </div>
</template>
