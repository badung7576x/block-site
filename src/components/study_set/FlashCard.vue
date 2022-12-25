<template>
  <div
    class="fixed inset-0 bg-stone-800 bg-opacity-40 overflow-y-auto h-full w-full z-[2000]"
    :class="{ hidden: !open }"
    @click="open = !open"
  >
    <div class="flex justify-center items-center h-full">
      <div class="wrapper">
        <div
          class="flip-content relative w-[650px] min-h-[400px] cursor-pointer"
          :class="{ 'is-flipped': flip }"
          @click.stop="flip = !flip"
        >
          <div
            class="front w-full h-full shadow-2xl rounded-2xl p-5 bg-white flex justify-center items-center text-2xl"
          >
            {{ flashcard?.front_side }}
          </div>
          <div
            class="back w-full h-full shadow-2xl rounded-2xl p-5 bg-white flex justify-center items-center text-2xl"
          >
            {{ flashcard?.back_side }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, PropType, ref, watch } from 'vue';
import { Flashcard } from 'src/types/studyset';

export default defineComponent({
  props: {
    modelValue: {
      type: Boolean,
      default: false,
    },
    flashcard: {
      type: Object as PropType<Flashcard>,
    },
  },
  emits: ['update:modelValue'],
  setup(props, { emit }) {
    const flip = ref(false);
    const open = computed({
      get: () => props.modelValue,
      set: (value) => emit('update:modelValue', value),
    });

    watch(
      () => open.value,
      () => {
        if (open.value) flip.value = false;
      }
    );

    return {
      open,
      flip,
    };
  },
});
</script>
<style scoped lang="sass">
.wrapper
  perspective: 600px
  .flip-content
    transition: transform 0.5s
    transform-style: preserve-3d
    transform-origin: center right
  .is-flipped
    transform: translateX(-100%) rotateY(-180deg)
  .front, .back
    position: absolute
    backface-visibility: hidden
  .back
    transform: rotateY(180deg)
</style>
