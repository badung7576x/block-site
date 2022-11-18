<template>
  <div class="inline-flex text-lg border rounded-md p-1.5">
    <select
      v-model="selectedHour"
      class="text-sm px-2.5 outline-none appearance-none bg-transparent"
    >
      <option v-for="hour in hours" :key="hour" :value="hour">
        {{ hour }}
      </option>
    </select>
    <span class="px-2">:</span>
    <select
      v-model="selectedMinute"
      class="text-sm px-2.5 outline-none appearance-none bg-transparent"
      :disabled="selectedHour == '24'"
    >
      <option v-for="minute in minutes" :key="minute" :value="minute">
        {{ minute }}
      </option>
    </select>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';

export default defineComponent({
  props: {
    modelValue: {
      type: String,
      default: '00:00',
    },
  },
  setup(props, { emit }) {
    const selectedHour = computed({
      get: () => props.modelValue.split(':')[0],
      set: (value) =>
        emit(
          'update:modelValue',
          `${value}:${value == '24' ? '00' : selectedMinute.value}`
        ),
    });

    const selectedMinute = computed({
      get: () => props.modelValue.split(':')[1],
      set: (value) =>
        emit('update:modelValue', `${selectedHour.value}:${value}`),
    });

    return {
      hours: Array.from(Array(25).keys(), (x) => (x < 10 ? `0${x}` : x)),
      minutes: Array.from(Array(12).keys(), (x) =>
        x < 2 ? `0${x * 5}` : x * 5
      ),
      selectedHour,
      selectedMinute,
    };
  },
});
</script>
