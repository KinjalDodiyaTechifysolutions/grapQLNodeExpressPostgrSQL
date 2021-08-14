const graphql = require("graphql");
const { GraphQLObjectType, GraphQLString, GraphQLList } = graphql;

const SubCommentsType = new GraphQLObjectType({
  name: "SubComments",
  type: "Query",
  fields: {
    comment: { type: GraphQLString },
  }
});

const CommentsType = new GraphQLObjectType({
  name: "Comments",
  type: "Query",
  fields: {
    id: { type: GraphQLString },
    article_id: { type: GraphQLString },
    comment: { type: GraphQLString },
    subcomments: { type: GraphQLList(SubCommentsType) },
  }
});

const ArticleType = new GraphQLObjectType({
  name: "Article",
  type: "Query",
  fields: {
    id: { type: GraphQLString },
    nickname: { type: GraphQLString },
    created: { type: GraphQLString },
    title: { type: GraphQLString },
    description: { type: GraphQLString },
  }
});

exports.SubCommentsType = SubCommentsType;
exports.CommentsType = CommentsType;
exports.ArticleType = ArticleType;
