'use strict';
var fs = require("fs");

console.log("\n *START* \n");
var data = fs.readFileSync("fakedb-noid.json");
var j = JSON.parse(data);

// [START datastore_quickstart]
// Imports the Google Cloud client library
const Datastore = require('@google-cloud/datastore');

// Your Google Cloud Platform project ID
const projectId = 'xing-technologies';

// Creates a client
const datastore = new Datastore({
  projectId: projectId,
});

var saveEntityKind = (kind) => ((ent) => {
  console.log('k=',kind, 'e=', ent)
  // Saves the entity
  datastore
  .save({key: datastore.key(kind), data: ent})
  .then((x) => {
    console.log('saved', ent);
  })
  .catch(err => {
    console.error('ERROR:', err);
  });
})

// j.vendors.forEach(saveEntityKind('Vendor'))

datastore.createQuery('Vendor')


//j.reagents.forEach(saveEntity('Reagent'))


// The name/ID for the new entity
// const name = 'sampletask1';
// // The Cloud Datastore key for the new entity
// const taskKey = datastore.key([kind, name]);

// // Prepares the new entity
// const task = {
//   key: taskKey,
//   data: {
//     description: 'Buy milk',
//   },
// };

// // Saves the entity
// datastore
//   .save(task)
//   .then(() => {
//     console.log(`Saved ${task.key.name}: ${task.data.description}`);
//   })
//   .catch(err => {
//     console.error('ERROR:', err);
//   });
// // [END datastore_quickstart]