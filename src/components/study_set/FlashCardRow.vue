<template>
  <div
    class="w-full p-2 group bg-white border border-gray-200 rounded-lg shadow-md hover:bg-gray-100 mb-3"
  >
    <div class="w-auto flex justify-between">
      <q-input
        :readonly="isReadonly"
        v-model="flashcard.front_side"
        type="text"
        autogrow
        borderless
        dense
        class="appearance-none bg-transparent bg-gray-50 w-[47%] text-gray-900 text-sm px-2 py-0 outline-none border-b-2 border-gray-400"
        placeholder="Enter the term"
        required
      />
      <q-input
        :readonly="isReadonly"
        v-model="flashcard.back_side"
        type="text"
        autogrow
        borderless
        dense
        class="appearance-none bg-transparent bg-gray-50 w-[47%] text-gray-900 text-sm px-2 py-0 outline-none border-b-2 border-gray-400"
        placeholder="Enter the define"
        required
      />
      <div class="w-auto flex justify-center items-center mr-2">
        <svg
          v-if="isReadonly"
          xmlns="http://www.w3.org/2000/svg"
          class="w-6 h-5 hover:cursor-pointer"
          viewBox="0 0 576 512"
          @click="$emit('expand', flashcard)"
        >
          <path
            d="M288 32c-80.8 0-145.5 36.8-192.6 80.6C48.6 156 17.3 208 2.5 243.7c-3.3 7.9-3.3 16.7 0 24.6C17.3 304 48.6 356 95.4 399.4C142.5 443.2 207.2 480 288 480s145.5-36.8 192.6-80.6c46.8-43.5 78.1-95.4 93-131.1c3.3-7.9 3.3-16.7 0-24.6c-14.9-35.7-46.2-87.7-93-131.1C433.5 68.8 368.8 32 288 32zM432 256c0 79.5-64.5 144-144 144s-144-64.5-144-144s64.5-144 144-144s144 64.5 144 144zM288 192c0 35.3-28.7 64-64 64c-11.5 0-22.3-3-31.6-8.4c-.2 2.8-.4 5.5-.4 8.4c0 53 43 96 96 96s96-43 96-96s-43-96-96-96c-2.8 0-5.6 .1-8.4 .4c5.3 9.3 8.4 20.1 8.4 31.6z"
          />
        </svg>
        <svg
          v-else
          class="w-6 h-5 hover:cursor-pointer text-red-600"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 448 512"
          fill="currentColor"
          @click="$emit('remove', flashcard)"
        >
          <path
            d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z"
          />
        </svg>
        <!-- <svg
          v-else
          class="w-6 h-5 hover:cursor-pointer"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 576 512"
        >
          <path
            d="M402.6 83.2l90.2 90.2c3.8 3.8 3.8 10 0 13.8L274.4 405.6l-92.8 10.3c-12.4 1.4-22.9-9.1-21.5-21.5l10.3-92.8L388.8 83.2c3.8-3.8 10-3.8 13.8 0zm162-22.9l-48.8-48.8c-15.2-15.2-39.9-15.2-55.2 0l-35.4 35.4c-3.8 3.8-3.8 10 0 13.8l90.2 90.2c3.8 3.8 10 3.8 13.8 0l35.4-35.4c15.2-15.3 15.2-40 0-55.2zM384 346.2V448H64V128h229.8c3.2 0 6.2-1.3 8.5-3.5l40-40c7.6-7.6 2.2-20.5-8.5-20.5H48C21.5 64 0 85.5 0 112v352c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48V306.2c0-10.7-12.9-16-20.5-8.5l-40 40c-2.2 2.3-3.5 5.3-3.5 8.5z"
          />
        </svg> -->
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, computed } from 'vue';
import { Flashcard } from 'src/types/studyset';

export default defineComponent({
  props: {
    isReadonly: {
      type: Boolean,
      default: false,
    },
    modelValue: {
      type: Object as PropType<Flashcard>,
      default: () => {
        return {
          order: 0,
          front_side: '',
          back_side: '',
        };
      },
    },
  },
  emits: ['update:modelValue', 'expand', 'remove'],
  setup(props, { emit }) {
    const flashcard = computed({
      get: () => props.modelValue,
      set: (value) => emit('update:modelValue', value),
    });

    return {
      flashcard,
    };
  },
});
</script>
