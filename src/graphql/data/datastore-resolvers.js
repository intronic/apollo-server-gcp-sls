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

  return transaction
    .run()
    .then(() => transaction.get(key))
    .then(results => {
      const item = results[0]
      return item
  })
}
 
const listKind = (kind, context) => {
	const query = datastore.createQuery(kind)
 
  return datastore
    .runQuery(query)
    .then(results => {
      const items = results[0]
      console.log('>> runQuery', kind, 'res', results, 'items', items,'ctx', context)
      return items
  })
}

const saveKind = (kind, {id, input, method}, context) => {
  const transaction = datastore.transaction()
  const key = datastore.key([kind, id])
  console.log('>> upsert', [kind, id], 'k', key, 'input', input, 'method', method, 'ctx', context)
  return datastore.save({key, method, data: input}, function(err, apiResponse) {
    if (err) console.log('save ERROR:', err, 'Args:', [kind, id], 'k', key, 'input', input, 'method')
    if (apiResponse) console.log('save api:', apiResponse)
  })

    // .then(results => {
    //   const items = results[0]
    //   console.log('>> saved', kind, 'res', results, 'items', items, 'method', method,'ctx', context)
    //   return items
    // }) 
    // .catch(err => {
    //   console.error;
    // })
}

export default {
  getKind,
  listKind,
  saveKind
}