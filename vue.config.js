module.exports = {
    configureWebpack: config => {
    //   if (process.env.NODE_ENV === 'production') {
    //     // 为生产环境修改配置...
    //   } else {
    //     // 为开发环境修改配置...
    //   }
    config.module.rules.push({
        test: /\.worker\.(c|m)?js$/i,
        loader: "worker-loader",
        options: {
          esModule: false, // important
          inline: "fallback" // important
        },
      })
    }
  }