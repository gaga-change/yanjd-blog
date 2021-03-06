import strapi from '@/utils/strapi'
import gql from 'graphql-tag'
import store from '@/store'

export function categoryCreate(data) {
  return strapi.post('/graphql', {
    variables: { category: data },
    query: gql`
      mutation ($category: categoryInput!) {
        createCategory(data: $category) {
          id
        }
      }
    `.loc.source.body
  }).then(res => {
    store.dispatch('enumMap/setEnum', { key: 'categories' })
    return res
  })
}

export function categoryDelete(id) {
  const idArr = Array.isArray(id) ? id : [id]
  return strapi.post('/graphql', {
    variables: { },
    query: gql`
      mutation {
        ${
  idArr.map((id, i) => `delCategory${i}: deleteCategory(id: "${id}")
  `)
}
      }
    `.loc.source.body
  }).then(res => {
    store.dispatch('enumMap/setEnum', { key: 'categories' })
    return res
  })
}

export function categoryUpdate(id, data) {
  return strapi.post('/graphql', {
    variables: { id, category: data },
    query: gql`
      mutation ($id: ID!, $category: categoryInput! ) {
        updateCategory(id: $id, data: $category)
      }
    `.loc.source.body
  }).then(res => {
    store.dispatch('enumMap/setEnum', { key: 'categories' })
    return res
  })
}

export async function categoryList(params) {
  const { _limit: limit, _start: start, _sort: sort, ...filter } = params
  return strapi.post('/graphql', {
    variables: { start, limit, sort, filter },
    query: gql`
      query ($start: Int, $limit: Int, $sort: String, $filter: JSON) {
        categoryList(start: $start, limit: $limit, sort: $sort, where: $filter ) {
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
    const { list, aggregate } = res.data['categoryList']
    return {
      list,
      total: aggregate.count
    }
  })
}

export async function categoryProList(params) {
  const { _limit: limit, _start: start, _sort: sort, ...filter } = params
  return strapi.post('/graphql', {
    variables: { start, limit, sort, filter },
    query: gql`
      query ($start: Int, $limit: Int, $sort: String, $filter: JSON) {
        categoryProList(start: $start, limit: $limit, sort: $sort, where: $filter ) {
          list {
            id
            name
            createdAt
            updatedAt
            createdBy
            updatedBy
            postCount
            remark
          },
          aggregate {
            count
          }
        }
      }
    `.loc.source.body
  }).then(res => {
    const { list, aggregate } = res.data['categoryProList']
    return {
      list,
      total: aggregate.count
    }
  })
}

export async function categoryProChartData(params) {
  const { _limit: limit, _start: start, _sort: sort, ...filter } = params
  return strapi.post('/graphql', {
    variables: { start, limit, sort, filter },
    query: gql`
      query ($start: Int, $limit: Int, $sort: String, $filter: JSON) {
        categoryProList(start: $start, limit: $limit, sort: $sort, where: $filter ) {
          list {
            id
            name
            postCount
          }
        }
      }
    `.loc.source.body
  }).then(res => {
    const { list } = res.data['categoryProList']
    return {
      list
    }
  })
}

export async function categoryListAll(params = {}) {
  const { _start: start = 0, _sort: sort, ...filter } = params
  return strapi.post('/graphql', {
    variables: { start, sort, filter },
    query: gql`
      query ($start: Int, $limit: Int, $sort: String, $filter: JSON) {
        categories(start: $start, limit: $limit, sort: $sort, where: $filter ) {
          id
          name
        }
      }
    `.loc.source.body
  }).then(res => {
    return res.data['categories']
  })
}
