import strapi from '@/utils/strapi'
import gql from 'graphql-tag'

export function categoryCreate(data) {
  return strapi.post('/graphql', {
    variables: { data: data },
    query: gql`
      mutation ($data: CategoryInput) {
        createCategory(input: {
          data: $data
        }) {
          category {
            id
          }
        }
      }
    `.loc.source.body
  })
}

export function categoryDelete(id) {
  return strapi.post('/graphql', {
    variables: { id },
    query: gql`
      mutation ($id: ID! ) {
        deleteCategory(input: {
          where: { id: $id}
        }) {
          category {
            id
          }
        }
      }
    `.loc.source.body
  })
}

export function categoryUpdate(id, data) {
  return strapi.post('/graphql', {
    variables: { id, data },
    query: gql`
      mutation ($id: ID!, $data: editCategoryInput ) {
        updateCategory(input: {
          where: { id: $id},
          data: $data
        }) {
          category {
            id
          }
        }
      }
    `.loc.source.body
  })
}
export async function categoryIndex(params) {
  const { _limit: limit, _start: start, _sort: sort, ...filter } = params
  return strapi.post('/graphql', {
    variables: { start, limit, sort, filter },
    query: gql`
      query ($start: Int, $limit: Int, $sort: String, $filter: JSON) {
        postRelation {
          category
        }
        categoriesConnection(start: $start, limit: $limit, sort: $sort where: $filter ) {
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
    const { values, aggregate } = res.data['categoriesConnection']
    const posts = res.data['postRelation']
    const categoryPostNum = {}
    posts.forEach(post => {
      if (!post.category) return
      categoryPostNum[post.category] = categoryPostNum[post.category] || 0
      categoryPostNum[post.category]++
    })
    return {
      list: values.map(v => ({ ...v, postsNum: categoryPostNum[v.id] || 0 })),
      total: aggregate['totalCount']
    }
  })
}
