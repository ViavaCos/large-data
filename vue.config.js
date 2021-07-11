module.exports = {
    // configureWebpack: config => {
    //   if (process.env.NODE_ENV === 'production') {
    //     // 为生产环境修改配置...
    //   } else {
    //     // 为开发环境修改配置...
    //   }
        // config.module.rules.push({
        //     test: /\.worker\.(c|m)?js$/i,
        //     loader: "worker-loader",
        //     options: {
        //     esModule: false, // important
        //     inline: "fallback" // important
        //     },
        // })
    // },

    // 修复worker-loader的缓存问题
    // https://github.com/webpack-contrib/worker-loader/issues/195
    chainWebpack: config => {
        config.module.rule('worker').test(/\.worker\.js$/).use('worker-loader').loader('worker-loader').options({
            inline: 'fallback'
          }).end();
          config.module.rule('js').exclude.add(/\.worker\.js$/);
    }
  }