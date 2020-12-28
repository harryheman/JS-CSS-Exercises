import Vue from "vue";

const requireComponent = require.context(".", false, /_base-[\w-]+\.(vue|js)$/);

requireComponent.keys().forEach((fileName) => {
  const componentConfig = requireComponent(fileName);

  const componentName = fileName
    .replace(/^\.\/_/, "")
    .replace(/\.\w+$/, "")
    .split("-")
    .map((kebab) => `${kebab[0].toUpperCase()}${kebab.slice(1).toLowerCase()}`)
    .join("");

    Vue.component(componentName, componentConfig.default || componentConfig)
});
