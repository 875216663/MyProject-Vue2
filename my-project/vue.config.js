

const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
    transpileDependencies: true,
    //不要map
    productionSourceMap: false,

    // true 则热更新，false 则手动刷新，默认值为 true
    inline: true,
});

module.exports = {
    lintOnSave: false,
    devServer: {
        proxy: {
            "/api": {
                target: "http://gmall-h5-api.atguigu.cn",
            },

        },
    },
};