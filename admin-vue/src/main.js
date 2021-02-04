import Vue from 'vue'

import 'normalize.css/normalize.css' // A modern alternative to CSS resets

import ElementUI from 'element-ui'
// import 'element-ui/lib/theme-chalk/index.css'
import locale from 'element-ui/lib/locale/lang/zh-CN'
import '@/styles/index.scss' // global css

import App from './App'
import store from './store'
import router from './router'

import '@/icons' // icon
import '@/permission' // permission control

// set ElementUI lang to EN
Vue.use(ElementUI, { locale, size: 'mini' })

Vue.config.productionTip = false
if (process.env.NODE_ENV === 'development') {
  Vue.config.devtools = true
}

{
  let tick
  const setSize = () => {
    store.commit('app/REFRESH_CLIENT_WIDTH')
  }
  // 存储更新 当前窗口的宽度
  window.onresize = function() {
    if (tick) {
      clearTimeout(tick)
    }
    tick = setTimeout(setSize, 1000)
  }
}

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
