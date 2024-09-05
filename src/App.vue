<template>
  <button type="button" @click="isOpen = true">Open Dialog</button>
  <LMDialog v-model:open="isOpen" :content-class="'border text-slate-100'">
    This is the dialog content
  </LMDialog>
</template>

<script setup lang="ts">
import { ref } from "vue";
import LMDialog from "./components/LMDialog.vue";

const isOpen = ref(false);
</script>
