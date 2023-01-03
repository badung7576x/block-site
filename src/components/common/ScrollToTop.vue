<template>
  <button
    ref="appButton"
    class="hidden text-white bg-blue-700 hover:scale-110 ease-in duration-300 rounded-full p-2.5 text-center fixed bottom-8 right-8"
    @click="scrollToTop"
  >
    <arrow-up custom-class="text-white w-6 h-6" />
  </button>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, onBeforeMount } from 'vue';
import ArrowUp from '../icons/SvgArrowUp.vue';

export default defineComponent({
  components: { ArrowUp },
  setup() {
    const appButton = ref();
    const userScroll = () => {
      if (window.scrollY > 0) {
        appButton.value && appButton.value.classList.remove('hidden');
      } else {
        appButton.value && appButton.value.classList.add('hidden');
      }
    };
    onMounted(() => {
      window.addEventListener('scroll', userScroll);
    });
    onBeforeMount(() => {
      window.removeEventListener('scroll', userScroll);
    });

    return {
      appButton,
      scrollToTop: () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      },
    };
  },
});
</script>
