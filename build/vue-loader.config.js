module.exports = (isDev) => {
    return {
        preserveWhitepace: true,    //去掉多余空格
        extractCSS: !isDev,            // 是否将.vue文件中的css分离出来
        cssModules: {
            localIndentName: isDev ? '[path]-[name]-[hash:base64:5]' : '[hash:base64:5]',
            cameCase: true
        }
        // postcss
        // hotReload   //根据环境变量来生成
    }
}