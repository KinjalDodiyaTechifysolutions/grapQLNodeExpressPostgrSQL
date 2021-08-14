const { db } = require("../pgAdaptor");
const { GraphQLObjectType, GraphQLID, GraphQLList } = require("graphql");
const { ArticleType, CommentsType, SubCommentsType } = require("./types");

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  type: "Query",
  fields: {
    getAllArticles: {
      type: new GraphQLList(ArticleType),
      args: { id: { type: GraphQLID } },
      async resolve(parentValue, args) {
        const query = `SELECT * FROM article`;
        const values = [];

        let data = await db.many(query, values).then(res => res).catch(err => err);
        return data;
      }
    },
    getAllCommentOfArticles: {
      type: new GraphQLList(CommentsType),
      args: { id: { type: GraphQLID } },
      async resolve(parentValue, args) {
        const query = `SELECT * FROM comments where article_id = $1`;
        const values = [args.id];

        let data = await db.many(query, values).then(res => res).catch(err => err);
        console.log(data)
        return data;
      }
    },
    getArticleById: {
      type: ArticleType,
      args: { id: { type: GraphQLID } },
      async resolve(parentValue, args) {
        const query = `SELECT * FROM article where id = $1`;
        const values = [args.id];
  
        let data = await db.one(query, values).then(res => res).catch(err => err);
        return data;
      }
    },
  }
});

exports.query = RootQuery;
