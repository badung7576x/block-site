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
          <span v-if="!$q.loading.isActive">
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
          <span v-else class="animate-pulse items-center">
            <span
              class="inline-block h-4 bg-gray-300 rounded-full dark:bg-gray-600 w-48 ml-1"
            ></span>
          </span>
        </div>
        <div>
          <button
            @click="visibleDeleteModal = true"
            type="button"
            class="text-gray-500 bg-gray-300 hover:bg-red-600 hover:text-white focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2 mr-2 focus:outline-none"
          >
            {{ $t('pStudysetDetail.btnDelete') }}
          </button>
          <router-link
            :to="{ name: 'EditStudySetPage' }"
            class="text-gray-500 bg-gray-300 hover:bg-green-700 hover:text-white focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2 inline-block focus:outline-none"
          >
            {{ $t('pStudysetDetail.btnEdit') }}
          </router-link>
        </div>
      </div>
      <div class="flex flex-col justify-between">
        <div class="text-xl font-semibold text-gray-500 mb-2">
          {{ $t('pStudysetDetail.progress') }}
        </div>
        <div class="w-1/3 border border-gray-200 rounded-lg shadow-md px-2">
          <vue-apex-charts height="350" :options="options" :series="series" />
        </div>
      </div>
      <div class="flex items-center justify-between">
        <div class="text-xl font-semibold text-gray-500">
          {{ $t('pStudysetDetail.terms') }}
          <span class="text-sm font-normal text-gray-500">
            ({{ filterFlashcards ? filterFlashcards.length : 0 }}
            {{ $t('pStudysets.unit') }})
          </span>
        </div>
        <div class="w-60 mt-2">
          <div class="relative">
            <div
              class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none"
            >
              <search />
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
          {{ $t('pStudysetDetail.noTerms') }}
        </p>
      </div>
    </div>
    <confirm-modal
      v-model="visibleDeleteModal"
      :content="$t('pStudysetDetail.msgDeleteStudyset')"
      @yes-click="deleteStudyset"
    />
    <flash-card-component
      v-model="visibleFlashcard"
      :flashcard="selectedFlashcard"
    />
    <scroll-to-top />
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
import ScrollToTop from 'src/components/common/ScrollToTop.vue';
import { Flashcard } from 'src/types/studyset';
import { useQuasar } from 'quasar';
import VueApexCharts from 'vue3-apexcharts';
import Search from 'src/components/icons/SvgSearch.vue';

// const RIGHT_ARROW = 39;
// const LEFT_ARROW = 37;

export default defineComponent({
  components: {
    FlashCardRow,
    ConfirmModal,
    FlashCardComponent,
    ScrollToTop,
    VueApexCharts,
    Search,
  },
  setup() {
    const $q = useQuasar();
    const route = useRoute();
    const router = useRouter();
    const studyset = ref<Studyset>();
    const inputSearch = ref('');
    const selectedFlashcard = ref<Flashcard>({} as Flashcard);
    const visibleFlashcard = ref(false);
    const id = Number.parseInt(route.params.id as string);
    const chartData = ref({ '-1': 0, '0': 0, '1': 0, '2': 0, '3': 0, '4': 0 });

    onMounted(async () => {
      $q.loading.show();
      studyset.value = await StudysetService.get(id);

      const calcChartData = async () => {
        const flashcardLevels = studyset.value?.flashcards.map(
          (item) => item.level
        );
        const map =
          flashcardLevels?.reduce(
            (acc, value) => ({
              ...acc,
              [value]: (acc[value] || 0) + 1,
            }),
            {} as {
              [key: string]: number;
            }
          ) || {};
        chartData.value = { ...chartData.value, ...map };
      };

      await calcChartData();

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
      $q,
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
      options: {
        chart: {
          type: 'bar',
          toolbar: {
            show: false,
          },
        },
        xaxis: {
          categories: [
            'Level 1',
            'Level 2',
            'Level 3',
            'Level 4',
            'Level 5',
            'Ignore',
          ],
        },
        plotOptions: {
          bar: {
            borderRadius: 10,
            borderRadiusApplication: 'end',
          },
        },
      },
      series: computed(() => [
        {
          name: 'terms',
          data: Object.values(chartData.value),
        },
      ]),
    };
  },
});
</script>
