module.exports = {
  definition: `
    type postRelationRes {
      id: ID,
      category: ID,
      tags: [ID]!
    }
  `,
  query: `
    postRelation: [postRelationRes]
  `,
  mutation: ``,
  resolver: {
    Query: {
      postRelation: {
        description: '查询所有文章的关联文档id',
        resolver: 'application::post.post.postRelation'
      }
    }
  }
};
