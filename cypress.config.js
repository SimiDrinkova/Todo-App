const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: "https://simidrinkova.github.io/Todo-App/",
    setupNodeEvents(on, config) {},
  },
});
