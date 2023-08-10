const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: "http://localhost:5500",
    viewportWidth: 1920,
    viewportHeight: 1080,
    video: false,
    setupNodeEvents(on, config) {},
  },
});
