<template>
  <q-page class="space-y-4 py-4 px-8 bg-gray-50">
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
        {{ $t('edit_study_set.title') }}
      </div>
      <button
        @click="updateStudyset"
        type="button"
        class="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-1.5 mr-2 mb-2 focus:outline-none"
      >
        {{ $t('edit_study_set.update_btn') }}
      </button>
    </div>
    <div class="row">
      <input
        v-model="name"
        type="text"
        class="ring-1 ring-slate-200 w-2/3 md:w-1/3 text-sm py-2 pl-4 shadow-sm placeholder-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-slate-300"
        placeholder="Enter course name"
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
        placeholder="Enter your description ..."
      ></q-input>
    </div>
    <div class="row">
      <div class="text-xl font-semibold text-gray-500">
        {{ $t('edit_study_set.terms') }}
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
        class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 focus:outline-none"
      >
        {{ $t('edit_study_set.add_new_term') }}
      </button>
    </div>
    <flash-card-input-modal
      v-model="visibleFlashcardInputModal"
    ></flash-card-input-modal>
  </q-page>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue';
import { v4 as uuidv4 } from 'uuid';
import FlashCardRow from 'src/components/study_set/FlashCardRow.vue';
import FlashCardInputModal from 'src/components/study_set/FlashCardInputModal.vue';
import { Flashcard, Studyset } from 'src/types/studyset';
import StudysetService from 'src/services/studyset';
import CommonService from 'src/services/common';
import { useRoute, useRouter } from 'vue-router';
import moment from 'moment';

export default defineComponent({
  components: { FlashCardRow, FlashCardInputModal },
  setup() {
    const route = useRoute();
    const router = useRouter();
    const id = Number.parseInt(route.params.id as string);
    const name = ref<string>('');
    const description = ref<string>('');
    const studyset = ref<Studyset>();
    const flashcards = ref<Flashcard[]>([]);

    onMounted(async () => {
      studyset.value = await StudysetService.get(id);
      name.value = studyset.value?.name || '';
      description.value = studyset.value?.description || '';
      flashcards.value = studyset.value?.flashcards || [];
    });

    return {
      visibleFlashcardInputModal: ref(false),
      name,
      description,
      flashcards,
      addNewTerm: () => {
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
          alert('Study set must have at least one term');
          return;
        } else {
          flashcards.value = temp;
        }
      },
      updateStudyset: async () => {
        if (name.value.trim() == '') {
          alert('Please input the course name');
          return;
        }

        // Remove incomplete flashcard
        flashcards.value = flashcards.value.filter(
          (item) => item.front_side.trim() && item.back_side.trim()
        );

        if (flashcards.value.length <= 0) {
          alert('Please input flashcard');
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
        await StudysetService.update(id, data);
        router.push({ name: 'StudySetDetailPage', params: { id: id } });
        CommonService.showNotify('success', 'Update study set successfully!');
      },
    };
  },
});
</script>
