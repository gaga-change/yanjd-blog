import strapi from '@/utils/strapi'

export function categoryCreate(data) {
  return strapi({
    url: '/categories',
    method: 'post',
    data
  })
}

export function categoryDelete(id) {
  return strapi({
    url: `/categories/${id}`,
    method: 'delete'
  })
}

export function categoryUpdate(id, data) {
  return strapi({
    url: `/categories/${id}`,
    method: 'put',
    data
  })
}
export async function categoryIndex(params) {
  const dataApi = strapi({
    url: '/categories',
    method: 'get',
    params
  })
  const totalApi = strapi({
    url: '/categories/count',
    method: 'get',
    params: { ...params, _limit: undefined, _start: undefined }
  })
  return {
    list: await dataApi,
    total: await totalApi
  }
}
