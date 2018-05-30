// npm i --save express apollo-server-express graphql graphql-tools body-parser
import bodyParser from 'body-parser'
import cors from 'cors'
import express from 'express'
import { graphqlExpress, graphiqlExpress } from 'graphql-server-express'
import schema from './data/schema'
import { printSchema } from 'graphql/utilities/schemaPrinter'



// Subs - not possible in serverless...
// import { execute, subscribe } from 'graphql'
// import { SubscriptionServer } from 'subscriptions-transport-ws';

const setupGraphQLServer = () => {
  // setup server
  const graphQLServer = express()

  // /api/graphql
  graphQLServer.use(
    "/graphql",
    bodyParser.urlencoded({ extended: true }),
    bodyParser.json(),
    cors(),
    graphqlExpress({ schema, context: {} })
  )

  /* Handle Cors
  graphQLServer.head('/graphql', (req, res) => {
    res.header('Access-Control-Allow-Origin', 'http://localhost:9000');
    res.header('Access-Control-Request-Method', 'GET, POST');
    res.header('Access-Control-Allow-Headers', 'Origin, Accept, Content-Type, Content-Length');
    res.end();
  });
*/
  var endURL = { dev: "/graphql", production: "https://us-central1-xing-technologies.cloudfunctions.net/myhook/graphql" }
  var endpoint = { endpointURL: endURL[ process.env.NODE_ENV ] }

  // /api/graphiql
  graphQLServer.use(
    "/graphiql",
    graphiqlExpress(endpoint) // /api/graphql
  )

  // /api/schema
  graphQLServer.use("/schema", (req, res) => {
    res.set("Content-Type", "text/plain")
    res.send(printSchema(schema))
  })

  return graphQLServer
}

export default setupGraphQLServer