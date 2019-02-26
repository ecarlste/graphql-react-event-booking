const express = require('express');
const bodyParser = require('body-parser');
const graphqlHttp = require('express-graphql');
const mongoose = require('mongoose');

const graphQlSchema = require('./graphql/schema/index');
const graphQlResolvers = require('./graphql/resolvers/index');
const isAuth = require('./middleware/is-auth');

const app = express();

const opt = { useNewUrlParser: true };

app.use(bodyParser.json());

app.use(isAuth);

app.use('/graphql', graphqlHttp({
    schema: graphQlSchema,
    rootValue: graphQlResolvers,
    graphiql: true
}));

mongoose.connect(
        `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0-sosdu.gcp.mongodb.net/${process.env.MONGO_DB}?retryWrites=true`,
        opt
    )
    .then(() => {
        app.listen(process.env.NOVE_ENV || 8000);
    })
    .catch(err => {
        console.log(err);
    });
