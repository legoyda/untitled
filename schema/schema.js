const graphql = require('graphql');


const {GraphQLObjectType, GraphQLString, GraphQLSchema, GraphQLID, GraphQLInt, GraphQLList} = graphql;
/*
const movies = [
    {id: "1", "name": "Pulp Fiction", "genre": "Crime", "directorId": "60d31219e8b50b700ce693b2",},
    {id: "2", "name": "1984", "genre": "Sci-Fi", "directorId": "60d313fee8b50b700ce82b77",},
    {id: "3", "name": "V for Vendetta", "genre": "Sci-Fi-Triller", "directorId": "60d31433e8b50b700ce8687d",},
    {id: "4", "name": "Snatch", "genre": "Crime-Comedy", "directorId": "60d3144fe8b50b700ce87afc",},
    {id: "5", "name": "Reservoir Dogs", "genre": "Crime", "directorId": "60d31219e8b50b700ce693b2",},
    {id: "6", "name": "The Hateful Eight", "genre": "Crime", "directorId": "60d31219e8b50b700ce693b2",},
    {id: "7", "name": "Inglorious Basterds", "genre": "Crime", "directorId": "60d31219e8b50b700ce693b2",},
    {id: "8", "name": "Lock, Stock and Two Smoking Barrels", "genre": "Crime-Comedy", "directorId": "60d3144fe8b50b700ce87afc",},

];
const directors = [
    {id: "1", name: 'Quentin Tarantino', age: '55'},   //{"_id":{"$oid":"60d31219e8b50b700ce693b2"},"name":"Quentin Tarantino","age":{"$numberInt":"55"}}
    {id: "2", name: 'Michael Radford', age: '72'},     // 60d313fee8b50b700ce82b77
    {id: "3", name: 'James McTeique', age: '51'},      // 60d31433e8b50b700ce8687d
    {id: "4", name: 'Guy Ritchie', age: '50'},         // 60d3144fe8b50b700ce87afc
];
*/

const Movies = require('../models/movie');
const Directors = require('../models/director');



const MovieType = new GraphQLObjectType({
    name: 'Movie',
    fields: () => ({
        id: {type: GraphQLID},
        name: {type: GraphQLString},
        genre: {type: GraphQLString},
        director: {
            type: DirectorType,
            resolve(parent, args) {
                return Directors.findById(parent.directorId);
            }
        }
    }),
});

const DirectorType = new GraphQLObjectType({
    name: 'Director',
    fields: () => ({
        id: {type: GraphQLID},
        name: {type: GraphQLString},
        age: {type: GraphQLInt},
        movies: {
            type: new GraphQLList(MovieType),
            resolve(parent, args) {
                //return movies.filter(movie => movie.directorId === parent.id);
                return Movies.find({directorId: parent.id});
            },
        },
    }),
});

const Query = new GraphQLObjectType({
    name: 'Query',
    fields: {
        movie: {
            type: MovieType,
            args: {id: {type: GraphQLID}},
            resolve(parent, args) {
                //return movies.find(movie => movie.id == args.id);
                return Movies.findById(args.id);

            },
        },

        director: {
            type: DirectorType,
            args: {id: {type: GraphQLID}},
            resolve(parent, args) {
                //return directors.find(director => director.id == args.id);
                return Directors.findById(args.id);

            },
        },
        movies : {
          type: new GraphQLList(MovieType),
          resolve (parent , args){
              //return movies;
              return Movies.find({});
          }
        },
        directors : {
            type: new GraphQLList(DirectorType),
            resolve (parent , args){
                //return directors;
                return Directors.find({});
            }
        }
    }
});

module.exports = new GraphQLSchema({
    query: Query,
})