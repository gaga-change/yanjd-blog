
import apiList from '../api'

export default (ctx, inject) => {
  const api = {
    ctx,
    ...apiList
  }
  ctx.$api = api
  inject('api', api)
}
