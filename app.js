const express = require('express');
const graphqlHttp = require('express-graphql');

const graphqlSchema = require('./graphql/schema')
const graphqlResolver = require('./graphql/resolvers')
const firebase =require('firebase');
const { config } = require('./keys/keyStore')

firebase.initializeApp(config);

const app = express();

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
      'Access-Control-Allow-Methods',
      'OPTIONS, GET, POST, PUT, PATCH, DELETE'
    );
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    if (req.method === 'OPTIONS') {
        return res.sendStatus(200);
    }
    next();
});
  

app.use(
    '/graphql',
    graphqlHttp({
        schema: graphqlSchema,
        rootValue: graphqlResolver,
        graphiql: true
    })
)

app.listen(8080)

