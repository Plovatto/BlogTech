const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  // Caminho base do GitHub Pages (https://plovatto.github.io/BlogTech/)
  publicPath: process.env.NODE_ENV === 'production' ? '/BlogTech/' : '/',

  pluginOptions: {
    vuetify: {
			// https://github.com/vuetifyjs/vuetify-loader/tree/next/packages/vuetify-loader
		}
  }
})
