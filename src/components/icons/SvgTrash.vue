<template>
  <svg
    width="24px"
    height="24px"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    fill="currentColor"
    :class="size + customClass"
  >
    <rect x="0" fill="none" width="24" height="24" />
    <g>
      <path
        fill="currentColor"
        d="M6.187 8h11.625l-.695 11.125C17.05 20.18 16.177 21 15.12 21H8.88c-1.057 0-1.93-.82-1.997-1.875L6.187 8zM19 5v2H5V5h3V4c0-1.105.895-2 2-2h4c1.105 0 2 .895 2 2v1h3zm-9 0h4V4h-4v1z"
      />
    </g>
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
