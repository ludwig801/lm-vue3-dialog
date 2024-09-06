# Vue 3 Dialog

This is a component which builds a barebones modal using the HTML5 `<dialog>` element.
The dialog element has only the necessary inline styling to make sure the elements are coherent with the expected behaviour.
Any extra styling should be provided via the `*-class` props.

# Installation (ES Module)

```console
npm i @ludwig801/vue3-dialog
```

# Exports

 - **LMDialog**: a barebones `<dialog>` with only the backdrop and the content slot.

# LMDialog

## Properties

| Property         | Types                 | Required           | Default                | Description |
| ---------------- | --------------------- | :----------------: | :--------------------- | - |
| `v-model:open`   | `boolean`             | :white_check_mark: | `false`                | Opens/closes the dialog window. |
| `width`          | `string`              |                    | `"24rem"`              | A CSS string determining the base width of the content element. |
| `max-width`      | `string`              |                    | `"calc(100vw - 4rem)"` | A CSS string determining the max width of the content element. |
| `animation-time` | `number`              |                    | `150`                  | The duration, in ms, of the open/close animation.<br /> (`0` disables the animation). |
| `backdrop-class` | `string`<br>`object`  |                    | `undefined`            | The class or classes to the apply to the backdrop element. |
| `content-class`  | `string`<br>`object`  |                    | `undefined`            | The class or classes to the apply to the content-wrapping element. |

## Events

| Event           | Arguments                               | Trigger | 
| --------------- | --------------------------------------- | - |
| `update:open`   | `open: boolean` - the new state         | The dialog's open state is changed via user interaction |
| `open:begin`    |                                         | The dialog has started the opening animation <br> Called even when `animationTime` is `0`. | 
| `open:end`      |                                         | The dialog has finished the opening animation <br> Called even when `animationTime` is `0`. | 
| `close:begin`   |                                         | The dialog has started the closing animation <br> Called even when `animationTime` is `0`. | 
| `close:end`     |                                         | The dialog has finished the closing animation <br> Called even when `animationTime` is `0`. | 

## Slots

| Slot            | Bindings                                | Description | 
| --------------- | --------------------------------------- | - |
| `default`       |                                         | The dialog's default slot, where the content will be placed. |
| `backdrop`      |                                         | Used to customize the appearance of the backdrop, if `backdrop-class` is not enough. |

## Example usage

```vue
<template>
  <div>
    <button type="button" @click="isOpen = true">Open the dialog</button>
    <LMDialog
      v-model:open="isOpen"
      width="200px"
      max-width="100vw"
      backdrop-class="bg-slate-900"
      content-class="bg-slate-100 text-slate-900"
      @open:begin="isOpening"
      @open:end="hasOpened"
      @close:begin="isClosing"
      @close:end="hasClosed"
    >
      This is the dialog's content
    </LMDialog>
  </div>
</template>

<script setup>
import { ref } from "vue"
import { LMDialog } from "@ludwig801/vue3-dialog"

const isOpen = ref(false)

function isOpening() { ... }
function hasOpened() { ... }

function isClosing() { ... }
function hasClosed() { ... }
</script>
```
