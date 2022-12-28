/* eslint-env node */
// https://v2.quasar.dev/quasar-cli-vite/quasar-config-js

const { configure } = require('quasar/wrappers');
const path = require('path');

module.exports = configure(function (/* ctx */) {
  return {
    eslint: {
      warnings: true,
      errors: true,
    },

    // https://v2.quasar.dev/quasar-cli-vite/prefetch-feature
    // preFetch: true,

    // app boot file (/src/boot)
    // --> boot files are part of "main.js"
    // https://v2.quasar.dev/quasar-cli-vite/boot-files
    boot: ['i18n'],

    // https://v2.quasar.dev/quasar-cli-vite/quasar-config-js#css
    css: ['app.scss'],

    // https://github.com/quasarframework/quasar/tree/dev/extras
    extras: ['roboto-font', 'material-icons'],

    build: {
      target: {
        browser: ['es2019', 'edge88', 'firefox78', 'chrome87', 'safari13.1'],
        node: 'node16',
      },

      vueRouterMode: 'history', // available values: 'hash', 'history'
      // vueRouterBase,
      // vueDevtools,

      // rebuildCache: true, // rebuilds Vite/linter/etc cache on startup

      // publicPath: path.resolve(__dirname, './extensions/'),
      // analyze: true,
      // env: {},
      // rawDefine: {}
      // ignorePublicFolder: true,
      minify: false,
      // polyfillModulePreload: true,
      distDir: path.resolve(__dirname, './extensions'),
      // extendViteConf (viteConf) {},
      vitePlugins: [
        [
          'rollup-plugin-copy',
          {
            targets: [
              {
                src: path.resolve(__dirname, './src/manifest.json'),
                dest: path.resolve(__dirname, './extensions'),
              },
              {
                src: path.resolve(__dirname, './src/background.js'),
                dest: path.resolve(__dirname, './extensions'),
              },
              {
                src: path.resolve(__dirname, './extensions/index.html'),
                dest: path.resolve(__dirname, './extensions/options.html'),
              },
            ],
          },
        ],
        [
          '@intlify/vite-plugin-vue-i18n',
          {
            include: path.resolve(__dirname, './src/i18n/**'),
          },
        ],
      ],
    },

    // Full list of options: https://v2.quasar.dev/quasar-cli-vite/quasar-config-js#devServer
    devServer: {
      // https: true
      open: true, // opens browser window automatically
    },

    framework: {
      // directives: [],
      // components: [],
      plugins: ['Notify', 'Loading'],
      config: {
        loading: {
          spinner: 'QSpinnerIos',
        },
      },
    },

    animations: [],

    // https://v2.quasar.dev/quasar-cli-vite/quasar-config-js#sourcefiles
    // sourceFiles: {
    //   rootComponent: 'src/App.vue',
    //   router: 'src/router/index',
    //   store: 'src/store/index',
    //   registerServiceWorker: 'src-pwa/register-service-worker',
    //   serviceWorker: 'src-pwa/custom-service-worker',
    //   pwaManifestFile: 'src-pwa/manifest.json',
    //   electronMain: 'src-electron/electron-main',
    //   electronPreload: 'src-electron/electron-preload'
    // },

    ssr: {
      // ssrPwaHtmlFilename: 'offline.html', // do NOT use index.html as name!
      // will mess up SSR

      // extendSSRWebserverConf (esbuildConf) {},
      // extendPackageJson (json) {},

      pwa: false,

      // manualStoreHydration: true,
      // manualPostHydrationTrigger: true,

      prodPort: 3000, // The default port that the production server should use

      middlewares: [
        'render', // keep this as last one
      ],
    },

    pwa: {
      workboxMode: 'generateSW', // or 'injectManifest'
      injectPwaMetaTags: true,
      swFilename: 'sw.js',
      manifestFilename: 'manifest.json',
      useCredentialsForManifestTag: false,
      // useFilenameHashes: true,
      // extendGenerateSWOptions (cfg) {}
      // extendInjectManifestOptions (cfg) {},
      // extendManifestJson (json) {}
      // extendPWACustomSWConf (esbuildConf) {}
    },

    cordova: {},
    capacitor: {},
    electron: {},
    bex: {},
  };
});
