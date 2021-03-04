// import 'codemirror/lib/codemirror.css'
// import 'highlight.js/styles/github.css'
// import '@toast-ui/editor/dist/toastui-editor.css'
// import 'tui-color-picker/dist/tui-color-picker.css'
import Vue from 'vue'
import ElementUI from 'element-ui'
import locale from 'element-ui/lib/locale/lang/zh-CN'
import '@/styles/index.scss' // global css

import App from './App'
import store from './store'
import router from './router'

import '@/icons' // icon
import '@/permission' // permission control

// set ElementUI lang to EN
Vue.use(ElementUI, { locale, size: 'mini' })
console.log('prod')
// Vue.config.productionTip = false
// if (process.env.NODE_ENV === 'development') {
//   Vue.config.devtools = true
// }

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

const { MessageBox } = ElementUI
Vue.prototype.$apiConfirm = (msg, api) => new Promise((resolve, reject) => {
  MessageBox.confirm(msg || '此操作将永久删除该行, 是否继续?', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning',
    beforeClose: (action, instance, done) => {
      if (action === 'confirm') {
        instance.confirmButtonLoading = true
        api().then((res) => {
          setTimeout(() => {
            instance.confirmButtonLoading = false
          }, 300)
          done()
          resolve(res)
        }).catch(() => {
          instance.confirmButtonLoading = false
          // done()
        })
      } else {
        done()
      }
    }
  }).then(() => {
  }).catch(() => { reject() })
})

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
