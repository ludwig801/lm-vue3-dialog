<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref, watch } from "vue";

export interface DialogEmits {
  (event: "update:open", isOpen: boolean): void;
  (event: "open:begin"): void;
  (event: "open:end"): void;
  (event: "close:begin"): void;
  (event: "close:end"): void;
}

export interface DialogProps {
  /**
   * Default CSS content width.
   *
   * @default "24rem"
   */
  width?: string;
  /**
   * Default CSS content max-width.
   *
   * @default "calc(100vw - 4rem)"
   */
  maxWidth?: string;
  /**
   * How many `ms` does show/hide animation take.
   * Setting this to `0` disables the animation
   *
   * @default 150
   */
  animationTime?: number;
  /**
   * The class attribute to apply to the backdrop element.
   *
   * @default ""
   */
  backdropClass?: string | object;
  /**
   * The class attribute to apply to the content element.
   */
  contentClass?: string | object;
}

const open = defineModel<boolean>("open", {
  required: true,
});

const emits = defineEmits<DialogEmits>();

const props = withDefaults(defineProps<DialogProps>(), {
  width: () => "24rem",
  maxWidth: () => "calc(100vw - 4rem)",
  animationTime: () => 150,
});

const dialog = ref<HTMLDialogElement>();
const isOpening = ref(false);
const isClosing = ref(false);

watch(open, (value: boolean) => (value ? openDialog() : closeDialog()));

function waitMs(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, Math.max(ms, 0)));
}

async function openDialog() {
  try {
    emits("open:begin");
    isOpening.value = true;
    dialog.value?.showModal();
    await waitMs(props.animationTime);
    emits("open:end");
  } finally {
    isOpening.value = false;
  }
}

async function closeDialog() {
  try {
    emits("close:begin");
    isClosing.value = true;
    await waitMs(props.animationTime - 10);
    dialog.value?.close();
    emits("update:open", false);
    emits("close:end");
  } finally {
    isClosing.value = false;
  }
}

// Dialog "cancel" event
function onDialogCancel(event: Event) {
  event.preventDefault();
  event.stopImmediatePropagation();
  if (!isOpening.value) {
    closeDialog();
  }
}

onMounted(() => {
  dialog.value?.addEventListener("cancel", onDialogCancel);
});

onBeforeUnmount(() => {
  dialog.value?.removeEventListener("cancel", onDialogCancel);
});
</script>

<template>
  <dialog class="dialog" :class="{ isClosing }" ref="dialog">
    <div class="dialog-backdrop" :class="backdropClass" @click="closeDialog" />
    <div class="dialog-content" :class="contentClass">
      <slot></slot>
    </div>
  </dialog>
</template>

<style lang="css" scoped>
.dialog[open] {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
  max-width: 100%;
  max-height: 100%;
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
  border: none;
  background: none;
}

/* Custom backdrop implementation due to the fact that Firefox does not support backdrop CSS transitions / animations */
.dialog[open]::backdrop {
  opacity: 0;
}

.dialog-backdrop {
  z-index: -1;
  background: #0009;
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
}

.dialog-content {
  position: relative;
  width: v-bind("width");
  max-width: v-bind("maxWidth");
}

.dialog-fieldset {
  appearance: none;
  width: 100%;
  height: 100%;
  border: none;
  padding: 0;
  margin: 0;
}

.dialog-loading {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
  pointer-events: all;
}

.dialog:not([open]) > .dialog-backdrop,
.dialog:not([open]) > .dialog-content {
  opacity: 0;
}

.dialog[open]:not(.isClosing) > .dialog-backdrop,
.dialog[open]:not(.isClosing) > .dialog-content {
  animation: fade-in v-bind("animationTime + 'ms'") ease-in-out;
}

.dialog[open].isClosing > .dialog-backdrop,
.dialog[open].isClosing > .dialog-content {
  animation: fade-out v-bind("animationTime + 'ms'") ease-in-out;
}

@keyframes fade-in {
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
}

@keyframes fade-out {
  from {
    opacity: 1;
  }

  to {
    opacity: 0;
  }
}
</style>
