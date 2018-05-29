'use strict';

// Imports the Google Cloud client library
const Datastore = require('@google-cloud/datastore');

// Your Google Cloud Platform project ID
const projectId = 'xing-technologies';

const datastore = new Datastore({
  projectId: projectId, // delete
});

const getKind = (kind, id, context) => {
  const transaction = datastore.transaction()
  const key = datastore.key([kind, id])

  transaction
    .run()
    .then(() => transaction.get(key))
    .then(results => {
      const item = results[0]
      return item
  })
}
 
const listKind = (kind, context) => {
	const query = datastore.createQuery(kind)
 
  datastore
    .runQuery(query)
    .then(results => {
        const items = results[0]
        return items
  })
}

const upsertKind = (kind, {id, input}, context) => {
  const transaction = datastore.transaction()
  const key = datastore.key([kind, id])
  return datastore.save({
    key: datastore.key([kind, id]),
    data: input
  });
}

export default {
  getKind,
  listKind,
  upsertKind
}