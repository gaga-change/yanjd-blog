import strapi from '@/utils/strapi'
import gql from 'graphql-tag'
import store from '@/store'

export function roleCreate(data) {
  return strapi.post('/graphql', {
    variables: { role: data },
    query: gql`
      mutation ($role: roleInput!) {
        createRole(data: $role) {
          id
        }
      }
    `.loc.source.body
  }).then(res => {
    store.dispatch('enumMap/setEnum', { key: 'roles' })
    return res
  })
}

export function roleDelete(id) {
  const idArr = Array.isArray(id) ? id : [id]
  return strapi.post('/graphql', {
    variables: { },
    query: gql`
      mutation {
        ${
  idArr.map((id, i) => `delRole${i}: deleteRole(id: "${id}")
  `)
}
      }
    `.loc.source.body
  }).then(res => {
    store.dispatch('enumMap/setEnum', { key: 'roles' })
    return res
  })
}

export function roleUpdate(id, data) {
  return strapi.post('/graphql', {
    variables: { id, role: data },
    query: gql`
      mutation ($id: ID!, $role: roleInput! ) {
        updateRole(id: $id,data: $role)
      }
    `.loc.source.body
  }).then(res => {
    store.dispatch('enumMap/setEnum', { key: 'roles' })
    return res
  })
}

export async function roleListAll(params = {}) {
  const { _limit: limit, _start: start = 0, _sort: sort, ...filter } = params
  return strapi.post('/graphql', {
    variables: { start, limit, sort, filter },
    query: gql`
      query ($start: Int, $limit: Int, $sort: String, $filter: JSON) {
        roles(start: $start, limit: $limit, sort: $sort, where: $filter ) {
          id
          name
        }
      }
    `.loc.source.body
  }).then(res => {
    return res.data['roles']
  })
}

export async function roleProList(params) {
  const { _limit: limit, _start: start, _sort: sort, ...filter } = params
  return strapi.post('/graphql', {
    variables: { start, limit, sort, filter },
    query: gql`
      query ($start: Int, $limit: Int, $sort: String, $filter: JSON) {
        roleProList(start: $start, limit: $limit, sort: $sort, where: $filter ) {
          list {
            id
            name
            remark
            createdAt
            updatedAt
            createdBy
            updatedBy
            permissions
          },
          aggregate {
            count
          }
        }
      }
    `.loc.source.body
  }).then(res => {
    const { list, aggregate } = res.data['roleProList']
    return {
      list: list.map(v => ({ ...v, permissions: v.permissions ? v.permissions.split(',') : [] })),
      total: aggregate.count
    }
  })
}

export async function roleList(params) {
  const { _limit: limit, _start: start, _sort: sort, ...filter } = params
  return strapi.post('/graphql', {
    variables: { start, limit, sort, filter },
    query: gql`
      query ($start: Int, $limit: Int, $sort: String, $filter: JSON) {
        roleList(start: $start, limit: $limit, sort: $sort, where: $filter ) {
          list {
            id
            name
            remark
            createdAt
            updatedAt
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
    const { list, aggregate } = res.data['roleList']
    return {
      list,
      total: aggregate.count
    }
  })
}
