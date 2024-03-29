const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: "http://127.0.0.1:5500/",
    viewportWidth: 1920,
    viewportHeight: 1080,
    video: false,
    setupNodeEvents(on, config) {
      require('@bahmutov/cy-grep/src/plugin')(config);
      return config;
    },
  },
  "env": {
    "grepOmitFiltered": true,
    "grepFilterSpecs": true
  }
});
