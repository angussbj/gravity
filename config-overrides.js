const path = require("path");
module.exports = function override(config) {
  config.resolve = {
    ...config.resolve,
    alias: {
      ...config.alias,
      components: path.resolve(__dirname, "src/components"),
      logic: path.resolve(__dirname, "src/logic"),
      ui: path.resolve(__dirname, "src/ui"),
      utilities: path.resolve(__dirname, "src/utilities"),
    },
  };
  return config;
};
