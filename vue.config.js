module.exports = {
    pluginOptions: {
        i18n: {
            locale: 'th',
            fallbackLocale: 'en',
            localeDir: 'locales',
            enableLegacy: false,
            runtimeOnly: false,
            compositionOnly: false,
            fullInstall: true,
        },
    },
    devServer: {
        headers: { 'Access-Control-Allow-Origin': '*' },
        proxy: 'http://localhost:5000',
        overlay: {
            warnings: true,
            errors: true,
        },
    },
}
