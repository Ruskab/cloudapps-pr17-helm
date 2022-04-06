import { graphqlHTTP } from 'express-graphql';
import { buildSchema } from 'graphql';
import { __dirname } from './dirname.js';
import { readFileSync } from 'fs';
import eoloPlantGraphQL from './routes/eoloPlantGraphQL.js';

// Construct a schema, using GraphQL schema language
const schemaText = readFileSync( __dirname + '/eoloplants.graphqls').toString();
const schema = buildSchema(schemaText);

export const graphql = graphqlHTTP((request) => ({
    schema: schema,
    rootValue: eoloPlantGraphQL,
    graphiql: true,
}));