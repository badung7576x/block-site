<template>
  <div
    class="w-full h-11 inline-flex items-center justify-between my-2 pr-2 text-sm text-gray-700 bg-gray-100 border border-gray-200 rounded-full hover:bg-gray-200"
  >
    <div class="inline-flex items-center justify-between">
      <div
        class="w-11 h-11 rounded-full mr-4 ring-1 ring-gray-400 flex justify-center items-center"
      >
        <img
          class="w-8 h-8 rounded-full"
          :src="newIcon"
          :alt="data.title"
          onerror="this.src='~assets/website-icon.png'"
        />
      </div>
      <span class="text-sm font-medium text-ellipsis overflow-hidden">{{
        data.title
      }}</span>
    </div>
    <div class="inline-flex items-center justify-between">
      <div
        @click="$emit('edit', data)"
        class="w-8 h-8 rounded-full inline-flex items-center justify-center hover:bg-gray-300"
      >
        <setting class="text-green hover:fill-current" />
      </div>
      <div
        @click="$emit('delete', data)"
        class="w-8 h-8 rounded-full inline-flex items-center justify-center hover:bg-gray-300"
      >
        <trash class="text-red hover:fill-current" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, computed } from 'vue';
import { Blocksite } from 'src/types/blocksite';
import CommonService from 'src/services/common';
import Trash from '../icons/SvgTrash.vue';
import Setting from '../icons/SvgSetting.vue';

export default defineComponent({
  components: { Trash, Setting },
  props: {
    data: {
      type: Object as PropType<Blocksite>,
      default: () => {
        return {
          id: 0,
          icon: '',
          title: 'Website example',
          url: 'example.com',
        };
      },
    },
  },
  emits: ['edit', 'delete'],
  setup(props) {
    return {
      newIcon: computed(() =>
        CommonService.generateDefaultIcon(props.data.url)
      ),
    };
  },
});
</script>
