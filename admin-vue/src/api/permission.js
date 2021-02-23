import strapi from '@/utils/strapi'
import gql from 'graphql-tag'

export function permissionCreate(data) {
  return strapi.post('/graphql', {
    variables: { permission: data },
    query: gql`
      mutation ($permission: PermissionInput) {
        createPermission(input: {
          data: $permission
        }) {
          permission {
            id
          }
        }
      }
    `.loc.source.body
  })
}

export function permissionDelete(id) {
  const idArr = Array.isArray(id) ? id : [id]
  return strapi.post('/graphql', {
    variables: { },
    query: gql`
      mutation {
        ${
  idArr.map((id, i) => `delPermission${i}: deletePermission(input: {
          where: { id: "${id}"}
        }) {
          permission {
            id
          }
        }`)
}
      }
    `.loc.source.body
  })
}

export function permissionUpdate(id, data) {
  return strapi.post('/graphql', {
    variables: { id, permission: data },
    query: gql`
      mutation ($id: ID!, $permission: editPermissionInput ) {
        updatePermission(input: {
          where: { id: $id},
          data: $permission
        }) {
          permission {
            id
          }
        }
      }
    `.loc.source.body
  })
}

export async function permissionList(params) {
  const { _limit: limit, _start: start, _sort: sort, ...filter } = params
  return strapi.post('/graphql', {
    variables: { start, limit, sort, filter },
    query: gql`
      query ($start: Int, $limit: Int, $sort: String, $filter: JSON) {
        permissionsConnection(start: $start, limit: $limit, sort: $sort, where: $filter ) {
          values {
            id
            name
            createdAt
            updatedAt
            remark
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
    const { values, aggregate } = res.data['permissionsConnection']
    return {
      list: values,
      total: aggregate.count
    }
  })
}
