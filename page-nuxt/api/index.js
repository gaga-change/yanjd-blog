import gql from 'graphql-tag'
const toStr = obj => JSON.stringify(obj).replace(/"/g, '')
const defFilter = { show: true }

export default {
  // 归档，获取所有文章
  archivesTotal () {
    return this.ctx.$axios.$post('/graphql', {
      query: gql`
        query {
          postsConnection(sort: "releaseDate:desc", limit: 999, start: 0, where: ${toStr({ ...defFilter })}) {
            values {
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
  }
}
