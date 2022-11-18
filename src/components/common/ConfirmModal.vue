<template>
  <q-dialog v-model="open">
    <div class="relative bg-white rounded-2xl shadow w-full">
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
        <div class="w-full">
          <svg
            aria-hidden="true"
            class="mx-auto mb-4 w-14 h-14 text-red-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            ></path>
          </svg>
        </div>
        <h3 class="w-full mb-5 text-lg font-normal text-center text-gray-500">
          {{ content }}
        </h3>
        <div class="flex justify-center items-center">
          <button
            type="button"
            @click="$emit('yesClick')"
            class="text-white bg-green-500 hover:bg-green-600 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2 m-2"
          >
            {{ yesTxt }}
          </button>
          <button
            v-close-popup
            type="button"
            class="text-white bg-red-500 hover:bg-red-600 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10"
          >
            {{ noTxt }}
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
    content: String,
    yesTxt: {
      type: String,
      default: "Yes, I'm sure",
    },
    noTxt: {
      type: String,
      default: 'No, cancel',
    },
  },
  emits: ['update:modelValue', 'yesClick'],
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
