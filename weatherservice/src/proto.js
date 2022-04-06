import { loadPackageDefinition } from '@grpc/grpc-js';
import { loadSync } from '@grpc/proto-loader';
import { __dirname } from './dirname.js'

const protoPath = __dirname + '/../WeatherService.proto';

const wheatherServiceProto = loadPackageDefinition(loadSync(protoPath,
  {
    keepCase: true,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true
  }));

export const WeatherService = wheatherServiceProto.es.codeurjc.mastercloudapps.planner.grpc.WeatherService;