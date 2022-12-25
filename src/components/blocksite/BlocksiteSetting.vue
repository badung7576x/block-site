<template>
  <q-dialog v-model="open">
    <div class="relative w-full bg-white rounded-lg shadow">
      <button
        type="button"
        v-close-popup
        class="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center"
      >
        <close />
      </button>
      <div class="pt-11 px-6">
        <common-input
          :label="$t('pBlocksites.modalSetting.lWebUrl')"
          v-model="blockedSite.origin_url"
          :error="errors.url.length > 0"
          :error-txt="errors.url"
          placeholder="Input website url"
          custom-class="p-2.5"
        />
        <common-input
          :label="$t('pBlocksites.modalSetting.lWebTitle')"
          v-model="blockedSite.title"
          :error="errors.title.length > 0"
          :error-txt="errors.title"
          placeholder=""
          custom-class="p-2.5"
        />
        <div class="pb-4">
          <label for="" class="block mb-2 text-sm font-medium text-gray-900">{{
            $t('pBlocksites.modalSetting.lBlockTime')
          }}</label>
          <div class="row">
            <time-picker v-model="blockedSite.time.start"></time-picker>
            <span class="inline-block align-middle px-5 py-2.5">~</span>
            <time-picker v-model="blockedSite.time.end"></time-picker>
          </div>
          <div class="row">
            <p v-if="errors.time.length > 0" class="mt-1 text-red-600 text-sm">
              {{ errors.time }}
            </p>
          </div>
        </div>
        <div class="pb-4">
          <label for="" class="block mb-2 text-sm font-medium text-gray-900">{{
            $t('pBlocksites.modalSetting.lBlockDays')
          }}</label>
          <days-picker v-model="blockedSite.days"></days-picker>
        </div>
      </div>
      <div class="p-6 text-center">
        <button
          type="button"
          @click="updateBlocksite"
          class="text-white bg-green hover:bg-green-500 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 focus:z-10"
        >
          {{ $t('pBlocksites.modalSetting.btnUpdate') }}
        </button>
      </div>
    </div>
  </q-dialog>
</template>

<script lang="ts">
import { defineComponent, computed, PropType, ref, watchEffect } from 'vue';
import TimePicker from 'src/components/common/TimePicker.vue';
import DaysPicker from 'src/components/common/DaysPicker.vue';
import { Blocksite } from 'src/types/blocksite';
import BlocksiteService from 'src/services/blocksite';
import CommonService from 'src/services/common';
import Close from '../icons/SvgClose.vue';
import CommonInput from '../common/CommonInput.vue';
import { useI18n } from 'vue-i18n';

export default defineComponent({
  components: { TimePicker, DaysPicker, Close, CommonInput },
  props: {
    data: {
      type: Object as PropType<Blocksite>,
      default: {} as Blocksite,
    },
    modelValue: {
      type: Boolean,
      default: false,
    },
  },
  emits: ['update:modelValue'],
  setup(props, { emit }) {
    const { t } = useI18n();
    const id = ref(-1);
    const oldUrl = ref('');
    const blockedSite = ref(BlocksiteService.initFormData());

    const open = computed({
      get: () => props.modelValue,
      set: (value) => emit('update:modelValue', value),
    });

    watchEffect(() => {
      id.value = props.data.id as number;
      oldUrl.value = props.data.url;
      blockedSite.value = props.data;
    });

    const errors = computed(() => {
      return {
        url:
          blockedSite.value.origin_url == '' ||
          !CommonService.isValidUrl(blockedSite.value.origin_url)
            ? t('pBlocksites.modalSetting.msgErrorUrl')
            : '',
        title:
          blockedSite.value.title == ''
            ? t('pBlocksites.modalSetting.msgErrorTitle')
            : '',
        time: !CommonService.isValidTime(
          blockedSite.value.time.start,
          blockedSite.value.time.end
        )
          ? t('pBlocksites.modalSetting.msgErrorTime')
          : '',
      };
    });

    return {
      open,
      blockedSite,
      errors,
      updateBlocksite: async () => {
        const domain = CommonService.normalizeUrl(blockedSite.value.origin_url);
        const existUrl =
          domain != oldUrl.value &&
          (await BlocksiteService.find('url', domain));

        if (existUrl) {
          CommonService.showNotify(
            'error',
            t('pBlocksites.modalSetting.msgErrorUrlExists')
          );
          return;
        }
        if (Object.values(errors.value).some((item) => item.length > 0)) {
          CommonService.showNotify(
            'error',
            t('pBlocksites.modalSetting.msgErrorHasInvalidFeild')
          );
          return;
        }

        try {
          const data: Blocksite = {
            url: domain,
            origin_url: blockedSite.value.origin_url,
            title: blockedSite.value.title,
            time: {
              start: blockedSite.value.time.start,
              end: blockedSite.value.time.end,
            },
            days: Object.values(blockedSite.value.days),
          };
          await BlocksiteService.update(id.value as number, data);
        } catch (e) {
          console.error((e as Error).message);
        } finally {
          open.value = false;
        }
      },
    };
  },
});
</script>
