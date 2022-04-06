import { Server, ServerCredentials } from '@grpc/grpc-js';
import { WeatherService } from './proto.js';
import { GetWeather } from './weatherService.js';

const server = new Server();

const GRPC_HOST = process.env.GRPC_HOST || "127.0.0.1";
const GRPC_PORT = process.env.GRPC_PORT || "9090";

server.addService(WeatherService.service, { GetWeather });

process.on('SIGINT', () => {
    process.exit(0);
});

server.bindAsync(`${GRPC_HOST}:${GRPC_PORT}`, ServerCredentials.createInsecure(), () => {
    server.start();
    console.log(`gRPC server running at http://${GRPC_HOST}:${GRPC_PORT}`);
});