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
  return strapi.post('/graphql', {
    variables: { id },
    query: gql`
      mutation ($id: ID! ) {
        deleteTag(input: {
          where: { id: $id}
        }) {
          tag {
            id
          }
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
            creator {
              name
            }
            modifier {
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
export async function tagIndex(params) {
  const { _limit: limit, _start: start, _sort: sort, ...filter } = params
  return strapi.post('/graphql', {
    variables: { start, limit, sort, filter },
    query: gql`
      query ($start: Int, $limit: Int, $sort: String, $filter: JSON) {
        postRelation {
          tags
        }
        tagsConnection(start: $start, limit: $limit, sort: $sort where: $filter ) {
          values {
            id
            name
            createdAt
            updatedAt
          },
          aggregate {
            totalCount
          }
        }
      }
    `.loc.source.body
  }).then(res => {
    const { values, aggregate } = res.data['tagsConnection']
    const posts = res.data['postRelation']
    const tagPostNum = {}
    posts.forEach(post => {
      post.tags.forEach(tagId => {
        tagPostNum[tagId] = tagPostNum[tagId] || 0
        tagPostNum[tagId]++
      })
    })
    return {
      list: values.map(v => ({ ...v, postsNum: tagPostNum[v.id] || 0 })),
      total: aggregate['totalCount']
    }
  })
}
