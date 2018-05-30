import { makeExecutableSchema, addMockFunctionsToSchema } from 'graphql-tools';

import datastore from './datastore-resolvers';
//   scalar Date

const typeDefs = `

  input VendorInput {
    name: String!
  }

  enum SaveMethod {
    insert
    update
    upsert
  }
  type Vendor {
    id: ID!
    name: String!
  }

  type Reagent {
    id: ID!
    name: String!
    vendor: Vendor!
    date: String!
    vendorBarcode: String
    lot: String
    expiryDate: String
  }
    
  type Equipment {
    id: ID!
    name: String!
    vendor: Vendor!
    date: String!
    serialNumber: String
    location: String
  }

  type Query {
    vendor(id: ID!): Vendor
    reagent(id: ID!): Reagent
    equipment(id: ID!): Equipment
    vendorList: [Vendor]
    reagentList: [Reagent]
    equipmentList: [Equipment]
  }

  type Mutation {
    vendorSave(id: ID!, input: VendorInput!, method: SaveMethod): Vendor
  }

  schema {
    query: Query
    mutation: Mutation
  }
`;

// listReagent(): [Reagent]!
// listEquipment(): [Equipment]!

const resolvers = {
  Query: {
    vendor(root, {id}, context) {
      return datastore.getKind('Vendor', id, context)
    },
    reagent(root, {id}, context) {
      return datastore.getKind('Reagent', id, context)
    },
    equipment(root, {id}, context) {
      return datastore.getKind('Equipment', id, context)
    },
    vendorList(root, args, context) {
      var res = datastore.listKind('Vendor', context)
      console.log('>> vendorList', res)
      return res
    },
    reagentList(root, args, context) {
      var res = datastore.listKind('Reagent', context)
      console.log('>> reagentList', res, 'root', root, 'args', args, 'ctx', context)
      return res
    },
    equipmentList(root, args, context) {
      var res = datastore.listKind('Equipment', context)
      console.log('>> equipmentList', res)
      return res
    },
  },

  // https://dev-blog.apollodata.com/react-graphql-tutorial-mutations-764d7ec23c15

  Mutation: {
    vendorSave(root, {id, input, method}, context) {
      console.log('>> vendor save root', root, 'id', id, 'input', input, 'method', method, 'ctx', context)
      var res = datastore.saveKind('Vendor', {id, input, method}, context)
      console.log('>> vendor save res', res)
      return res
    },
  }

  // Mutation: {
  //   // addTag: async (root, { type, label }, context) => {
  //   //   console.log(`adding ${type} tag '${label}'`);
  //   //   const newTag = await Tags.addTag(type, label);
  //   //   pubsub.publish(TAGS_CHANGED_TOPIC, { tagAdded: newTag });
  //   //   return newTag;
  //   // },
  // },
};

const schema = makeExecutableSchema({
  typeDefs,
  resolvers
});

// addMockFunctionsToSchema({ schema });

export default schema;