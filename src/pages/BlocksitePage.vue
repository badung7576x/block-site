<template>
  <q-page class="space-y-4 py-4 px-8 bg-gray-50">
    <div class="flex items-center justify-between">
      <div class="text-2xl font-semibold text-gray-500">
        {{ $t('pBlocksites.title') }}
      </div>
    </div>
    <div class="group relative">
      <common-input
        v-model="inputUrl"
        @keydown="input"
        :error="inputError.length > 0"
        :placeholder="$t('pBlocksites.inputBlockPlaceholder')"
      />
    </div>
    <div class="flex items-center justify-between">
      <div class="text-xl font-semibold text-gray-500">
        {{ $t('pBlocksites.title2') }}
      </div>
      <search-input width="w-60" v-model="inputSearch" />
    </div>
    <div
      v-if="filterBlocksites && filterBlocksites.length > 0"
      class="flex items-center justify-between"
    >
      <blocksite-row
        v-for="row in filterBlocksites"
        :key="row.id"
        :data="row"
        @delete="showDeleteModal"
        @edit="showEditModal"
      >
      </blocksite-row>
    </div>
    <div v-else class="text-center">
      <p class="text-xl text-slate-400">
        {{ $t('pBlocksites.noBlockedsites') }}
      </p>
    </div>
    <confirm-modal
      v-model="visibleDeleteModal"
      :content="$t('pBlocksites.msgConfirmUnblocksite')"
      @yes-click="removeBlocksite"
    />
    <blocksite-setting
      v-model="visibleEditModal"
      :data="selectedBlocksite"
    ></blocksite-setting>
  </q-page>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from 'vue';
import CommonService from 'src/services/common';
import BlocksiteService from 'src/services/blocksite';
import { Blocksite } from 'src/types/blocksite';
import BlocksiteRow from 'src/components/blocksite/BlocksiteRow.vue';
import ConfirmModal from 'src/components/common/ConfirmModal.vue';
import BlocksiteSetting from 'src/components/blocksite/BlocksiteSetting.vue';
import CommonInput from 'src/components/common/CommonInput.vue';
import SearchInput from 'src/components/common/SearchInput.vue';
import { useI18n } from 'vue-i18n';

const ENTER_KEY = 'Enter';

export default defineComponent({
  name: 'BlocksitePage',
  components: {
    BlocksiteRow,
    ConfirmModal,
    BlocksiteSetting,
    CommonInput,
    SearchInput,
  },
  setup() {
    const { t } = useI18n();
    const visibleDeleteModal = ref(false);
    const visibleEditModal = ref(false);
    const inputUrl = ref('');
    const inputError = ref('');
    const selectedBlocksite = ref<Blocksite>({} as Blocksite);
    const inputSearch = ref('');
    const blocksites = BlocksiteService.getAll();

    return {
      visibleDeleteModal,
      visibleEditModal,
      inputUrl,
      inputError,
      selectedBlocksite,
      inputSearch,
      filterBlocksites: computed(() => {
        const searchTxt = inputSearch.value.trim().toLowerCase();

        if (searchTxt != '') {
          return blocksites.value?.filter(
            (item) =>
              (item.title && item.title.toLowerCase().includes(searchTxt)) ||
              (item.origin_url &&
                item.origin_url.toLowerCase().includes(searchTxt))
          );
        } else {
          return blocksites.value;
        }
      }),
      showDeleteModal: (data: Blocksite) => {
        selectedBlocksite.value = data;
        visibleDeleteModal.value = true;
      },
      showEditModal: (data: Blocksite) => {
        selectedBlocksite.value = data;
        visibleEditModal.value = true;
      },
      input: async (e: KeyboardEvent) => {
        inputUrl.value = inputUrl.value.trim();
        if (!CommonService.isValidUrl(inputUrl.value)) {
          inputError.value = t('pBlocksites.msgInputInvalid');
          return;
        } else {
          inputError.value = '';
        }

        if (e.key == ENTER_KEY) {
          if (inputUrl.value == '') return;
          const domain = CommonService.normalizeUrl(inputUrl.value);
          const existUrl = await BlocksiteService.find('url', domain);

          if (existUrl) {
            CommonService.showNotify(
              'error',
              t('pBlocksites.msgErrorUrlExists')
            );
            inputUrl.value = '';
            return;
          }

          const data: Blocksite = {
            icon: '',
            url: domain,
            origin_url: inputUrl.value,
            title: domain,
            time: {
              start: '00:00',
              end: '24:00',
            },
            days: Array(7).fill(true),
          };
          try {
            await BlocksiteService.create(data);
            CommonService.showNotify(
              'success',
              t('pBlocksites.msgSuccessAddBlocksite')
            );
          } catch (e: unknown) {
            console.error((e as Error).message);
          } finally {
            inputUrl.value = '';
          }
        }
      },
      removeBlocksite: () => {
        BlocksiteService.delete(selectedBlocksite.value.id as number);
        visibleDeleteModal.value = false;
        CommonService.showNotify(
          'success',
          t('pBlocksites.msgSuccessUnblocksite')
        );
      },
    };
  },
});
</script>
