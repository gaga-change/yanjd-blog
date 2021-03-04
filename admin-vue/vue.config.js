'use strict'
const path = require('path')
const defaultSettings = require('./src/settings.js')

function resolve(dir) {
  return path.join(__dirname, dir)
}

const name = defaultSettings.title || '严俊东博客后台管理' // page title

const cdn = {
  css: [
    // element-ui css
    'https://cdn.bootcdn.net/ajax/libs/element-ui/2.15.0/theme-chalk/index.min.css',
    'https://cdn.bootcdn.net/ajax/libs/normalize/7.0.0/normalize.min.css',
    'https://uicdn.toast.com/tui-color-picker/v2.2.6/tui-color-picker.min.css',
    'https://uicdn.toast.com/editor/2.5.1/toastui-editor.min.css',
    'https://cdn.bootcdn.net/ajax/libs/highlight.js/10.5.0/styles/github.min.css',
    'https://cdn.bootcdn.net/ajax/libs/codemirror/5.59.2/codemirror.css'
  ],
  js: [
    // vue must at first!
    'https://cdn.bootcdn.net/ajax/libs/vue/2.6.10/vue.min.js',
    // element-ui js
    'https://cdn.bootcdn.net/ajax/libs/element-ui/2.15.0/index.min.js',
    'https://cdn.bootcdn.net/ajax/libs/lodash.js/4.17.20/lodash.min.js',
    'https://cdn.bootcdn.net/ajax/libs/echarts/5.0.1/echarts.min.js',
    'https://cdn.bootcdn.net/ajax/libs/axios/0.21.1/axios.min.js',
    'https://cdn.bootcdn.net/ajax/libs/highlight.js/10.5.0/highlight.min.js',
    'https://uicdn.toast.com/editor/2.5.1/toastui-editor-all.js',
    'https://uicdn.toast.com/editor-plugin-code-syntax-highlight/1.0.0/toastui-editor-plugin-code-syntax-highlight.min.js',
    'https://uicdn.toast.com/editor-plugin-color-syntax/1.0.1/toastui-editor-plugin-color-syntax.min.js'
  ]
}
const externals = {
  vue: 'Vue',
  'element-ui': 'ELEMENT',
  lodash: '_',
  echarts: 'echarts',
  axios: 'axios',
  'highlight.js': 'hljs',
  '@toast-ui/editor': 'toastui.Editor',
  '@toast-ui/editor-plugin-code-syntax-highlight': 'toastui.Editor.plugin.codeSyntaxHighlight',
  '@toast-ui/editor-plugin-color-syntax': 'toastui.Editor.plugin.colorSyntax'
}

// If your port is set to 80,
// use administrator privileges to execute the command line.
// For example, Mac: sudo npm run
// You can change the port by the following methods:
// port = 8711 npm run dev OR npm run dev --port = 8711
const port = process.env.port || process.env.npm_config_port || 8711 // dev port

// All configuration item explanations can be find in https://cli.vuejs.org/config/
module.exports = {
  /**
   * You will need to set publicPath if you plan to deploy your site under a sub path,
   * for example GitHub Pages. If you plan to deploy your site to https://foo.github.io/bar/,
   * then publicPath should be set to "/bar/".
   * In most cases please use '/' !!!
   * Detail: https://cli.vuejs.org/config/#publicpath
   */
  publicPath: process.env.NODE_ENV === 'production'
    ? '/admin/'
    : '/',
  outputDir: 'dist',
  assetsDir: 'static',
  lintOnSave: process.env.NODE_ENV === 'development',
  productionSourceMap: false,
  devServer: {
    port: port,
    open: true,
    overlay: {
      warnings: false,
      errors: true
    }
  },
  configureWebpack: {
    // provide the app's title in webpack's name field, so that
    // it can be accessed in index.html to inject the correct title.
    name: name,
    resolve: {
      alias: {
        '@': resolve('src')
      }
    },
    externals: {
    }
  },
  chainWebpack(config) {
    // it can improve the speed of the first screen, it is recommended to turn on preload
    config.plugin('preload').tap(() => [
      {
        rel: 'preload',
        // to ignore runtime.js
        // https://github.com/vuejs/vue-cli/blob/dev/packages/@vue/cli-service/lib/config/app.js#L171
        fileBlacklist: [/\.map$/, /hot-update\.js$/, /runtime\..*\.js$/],
        include: 'initial'
      }
    ])

    // when there are many pages, it will cause too many meaningless requests
    config.plugins.delete('prefetch')

    // set svg-sprite-loader
    config.module
      .rule('svg')
      .exclude.add(resolve('src/icons'))
      .end()
    config.module
      .rule('icons')
      .test(/\.svg$/)
      .include.add(resolve('src/icons'))
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'icon-[name]'
      })
      .end()
    config
      .when(process.env.NODE_ENV === 'development',
        config => {
          config
            .entry('app')
            .clear()
            .add('./src/main.js')
        })
    config
      .when(process.env.NODE_ENV !== 'development',
        config => {
          config
            .entry('app')
            .clear()
            .add('./src/main-prod.js')
          config.set('externals', externals)
          config.plugin('html').tap(args => {
            args[0].cdn = cdn
            return args
          })
          config
            .plugin('ScriptExtHtmlWebpackPlugin')
            .after('html')
            .use('script-ext-html-webpack-plugin', [{
            // `runtime` must same as runtimeChunk name. default is `runtime`
              inline: /runtime\..*\.js$/
            }])
            .end()
          config
            .optimization.splitChunks({
              chunks: 'all',
              cacheGroups: {
                libs: {
                  name: 'chunk-libs',
                  test: /[\\/]node_modules[\\/]/,
                  priority: 10,
                  chunks: 'initial' // only package third parties that are initially dependent
                },
                // elementUI: {
                //   name: 'chunk-elementUI', // split elementUI into a single package
                //   priority: 20, // the weight needs to be larger than libs and app or it will be packaged into libs or app
                //   test: /[\\/]node_modules[\\/]_?element-ui(.*)/ // in order to adapt to cnpm
                // },
                commons: {
                  name: 'chunk-commons',
                  test: resolve('src/components'), // can customize your rules
                  minChunks: 3, //  minimum common number
                  priority: 5,
                  reuseExistingChunk: true
                }
              }
            })
          // https:// webpack.js.org/configuration/optimization/#optimizationruntimechunk
          config.optimization.runtimeChunk('single')
        }
      )
  }
}
