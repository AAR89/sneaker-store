<template>
  <div>Second child: {{ size }}</div>
</template>

<script setup>
import { inject } from 'vue';

const size = inject('size');
</script>
