import gql from 'graphql-tag'

const toStr = obj => JSON.stringify(obj).replace(/"/g, '')
const defFilter = { status: 1 }

export default {
  // 归档，获取所有文章
  archivesTotal () {
    return this.ctx.$axios.$post('/graphql', {
      query: gql`
        query {
          postList(sort: "releaseDate:desc", limit: 999, start: 0, where: ${toStr({ ...defFilter })}) {
            list {
              id
              title
              releaseDate
            }
          }
        }`.loc.source.body
    })
  },
  // 初始化载入数据（所有分类、所有标签、前10文章）
  initDataGql () {
    return this.ctx.$axios.$post('/graphql', {
      query: gql`
        query {
          categories {
            name
            id
          }
          tags {
            name
            id
          }
          posts(start: 0, limit: 10, sort: "readTime:desc", where: ${toStr({ ...defFilter })}) {
            id
            title
          }
        }`.loc.source.body
    })
  },
  // 文章详情
  postDetail (postId) {
    return this.ctx.$axios.$post('/graphql', {
      query: gql`
        query {
          postPro(id: "${postId}") {
            title
            html
            intro
          }
        }`.loc.source.body
    })
  },
  // 文章列表
  postList (start = 0, limit = 10, filter = {}) {
    return this.ctx.$axios.$post('/graphql', {
      variables: { filter: { ...filter, ...defFilter } },
      query: gql`
        query ($filter: JSON){
          postProList(limit: ${limit}, start: ${start}, where: $filter, sort: "releaseDate:desc") {
            aggregate {
              count
            }
            list {
              id
              title
              releaseDate
              readTime
              intro
              tags
              category
            }
          }
        }
      `.loc.source.body
    }).then((res) => {
      const { list, aggregate } = res.data.postProList
      return {
        list: list.map(v => ({ ...v, tags: v.tags ? v.tags.split(',') : [] })),
        total: aggregate.count
      }
    })
  }
}
