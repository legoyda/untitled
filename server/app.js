const express = require('express');
const graphqlHTTP = require('express-graphql').graphqlHTTP;
const schema = require('../schema/schema');
const mongoose = require('mongoose');
const app = express();
const PORT = 3005;

mongoose.connect('mongodb+srv://test:test123@graphql-tutorial.htas0.mongodb.net/graphql-tutorial?retryWrites=true&w=majority', {useMongoClient: true});

app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true,
}));

const dbConnection = mongoose.connection;
dbConnection.once('error', err => console.log('Connection error: ${err}'));
dbConnection.once('open', () => console.log('Connected to DB!'));


app.listen(PORT, err => {
    err ? console.log(error) : console.log('Server Started!');
});

