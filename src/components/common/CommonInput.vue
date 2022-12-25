<template>
  <label
    v-if="label.length > 0"
    class="block mb-2 text-sm font-medium text-gray-900"
  >
    {{ label }}
  </label>
  <input
    :type="type"
    v-model="input"
    @keydown="$emit('keydown', $event)"
    :class="inputClass"
    :placeholder="placeholder"
  />
  <p
    v-if="errorTxt && errorTxt.length > 0"
    class="mt-1 text-red-600 text-sm mb-2"
  >
    {{ errorTxt }}
  </p>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';

export default defineComponent({
  props: {
    type: {
      type: String,
      default: 'text',
    },
    label: {
      type: String,
      default: '',
    },
    modelValue: String,
    placeholder: String,
    error: Boolean,
    errorTxt: String,
    customClass: String,
  },
  emits: ['update:modelValue', 'keydown'],
  setup(props, { emit }) {
    return {
      input: computed({
        get: () => props.modelValue,
        set: (value) => emit('update:modelValue', value),
      }),
      inputClass: computed(() => {
        let css =
          'ring-1 ring-slate-200 w-full text-sm py-2 pl-4 mb-4 shadow-sm placeholder-slate-400 rounded-md focus:outline-none focus:ring-2 focus:ring-slate-300';
        if (props.error) {
          css =
            css +
            ' focus:ring-1 focus:ring-red-500 ring-red-500 text-red-600 mb-0';
        }
        if (props.customClass) {
          css = css + ' ' + props.customClass;
        }

        return css;
      }),
    };
  },
});
</script>
