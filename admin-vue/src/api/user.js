import strapi from '@/utils/strapi'
import gql from 'graphql-tag'

export function userCreate(data) {
  return strapi.post('/graphql', {
    variables: { user: data },
    query: gql`
      mutation ($user: userInput!) {
        createUser(data: $user) {
          id
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
        ${idArr.map((id, i) => `delUser${i}: deleteUser(id: "${id}")
        `)}}
    `.loc.source.body
  })
}

export function userUpdate(id, data) {
  return strapi.post('/graphql', {
    variables: { id, user: data },
    query: gql`
      mutation ($id: ID!, $user: userInput! ) {
        updateUser( id: $id, data: $user)
      }
    `.loc.source.body
  })
}

/**
 * 重置密码
 * @param id
 * @returns {AxiosPromise<any>}
 */
export function userResetPassword(id) {
  return strapi.post('/graphql', {
    variables: { id, pwd: '123456' },
    query: gql`
      mutation ($id: ID!, $pwd: String! ) {
        userResetPassword(id: $id, pwd: $pwd)
      }
    `.loc.source.body
  })
}

export async function userProList(params) {
  const { _limit: limit, _start: start, _sort: sort, ...filter } = params
  return strapi.post('/graphql', {
    variables: { start, limit, sort, filter },
    query: gql`
      query ($start: Int, $limit: Int, $sort: String, $filter: JSON) {
        userProList(start: $start, limit: $limit, sort: $sort, where: $filter ) {
          list {
            id
            name
            avatar
            createdAt
            updatedAt
            createdBy
            updatedBy
            roles
          },
          aggregate {
            count
          }
        }
      }
    `.loc.source.body
  }).then(res => {
    const { list, aggregate } = res.data['userProList']
    return {
      list: list.map(v => ({ ...v, roles: v.roles ? v.roles.split(',') : [] })),
      total: aggregate.count
    }
  })
}

export async function userList(params) {
  const { _limit: limit, _start: start, _sort: sort, ...filter } = params
  return strapi.post('/graphql', {
    variables: { start, limit, sort, filter },
    query: gql`
      query ($start: Int, $limit: Int, $sort: String, $filter: JSON) {
        userList(start: $start, limit: $limit, sort: $sort, where: $filter ) {
          list {
            id
            name
            avatar
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
    const { list, aggregate } = res.data['userList']
    return {
      list,
      total: aggregate.count
    }
  })
}

