const path = require('path')
const env = require('./env')
module.exports = {
  mode: 'universal',
  env: {
    baseUrl: env[process.env.NODE_ENV].ENV_API
  },
  /*
  ** Headers of the page
  */
  head: {
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: process.env.npm_package_description || '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#fff' },
  /*
  ** Global CSS
  */
  css: [
    'element-ui/lib/theme-chalk/index.css',
    '~/assets/css/element-variables.scss',
    '~/assets/css/iconfont.css',
    '~/assets/css/base.scss'
  ],
  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    '@/plugins/element-ui',
    '~/utils/request'
  ],
  /*
  ** Nuxt.js dev-modules
  */
  buildModules: [
    // Doc: https://github.com/nuxt-community/eslint-module
    '@nuxtjs/eslint-module'
  ],
  /*
  ** Nuxt.js modules
  */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios'
  ],
  /*
  ** Axios module configuration
  ** See https://axios.nuxtjs.org/options
  */
  axios: {
    proxy: true,
    baseUrl: 'http://localhost:3001/'
  },
  proxy: {
    '/dev-api': {
      target: 'http://localhost:3001/',
      pathRewrite: { '^/dev-api': '' }
    }
  },
  /*
  ** Build configuration
  */
  build: {
    extractCSS: { allChunks: true },
    transpile: [/^element-ui/],
    styleResources: {
      scss: './assets/css/variable.scss'
    },
    /*
    ** You can extend webpack config here
    */
    extend(config, ctx) {
      Object.assign(config.resolve.alias, {
        '@assets': path.resolve(__dirname, './assets'),
        '@components': path.resolve(__dirname, './components')
      })
    }
  }
}
