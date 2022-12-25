<template>
  <div class="w-60 mt-2" :class="width">
    <div class="relative">
      <div
        class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none"
      >
        <search />
      </div>
      <input
        type="search"
        v-model="input"
        :class="inputClass"
        :placeholder="placeholder"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';
import Search from '../icons/SvgSearch.vue';

export default defineComponent({
  components: { Search },
  props: {
    modelValue: String,
    placeholder: {
      type: String,
      default: 'Type to search ...',
    },
    width: {
      type: String,
      default: 'w-full',
    },
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
          'form-control pl-10 ring-1 ring-slate-200 w-full text-sm py-2 shadow-sm placeholder-slate-400 rounded-md focus:outline-none focus:ring-2 focus:ring-slate-300';
        if (props.customClass) {
          css = css + ' ' + props.customClass;
        }

        return css;
      }),
    };
  },
});
</script>
