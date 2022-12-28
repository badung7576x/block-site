<template>
  <q-page class="py-4 px-8 bg-gray-50">
    <div class="space-y-5">
      <div class="flex items-center justify-between">
        <div
          class="text-2xl font-semibold text-gray-500 first-letter:uppercase"
        >
          <router-link
            :to="{ name: 'StudySetPage' }"
            exact
            class="hover:text-blue-400 hover:underline"
          >
            {{ $t('menu.studysets') }}
          </router-link>
          <span> > </span>
          <span>
            {{ studyset && studyset.name }}
            <div
              v-if="studyset && studyset.description"
              class="group relative ml-3 cursor-pointer inline-block"
            >
              <svg
                class="w-4 h-4 text-gray-500"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
              >
                <path
                  d="M256 512c141.4 0 256-114.6 256-256S397.4 0 256 0S0 114.6 0 256S114.6 512 256 512zM216 336h24V272H216c-13.3 0-24-10.7-24-24s10.7-24 24-24h48c13.3 0 24 10.7 24 24v88h8c13.3 0 24 10.7 24 24s-10.7 24-24 24H216c-13.3 0-24-10.7-24-24s10.7-24 24-24zm40-144c-17.7 0-32-14.3-32-32s14.3-32 32-32s32 14.3 32 32s-14.3 32-32 32z"
                />
              </svg>
              <span
                class="invisible group-hover:visible delay-300 font-normal bg-gray-200 px-2 py-1 text-sm text-black-500 rounded-md absolute left-1/2 translate-y-1 break-normal min-w-[250px]"
                >{{ studyset.description }}</span
              >
            </div>
          </span>
        </div>
        <div>
          <button
            @click="visibleDeleteModal = true"
            type="button"
            class="text-white bg-red-500 hover:bg-red-600 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-1.5 mr-2 mb-2 focus:outline-none"
          >
            {{ $t('study_set_detail.delete_btn') }}
          </button>
          <router-link
            :to="{ name: 'EditStudySetPage' }"
            class="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-1.5 mr-2 mb-2 focus:outline-none"
          >
            {{ $t('study_set_detail.edit_btn') }}
          </router-link>
        </div>
      </div>
      <div class="flex items-center justify-between">
        <div class="text-xl font-semibold text-gray-500">
          {{ $t('study_set_detail.progress') }}
        </div>
      </div>
      <div class="flex items-center justify-between">
        <div class="text-xl font-semibold text-gray-500">
          {{ $t('study_set_detail.terms') }}
          <span class="text-sm font-normal text-gray-500">
            ({{ filterFlashcards ? filterFlashcards.length : 0 }}
            {{ $t('study_set.terms') }})
          </span>
        </div>
        <div class="w-60 mt-2">
          <div class="relative">
            <div
              class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none"
            >
              <svg
                aria-hidden="true"
                class="w-5 h-5 text-gray-500 dark:text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                ></path>
              </svg>
            </div>
            <input
              type="search"
              v-model="inputSearch"
              class="form-control pl-10 ring-1 ring-slate-200 w-full text-sm py-2 shadow-sm placeholder-slate-400 rounded-md focus:outline-none focus:ring-2 focus:ring-slate-300"
              placeholder="Input to search"
            />
          </div>
        </div>
      </div>
      <div class="row" v-if="filterFlashcards">
        <flash-card-row
          v-for="(item, idx) of filterFlashcards"
          :key="item.order"
          v-model="filterFlashcards[idx]"
          :is-readonly="true"
          @expand="selectFlashcard"
        ></flash-card-row>
      </div>
      <div v-else class="text-center">
        <p class="text-xl text-slate-400">
          {{ $t('study_set_detail.no_terms') }}
        </p>
      </div>
    </div>
    <confirm-modal
      v-model="visibleDeleteModal"
      :content="$t('messages.delete_study_set')"
      @yes-click="deleteStudyset"
    />
    <flash-card-component
      v-model="visibleFlashcard"
      :flashcard="selectedFlashcard"
    />
  </q-page>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { Studyset } from 'src/types/studyset';
import StudysetService from 'src/services/studyset';
import CommonService from 'src/services/common';
import FlashCardRow from 'src/components/study_set/FlashCardRow.vue';
import ConfirmModal from 'src/components/common/ConfirmModal.vue';
import FlashCardComponent from 'src/components/study_set/FlashCard.vue';
import { Flashcard } from 'src/types/studyset';
import { useQuasar } from 'quasar';

// const RIGHT_ARROW = 39;
// const LEFT_ARROW = 37;

export default defineComponent({
  components: { FlashCardRow, ConfirmModal, FlashCardComponent },
  setup() {
    const $q = useQuasar();
    const route = useRoute();
    const router = useRouter();
    const studyset = ref<Studyset>();
    const inputSearch = ref('');
    const selectedFlashcard = ref<Flashcard>({} as Flashcard);
    const visibleFlashcard = ref(false);
    const id = Number.parseInt(route.params.id as string);

    onMounted(async () => {
      $q.loading.show();
      studyset.value = await StudysetService.get(id);
      $q.loading.hide();
      // window.addEventListener('keydown', (e: KeyboardEvent) => {
      //   if (e.keyCode == RIGHT_ARROW) {
      //     selectedFlashcard.value =
      //       studyset.value?.flashcards[2] || ({} as Flashcard);
      //   }
      //   if (e.keyCode == LEFT_ARROW) {
      //     selectedFlashcard.value =
      //       studyset.value?.flashcards[1] || ({} as Flashcard);
      //   }
      // });
    });

    return {
      studyset,
      inputSearch,
      selectedFlashcard,
      visibleFlashcard,
      visibleDeleteModal: ref(false),
      selectFlashcard: (flashcard: Flashcard) => {
        visibleFlashcard.value = true;
        selectedFlashcard.value = flashcard;
      },
      filterFlashcards: computed(() => {
        const searchTxt = inputSearch.value.trim().toLowerCase();
        if (searchTxt != '') {
          return studyset.value?.flashcards.filter(
            (item) =>
              (item.front_side &&
                item.front_side.toLowerCase().includes(searchTxt)) ||
              (item.back_side &&
                item.back_side.toLowerCase().includes(searchTxt))
          );
        } else {
          return studyset.value?.flashcards;
        }
      }),
      deleteStudyset: async () => {
        await StudysetService.delete(id);
        router.push({ name: 'StudySetPage' });
        CommonService.showNotify('success', 'Remove study set successfully!');
      },
    };
  },
});
</script>
