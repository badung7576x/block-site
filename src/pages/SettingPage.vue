<template>
  <q-page class="space-y-4 py-4 px-8 bg-gray-50">
    <div class="flex items-center justify-between">
      <div class="text-2xl font-semibold text-gray-500">
        {{ $t('settings.title') }}
      </div>
      <button
        @click="saveSetting"
        type="button"
        class="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-1.5 mr-2 mb-2 focus:outline-none"
      >
        {{ $t('settings.save_btn') }}
      </button>
    </div>
    <div class="row">
      <label
        for="first_name"
        class="block mb-2 text-lg font-medium text-gray-500"
        >Study set will learn</label
      >
      <q-select
        class="ring-1 ring-slate-200 w-full text-sm px-3 shadow-sm placeholder-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-slate-300"
        v-model="learnStudyset"
        multiple
        :options="options"
        use-chips
        stack-label
        borderless
        bg-color="white"
        max-values="3"
        emit-value
        map-options
      >
        <template v-slot:selected-item="scope">
          <q-chip
            :tabindex="scope.tabindex"
            class="bg-blue-500 text-white inline-flex items-center pl-2.5 pr-1.5 py-2.5 text-sm font-medium"
          >
            <div class="pr-2">{{ scope.opt.label }}</div>
            <q-icon
              class="cursor-pointer inline-flex justify-center items-center ml-2 w-4 h-4 text-xs font-semibold text-blue-800 bg-blue-200 rounded-full"
              name="clear"
              @click.stop.prevent="learnStudyset.splice(scope.index, 1)"
            />
          </q-chip>
        </template>
        <template v-slot:no-option>
          <q-item>
            <q-item-section class="text-italic text-gray-600 text-md">
              No study sets
            </q-item-section>
          </q-item>
        </template>
      </q-select>
    </div>
    <div class="row">
      <label
        for="first_name"
        class="block mb-2 text-lg font-medium text-gray-500"
        >Max flashcards (Number of flashcards per lesson)</label
      >
      <input
        type="number"
        class="ring-1 ring-slate-200 w-full text-sm py-2 px-4 shadow-sm placeholder-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-slate-300"
        v-model="maxFlashcards"
        required
      />
    </div>
  </q-page>
</template>

<script lang="ts">
import { defineComponent, ref, watch, onMounted } from 'vue';
import StudysetService from 'src/services/studyset';
import SettingService from 'src/services/setting';
import { Setting } from 'src/types/setting';
import CommonService from 'src/services/common';

type Option = {
  label?: string;
  value?: number;
};

export default defineComponent({
  components: {},
  setup() {
    const maxFlashcards = ref(0);
    const learnStudyset = ref<number[]>([]);
    const studysets = StudysetService.getAll();

    const options = ref<Option[]>([]);

    onMounted(async () => {
      const setting = await SettingService.getCurrentSetting();
      maxFlashcards.value = setting?.max_flashcards || 5;
      learnStudyset.value = setting?.learn_study_set || [];
    }),
      watch(
        () => studysets.value,
        () => {
          options.value =
            studysets.value?.map((item) => {
              return { label: item.name, value: item.id };
            }) || [];
        }
      );

    return {
      maxFlashcards,
      learnStudyset,
      options,
      saveSetting: () => {
        if (learnStudyset.value.length <= 0 || maxFlashcards.value < 0) {
          CommonService.showNotify('error', 'Please input setting!');
          return;
        }
        const data: Setting = {
          learn_study_set: JSON.parse(JSON.stringify(learnStudyset.value)),
          max_flashcards: maxFlashcards.value,
        };

        SettingService.save(data);
        CommonService.showNotify('success', 'Update settings successfully!');
      },
    };
  },
});
</script>
