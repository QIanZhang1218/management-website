const proxy = require("http-proxy-middleware");

module.exports = function (index) {

    // proxy第一个参数为要代理的路由
    index.use(proxy("/api", {

        target: "http://localhost:5000", //配置你要请求的服务器地址，代理后的请求网址
        pathRewrite: {
            '^/api': ''}, //路径重写
        changeOrigin: true, // 是否改变请求头
    }))
};