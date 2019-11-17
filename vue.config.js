module.exports = {
    devServer: {
        proxy: {
            [process.env.VUE_APP_API_URL_PREFIX]: {
                target: process.env.VUE_APP_DEV_PROXY_TARGET,
                pathRewrite: {
                    ['^'+process.env.VUE_APP_API_URL_PREFIX]: 'http://106.13.225.19/eolinker4.0/server/index.php?g=Web&c=Mock&o=simple&projectID=28&uri='
                }
            }
        }
    }
}