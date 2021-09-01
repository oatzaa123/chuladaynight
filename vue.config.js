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
        proxy: {
            '/api_v1': {
                target:
                    process.env.NODE_ENV === 'production'
                        ? process.env.VUE_APP_PROD_ENDPOINT
                        : process.env.VUE_APP_LOCAL_ENDPOINT,
                pathRewrite: { '^/api_v1': '' },
                changeOrigin: true,
                secure: false,
            },
        },
    },
}
