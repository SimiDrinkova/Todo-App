const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: "http://127.0.0.1:8080/",
    viewportWidth: 1920,
    viewportHeight: 1080,
    video: false,
    setupNodeEvents(on, config) {},
  },
});
