import strapi from '@/utils/strapi'
import gql from 'graphql-tag'

export function categoryCreate(data) {
  return strapi.post('/graphql', {
    variables: { category: data },
    query: gql`
      mutation ($category: CategoryInput) {
        createCategory(input: {
          data: $category
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
  const idArr = Array.isArray(id) ? id : [id]
  return strapi.post('/graphql', {
    variables: { },
    query: gql`
      mutation {
        ${
  idArr.map((id, i) => `delCategory${i}: deleteCategory(input: {
          where: { id: "${id}"}
        }) {
          category {
            id
          }
        }`)
}
      }
    `.loc.source.body
  })
}

export function categoryUpdate(id, data) {
  return strapi.post('/graphql', {
    variables: { id, category: data },
    query: gql`
      mutation ($id: ID!, $category: editCategoryInput ) {
        updateCategory(input: {
          where: { id: $id},
          data: $category
        }) {
          category {
            id
          }
        }
      }
    `.loc.source.body
  })
}

export async function categoryList(params) {
  const { _limit: limit, _start: start, _sort: sort, ...filter } = params
  return strapi.post('/graphql', {
    variables: { start, limit, sort, filter },
    query: gql`
      query ($start: Int, $limit: Int, $sort: String, $filter: JSON) {
        categoriesConnection(start: $start, limit: $limit, sort: $sort, where: $filter ) {
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
    const { values, aggregate } = res.data['categoriesConnection']
    return {
      list: values,
      total: aggregate.count
    }
  })
}