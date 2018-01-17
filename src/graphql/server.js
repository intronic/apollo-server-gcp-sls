// npm i --save express apollo-server-express graphql graphql-tools body-parser
import bodyParser from "body-parser"
import express from "express"
import { graphqlExpress, graphiqlExpress } from "graphql-server-express"
import schema from "./data/schema"
import { printSchema } from "graphql/utilities/schemaPrinter"

const setupGraphQLServer = () => {
  // setup server
  const graphQLServer = express()

  // /api/graphql
  graphQLServer.use(
    "/graphql",
    bodyParser.json(),
    graphqlExpress({ schema, context: {} })
  )

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

export default setupGraphQLServer