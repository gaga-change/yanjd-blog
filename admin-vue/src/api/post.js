import strapi from '@/utils/strapi'
import gql from 'graphql-tag'

export function postCreate(data) {
  return strapi.post('/graphql', {
    variables: { post: data },
    query: gql`
      mutation ($post: PostInput) {
        createPost(input: {
          data: $post
        }) {
          post {
            id
          }
        }
      }
    `.loc.source.body
  })
}

export function postDelete(id) {
  const idArr = Array.isArray(id) ? id : [id]
  return strapi.post('/graphql', {
    variables: { },
    query: gql`
      mutation {
        ${
  idArr.map((id, i) => `delPost${i}: deletePost(input: {
          where: { id: "${id}"}
        }) {
          post {
            id
          }
        }`)
}
      }
    `.loc.source.body
  })
}

export function postUpdate(id, data) {
  return strapi.post('/graphql', {
    variables: { id, post: data },
    query: gql`
      mutation ($id: ID!, $post: editPostInput ) {
        updatePost(input: {
          where: { id: $id},
          data: $post
        }) {
          post {
            id
          }
        }
      }
    `.loc.source.body
  })
}

export async function postList(params) {
  const { _limit: limit, _start: start, _sort: sort, ...filter } = params
  return strapi.post('/graphql', {
    variables: { start, limit, sort, filter },
    query: gql`
      query ($start: Int, $limit: Int, $sort: String, $filter: JSON) {
        postsConnection(start: $start, limit: $limit, sort: $sort, where: $filter ) {
          values {
            id
            title
            createdAt
            updatedAt
            tags {
              id
              name
            }
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
    const { values, aggregate } = res.data['postsConnection']
    return {
      list: values,
      total: aggregate.count
    }
  })
}

export async function postProList(params) {
  const { _limit: limit, _start: start, _sort: sort, ...filter } = params
  return strapi.post('/graphql', {
    variables: { start, limit, sort, filter },
    query: gql`
      query ($start: Int, $limit: Int, $sort: String, $filter: JSON) {
        postsProConnection(start: $start, limit: $limit, sort: $sort, where: $filter ) {
          values {
            id
            title
            createdAt
            updatedAt
            tagIds
            category
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
    const { values, aggregate } = res.data['postsProConnection']
    return {
      list: values,
      total: aggregate.count
    }
  })
}
