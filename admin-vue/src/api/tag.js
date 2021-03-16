import strapi from '@/utils/strapi'
import gql from 'graphql-tag'
import store from '@/store'
export function tagCreate(data) {
  return strapi.post('/graphql', {
    variables: { tag: data },
    query: gql`
      mutation ($tag: tagInput!) {
        createTag(data: $tag) {
          id
        }
      }
    `.loc.source.body
  }).then(res => {
    store.dispatch('enumMap/setEnum', { key: 'tags' })
    return res
  })
}

export function tagDelete(id) {
  const idArr = Array.isArray(id) ? id : [id]
  return strapi.post('/graphql', {
    variables: { },
    query: gql`
      mutation {
        ${
  idArr.map((id, i) => `delTag${i}: deleteTag(id: "${id}")
  `)
}
      }
    `.loc.source.body
  }).then(res => {
    store.dispatch('enumMap/setEnum', { key: 'tags' })
    return res
  })
}

export function tagUpdate(id, data) {
  return strapi.post('/graphql', {
    variables: { id, tag: data },
    query: gql`
      mutation ($id: ID!, $tag: tagInput! ) {
        updateTag(id: $id, data: $tag)
      }
    `.loc.source.body
  }).then(res => {
    store.dispatch('enumMap/setEnum', { key: 'tags' })
    return res
  })
}

export async function tagList(params) {
  const { _limit: limit, _start: start, _sort: sort, ...filter } = params
  return strapi.post('/graphql', {
    variables: { start, limit, sort, filter },
    query: gql`
      query ($start: Int, $limit: Int, $sort: String, $filter: JSON) {
        tagList(start: $start, limit: $limit, sort: $sort, where: $filter ) {
          list {
            id
            name
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
    const { list, aggregate } = res.data['tagList']
    return {
      list,
      total: aggregate.count
    }
  })
}
export async function tagProList(params) {
  const { _limit: limit, _start: start, _sort: sort, ...filter } = params
  return strapi.post('/graphql', {
    variables: { start, limit, sort, filter },
    query: gql`
      query ($start: Int, $limit: Int, $sort: String, $filter: JSON) {
        tagProList(start: $start, limit: $limit, sort: $sort, where: $filter ) {
          list {
            id
            name
            createdAt
            updatedAt
            createdBy
            updatedBy
            postCount
          },
          aggregate {
            count
          }
        }
      }
    `.loc.source.body
  }).then(res => {
    const { list, aggregate } = res.data['tagProList']
    return {
      list,
      total: aggregate.count
    }
  })
}

export async function tagProCharData(params) {
  const { _limit: limit, _start: start, _sort: sort, ...filter } = params
  return strapi.post('/graphql', {
    variables: { start, limit, sort, filter },
    query: gql`
      query ($start: Int, $limit: Int, $sort: String, $filter: JSON) {
        tagProList(start: $start, limit: $limit, sort: $sort, where: $filter ) {
          list {
            id
            name
            postCount
          }
        }
      }
    `.loc.source.body
  }).then(res => {
    const { list } = res.data['tagProList']
    return {
      list
    }
  })
}

export async function tagListAll(params = {}) {
  const { _start: start = 0, _sort: sort, ...filter } = params
  return strapi.post('/graphql', {
    variables: { start, sort, filter },
    query: gql`
      query ($start: Int, $limit: Int, $sort: String, $filter: JSON) {
        tags(start: $start, limit: $limit, sort: $sort, where: $filter ) {
          id
          name
        }
      }
    `.loc.source.body
  }).then(res => {
    return res.data['tags']
  })
}
