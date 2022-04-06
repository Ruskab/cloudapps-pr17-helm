import { connectAmqp } from "./amqp.js";
import { configKafkaHandler } from "./clients/plannerNotificationHandler.js";
import { createWsServer } from './ws.js';
import { server } from './express.js';
import sequelize from './mysql.js';

await sequelize.sync();
console.log('Connected to MySQL');

createWsServer(server, '/eoloplants')
await connectAmqp();

// Disable Kafka Handler, we use RabbitMQ
// await configKafkaHandler();

server.listen(3000, () => console.log('Server listening on port 3000!'));
