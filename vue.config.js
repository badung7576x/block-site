const { defineConfig } = require('@vue/cli-service');

module.exports = defineConfig({
  pages: {
    popup: {
      template: 'public/index.html',
      entry: './src/popup/main.js',
      title: 'Popup',
    },
    options: {
      template: 'public/index.html',
      entry: './src/options/main.js',
      title: 'Options',
    },
  },
});
