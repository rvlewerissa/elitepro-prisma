// @flow

require('dotenv').config();

import {GraphQLServer} from 'graphql-yoga';
import {Prisma} from 'prisma-binding';
import {makeExecutableSchema} from 'graphql-tools';
import {importSchema} from 'graphql-import';
import jwt from 'jsonwebtoken';

import resolvers from './resolvers';

let typeDefs = importSchema('src/schema.graphql');

let schema = makeExecutableSchema({
  typeDefs,
  resolvers,
  directiveResolvers: {
    isAuthenticated: (next, source, args, ctx) => {
      if (!ctx.user) {
        throw new Error('Not Authorized!');
      }
      next();
    },
  },
});

let server = new GraphQLServer({
  schema,
  context: (req) => {
    return {
      ...req,
      prisma: new Prisma({
        typeDefs: 'prisma/generated/prisma.graphql',
        endpoint: process.env.ENDPOINT,
        secret: process.env.SECRET,
      }),
    };
  },
});

server.express.use((req, res, next) => {
  let token = req.get('Authorization');
  jwt.verify(token, process.env.SECRET, (err, decoded) => {
    if (!err && decoded) {
      req.user = decoded;
    }
    next();
  });
});

server.start(() =>
  console.log(`GraphQL server is running on http://localhost:4000`),
);
