import strapi from '@/utils/strapi'
import gql from 'graphql-tag'
import store from '@/store'

export function permissionCreate(data) {
  return strapi.post('/graphql', {
    variables: { permission: data },
    query: gql`
      mutation ($permission: permissionInput!) {
        createPermission(data: $permission) {
          id
        }
      }
    `.loc.source.body
  }).then(res => {
    store.dispatch('enumMap/setEnum', { key: 'permissions' })
    return res
  })
}

export function permissionDelete(id) {
  const idArr = Array.isArray(id) ? id : [id]
  return strapi.post('/graphql', {
    variables: { },
    query: gql`
      mutation {
        ${
  idArr.map((id, i) => `delPermission${i}: deletePermission(id: "${id}")
  `)
}
      }
    `.loc.source.body
  }).then(res => {
    store.dispatch('enumMap/setEnum', { key: 'permissions' })
    return res
  })
}

export function permissionUpdate(id, data) {
  return strapi.post('/graphql', {
    variables: { id, permission: data },
    query: gql`
      mutation ($id: ID!, $permission: permissionInput! ) {
        updatePermission(id: $id,data: $permission)
      }
    `.loc.source.body
  }).then(res => {
    store.dispatch('enumMap/setEnum', { key: 'permissions' })
    return res
  })
}

export async function permissionListAll(params = {}) {
  const { _limit: limit, _start: start, _sort: sort, ...filter } = params
  return strapi.post('/graphql', {
    variables: { start, limit, sort, filter },
    query: gql`
        query ($start: Int, $limit: Int, $sort: String, $filter: JSON) {
            permissions(start: $start, limit: $limit, sort: $sort, where: $filter ) {
              id
              name
              remark
            }
        }
    `.loc.source.body
  }).then(res => {
    return res.data['permissions'].map(v => ({ ...v, name: v.remark || v.name }))
  })
}

export async function permissionList(params) {
  const { _limit: limit, _start: start, _sort: sort, ...filter } = params
  return strapi.post('/graphql', {
    variables: { start, limit, sort, filter },
    query: gql`
      query ($start: Int, $limit: Int, $sort: String, $filter: JSON) {
        permissionProList(start: $start, limit: $limit, sort: $sort, where: $filter ) {
          list {
            id
            name
            createdAt
            updatedAt
            remark
            createdBy
            updatedBy
          },
          aggregate {
            count
          }
        }
      }
    `.loc.source.body
  }).then(res => {
    const { list, aggregate } = res.data['permissionProList']
    return {
      list,
      total: aggregate.count
    }
  })
}
