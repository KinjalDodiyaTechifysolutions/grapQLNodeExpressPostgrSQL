const graphql = require("graphql");
const db = require("../pgAdaptor").db;
const { GraphQLObjectType, GraphQLID, GraphQLString, GraphQLBoolean, GraphQLList, GraphQLInt } = graphql;
const { ArticleType, CommentsType, SubCommentsType } = require("./types");

const RootMutation = new GraphQLObjectType({
  name: "RootMutationType",
  type: "Mutation",
  fields: {
    addArticle: {
      type: ArticleType,
      args: {
        title: { type: GraphQLString },
        nickname: { type: GraphQLString },
        created: { type: GraphQLString },
        description: { type: GraphQLString },
      },
      resolve(parentValue, args) {
        const query = `INSERT INTO article(title, nickname, created, description) 
          VALUES ($1, $2, $3, $4) RETURNING *`;
        const values = [
          args.title,
          args.nickname,
          new Date(),
          args.description,
        ];
        return db.one(query, values).then(res => res).catch(err => err);
      }
    },
    addCommentOnArticle: {
      type: CommentsType,
      args: {
        comment: { type: GraphQLString },
        article_id: { type: GraphQLInt },
      },
      resolve(parentValue, args) {
        const query = `INSERT INTO comments(article_id, comment)
          VALUES ($1, $2) RETURNING *`;
        const values = [
          args.article_id,
          args.comment,
        ];
        return db.one(query, values).then(res => res).catch(err => err);
      }
    },
    addSubCommentOnComment: {
      type: CommentsType,
      args: {
        comment_id: { type: GraphQLInt },
        comment: { type: GraphQLString },
      },
      async resolve(parentValue, args) {
        const getComment = `SELECT * FROM comments WHERE id = $1`;
        const commentValues = [
          args.comment_id,
        ];
        const commentData = await db.one(getComment, commentValues).then(res => res).catch(err => err);
        let finalSubComments = JSON.stringify([{comment: args.comment}]);
        if (commentData && commentData.subcomments) {
          if (commentData.subcomments.length > 0) {
            finalSubComments = commentData.subcomments;
            finalSubComments.push({comment: args.comment});
            finalSubComments = JSON.stringify(finalSubComments);
          }
        }
        const query = `UPDATE comments SET subcomments = $1::JSONB
        WHERE id = $2 RETURNING *`;
        const values = [
          finalSubComments,
          args.comment_id,
        ];
        return db.one(query, values).then(res => res).catch(err => err);
      }
    }
  }
});

exports.mutation = RootMutation;
