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

  // /api/graphiql
  graphQLServer.use(
    "/graphiql",
    graphiqlExpress({ endpointURL: "https://us-central1-www-mybot-live.cloudfunctions.net/myhook/graphql" }) // /api/graphql
  )

  // /api/schema
  graphQLServer.use("/schema", (req, res) => {
    res.set("Content-Type", "text/plain")
    res.send(printSchema(schema))
  })

  return graphQLServer
}

/*
const PORT = 3020;
const SUBSCRIPTIONS_PATH = '/subscriptions';
const server = createServer(app)
server.listen(PORT, () => {
  console.log(`API Server is now running on http://localhost:${PORT}/graphql`)
  console.log(`API Subscriptions server is now running on ws://localhost:${PORT}${SUBSCRIPTIONS_PATH}`)
});
*/

export default setupGraphQLServer