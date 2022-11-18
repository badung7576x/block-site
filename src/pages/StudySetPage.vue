<template>
  <q-page class="space-y-4 py-4 px-8 bg-gray-50">
    <div class="flex items-center justify-between">
      <div class="text-2xl font-semibold text-gray-500">
        {{ $t('study_set.title') }}
      </div>
      <router-link
        :to="{ name: 'CreateStudySetPage' }"
        type="button"
        class="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-1.5 mr-2 mb-2 focus:outline-none"
      >
        {{ $t('study_set.create_btn') }}
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
          <div class="flex-shrink-0">
            <svg
              class="w-14 h-14 text-gray-500 transition duration-75 group-hover:text-gray-900"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 576 512"
              fill="currentColor"
            >
              <path
                d="M572.6 270.3l-96 192C471.2 473.2 460.1 480 447.1 480H64c-35.35 0-64-28.66-64-64V96c0-35.34 28.65-64 64-64h117.5c16.97 0 33.25 6.742 45.26 18.75L275.9 96H416c35.35 0 64 28.66 64 64v32h-48V160c0-8.824-7.178-16-16-16H256L192.8 84.69C189.8 81.66 185.8 80 181.5 80H64C55.18 80 48 87.18 48 96v288l71.16-142.3C124.6 230.8 135.7 224 147.8 224h396.2C567.7 224 583.2 249 572.6 270.3z"
              />
            </svg>
          </div>
          <div class="flex-1 min-w-0 ml-2">
            <p
              class="text-sm font-medium text-gray-900 truncate first-letter:uppercase"
            >
              {{ item.name }}
            </p>
            <p class="text-sm text-gray-500 truncate dark:text-gray-400">
              {{ item.flashcards.length ?? 0 }} {{ $t('study_set.terms') }}
            </p>
          </div>
        </div>
      </router-link>
    </div>
    <div v-else class="text-center">
      <p class="text-xl text-slate-400">
        {{ $t('study_set.no_study_set') }}
      </p>
    </div>
  </q-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import StudysetService from 'src/services/studyset';

export default defineComponent({
  components: {},
  setup() {
    const studysets = StudysetService.getAll();

    return {
      studysets,
    };
  },
});
</script>
