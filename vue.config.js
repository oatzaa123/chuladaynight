module.exports = {
  pluginOptions: {
    i18n: {
      locale: "th",
      fallbackLocale: "en",
      localeDir: "locales",
      enableLegacy: false,
      runtimeOnly: false,
      compositionOnly: false,
      fullInstall: true,
    },
  },
  devServer: {
    proxy: "https://www.chulaartpark.art/api_v1",
    overlay: {
      warnings: true,
      errors: true,
    },
  },
};
