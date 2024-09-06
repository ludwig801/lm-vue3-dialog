<template>
  <button type="button" @click="isOpen = true">Open Dialog</button>
  <Dialog v-model:open="isOpen" :content-class="'border text-slate-100'">
    This is the dialog content
  </Dialog>
</template>

<script setup lang="ts">
import { ref } from "vue";
import Dialog from "./lib/Dialog.vue";

const isOpen = ref(false);
</script>
