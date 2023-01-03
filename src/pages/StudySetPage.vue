<template>
  <q-page class="space-y-4 py-4 px-8 bg-gray-50">
    <div class="flex items-center justify-between">
      <div class="text-2xl font-semibold text-gray-500">
        {{ $t('pStudysets.title') }}
      </div>
      <router-link
        :to="{ name: 'CreateStudySetPage' }"
        type="button"
        class="text-gray-500 bg-gray-300 hover:bg-green-700 hover:text-white focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2 inline-block focus:outline-none"
      >
        {{ $t('pStudysets.btnCreate') }}
      </router-link>
    </div>
    <div
      v-if="studysets && studysets?.length > 0"
      class="grid grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 grid-flow-row gap-6 mr-2"
    >
      <router-link
        v-for="item in studysets"
        :key="item.id"
        href="#"
        class="flex flex-col bg-white border rounded-lg shadow-md max-w"
        :to="{ name: 'StudySetDetailPage', params: { id: item.id } }"
      >
        <div class="flex items-center p-3">
          <div class="flex-shrink-0"><folder /></div>
          <div class="flex-1 min-w-0 ml-2">
            <p
              class="text-sm font-medium text-gray-900 truncate first-letter:uppercase"
            >
              {{ item.name }}
            </p>
            <p class="text-sm text-gray-500 truncate dark:text-gray-400">
              {{ item.flashcards.length ?? 0 }} {{ $t('pStudysets.unit') }}
            </p>
          </div>
        </div>
      </router-link>
    </div>
    <div v-else class="text-center">
      <p class="text-xl text-slate-400">
        {{ $t('pStudysets.noStudysets') }}
      </p>
    </div>
  </q-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import StudysetService from 'src/services/studyset';
import Folder from 'src/components/icons/SvgFolder.vue';

export default defineComponent({
  components: { Folder },
  setup() {
    return {
      studysets: StudysetService.getAll(),
    };
  },
});
</script>
