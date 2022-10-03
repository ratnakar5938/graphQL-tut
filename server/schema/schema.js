const graphql = require("graphql");
const loadash = require("loadash");

const { GraphQLObjectType, GraphQLString, GraphQLSchema } = graphql;

// dummy data
let books = [
    { name: "Half Girlfriend", genre: "Fantasy", id: "1" },
    { name: "Girl in room 105", genre: "Fantasy", id: "2" },
    { name: "Timestorm", genre: "Sci-Fi", id: "3" },
];

const BookType = new GraphQLObjectType({
    name: "Book",
    fields: () => ({
        id: { type: GraphQLString },
        name: { type: GraphQLString },
        genre: { type: GraphQLString },
    }),
});

// const AuthorType = new GraphQLObjectType({});

const RootQuery = new GraphQLObjectType({
    name: "RootQueryType",
    fields: {
        book: {
            type: BookType,
            args: { id: { type: GraphQLString } },
            resolve(parent, args) {
                return loadash.find(books, { id: args.id });
            },
        },
    },
});

module.exports = new GraphQLSchema({
    query: RootQuery,
});
