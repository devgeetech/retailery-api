const express = require('express');
const cors = require('cors')
const graphqlHttp = require('express-graphql');

const graphqlSchema = require('./graphql/schema')
const graphqlResolver = require('./graphql/resolvers')
const firebase =require('firebase');

const config = {
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: process.env.FIREBASE_AUTH,
    databaseURL: process.env.FIREBASE_DB,
    storageBucket: process.env.FIREBASE_STR,
    projectId: "retailery",
    messagingSenderId: process.env.FIREBASE_MESSAGING_KEY
}

firebase.initializeApp(config);

const app = express();

app.use(cors())
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

