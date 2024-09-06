<template>
  <button type="button" @click="isOpen = true">Open Dialog</button>
  <Dialog v-model:open="isOpen" :content-class="'border text-slate-100'">
    <template #backdrop>
      <div style="width: 100%; height: 100%; background: #0009"></div>
    </template>
    <template #default>
      <div style="height: 24rem; padding: 2rem; background: white; border-radius: 2px;">This is the dialog content</div>
    </template>
  </Dialog>
</template>

<script setup lang="ts">
import { ref } from "vue";
import Dialog from "./lib/Dialog.vue";

const isOpen = ref(false);
</script>
