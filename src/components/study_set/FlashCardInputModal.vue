<template>
  <q-dialog v-model="open">
    <div class="relative bg-white rounded-lg shadow w-full">
      <button
        type="button"
        v-close-popup
        class="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center"
      >
        <svg
          aria-hidden="true"
          class="w-5 h-5"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill-rule="evenodd"
            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
            clip-rule="evenodd"
          ></path>
        </svg>
        <span class="sr-only">Close modal</span>
      </button>
      <div class="p-11 flex justify-center" style="min-height: 300px">
        <!-- Code here -->
        <div class="w-full mb-3">
          <label
            for="email"
            class="block mb-1 text-sm font-medium text-gray-900 dark:text-white"
            >Term</label
          >
          <textarea
            id="message"
            rows="3"
            class="block p-2.5 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 w-full"
            placeholder="Enter your description..."
          ></textarea>
        </div>
        <div class="w-full mb-3">
          <label
            for="email"
            class="block mb-1 text-sm font-medium text-gray-900 dark:text-white"
            >Define</label
          >
          <textarea
            id="message"
            rows="3"
            class="block p-2.5 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 w-full"
            placeholder="Enter your description..."
          ></textarea>
        </div>

        <div class="flex justify-center items-center">
          <button
            class="block w-full md:w-auto text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
            type="button"
          >
            Update
          </button>
        </div>
      </div>
    </div>
  </q-dialog>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';

export default defineComponent({
  props: {
    modelValue: {
      type: Boolean,
      default: false,
    },
    flashcard: {
      type: Object,
    },
  },
  emits: ['update:modelValue'],
  setup(props, { emit }) {
    return {
      open: computed({
        get: () => props.modelValue,
        set: (value) => emit('update:modelValue', value),
      }),
    };
  },
});
</script>
