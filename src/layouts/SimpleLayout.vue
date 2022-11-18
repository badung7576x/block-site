<template>
  <q-layout>
    <q-header bordered class="headerStyle flex items-center bg-gray-50">
      <q-toolbar>
        <q-btn
          dense
          flat
          class="text-slate-800"
          icon="menu"
          size="18px"
          @click="toggleLeftDrawer"
        />
        <q-toolbar-title>
          <div class="text-h6 text-slate-800">{{ $t('app.name') }}</div>
        </q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-drawer
      :width="250"
      class="bg-gray-50"
      how-if-above
      bordered
      v-model="leftDrawerOpen"
      side="left"
    >
      <div class="overflow-y-auto py-4 px-3 bg-gray-50 rounded">
        <ul class="space-y-2">
          <li>
            <router-link
              :to="{ name: 'BlocksitePage' }"
              class="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg hover:bg-gray-300"
              :class="{ 'bg-gray-300 font-bold': isSamePath('/blocksites') }"
            >
              <svg
                class="w-5 h-5 text-gray-500 transition duration-75 group-hover:text-gray-900"
                fill="currentColor"
                viewBox="0 0 18 18"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill="#494c4e"
                  d="M9 0a9 9 0 1 0 9 9 9 9 0 0 0-9-9zM2 9a6.992 6.992 0 0 1 11.19-5.6L3.4 13.19A6.945 6.945 0 0 1 2 9zm7 7a6.944 6.944 0 0 1-4.19-1.4l9.79-9.79A6.992 6.992 0 0 1 9 16z"
                />
              </svg>
              <span class="ml-3">{{ $t('menu.blocksites') }}</span>
            </router-link>
          </li>
          <li>
            <router-link
              :to="{ name: 'StudySetPage' }"
              class="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg hover:bg-gray-300"
              :class="{ 'bg-gray-300 font-bold': isSamePath('/study_sets') }"
            >
              <svg
                class="w-5 h-5 text-gray-500 transition duration-75 group-hover:text-gray-900"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 576 512"
                fill="currentColor"
              >
                <path
                  d="M264.5 5.2c14.9-6.9 32.1-6.9 47 0l218.6 101c8.5 3.9 13.9 12.4 13.9 21.8s-5.4 17.9-13.9 21.8l-218.6 101c-14.9 6.9-32.1 6.9-47 0L45.9 149.8C37.4 145.8 32 137.3 32 128s5.4-17.9 13.9-21.8L264.5 5.2zM476.9 209.6l53.2 24.6c8.5 3.9 13.9 12.4 13.9 21.8s-5.4 17.9-13.9 21.8l-218.6 101c-14.9 6.9-32.1 6.9-47 0L45.9 277.8C37.4 273.8 32 265.3 32 256s5.4-17.9 13.9-21.8l53.2-24.6 152 70.2c23.4 10.8 50.4 10.8 73.8 0l152-70.2zm-152 198.2l152-70.2 53.2 24.6c8.5 3.9 13.9 12.4 13.9 21.8s-5.4 17.9-13.9 21.8l-218.6 101c-14.9 6.9-32.1 6.9-47 0L45.9 405.8C37.4 401.8 32 393.3 32 384s5.4-17.9 13.9-21.8l53.2-24.6 152 70.2c23.4 10.8 50.4 10.8 73.8 0z"
                />
              </svg>
              <span class="ml-3">{{ $t('menu.studysets') }}</span>
            </router-link>
          </li>
          <li>
            <router-link
              :to="{ name: 'SettingPage' }"
              class="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg hover:bg-gray-300"
              :class="{ 'bg-gray-300 font-bold': isSamePath('/settings') }"
            >
              <svg
                class="w-5 h-5 text-gray-500 transition duration-75 group-hover:text-gray-900"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
                fill="currentColor"
              >
                <path
                  d="M495.9 166.6c3.2 8.7 .5 18.4-6.4 24.6l-43.3 39.4c1.1 8.3 1.7 16.8 1.7 25.4s-.6 17.1-1.7 25.4l43.3 39.4c6.9 6.2 9.6 15.9 6.4 24.6c-4.4 11.9-9.7 23.3-15.8 34.3l-4.7 8.1c-6.6 11-14 21.4-22.1 31.2c-5.9 7.2-15.7 9.6-24.5 6.8l-55.7-17.7c-13.4 10.3-28.2 18.9-44 25.4l-12.5 57.1c-2 9.1-9 16.3-18.2 17.8c-13.8 2.3-28 3.5-42.5 3.5s-28.7-1.2-42.5-3.5c-9.2-1.5-16.2-8.7-18.2-17.8l-12.5-57.1c-15.8-6.5-30.6-15.1-44-25.4L83.1 425.9c-8.8 2.8-18.6 .3-24.5-6.8c-8.1-9.8-15.5-20.2-22.1-31.2l-4.7-8.1c-6.1-11-11.4-22.4-15.8-34.3c-3.2-8.7-.5-18.4 6.4-24.6l43.3-39.4C64.6 273.1 64 264.6 64 256s.6-17.1 1.7-25.4L22.4 191.2c-6.9-6.2-9.6-15.9-6.4-24.6c4.4-11.9 9.7-23.3 15.8-34.3l4.7-8.1c6.6-11 14-21.4 22.1-31.2c5.9-7.2 15.7-9.6 24.5-6.8l55.7 17.7c13.4-10.3 28.2-18.9 44-25.4l12.5-57.1c2-9.1 9-16.3 18.2-17.8C227.3 1.2 241.5 0 256 0s28.7 1.2 42.5 3.5c9.2 1.5 16.2 8.7 18.2 17.8l12.5 57.1c15.8 6.5 30.6 15.1 44 25.4l55.7-17.7c8.8-2.8 18.6-.3 24.5 6.8c8.1 9.8 15.5 20.2 22.1 31.2l4.7 8.1c6.1 11 11.4 22.4 15.8 34.3zM256 336c44.2 0 80-35.8 80-80s-35.8-80-80-80s-80 35.8-80 80s35.8 80 80 80z"
                />
              </svg>
              <span class="ml-3">{{ $t('menu.settings') }}</span>
            </router-link>
          </li>
        </ul>
      </div>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { useRoute } from 'vue-router';

export default defineComponent({
  setup() {
    const leftDrawerOpen = ref(false);
    const route = useRoute();

    return {
      leftDrawerOpen,
      toggleLeftDrawer: () => {
        leftDrawerOpen.value = !leftDrawerOpen.value;
      },
      isSamePath: (path: string) => {
        return route.path.indexOf(path) === 0;
      },
    };
  },
});
</script>
<style lang="sass">
@import "tailwindcss/base"
@import "tailwindcss/components"
@import "tailwindcss/utilities"

.headerStyle
  height: 50px !important
</style>
