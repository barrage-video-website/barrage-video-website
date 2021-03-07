module.exports = {
    devServer: {
        proxy: {
            [process.env.VUE_APP_API_URL_PREFIX]: {
                target: process.env.VUE_APP_DEV_PROXY_TARGET,
                pathRewrite: {
                    ['^' + process.env.VUE_APP_API_URL_PREFIX]: ''
                }
            },
            '/live/': {
                target: 'http://192.168.145.128:8080',
                changOrigin: true
            }
        }
    }
}
