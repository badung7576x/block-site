<template>
  <q-dialog v-model="open">
    <div
      class="relative bg-white shadow max-w-none w-[800px] rounded-2xl"
      style="border-radius: 15px"
    >
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
      <div
        class="pt-12 px-11 pb-2 flex justify-center"
        style="min-height: 300px"
      >
        <div class="row w-full mb-4">
          <q-input
            v-model="input"
            borderless
            rows="20"
            type="textarea"
            for="import-multiple"
            class="ring-1 ring-slate-200 w-full text-sm py-0 px-4 shadow-sm placeholder-slate-400 rounded-md focus:outline-none focus:ring-2 focus:ring-slate-300 bg-white"
            placeholder="Copy and paste your data here ...&#10;Term1, Define1&#10;Term2, Define2"
          ></q-input>
        </div>
        <div class="flex justify-center items-center">
          <button
            type="button"
            @click="$emit('import', input)"
            class="text-white bg-green-500 hover:bg-green-600 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2 m-2"
            :disabled="input.length == 0"
          >
            {{ $t('create_study_set.import_btn') }}
          </button>
        </div>
      </div>
    </div>
  </q-dialog>
</template>

<script lang="ts">
import { defineComponent, computed, ref, watch } from 'vue';

export default defineComponent({
  props: {
    modelValue: {
      type: Boolean,
      default: false,
    },
    data: {
      type: String,
      default: '',
    },
  },
  emits: ['update:modelValue', 'update:data', 'import'],
  setup(props, { emit }) {
    const input = ref('');
    watch(
      () => props.modelValue,
      () => {
        if (props.modelValue) input.value = '';
      }
    );
    return {
      input,
      open: computed({
        get: () => props.modelValue,
        set: (value) => emit('update:modelValue', value),
      }),
    };
  },
});
</script>
<style lang="sass">
.q-textarea
  line-height: 22px !important
#import-multiple
  line-height: 1.6rem !important
  font-size: 22px !important
</style>
