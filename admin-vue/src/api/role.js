import strapi from '@/utils/strapi'
import gql from 'graphql-tag'

export function roleCreate(data) {
  return strapi.post('/graphql', {
    variables: { role: data },
    query: gql`
      mutation ($role: RoleInput) {
        createRole(input: {
          data: $role
        }) {
          role {
            id
          }
        }
      }
    `.loc.source.body
  })
}

export function roleDelete(id) {
  const idArr = Array.isArray(id) ? id : [id]
  return strapi.post('/graphql', {
    variables: { },
    query: gql`
      mutation {
        ${
  idArr.map((id, i) => `delRole${i}: deleteRole(input: {
          where: { id: "${id}"}
        }) {
          role {
            id
          }
        }`)
}
      }
    `.loc.source.body
  })
}

export function roleUpdate(id, data) {
  return strapi.post('/graphql', {
    variables: { id, role: data },
    query: gql`
      mutation ($id: ID!, $role: editRoleInput ) {
        updateRole(input: {
          where: { id: $id},
          data: $role
        }) {
          role {
            id
          }
        }
      }
    `.loc.source.body
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

export async function roleList(params) {
  const { _limit: limit, _start: start, _sort: sort, ...filter } = params
  return strapi.post('/graphql', {
    variables: { start, limit, sort, filter },
    query: gql`
      query ($start: Int, $limit: Int, $sort: String, $filter: JSON) {
        rolesConnection(start: $start, limit: $limit, sort: $sort, where: $filter ) {
          values {
            id
            name
            remark
            createdAt
            updatedAt
            createdBy {
              name
            }
            updatedBy {
              name
            }
          },
          aggregate {
            count
          }
        }
      }
    `.loc.source.body
  }).then(res => {
    const { values, aggregate } = res.data['rolesConnection']
    return {
      list: values,
      total: aggregate.count
    }
  })
}
