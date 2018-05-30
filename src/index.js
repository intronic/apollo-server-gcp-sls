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

let hook
if (process.env.NODE_ENV === 'production') {
  // Google Cloud Functions Server
  // https://us-central1-<project-name>.cloudfunctions.net/api
  hook = https.onRequest(graphQLServer)
} else {
  // localhost dev server
  const PORT = 4000;
  // const SUBSCRIPTIONS_PATH = '/subscriptions';
  // const server = createServer(app)
  graphQLServer.listen(PORT, () => {
    console.log(`API Server is now running on http://localhost:${PORT}/graphql`)
    // console.log(`API Subscriptions server is now running on ws://localhost:${PORT}${SUBSCRIPTIONS_PATH}`)
  });
}

export const myhook = hook