<template>
  <div
    class="fixed inset-0 bg-stone-800 bg-opacity-40 overflow-y-auto h-full w-full z-[2000]"
    :class="{ hidden: !open }"
  >
    <div class="flex justify-center items-center pt-24">
      <div
        class="wrapper hidden first:block"
        v-for="flashcard in flashcards"
        :key="flashcard.id"
      >
        <div
          class="flip-content relative w-[850px] min-h-[400px] cursor-pointer"
          :class="{ 'is-flipped': flip }"
          @click.stop="flip = !flip"
        >
          <div
            class="front w-full min-h-[550px] max-h-[550px] shadow-2xl rounded-2xl p-5 bg-white flex flex-col justify-center items-center text-2xl pb-20 pt-16 px-8"
          >
            <div class="absolute top-1 left-3.5 p-1.5">
              <span
                class="bg-indigo-100 text-indigo-800 text-sm font-semibold px-2.5 py-0.5 rounded"
                >Term</span
              >
            </div>
            <div class="absolute top-3 right-2.5 p-1.5 ml-auto group">
              <button
                type="button"
                class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm inline-flex items-center"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 128 512"
                >
                  <path
                    d="M64 360c30.9 0 56 25.1 56 56s-25.1 56-56 56s-56-25.1-56-56s25.1-56 56-56zm0-160c30.9 0 56 25.1 56 56s-25.1 56-56 56s-56-25.1-56-56s25.1-56 56-56zM120 96c0 30.9-25.1 56-56 56S8 126.9 8 96S33.1 40 64 40s56 25.1 56 56z"
                  />
                </svg>
              </button>
              <ul
                class="dropdown-menu absolute invisible group-hover:visible text-sm text-gray-700 pt-1"
              >
                <li class="">
                  <button
                    class="rounded-t rounded-b bg-gray-200 hover:bg-gray-600 hover:text-white py-2 px-4 block w-40"
                    @click.stop="clickIgnore(flashcard)"
                  >
                    Ignore this term
                  </button>
                </li>
              </ul>
            </div>
            <div class="text-center max-h-[500px] overflow-auto">
              {{ flashcard?.front_side }}
            </div>
            <div class="absolute bottom-6 flex justify-center space-x-10">
              <button
                @click.stop="clickRemebered(flashcard)"
                class="text-green-400 bg-transparent hover:bg-gray-200 hover:text-green-600 hover:scale-125 ease-in duration-300 rounded-lg"
              >
                <svg
                  class="w-10 h-10"
                  fill="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512"
                >
                  <path
                    d="M256 512c141.4 0 256-114.6 256-256S397.4 0 256 0S0 114.6 0 256S114.6 512 256 512zM369 209L241 337c-9.4 9.4-24.6 9.4-33.9 0l-64-64c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l47 47L335 175c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9z"
                  />
                </svg>
              </button>
              <button
                @click.stop="clickNeedLearn(flashcard)"
                class="text-red-400 bg-transparent hover:bg-gray-200 hover:text-red-600 hover:scale-125 ease-in duration-300 rounded-lg"
              >
                <svg
                  class="w-10 h-10"
                  fill="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512"
                >
                  <path
                    d="M175 175C184.4 165.7 199.6 165.7 208.1 175L255.1 222.1L303 175C312.4 165.7 327.6 165.7 336.1 175C346.3 184.4 346.3 199.6 336.1 208.1L289.9 255.1L336.1 303C346.3 312.4 346.3 327.6 336.1 336.1C327.6 346.3 312.4 346.3 303 336.1L255.1 289.9L208.1 336.1C199.6 346.3 184.4 346.3 175 336.1C165.7 327.6 165.7 312.4 175 303L222.1 255.1L175 208.1C165.7 199.6 165.7 184.4 175 175V175zM512 256C512 397.4 397.4 512 256 512C114.6 512 0 397.4 0 256C0 114.6 114.6 0 256 0C397.4 0 512 114.6 512 256zM256 48C141.1 48 48 141.1 48 256C48 370.9 141.1 464 256 464C370.9 464 464 370.9 464 256C464 141.1 370.9 48 256 48z"
                  />
                </svg>
              </button>
            </div>
          </div>
          <div
            class="back w-full min-h-[550px] max-h-[550px] shadow-2xl rounded-2xl p-5 bg-white flex justify-center items-center text-2xl"
          >
            <div class="absolute top-1 left-3.5 p-1.5">
              <span
                class="bg-indigo-100 text-indigo-800 text-sm font-semibold px-2.5 py-0.5 rounded"
                >Definition</span
              >
            </div>
            <div class="text-center max-h-[500px] overflow-auto">
              {{ flashcard?.back_side }}
            </div>
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
    flashcards: {
      type: Array as PropType<Flashcard[]>,
    },
  },
  emits: ['update:modelValue', 'ignore', 'remembered', 'needLearn'],
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
      clickRemebered: (flashcard: Flashcard) => {
        // TODO: Add animation
        emit('remembered', flashcard);
      },
      clickNeedLearn: (flashcard: Flashcard) => {
        // TODO: Add animation
        emit('needLearn', flashcard);
      },
      clickIgnore: (flashcard: Flashcard) => {
        // TODO: Add animation
        emit('ignore', flashcard);
      },
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
    white-space: pre-line
  .back
    transform: rotateY(180deg)
</style>
