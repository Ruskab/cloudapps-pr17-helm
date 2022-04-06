import express from 'express';
import { __dirname } from './dirname.js';
import { graphql } from './graphql.js';

export const server = express();

server.use(express.json());

server.use('/graphql', graphql);

server.use(express.static(__dirname + '/../public'));