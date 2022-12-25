<template>
  <div class="row">
    <div
      v-for="(day, index) of dayOfWeek"
      :key="day.short"
      class="text-sm inline-flex overflow-hidden relative justify-center items-center w-10 h-10 rounded-full mr-2 hover:cursor-pointer"
      :class="{
        'bg-green': selectedDays[index],
        'bg-gray-100': !selectedDays[index],
      }"
      @click="updateSelectedDays(index)"
    >
      <span
        class="font-medium"
        :class="{
          'text-white ': selectedDays[index],
          'text-gray-600': !selectedDays[index],
        }"
        >{{ day.prefix }}</span
      >
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';

const dayOfWeek = [
  {
    prefix: 'M',
    short: 'Mon',
    full: 'Monday',
  },
  {
    prefix: 'T',
    short: 'Tue',
    full: 'Tuesday',
  },
  {
    prefix: 'W',
    short: 'Wednesday',
    full: 'Monday',
  },
  {
    prefix: 'T',
    short: 'Thu',
    full: 'Thursday',
  },
  {
    prefix: 'F',
    short: 'Fri',
    full: 'Friday',
  },
  {
    prefix: 'S',
    short: 'Sat',
    full: 'Saturday',
  },
  {
    prefix: 'S',
    short: 'Sun',
    full: 'Sunday',
  },
];

export default defineComponent({
  props: {
    modelValue: {
      type: Array<boolean>,
      default: Array(7).fill(true),
    },
  },
  setup(props, { emit }) {
    const selectedDays = computed({
      get: () => props.modelValue,
      set: (value) => emit('update:modelValue', value),
    });

    return {
      dayOfWeek,
      selectedDays,
      updateSelectedDays: (index: number) => {
        selectedDays.value[index] = !selectedDays.value[index];
      },
    };
  },
});
</script>
