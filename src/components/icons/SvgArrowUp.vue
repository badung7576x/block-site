<template>
  <svg
    aria-hidden="true"
    :class="size + customClass"
    fill="currentColor"
    stroke="currentColor"
    viewBox="0 0 384 512"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M214.6 41.4c-12.5-12.5-32.8-12.5-45.3 0l-160 160c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L160 141.2V448c0 17.7 14.3 32 32 32s32-14.3 32-32V141.2L329.4 246.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3l-160-160z"
    />
  </svg>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  props: {
    size: {
      type: String,
      default: 'w-5 h-5',
    },
    customClass: {
      type: String,
      default: ' text-gray-500 dark:text-gray-400',
    },
  },
});
</script>
