<script setup lang="ts">
import Dialog, { DialogProps } from "./Dialog.vue";

export interface FormDialogProps extends DialogProps {
  /**
   * When set, defines a callback for the `submit` event.
   * If the callback returns a _truthy_ value, the dialog will close.
   */
  submit?: () => boolean | void | Promise<boolean | void>;
  disabled?: boolean;
  formClass?: string | object;
  fieldsetClass?: string | object;
}

const open = defineModel<boolean>("open", {
  required: true,
});

const props = defineProps<FormDialogProps>();

async function onSubmit(event: Event) {
  event.preventDefault();
  const returnValue = await props.submit?.();
  if (returnValue) {
    open.value = false;
  }
}
</script>

<template>
  <Dialog :open="open" @update:open="$emit('update:open', $event)">
    <template #default>
      <form method="dialog" @submit="onSubmit"></form>
    </template>
  </Dialog>
</template>

<style lang="css" scoped></style>
