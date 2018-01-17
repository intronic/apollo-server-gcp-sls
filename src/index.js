if (!global._babelPolyfill) {
  require('babel-polyfill');
}

// Registering Webhook
// curl -X POST https://api.telegram.org/bot421752945:AAFEp0pdJiXaykwftQ-6yENcoVu4qgXhFuU/setwebhook -H 'content-type: application/json' -d '{ "url": "https://us-central1-www-mybot-live.cloudfunctions.net/myhook" }'
// for failed deployments, run serverless remove, or delete from GCP functions, storage & deployment manager
import { https } from "firebase-functions"
import setupGraphQLServer from "./graphql/server"

/* CF for Firebase with graphql-server-express */
const graphQLServer = setupGraphQLServer()

// https://us-central1-<project-name>.cloudfunctions.net/api
export const myhook = https.onRequest(graphQLServer)
