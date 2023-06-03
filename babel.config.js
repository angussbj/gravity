module.exports = function (api) {
  api.cache(false);
  return {
    plugins: [
      [
        "module-resolver",
        {
          root: ["."],
          alias: {
            components: "./src/components",
            logic: "./src/logic",
            ui: "./src/ui",
            utilities: "./src/utilities",
          },
        },
      ],
    ],
  };
};
