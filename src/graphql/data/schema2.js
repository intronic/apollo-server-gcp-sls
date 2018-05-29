import { makeExecutableSchema } from 'graphql-tools';

import datastore from './datastore-resolvers';
//   scalar Date

const typeDefs = `

  type VendorInput {
    name: String!
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
    getVendor(id: ID!): Vendor
    getReagent(id: ID!): Reagent
    getEquipment(id: ID!): Equipment
  }

  type Mutation {
    upsertVendor(id: ID!, input: VendorInput): Vendor
  }

  schema {
    query: Query
    mutation: Mutation
  }
`;

// listVendor(): [Vendor]!
// listReagent(): [Reagent]!
// listEquipment(): [Equipment]!

const resolvers = {
  Query: {
    getVendor(root, {id}, context) {
      return datastore.getKind('Vendor', id, context)
    },
    getReagent(root, {id}, context) {
      return datastore.getKind('Reagent', id, context)
    },
    getEquipment(root, {id}, context) {
      return datastore.getKind('Equipment', id, context)
    }
  },

  // https://dev-blog.apollodata.com/react-graphql-tutorial-mutations-764d7ec23c15
  
  Mutation: {
    upsertVendor: function ({id, input}, context) {
      return datastore.upsertKind('Vendor', {id, input}, context)
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

const jsSchema = makeExecutableSchema({
  typeDefs,
  resolvers
});

export default jsSchema;