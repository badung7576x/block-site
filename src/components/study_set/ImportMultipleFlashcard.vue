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
        <close />
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
            class="text-gray-500 bg-gray-300 hover:bg-green-700 hover:text-white focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-4 focus:outline-none"
            :disabled="input.length == 0"
          >
            {{ $t('pCreateStudyset.modalImport.btnImport') }}
          </button>
        </div>
      </div>
    </div>
  </q-dialog>
</template>

<script lang="ts">
import { defineComponent, computed, ref, watch } from 'vue';
import Close from '../icons/SvgClose.vue';

export default defineComponent({
  components: { Close },
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
