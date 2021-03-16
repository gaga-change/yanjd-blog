import strapi from '@/utils/strapi'
import gql from 'graphql-tag'

export function postDetail(id) {
  return strapi.post('/graphql', {
    variables: { id },
    query: gql`
      query ($id: ID!) {
        post(id: $id) {
          id
          title
          markdown
        }
      }
    `.loc.source.body
  }).then(res => res.data['post'])
}

export function postCreate(data) {
  data.readTime = 1
  return strapi.post('/graphql', {
    variables: { post: data },
    query: gql`
      mutation ($post: postInput!) {
        createPost(data: $post) {
          id
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
  idArr.map((id, i) => `delPost${i}: deletePost(id: "${id}")
  `)
}
      }
    `.loc.source.body
  })
}

export function postUpdate(id, data) {
  if (data.category === '') data.category = null
  return strapi.post('/graphql', {
    variables: { id, post: data },
    query: gql`
      mutation ($id: ID!, $post: postInput! ) {
        updatePost(id: $id,data: $post)
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
        postList(start: $start, limit: $limit, sort: $sort, where: $filter ) {
          list {
            id
            title
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
    const { list, aggregate } = res.data['postList']
    return {
      list,
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
        postProList(start: $start, limit: $limit, sort: $sort, where: $filter ) {
          list {
            id
            title
            createdAt
            updatedAt
            tags
            category
            status
            intro
            releaseDate
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
    const { list, aggregate } = res.data['postProList']
    return {
      list: list.map(v => ({ ...v, tags: v.tags ? v.tags.split(',') : [] })),
      total: aggregate.count
    }
  })
}
