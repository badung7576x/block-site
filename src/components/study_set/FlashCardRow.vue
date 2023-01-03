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
        <eye v-if="isReadonly" @click="$emit('expand', flashcard)" />
        <trash v-else class="text-red" @click="$emit('remove', flashcard)" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, computed } from 'vue';
import { Flashcard } from 'src/types/studyset';
import Eye from '../icons/SvgEye.vue';
import Trash from '../icons/SvgTrash.vue';

export default defineComponent({
  components: { Eye, Trash },
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
