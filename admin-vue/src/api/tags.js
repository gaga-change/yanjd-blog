import strapi from '@/utils/strapi'

export function tagCreate(data) {
  return strapi({
    url: '/tags',
    method: 'post',
    data
  })
}

export function tagDelete(id) {
  return strapi({
    url: `/tags/${id}`,
    method: 'delete'
  })
}

export function tagUpdate(id, data) {
  return strapi({
    url: `/tags/${id}`,
    method: 'put',
    data
  })
}
export async function tagIndex(params) {
  const dataApi = strapi({
    url: '/tags',
    method: 'get',
    params
  })
  const totalApi = strapi({
    url: '/tags/count',
    method: 'get',
    params: { ...params, _limit: undefined, _start: undefined }
  })
  return {
    list: await dataApi,
    total: await totalApi
  }
}
