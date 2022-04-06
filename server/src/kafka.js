import { Kafka, logLevel } from 'kafkajs';
import config from 'config';

const QUEUE = config.get('amqp.queues.creation');

export const kafka = new Kafka({
  logLevel: logLevel.ERROR,
  clientId: 'my-app',
  brokers: ['localhost:9092'],
});

export async function emitKafka(eoloPlantInput) {

  const producer = kafka.producer()
  await producer.connect()
  await producer.send({
    topic: QUEUE,
    messages: [
      {value: eoloPlantInput}
    ],
  }).then(console.log)
  .catch(e => console.error(`Kafka error: ${e.message}`, e))
}