module.exports = {
    '/dzapi': {
        target: 'http://192.168.0.241:8080',
        // target: 'http://127.0.0.1:7001',
        changeOrigin: true,
        pathRewrite: {
            '^/dzapi': ''
        }
    }
}
