module.exports = {
    // publicPath: '/dist',
    devServer: {
        proxy: {
            [process.env.VUE_APP_API_URL_PREFIX]: {
                target: process.env.VUE_APP_DEV_PROXY_TARGET,
                pathRewrite: {
                    ['^' + process.env.VUE_APP_API_URL_PREFIX]: ''
                }
            },
            [process.env.VUE_APP_API_LIVE_PREFIX]: {
                target: process.env.VUE_APP_LIVE_PROXY_TARGET,
                changOrigin: true
            }
        }
    }
}
