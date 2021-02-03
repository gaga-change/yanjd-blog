import strapi from '@/utils/strapi'
import gql from 'graphql-tag'

export function userCreate(data) {
  return strapi.post('/graphql', {
    variables: { user: data },
    query: gql`
      mutation ($user: UserInput) {
        createUser(input: {
          data: $user
        }) {
          user {
            id
          }
        }
      }
    `.loc.source.body
  })
}

export function userDelete(id) {
  const idArr = Array.isArray(id) ? id : [id]
  return strapi.post('/graphql', {
    variables: { },
    query: gql`
      mutation {
        ${
  idArr.map((id, i) => `delUser${i}: deleteUser(input: {
          where: { id: "${id}"}
        }) {
          user {
            id
          }
        }`)
}
      }
    `.loc.source.body
  })
}

export function userUpdate(id, data) {
  return strapi.post('/graphql', {
    variables: { id, user: data },
    query: gql`
      mutation ($id: ID!, $user: editUserInput ) {
        updateUser(input: {
          where: { id: $id},
          data: $user
        }) {
          user {
            id
          }
        }
      }
    `.loc.source.body
  })
}

export async function userList(params) {
  const { _limit: limit, _start: start, _sort: sort, ...filter } = params
  return strapi.post('/graphql', {
    variables: { start, limit, sort, filter },
    query: gql`
      query ($start: Int, $limit: Int, $sort: String, $filter: JSON) {
        usersConnection(start: $start, limit: $limit, sort: $sort, where: $filter ) {
          values {
            id
            name
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
    const { values, aggregate } = res.data['usersConnection']
    return {
      list: values,
      total: aggregate.count
    }
  })
}
