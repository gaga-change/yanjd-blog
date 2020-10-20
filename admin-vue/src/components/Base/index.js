
import BaseForm from './BaseForm'
import BaseList from './BaseList'
import BaseTable from './BaseTable'
import SearchForm from './SearchForm'
import { MessageBox } from 'element-ui'

const install = function(Vue) {
  Vue.component(BaseList.name, BaseList)
  Vue.component(BaseForm.name, BaseForm)
  Vue.component(BaseTable.name, BaseTable)
  Vue.component(SearchForm.name, SearchForm)

  Vue.prototype.$copy = obj => JSON.parse(JSON.stringify(obj))
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
          })
        } else {
          done()
        }
      }
    }).then(() => {
    }).catch(() => { reject() })
  })
}

export default {
  install
}
