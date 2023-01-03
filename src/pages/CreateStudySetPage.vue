<template>
  <q-page class="space-y-4 py-4 px-8 bg-gray-50" id="container">
    <div class="flex items-center justify-between">
      <div class="text-2xl font-semibold text-gray-500">
        <router-link
          :to="{ name: 'StudySetPage' }"
          exact
          class="hover:text-blue-400 hover:underline"
        >
          {{ $t('menu.studysets') }}
        </router-link>
        <span> > </span>
        {{ $t('pCreateStudyset.title') }}
      </div>
      <button
        @click="saveStudyset"
        type="button"
        class="text-gray-500 bg-gray-300 hover:bg-green-700 hover:text-white focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2 focus:outline-none"
      >
        {{ $t('pCreateStudyset.btnCreate') }}
      </button>
    </div>
    <div class="row">
      <input
        v-model="name"
        type="text"
        class="ring-1 ring-slate-200 w-2/3 md:w-1/3 text-sm py-2 pl-4 shadow-sm placeholder-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-slate-300"
        :placeholder="$t('pCreateStudyset.inputNamePlaceholder')"
        required
      />
    </div>
    <div class="row">
      <q-input
        v-model="description"
        autogrow
        borderless
        rows="2"
        type="textarea"
        class="ring-1 ring-slate-200 w-2/3 md:w-1/3 text-sm py-0 pl-4 shadow-sm placeholder-slate-400 rounded-md focus:outline-none focus:ring-2 focus:ring-slate-300 bg-white"
        :placeholder="$t('pCreateStudyset.inputDescriptionPlaceholder')"
      ></q-input>
    </div>
    <div class="flex items-center justify-between">
      <div class="text-xl font-semibold text-gray-500">
        {{ $t('pCreateStudyset.terms') }}
      </div>
      <div
        @click="visibleImportMultipleFlashcard = true"
        class="text-lg font-base text-gray-500 mr-2 hover:text-blue-400 hover:underline hover:cursor-pointer"
      >
        {{ $t('pCreateStudyset.btnImport') }}
      </div>
    </div>
    <div class="row">
      <flash-card-row
        v-for="(item, idx) of flashcards"
        :key="item.order"
        v-model="flashcards[idx]"
        @expand="visibleFlashcardInputModal = true"
        @remove="removeFlashcard"
      ></flash-card-row>
    </div>
    <div class="row flex justify-center items-center">
      <button
        @click="addNewTerm"
        type="button"
        class="text-gray-500 bg-gray-300 hover:bg-green-700 hover:text-white focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2 mr-2 mb-2 focus:outline-none"
      >
        {{ $t('pCreateStudyset.btnAddNewTerm') }}
      </button>
    </div>
    <flash-card-input-modal v-model="visibleFlashcardInputModal" />
    <import-multiple-flashcard
      v-model="visibleImportMultipleFlashcard"
      @import="importFlashcards"
    />
    <scroll-to-top />
  </q-page>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from 'vue';
import { v4 as uuidv4 } from 'uuid';
import FlashCardRow from 'src/components/study_set/FlashCardRow.vue';
import FlashCardInputModal from 'src/components/study_set/FlashCardInputModal.vue';
import ImportMultipleFlashcard from 'src/components/study_set/ImportMultipleFlashcard.vue';
import ScrollToTop from 'src/components/common/ScrollToTop.vue';
import { Flashcard, Studyset } from 'src/types/studyset';
import StudysetService from 'src/services/studyset';
import CommonService from 'src/services/common';
import { useRouter } from 'vue-router';
import moment from 'moment';
import { useQuasar } from 'quasar';

export default defineComponent({
  components: {
    FlashCardRow,
    FlashCardInputModal,
    ImportMultipleFlashcard,
    ScrollToTop,
  },
  setup() {
    const $q = useQuasar();
    const router = useRouter();
    const name = ref('');
    const description = ref('');
    const visibleImportMultipleFlashcard = ref(false);
    const flashcards = ref<Flashcard[]>([
      {
        id: uuidv4(),
        order: 1,
        front_side: '',
        back_side: '',
        level: 0,
        next_learn: moment(),
        created_at: moment(),
        updated_at: moment(),
      },
    ]);

    watch(
      () => flashcards.value.length,
      () => {
        document.body.scrollTop = document.body.scrollHeight;
      }
    );

    return {
      name,
      description,
      flashcards,
      visibleFlashcardInputModal: ref(false),
      visibleImportMultipleFlashcard,
      addNewTerm: async () => {
        flashcards.value.push({
          id: uuidv4(),
          order: flashcards.value.length + 1,
          front_side: '',
          back_side: '',
          level: 0,
          next_learn: moment(),
          created_at: moment(),
          updated_at: moment(),
        });
      },
      removeFlashcard: (flashcard: Flashcard) => {
        const temp = flashcards.value.filter((item) => item.id != flashcard.id);
        if (temp.length == 0) {
          CommonService.showNotify(
            'warning',
            'Study set must have at least one term!'
          );
          return;
        } else {
          flashcards.value = temp;
        }
      },
      saveStudyset: async () => {
        if (name.value.trim() == '') {
          CommonService.showNotify(
            'warning',
            'Please enter the study set name!'
          );
          return;
        }

        // Remove incomplete flashcard
        flashcards.value = flashcards.value.filter(
          (item) => item.front_side.trim() && item.back_side.trim()
        );

        if (flashcards.value.length <= 0) {
          CommonService.showNotify(
            'warning',
            'Study set must have at least one term!'
          );

          flashcards.value.push({
            id: uuidv4(),
            order: flashcards.value.length + 1,
            front_side: '',
            back_side: '',
            level: 0,
            next_learn: moment(),
            created_at: moment(),
            updated_at: moment(),
          });
          return;
        }

        const data: Studyset = {
          name: name.value,
          description: description.value,
          flashcards: JSON.parse(JSON.stringify(flashcards.value)),
        };

        await StudysetService.create(data);
        router.push({ name: 'StudySetPage' });
        CommonService.showNotify('success', 'Add new study set successfully!');
      },
      importFlashcards: (data: string) => {
        const rows = data.trim().split('\n');
        $q.loading.show();

        flashcards.value = flashcards.value.filter(
          (item) =>
            (item.front_side && item.front_side.trim()) ||
            (item.back_side && item.back_side.trim())
        );

        rows.forEach((item) => {
          const row = CommonService.parseCSVLine(item);

          flashcards.value.push({
            id: uuidv4(),
            order: flashcards.value.length,
            front_side: row[0].replaceAll('\\\\', '\n'),
            back_side: row[1].replaceAll('\\\\', '\n'),
            level: 0,
            next_learn: moment(),
            created_at: moment(),
            updated_at: moment(),
          });
        });
        $q.loading.hide();

        visibleImportMultipleFlashcard.value = false;
      },
    };
  },
});
</script>
