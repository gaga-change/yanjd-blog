import strapi from '@/utils/strapi'
import gql from 'graphql-tag'

export function tagCreate(data) {
  return strapi.post('/graphql', {
    variables: { tag: data },
    query: gql`
      mutation ($tag: TagInput) {
        createTag(input: {
          data: $tag
        }) {
          tag {
            id
          }
        }
      }
    `.loc.source.body
  })
}

export function tagDelete(id) {
  const idArr = Array.isArray(id) ? id : [id]
  return strapi.post('/graphql', {
    variables: { },
    query: gql`
      mutation {
        ${
  idArr.map((id, i) => `delTag${i}: deleteTag(input: {
          where: { id: "${id}"}
        }) {
          tag {
            id
          }
        }`)
}
      }
    `.loc.source.body
  })
}

export function tagUpdate(id, data) {
  return strapi.post('/graphql', {
    variables: { id, tag: data },
    query: gql`
      mutation ($id: ID!, $tag: editTagInput ) {
        updateTag(input: {
          where: { id: $id},
          data: $tag
        }) {
          tag {
            id
          }
        }
      }
    `.loc.source.body
  })
}

export async function tagList(params) {
  const { _limit: limit, _start: start, _sort: sort, ...filter } = params
  return strapi.post('/graphql', {
    variables: { start, limit, sort, filter },
    query: gql`
      query ($start: Int, $limit: Int, $sort: String, $filter: JSON) {
        tagsConnection(start: $start, limit: $limit, sort: $sort, where: $filter ) {
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
    const { values, aggregate } = res.data['tagsConnection']
    return {
      list: values,
      total: aggregate.count
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
